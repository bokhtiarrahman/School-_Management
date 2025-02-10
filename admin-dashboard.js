// Check Authentication
function checkAuth() {
    if (localStorage.getItem('adminAuth') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Run auth check on page load
checkAuth();

// Logout Function
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('adminAuth');
    window.location.href = 'login.html';
});

// Navigation Functionality
const navLinks = document.querySelectorAll('.sidebar nav ul li a');
const contentSections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('id') !== 'logout') {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.style.display = 'none');
            
            // Show relevant section
            const sectionId = this.getAttribute('href').substring(1) + '-section';
            document.getElementById(sectionId).style.display = 'block';
        }
    });
});

// Notice Management
const addNoticeBtn = document.getElementById('add-notice-btn');
const noticeModal = document.getElementById('notice-modal');
const closeModal = document.querySelector('.close');
const noticeForm = document.getElementById('noticeForm');
const noticeList = document.querySelector('.notice-list');

// Open Notice Modal
addNoticeBtn.addEventListener('click', () => {
    noticeModal.style.display = 'block';
});

// Close Notice Modal
closeModal.addEventListener('click', () => {
    noticeModal.style.display = 'none';
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
    if (e.target === noticeModal) {
        noticeModal.style.display = 'none';
    }
});

// Handle Notice Form Submission
noticeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = this.querySelector('input[type="text"]').value;
    const content = this.querySelector('textarea').value;
    
    // Create notice element
    const notice = document.createElement('div');
    notice.className = 'notice-item';
    notice.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="notice-actions">
            <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
            <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
        </div>
    `;
    
    // Add notice to list
    noticeList.appendChild(notice);
    
    // Close modal and reset form
    noticeModal.style.display = 'none';
    this.reset();
});

// Image Upload Preview
const imageInput = document.getElementById('imageInput');
const galleryGrid = document.querySelector('.gallery-grid');

imageInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${e.target.result}" alt="Gallery Image">
                <div class="gallery-item-actions">
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        };
        
        reader.readAsDataURL(file);
    });
});

// Results Upload
const resultsUploadForm = document.getElementById('resultsUploadForm');

resultsUploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const examType = document.getElementById('examType').value;
    const className = document.getElementById('className').value;
    const resultsFile = document.getElementById('resultsFile').files[0];
    
    if (examType && className && resultsFile) {
        // Here you would typically upload the file to a server
        alert('Results uploaded successfully!');
        this.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Initialize dashboard with default view
document.querySelector('.sidebar nav ul li:first-child a').click();

// Add animation to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
