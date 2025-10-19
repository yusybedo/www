import { db } from './firebase-config.js';
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
});

const navLinks = document.querySelectorAll('.admin-nav-link:not(.logout)');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const section = this.dataset.section;
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
    });
});

async function loadProperties() {
    const container = document.getElementById('properties-list');
    try {
        const querySnapshot = await getDocs(collection(db, 'properties'));
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد عقارات</p>';
            return;
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const property = doc.data();
            const card = createPropertyCard(property, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="loading">حدث خطأ في التحميل</p>';
    }
}

function createPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    card.innerHTML = `
        <img src="${property.imageUrl || 'https://via.placeholder.com/150x100'}" alt="${property.title}" class="item-image">
        <div class="item-info">
            <h3>${property.title}</h3>
            <p>${property.description?.substring(0, 100)}...</p>
            <p><strong>السعر:</strong> ${property.price} ريال | <strong>النوع:</strong> ${property.type}</p>
            <p><strong>مميز:</strong> ${property.featured ? 'نعم' : 'لا'}</p>
        </div>
        <div class="item-actions">
            <button class="edit-btn" onclick="editProperty('${id}')">تعديل</button>
            <button class="delete-btn" onclick="deleteProperty('${id}')">حذف</button>
        </div>
    `;
    
    return card;
}

async function loadProjects() {
    const container = document.getElementById('projects-list');
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد مشاريع</p>';
            return;
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const project = doc.data();
            const card = createProjectCard(project, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="loading">حدث خطأ في التحميل</p>';
    }
}

function createProjectCard(project, id) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    card.innerHTML = `
        <img src="${project.imageUrl || 'https://via.placeholder.com/150x100'}" alt="${project.title}" class="item-image">
        <div class="item-info">
            <h3>${project.title}</h3>
            <p>${project.description?.substring(0, 100)}...</p>
            <p><strong>الحالة:</strong> ${project.status || 'قيد التنفيذ'}</p>
            <p><strong>مميز:</strong> ${project.featured ? 'نعم' : 'لا'}</p>
        </div>
        <div class="item-actions">
            <button class="edit-btn" onclick="editProject('${id}')">تعديل</button>
            <button class="delete-btn" onclick="deleteProject('${id}')">حذف</button>
        </div>
    `;
    
    return card;
}

async function loadBlog() {
    const container = document.getElementById('blog-list');
    try {
        const querySnapshot = await getDocs(collection(db, 'blog'));
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد مقالات</p>';
            return;
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const article = doc.data();
            const card = createBlogCard(article, doc.id);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="loading">حدث خطأ في التحميل</p>';
    }
}

function createBlogCard(article, id) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    card.innerHTML = `
        <img src="${article.imageUrl || 'https://via.placeholder.com/150x100'}" alt="${article.title}" class="item-image">
        <div class="item-info">
            <h3>${article.title}</h3>
            <p>${article.content?.substring(0, 100)}...</p>
        </div>
        <div class="item-actions">
            <button class="edit-btn" onclick="editArticle('${id}')">تعديل</button>
            <button class="delete-btn" onclick="deleteArticle('${id}')">حذف</button>
        </div>
    `;
    
    return card;
}

async function loadContacts() {
    const container = document.getElementById('contacts-list');
    try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p class="loading">لا توجد رسائل</p>';
            return;
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const contact = doc.data();
            const card = createContactCard(contact);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="loading">حدث خطأ في التحميل</p>';
    }
}

function createContactCard(contact) {
    const card = document.createElement('div');
    card.className = 'contact-card';
    
    const date = contact.createdAt ? new Date(contact.createdAt.seconds * 1000).toLocaleDateString('ar-SA') : '';
    
    card.innerHTML = `
        <h3>${contact.subject}</h3>
        <p><strong>الاسم:</strong> ${contact.name}</p>
        <p><strong>البريد:</strong> ${contact.email}</p>
        <p><strong>الهاتف:</strong> ${contact.phone}</p>
        <p><strong>الرسالة:</strong> ${contact.message}</p>
        <p class="contact-date">تاريخ الإرسال: ${date}</p>
    `;
    
    return card;
}

document.getElementById('add-property-btn').addEventListener('click', () => showPropertyForm());
document.getElementById('add-project-btn').addEventListener('click', () => showProjectForm());
document.getElementById('add-article-btn').addEventListener('click', () => showArticleForm());

