import { db } from './firebase-config.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadAllBlog() {
    try {
        const blogRef = collection(db, 'blog');
        const q = query(blogRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const container = document.getElementById('blog-grid');
        
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
        document.getElementById('blog-grid').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المقالات</p>';
    }
}

function createBlogCard(article, id) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.onclick = () => window.location.href = `blog-details.html?id=${id}`;
    
    const date = article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString('ar-SA') : '';
    
    card.innerHTML = `
        <img src="${article.imageUrl || 'https://via.placeholder.com/400x300?text=مقالة'}" alt="${article.title}" class="card-image">
        <div class="card-content">
            <h3>${article.title}</h3>
            <p>${article.excerpt || article.content?.substring(0, 150) + '...' || ''}</p>
            <div class="card-meta">
                <span class="blog-date">${date}</span>
            </div>
        </div>
    `;
    
    return card;
}

loadAllBlog();
