import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        createdAt: serverTimestamp()
    };
    
    const messageDiv = document.getElementById('form-message');
    
    try {
        await addDoc(collection(db, 'contacts'), formData);
        
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
        
        document.getElementById('contact-form').reset();
        
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 5000);
    } catch (error) {
        console.error('Error sending message:', error);
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.';
    }
});
