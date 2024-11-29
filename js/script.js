// Function to fetch data from Google Sheets through backend
function fetchContent() {
    fetch('https://aishatukarim.vercel.app/api/server') // Make a request to backend API
        .then(response => response.json())
        .then(data => {
            const rows = data.data;

            // Loop through each row and populate the content
            rows.forEach(row => {
                const pageName = row[0];
                const content = row[1];
                const description = row[2];
                const imageURL = row[3];

                // Dynamically handle content for each page
                populatePage(pageName.toLowerCase().replace(/\s+/g, ''), content, description, imageURL);
            });

            initializeSwiper(); // Initialize swiper after fetching content
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for all pages
            ['homepage', 'about', 'services', 'contact'].forEach(page => {
                populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
            });

            initializeSwiper(); // Initialize swiper even if content fails to load
        });
}

// Helper function to populate content for a page
function populatePage(pagePrefix, content, description, imageURL) {
    const titleElement = document.getElementById(`${pagePrefix}-title`);
    const descriptionElement = document.getElementById(`${pagePrefix}-description`);
    const imageElement = document.getElementById(`${pagePrefix}-image`);

    if (titleElement) titleElement.innerText = content; // Populate title
    if (descriptionElement) descriptionElement.innerText = description; // Populate description
    if (imageElement) {
        if (imageURL) {
            console.log(`Setting image for ${pagePrefix}:`, imageURL);
            imageElement.src = imageURL; // Set the image source
            imageElement.onerror = () => {
                console.error(`Failed to load image for ${pagePrefix}:`, imageURL);
                imageElement.alt = `Image failed to load for ${pagePrefix}`; // Set alt text on error
            };
        } else {
            console.warn(`No valid image URL provided for ${pagePrefix}.`);
            imageElement.alt = `No image available for ${pagePrefix}`; // Handle missing imageURL
        }
    }    
// Swiper function
let slideIndex = 0;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0 || dots.length === 0) return; // Prevent issues if no slides/dots

    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

// Initialize swiper only after dynamic content is ready
function initializeSwiper() {
    slideIndex = 0;
    showSlides();
}

// Fetch the content when the page loads
window.onload = fetchContent; // Load content and initialize swiper
}
