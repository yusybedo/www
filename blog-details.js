import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function loadArticleDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        document.getElementById('article-details').innerHTML = 
            '<p class="loading">معرف المقالة غير موجود</p>';
        return;
    }
    
    try {
        const articleDoc = await getDoc(doc(db, 'blog', articleId));
        
        if (!articleDoc.exists()) {
            document.getElementById('article-details').innerHTML = 
                '<p class="loading">المقالة غير موجودة</p>';
            return;
        }
        
        const article = articleDoc.data();
        displayArticleDetails(article);
        
        document.title = `${article.title} - موقع العقارات`;
    } catch (error) {
        console.error('Error loading article:', error);
        document.getElementById('article-details').innerHTML = 
            '<p class="loading">حدث خطأ في تحميل المقالة</p>';
    }
}

function displayArticleDetails(article) {
    const date = article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString('ar-SA') : '';
    
    const detailsHTML = `
        <article class="article-full">
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span class="article-date">نشر في: ${date}</span>
                ${article.author ? `<span class="article-author">الكاتب: ${article.author}</span>` : ''}
            </div>
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="article-image">` : ''}
            <div class="article-content">
                ${article.content ? article.content.replace(/\n/g, '<br>') : ''}
            </div>
            <div class="article-footer">
                <a href="blog.html" class="back-btn">العودة للمدونة</a>
            </div>
        </article>
    `;
    
    document.getElementById('article-details').innerHTML = detailsHTML;
}

loadArticleDetails();
