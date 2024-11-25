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

                if (pageName === 'Home') {
                    document.getElementById('homepage-title').innerText = content;
                    document.getElementById('homepage-description').innerText = description; // Description
                    document.getElementById('homepage-image').src = imageURL;
                } else if (pageName === 'About Us') {
                    document.getElementById('about-content').innerText = content;
                } else if (pageName === 'Services') {
                    document.getElementById('services-content').innerText = content;
                } else if (pageName === 'Contact Us') {
                    document.getElementById('contact-content').innerText = content;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);
            document.getElementById('homepage-title').innerText = 'Sorry, content failed to load.';
            document.getElementById('homepage-description').innerText = 'Sorry, content failed to load.';
            document.getElementById('homepage-image').src = '';
            document.getElementById('about-content').innerText = 'Sorry, content failed to load.';
            document.getElementById('services-content').innerText = 'Sorry, content failed to load.';
            document.getElementById('contact-content').innerText = 'Sorry, content failed to load.';
        });
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);