function showPropertyForm(propertyData = null, propertyId = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <form class="modal-form" id="property-form">
            <h2>${propertyData ? 'تعديل العقار' : 'إضافة عقار جديد'}</h2>
            <div class="form-group">
                <label>العنوان</label>
                <input type="text" id="property-title" value="${propertyData?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>الوصف</label>
                <textarea id="property-description" required>${propertyData?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>السعر</label>
                <input type="text" id="property-price" value="${propertyData?.price || ''}" required>
            </div>
            <div class="form-group">
                <label>النوع</label>
                <select id="property-type" required>
                    <option value="شقة" ${propertyData?.type === 'شقة' ? 'selected' : ''}>شقة</option>
                    <option value="فيلا" ${propertyData?.type === 'فيلا' ? 'selected' : ''}>فيلا</option>
                    <option value="أرض" ${propertyData?.type === 'أرض' ? 'selected' : ''}>أرض</option>
                    <option value="محل تجاري" ${propertyData?.type === 'محل تجاري' ? 'selected' : ''}>محل تجاري</option>
                    <option value="مكتب" ${propertyData?.type === 'مكتب' ? 'selected' : ''}>مكتب</option>
                </select>
            </div>
            <div class="form-group">
                <label>المساحة (م²)</label>
                <input type="text" id="property-area" value="${propertyData?.area || ''}">
            </div>
            <div class="form-group">
                <label>عدد الغرف</label>
                <input type="number" id="property-rooms" value="${propertyData?.rooms || ''}">
            </div>
            <div class="form-group">
                <label>عدد الحمامات</label>
                <input type="number" id="property-bathrooms" value="${propertyData?.bathrooms || ''}">
            </div>
            <div class="form-group">
                <label>الموقع</label>
                <input type="text" id="property-location" value="${propertyData?.location || ''}">
            </div>
            <div class="form-group">
                <label>رابط الصورة</label>
                <input type="url" id="property-image" value="${propertyData?.imageUrl || ''}" placeholder="https://example.com/image.jpg">
            </div>
            <div class="form-group checkbox-group">
                <input type="checkbox" id="property-featured" ${propertyData?.featured ? 'checked' : ''}>
                <label for="property-featured">عقار مميز</label>
            </div>
            <div class="modal-actions">
                <button type="submit" class="save-btn">حفظ</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">إلغاء</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('property-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const propertyObj = {
            title: document.getElementById('property-title').value,
            description: document.getElementById('property-description').value,
            price: document.getElementById('property-price').value,
            type: document.getElementById('property-type').value,
            area: document.getElementById('property-area').value,
            rooms: document.getElementById('property-rooms').value,
            bathrooms: document.getElementById('property-bathrooms').value,
            location: document.getElementById('property-location').value,
            imageUrl: document.getElementById('property-image').value,
            featured: document.getElementById('property-featured').checked
        };
        
        try {
            if (propertyId) {
                await updateDoc(doc(db, 'properties', propertyId), propertyObj);
            } else {
                propertyObj.createdAt = serverTimestamp();
                await addDoc(collection(db, 'properties'), propertyObj);
            }
            closeModal();
            loadProperties();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحفظ');
        }
    });
}

