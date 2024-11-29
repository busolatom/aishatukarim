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
                const pagePrefix = pageName.toLowerCase().replace(/\s+/g, ''); // Ensure proper format for IDs
                populatePage(pagePrefix, content, description, imageURL);
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for all pages if data fails to load
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

    // Populate title if the element exists
    if (titleElement) {
        titleElement.innerText = content || 'No content available';
    } else {
        console.warn(`Title element for ${pagePrefix} not found.`);
    }

    // Populate description if the element exists
    if (descriptionElement) {
        descriptionElement.innerText = description || 'No description available';
    } else {
        console.warn(`Description element for ${pagePrefix} not found.`);
    }

    // Handle image if the element exists
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
    } else {
        console.warn(`Image element for ${pagePrefix} not found.`);
    }
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);

