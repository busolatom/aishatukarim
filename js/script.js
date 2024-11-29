// Function to fetch data from Google Sheets through backend
function fetchContent() {
    fetch('https://aishatukarim.vercel.app/api/server')  // Make a request to backend API
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
                if (pageName === 'Home') {
                    populatePage('homepage', content, description, imageURL);
                } else if (pageName === 'About Us') {
                    populatePage('about', content, description, imageURL);
                } else if (pageName === 'Services') {
                    populatePage('services', content, description, imageURL);
                } else if (pageName === 'Contact Us') {
                    populatePage('contact', content, description, imageURL);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for all pages
            ['homepage', 'about', 'services', 'contact'].forEach(page => {
                populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
            });
        });
}

// Helper function to populate content for a page
function populatePage(pagePrefix, content, description, imageURL) {
    const titleElement = document.getElementById(`${pagePrefix}-title`);
    const descriptionElement = document.getElementById(`${pagePrefix}-description`);
    const imageElement = document.getElementById(`${pagePrefix}-image`);

    if (titleElement) {
        titleElement.innerText = content; // Populate title
    }

    if (descriptionElement) {
        descriptionElement.innerText = description; // Populate description
    }

    if (imageElement) {
        if (imageURL) {
            console.log(`Setting image for ${pagePrefix}: ${imageURL}`);
            imageElement.src = imageURL; // Populate image from the fetched URL
            imageElement.onerror = function () {
                console.error(`Failed to load image for ${pagePrefix}: ${imageURL}`);
                // Ensure the fallback image has the correct absolute path
                imageElement.src = '../assets/pexels-polina-tankilevitch-3872350.jpg'; // Adjust the path if needed for your live environment
            };
        } else {
            console.warn(`Image URL is invalid or missing for ${pagePrefix}. Using static fallback.`);
            // Provide a fully qualified or correctly referenced fallback image URL
            imageElement.src = '../assets/pexels-polina-tankilevitch-3872350.jpg';
        }
    }
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);