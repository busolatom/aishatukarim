// // Function to fetch data from Google Sheets through backend
function fetchContent() {
    fetch('https://aishatukarim.vercel.app/api/server') // Make a request to backend API
        .then(response => response.json())
        .then(data => {
            const rows = data.data;

            // Loop through each row and populate the content
            rows.forEach((row, index) => {
                const pageName = row[0];
                const content = row[1];
                const description = row[2];
                const imageURL = row[3];

                if (pageName === 'Home') {
                    populatePage('homepage', content, description, imageURL);
                } else if (pageName === 'About Us') {
                    populatePage('about', content, description, imageURL);
                } else if (pageName === 'Contact Us') {
                    populatePage('contact', content, description, imageURL);
                } else if (pageName.startsWith('Product')) {
                    const productIndex = parseInt(pageName.replace('Product', '')) - 1; // Extract product index
                    populateProductDiv(productIndex, content, description, imageURL);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for pages
            ['homepage', 'about', 'contact'].forEach(page => {
                populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
            });

            // Set fallback for product divs
            for (let i = 0; i < 4; i++) {
                populateProductDiv(i, 'Product Title', 'Product Description', ''); // Set static fallback
            }
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
                imageElement.src = getPageFallbackImage(pagePrefix); // Set specific fallback image for each page
            };
        } else {
            console.warn(`Image URL is missing for ${pagePrefix}. Using fallback image.`);
            imageElement.src = getPageFallbackImage(pagePrefix); // Set specific fallback image for each page
        }
    }
}

// Function to return specific fallback images for each page
function getPageFallbackImage(pagePrefix) {
    const fallbackImages = {
        // homepage: '../assets/pexels-polina-tankilevitch-3872350.jpg', // Fallback for homepage
        about: '../assets/pexels-polina-tankilevitch-3872350.jpg'        // Fallback for about page
        // contact: '../assets/pexels-contact-image.jpg'              // Fallback for contact page
    };

    return fallbackImages[pagePrefix]; // Default fallback if pagePrefix is not found
}

// Function to populate existing product divs
function populateProductDiv(productIndex, title, description, imageURL) {
    const productDiv = document.querySelectorAll('.productdiv')[productIndex];

    if (productDiv) {
        const titleElement = productDiv.querySelector(`#product${productIndex + 1}-title`);
        const descriptionElement = productDiv.querySelector(`#product${productIndex + 1}-description`);
        const imageElement = productDiv.querySelector(`#product${productIndex + 1}-image`);

        if (titleElement) {
            titleElement.innerText = title; // Populate product title
        }

        if (descriptionElement) {
            descriptionElement.innerText = description; // Populate product description
        }

        if (imageElement) {
            if (imageURL) {
                console.log(`Setting image for Product ${productIndex + 1}: ${imageURL}`);
                imageElement.src = imageURL; // Populate image from the fetched URL
                imageElement.onerror = function () {
                    console.error(`Failed to load image for Product ${productIndex + 1}: ${imageURL}`);
                    imageElement.src = getFallbackImage(productIndex); // Static fallback for each product
                };
            } else {
                console.warn(`Image URL is missing for Product ${productIndex + 1}. Using fallback image.`);
                imageElement.src = getFallbackImage(productIndex); // Static fallback for each product
            }
        }
    } else {
        console.error(`Product div for index ${productIndex} not found.`);
    }
}

// Function to return specific fallback images for each product
function getFallbackImage(productIndex) {
    const fallbackImages = [
        '../assets/WhatsApp Image 2024-12-04 at 11.45.15.jpeg', // Fallback for Product 1
        '../assets/WhatsApp Image 2024-12-05 at 06.33.27.jpeg',         // Fallback for Product 2
        '../assets/pexels-polina-tankilevitch-3872350.jpg',          // Fallback for Product 3
        '../assets/breakfast-cereal-7337357_1280.jpg'          // Fallback for Product 4
    ];

    return fallbackImages[productIndex]; // Default fallback if index is out of range
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);

// Swiper js
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  