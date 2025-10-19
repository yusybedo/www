import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadAllProjects() {
    try {
        const projectsRef = collection(db, 'projects');
        const querySnapshot = await getDocs(projectsRef);
        
        const container = document.getElementById('projects-grid');
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد مشاريع متاحة حالياً</p>';
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
        document.getElementById('projects-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المشاريع</p>';
    }
}

function createProjectCard(project, id) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.location.href = `project-details.html?id=${id}`;
    
    card.innerHTML = `
        <img src="${project.imageUrl || 'https://via.placeholder.com/400x300?text=مشروع'}" alt="${project.title}" class="card-image">
        <div class="card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="card-meta">
                <span class="price">${project.budget || 'غير محدد'}</span>
                <span class="project-status">${project.status || 'قيد التنفيذ'}</span>
            </div>
        </div>
    `;
    
    return card;
}

loadAllProjects();
