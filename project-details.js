import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        document.getElementById('project-details').innerHTML = 
            '<p class="loading">معرف المشروع غير موجود</p>';
        return;
    }
    
    try {
        const projectDoc = await getDoc(doc(db, 'projects', projectId));
        
        if (!projectDoc.exists()) {
            document.getElementById('project-details').innerHTML = 
                '<p class="loading">المشروع غير موجود</p>';
            return;
        }
        
        const project = projectDoc.data();
        displayProjectDetails(project);
        
        document.title = `${project.title} - موقع العقارات`;
    } catch (error) {
        console.error('Error loading project:', error);
        document.getElementById('project-details').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المشروع</p>';
    }
}

function displayProjectDetails(project) {
    const detailsHTML = `
        <div class="project-full">
            ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}" class="project-gallery">` : ''}
            <div class="project-info">
                <div class="project-header">
                    <div>
                        <h1 class="project-title">${project.title}</h1>
                        <p class="project-status">${project.status || 'قيد التنفيذ'}</p>
                    </div>
                    ${project.budget ? `<div class="property-price">${project.budget}</div>` : ''}
                </div>
                
                <div class="project-specs">
                    ${project.location ? `
                    <div class="spec-item">
                        <span class="spec-label">الموقع</span>
                        <span class="spec-value">${project.location}</span>
                    </div>` : ''}
                    ${project.startDate ? `
                    <div class="spec-item">
                        <span class="spec-label">تاريخ البدء</span>
                        <span class="spec-value">${project.startDate}</span>
                    </div>` : ''}
                    ${project.completionDate ? `
                    <div class="spec-item">
                        <span class="spec-label">تاريخ الإنجاز المتوقع</span>
                        <span class="spec-value">${project.completionDate}</span>
                    </div>` : ''}
                    ${project.units ? `
                    <div class="spec-item">
                        <span class="spec-label">عدد الوحدات</span>
                        <span class="spec-value">${project.units}</span>
                    </div>` : ''}
                </div>
                
                <div class="project-description">
                    <h3>عن المشروع</h3>
                    <p>${project.description}</p>
                </div>
                
                ${project.features ? `
                <div class="project-description">
                    <h3>المميزات</h3>
                    <p>${project.features}</p>
                </div>` : ''}
                
                <div class="contact-section">
                    <h3>هل أنت مهتم بهذا المشروع؟</h3>
                    <a href="contact.html" class="contact-btn">تواصل معنا</a>
                </div>
                
                <div class="article-footer">
                    <a href="projects.html" class="back-btn">العودة للمشاريع</a>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('project-details').innerHTML = detailsHTML;
}

loadProjectDetails();
