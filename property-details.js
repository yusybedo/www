import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadPropertyDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (!propertyId) {
        document.getElementById('property-details').innerHTML = 
            '<p class="loading">معرف العقار غير موجود</p>';
        return;
    }
    
    try {
        const propertyDoc = await getDoc(doc(db, 'properties', propertyId));
        
        if (!propertyDoc.exists()) {
            document.getElementById('property-details').innerHTML = 
                '<p class="loading">العقار غير موجود</p>';
            return;
        }
        
        const property = propertyDoc.data();
        displayPropertyDetails(property);
        
        document.title = `${property.title} - موقع العقارات`;
    } catch (error) {
        console.error('Error loading property:', error);
        document.getElementById('property-details').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل العقار</p>';
    }
}

function displayPropertyDetails(property) {
    const detailsHTML = `
        <div class="property-full">
            ${property.imageUrl ? `<img src="${property.imageUrl}" alt="${property.title}" class="property-gallery">` : ''}
            <div class="property-info">
                <div class="property-header">
                    <div>
                        <h1 class="property-title">${property.title}</h1>
                        <p class="property-type">${property.type}</p>
                    </div>
                    <div class="property-price">${property.price} ريال</div>
                </div>
                
                <div class="property-specs">
                    ${property.area ? `
                    <div class="spec-item">
                        <span class="spec-label">المساحة</span>
                        <span class="spec-value">${property.area} م²</span>
                    </div>` : ''}
                    ${property.rooms ? `
                    <div class="spec-item">
                        <span class="spec-label">عدد الغرف</span>
                        <span class="spec-value">${property.rooms}</span>
                    </div>` : ''}
                    ${property.bathrooms ? `
                    <div class="spec-item">
                        <span class="spec-label">عدد الحمامات</span>
                        <span class="spec-value">${property.bathrooms}</span>
                    </div>` : ''}
                    ${property.location ? `
                    <div class="spec-item">
                        <span class="spec-label">الموقع</span>
                        <span class="spec-value">${property.location}</span>
                    </div>` : ''}
                </div>
                
                <div class="property-description">
                    <h3>الوصف</h3>
                    <p>${property.description}</p>
                </div>
                
                <div class="contact-section">
                    <h3>هل أنت مهتم بهذا العقار؟</h3>
                    <a href="contact.html" class="contact-btn">تواصل معنا</a>
                </div>
                
                <div class="article-footer">
                    <a href="properties.html" class="back-btn">العودة للعقارات</a>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('property-details').innerHTML = detailsHTML;
}

loadPropertyDetails();
