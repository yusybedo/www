import { db } from './firebase-config.js';
import { collection, getDocs, query, limit, orderBy, where } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadFeaturedProperties() {
    try {
        const propertiesRef = collection(db, 'properties');
        const q = query(propertiesRef, where('featured', '==', true), limit(6));
        const querySnapshot = await getDocs(q);
        
        const container = document.getElementById('featured-properties-grid');
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد عقارات مميزة حالياً</p>';
            return;
        }
        
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const property = doc.data();
            const card = createPropertyCard(property, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading properties:', error);
        document.getElementById('featured-properties-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل العقارات</p>';
    }
}

async function loadFeaturedProjects() {
    try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('featured', '==', true), limit(6));
        const querySnapshot = await getDocs(q);
        
        const container = document.getElementById('featured-projects-grid');
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد مشاريع مميزة حالياً</p>';
            return;
        }
        
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const project = doc.data();
            const card = createProjectCard(project, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('featured-projects-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المشاريع</p>';
    }
}

async function loadLatestBlog() {
    try {
        const blogRef = collection(db, 'blog');
        const q = query(blogRef, orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const container = document.getElementById('latest-blog-grid');
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد مقالات حالياً</p>';
            return;
        }
        
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const article = doc.data();
            const card = createBlogCard(article, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading blog:', error);
        document.getElementById('latest-blog-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المقالات</p>';
    }
}

function createPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => window.location.href = `pages/property-details.html?id=${id}`;
    
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

function createProjectCard(project, id) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.location.href = `pages/project-details.html?id=${id}`;
    
    card.innerHTML = `
        <img src="${project.imageUrl || 'https://via.placeholder.com/400x300?text=مشروع'}" alt="${project.title}" class="card-image">
        <div class="card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="card-meta">
                <span class="price">${project.budget || 'غير محدد'}</span>
                <span class="project-status">${project.status}</span>
            </div>
        </div>
    `;
    
    return card;
}

function createBlogCard(article, id) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.onclick = () => window.location.href = `pages/blog-details.html?id=${id}`;
    
    const date = article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString('ar-SA') : '';
    
    card.innerHTML = `
        <img src="${article.imageUrl || 'https://via.placeholder.com/400x300?text=مقالة'}" alt="${article.title}" class="card-image">
        <div class="card-content">
            <h3>${article.title}</h3>
            <p>${article.excerpt || article.content}</p>
            <div class="card-meta">
                <span class="blog-date">${date}</span>
            </div>
        </div>
    `;
    
    return card;
}

loadFeaturedProperties();
loadFeaturedProjects();
loadLatestBlog();
