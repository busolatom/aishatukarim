import 'dotenv/config';
import { google } from 'googleapis';

// This is a Vercel Serverless function handler
export default async function handler(req, res) {
    const apiKey = process.env.GOOGLE_API_KEY;  // Get Google API key from environment variables
    const sheetId = process.env.SHEET_ID;  // Get Sheet ID from environment variables
    const range = req.query.range || 'Sheet1!A2:D8';  // Default range if not specified

    try {
        const sheets = google.sheets({ version: 'v4', auth: apiKey });  // Initialize Google Sheets API client
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });

        res.status(200).json({ data: response.data.values });  // Return fetched data
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });  // Error handling
    }
}

