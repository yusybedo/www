import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

let allProperties = [];

async function loadAllProperties() {
    try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        
        allProperties = [];
        querySnapshot.forEach((doc) => {
            allProperties.push({ id: doc.id, ...doc.data() });
        });
        
        displayProperties(allProperties);
    } catch (error) {
        console.error('Error loading properties:', error);
        document.getElementById('properties-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل العقارات</p>';
    }
}

function displayProperties(properties) {
    const container = document.getElementById('properties-grid');
    
    if (properties.length === 0) {
        container.innerHTML = '<p class="loading">لا توجد عقارات متاحة</p>';
        return;
    }
    
    container.innerHTML = '';
    
    properties.forEach((property) => {
        const card = createPropertyCard(property);
        container.appendChild(card);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => window.location.href = `property-details.html?id=${property.id}`;
    
    card.innerHTML = `
        <img src="${property.imageUrl || 'https://via.placeholder.com/400x300?text=عقار'}" alt="${property.title}" class="card-image">
        <div class="card-content">
            <h3>${property.title}</h3>
            <p>${property.description}</p>
            <div class="card-meta">
                <span class="price">${property.price} ريال</span>
                <span class="property-type">${property.type}</span>
            </div>
        </div>
    `;
    
    return card;
}

function filterProperties() {
    const searchTerm = document.getElementById('property-search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    let filtered = allProperties.filter(property => {
        const matchSearch = !searchTerm || 
            property.title.toLowerCase().includes(searchTerm) || 
            property.description.toLowerCase().includes(searchTerm);
        const matchType = !typeFilter || property.type === typeFilter;
        
        return matchSearch && matchType;
    });
    
    if (sortFilter === 'price-low') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortFilter === 'price-high') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    
    displayProperties(filtered);
}

const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('search');
if (searchParam) {
    document.getElementById('property-search').value = searchParam;
}

document.getElementById('search-property-btn').addEventListener('click', filterProperties);
document.getElementById('property-search').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        filterProperties();
    }
});
document.getElementById('type-filter').addEventListener('change', filterProperties);
document.getElementById('sort-filter').addEventListener('change', filterProperties);

loadAllProperties();
