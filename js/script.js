// // Function to fetch data from Google Sheets through backend
// function fetchContent() {
//     fetch('https://aishatukarim.vercel.app/api/server')  // Make a request to backend API
//         .then(response => response.json())
//         .then(data => {
//             const rows = data.data;

//             // Loop through each row and populate the content
//             rows.forEach(row => {
//                 const pageName = row[0];
//                 const content = row[1];
//                 const description = row[2];
//                 const imageURL = row[3];

//                 // Dynamically handle content for each page
//                 if (pageName === 'Home') {
//                     populatePage('homepage', content, description, imageURL);
//                 } else if (pageName === 'About Us') {
//                     populatePage('about', content, description, imageURL);
//                 } else if (pageName === 'Services') {
//                     populatePage('services', content, description, imageURL);
//                 } else if (pageName === 'Contact Us') {
//                     populatePage('contact', content, description, imageURL);
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching Google Sheets data:', error);

//             // Set a default error message for all pages
//             ['homepage', 'about', 'services', 'contact'].forEach(page => {
//                 populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
//             });
//         });
// }

// // Helper function to populate content for a page
// function populatePage(pagePrefix, content, description, imageURL) {
//     const titleElement = document.getElementById(`${pagePrefix}-title`);
//     const descriptionElement = document.getElementById(`${pagePrefix}-description`);
//     const imageElement = document.getElementById(`${pagePrefix}-image`);

//     if (titleElement) {
//         titleElement.innerText = content; // Populate title
//     }

//     if (descriptionElement) {
//         descriptionElement.innerText = description; // Populate description
//     }

//     if (imageElement && pagePrefix === 'about') {
//         if (imageURL) {
//             console.log(`Setting image for ${pagePrefix}: ${imageURL}`);
//             imageElement.src = imageURL; // Populate image from the fetched URL
//             imageElement.onerror = function () {
//                 console.error(`Failed to load image for ${pagePrefix}: ${imageURL}`);
//                 // Set fallback image specific to the about page
//                 imageElement.src = '../assets/pexels-polina-tankilevitch-3872350.jpg'; // Fallback image for about page
//             };
//         } else {
//             console.warn(`Image URL is invalid or missing for ${pagePrefix}. Using static fallback.`);
//             // Set fallback image if no URL is provided for the about page
//             imageElement.src = '../assets/pexels-polina-tankilevitch-3872350.jpg'; // Fallback image for about page
//         }
//     }
// }

// // Fetch the content when the page loads
// document.addEventListener('DOMContentLoaded', fetchContent);


// Function to fetch data from Google Sheets through backend
function fetchContent() {
    fetch('https://aishatukarim.vercel.app/api/server') // Make a request to backend API
        .then(response => response.json())
        .then(data => {
            const rows = data.data;

            // Loop through each row and populate the content
            rows.forEach(row => {
                const pageName = row[0]; // Section name (e.g., Home, About Us, Products)
                const content = row[1]; // Title or content
                const description = row[2]; // Description
                const imageURL = row[3]; // Image URL

                // Handle dynamic sections
                if (pageName === 'Home') {
                    populatePage('homepage', content, description, imageURL);
                } else if (pageName === 'About Us') {
                    populatePage('about', content, description, imageURL);
                } else if (pageName === 'Contact Us') {
                    populatePage('contact', content, description, imageURL);
                } else if (pageName === 'Products') {
                    populateProducts(content, description, imageURL);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for all sections
            ['homepage', 'about', 'contact'].forEach(page => {
                populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
            });
        });
}

// Helper function to populate content for non-product pages
function populatePage(pagePrefix, content, description, imageURL) {
    const titleElement = document.getElementById(`${pagePrefix}-title`);
    const descriptionElement = document.getElementById(`${pagePrefix}-description`);
    const imageElement = document.getElementById(`${pagePrefix}-image`);

    if (titleElement) titleElement.innerText = content; // Populate title
    if (descriptionElement) descriptionElement.innerText = description; // Populate description

    if (imageElement && imageURL) {
        imageElement.src = imageURL; // Populate image from fetched URL
        imageElement.onerror = function () {
            console.error(`Failed to load image for ${pagePrefix}: ${imageURL}`);
            imageElement.src = '../assets/pexels-polina-tankilevitch-3872350.jpg'; // Fallback image for non-product pages
        };
    }
}

// Helper function to populate products dynamically
function populateProducts(title, description, imageURL) {
    const productContainer = document.getElementById('product');

    // Create product card
    const productDiv = document.createElement('div');
    productDiv.className = 'productdiv';

    // Add product image
    const productImage = document.createElement('img');
    productImage.src = imageURL || '../assets/breakfast-cereal-7337357_1280.jpg'; // Use fallback if imageURL is missing
    productImage.alt = title;
    productImage.onerror = function () {
        console.error(`Failed to load product image: ${imageURL}`);
        productImage.src = '../assets/breakfast-cereal-7337357_1280.jpg.jpg'; // Fallback image for products
    };

    // Add product text
    const productText = document.createElement('div');
    productText.className = 'producttext';

    const productTitle = document.createElement('p');
    productTitle.className = 'product-title';
    productTitle.innerText = title || 'Untitled Product';

    const productDescription = document.createElement('p');
    productDescription.className = 'product-description';
    productDescription.innerText = description || 'Description unavailable.';

    // Append elements to product text
    productText.appendChild(productTitle);
    productText.appendChild(productDescription);

    // Append image and text to product card
    productDiv.appendChild(productImage);
    productDiv.appendChild(productText);

    // Add product card to container
    productContainer.appendChild(productDiv);
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);
