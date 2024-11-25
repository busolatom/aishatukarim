const API_KEY = process.env.GOOGLE_API_KEY; 
const SPREADSHEET_ID = process.env.SHEET_ID; 
const range = 'Sheet1!A2:D5'; // Update the range based on your sheet

// Function to fetch data from Google Sheets
function fetchContent() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            // Loop through each row and populate the content
            rows.forEach(row => {
                const pageName = row[0];
                const content = row[1];
                const description = row[2];
                const imageURL = row[3]; // Assuming image URL is in column C for homepage

                if (pageName === 'Home') {
                    document.getElementById('homepage-title').innerText = content;
                    document.getElementById('homepage-description').innerText = row[2]; // Description
                    document.getElementById('homepage-image').src = row[3]; // Image URL
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
