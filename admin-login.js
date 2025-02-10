// Admin Login Authentication
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // For demonstration, using hardcoded credentials
    // In production, this should be replaced with proper server-side authentication
    if (username === 'admin' && password === 'admin123') {
        // Store authentication token
        localStorage.setItem('adminAuth', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.marginTop = '1rem';
        errorMessage.style.textAlign = 'center';
    }
});

// Check if user is already logged in
window.addEventListener('load', function() {
    if (localStorage.getItem('adminAuth') === 'true') {
        window.location.href = 'dashboard.html';
    }
});