function showProjectForm(projectData = null, projectId = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <form class="modal-form" id="project-form">
            <h2>${projectData ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</h2>
            <div class="form-group">
                <label>اسم المشروع</label>
                <input type="text" id="project-title" value="${projectData?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>الوصف</label>
                <textarea id="project-description" required>${projectData?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>الميزانية</label>
                <input type="text" id="project-budget" value="${projectData?.budget || ''}">
            </div>
            <div class="form-group">
                <label>الحالة</label>
                <input type="text" id="project-status" value="${projectData?.status || 'قيد التنفيذ'}">
            </div>
            <div class="form-group">
                <label>الموقع</label>
                <input type="text" id="project-location" value="${projectData?.location || ''}">
            </div>
            <div class="form-group">
                <label>تاريخ البدء</label>
                <input type="text" id="project-start" value="${projectData?.startDate || ''}">
            </div>
            <div class="form-group">
                <label>تاريخ الإنجاز المتوقع</label>
                <input type="text" id="project-completion" value="${projectData?.completionDate || ''}">
            </div>
            <div class="form-group">
                <label>عدد الوحدات</label>
                <input type="number" id="project-units" value="${projectData?.units || ''}">
            </div>
            <div class="form-group">
                <label>المميزات</label>
                <textarea id="project-features">${projectData?.features || ''}</textarea>
            </div>
            <div class="form-group">
                <label>رابط الصورة</label>
                <input type="url" id="project-image" value="${projectData?.imageUrl || ''}" placeholder="https://example.com/image.jpg">
            </div>
            <div class="form-group checkbox-group">
                <input type="checkbox" id="project-featured" ${projectData?.featured ? 'checked' : ''}>
                <label for="project-featured">مشروع مميز</label>
            </div>
            <div class="modal-actions">
                <button type="submit" class="save-btn">حفظ</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">إلغاء</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('project-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const projectObj = {
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            budget: document.getElementById('project-budget').value,
            status: document.getElementById('project-status').value,
            location: document.getElementById('project-location').value,
            startDate: document.getElementById('project-start').value,
            completionDate: document.getElementById('project-completion').value,
            units: document.getElementById('project-units').value,
            features: document.getElementById('project-features').value,
            imageUrl: document.getElementById('project-image').value,
            featured: document.getElementById('project-featured').checked
        };
        
        try {
            if (projectId) {
                await updateDoc(doc(db, 'projects', projectId), projectObj);
            } else {
                projectObj.createdAt = serverTimestamp();
                await addDoc(collection(db, 'projects'), projectObj);
            }
            closeModal();
            loadProjects();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحفظ');
        }
    });
}

function showArticleForm(articleData = null, articleId = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <form class="modal-form" id="article-form">
            <h2>${articleData ? 'تعديل المقالة' : 'إضافة مقالة جديدة'}</h2>
            <div class="form-group">
                <label>العنوان</label>
                <input type="text" id="article-title" value="${articleData?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>المحتوى</label>
                <textarea id="article-content" required>${articleData?.content || ''}</textarea>
            </div>
            <div class="form-group">
                <label>ملخص المقالة</label>
                <textarea id="article-excerpt">${articleData?.excerpt || ''}</textarea>
            </div>
            <div class="form-group">
                <label>الكاتب</label>
                <input type="text" id="article-author" value="${articleData?.author || ''}">
            </div>
            <div class="form-group">
                <label>رابط الصورة</label>
                <input type="url" id="article-image" value="${articleData?.imageUrl || ''}" placeholder="https://example.com/image.jpg">
            </div>
            <div class="modal-actions">
                <button type="submit" class="save-btn">حفظ</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">إلغاء</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('article-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const articleObj = {
            title: document.getElementById('article-title').value,
            content: document.getElementById('article-content').value,
            excerpt: document.getElementById('article-excerpt').value,
            author: document.getElementById('article-author').value,
            imageUrl: document.getElementById('article-image').value
        };
        
        try {
            if (articleId) {
                await updateDoc(doc(db, 'blog', articleId), articleObj);
            } else {
                articleObj.createdAt = serverTimestamp();
                await addDoc(collection(db, 'blog'), articleObj);
            }
            closeModal();
            loadBlog();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحفظ');
        }
    });
}

window.editProperty = async function(id) {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        showPropertyForm(docSnap.data(), id);
    }
};

window.editProject = async function(id) {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        showProjectForm(docSnap.data(), id);
    }
};

window.editArticle = async function(id) {
    const docRef = doc(db, 'blog', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        showArticleForm(docSnap.data(), id);
    }
};

window.deleteProperty = async function(id) {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
        try {
            await deleteDoc(doc(db, 'properties', id));
            loadProperties();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحذف');
        }
    }
};

window.deleteProject = async function(id) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        try {
            await deleteDoc(doc(db, 'projects', id));
            loadProjects();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحذف');
        }
    }
};

window.deleteArticle = async function(id) {
    if (confirm('هل أنت متأكد من حذف هذه المقالة؟')) {
        try {
            await deleteDoc(doc(db, 'blog', id));
            loadBlog();
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الحذف');
        }
    }
};

window.closeModal = function() {
    document.getElementById('modal').classList.remove('active');
};

document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

import { getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

loadProperties();
loadProjects();
loadBlog();
loadContacts();
