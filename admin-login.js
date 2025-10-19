document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');
    
    if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        messageDiv.style.color = 'red';
        messageDiv.style.background = '#ffebee';
        messageDiv.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
    }
});
