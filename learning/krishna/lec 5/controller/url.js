const shortid = require('shortid'); // Corrected import
const URL = require('../models/model');

async function handleGenerateShortUrl(req, res) {
    let body = req.body;
    if (!body.URL) return res.status(400).json({ error: "Url is required" });

    let shortIdg = shortid.generate(); // Generate a unique short ID
    console.log(shortIdg);
    
    try {
        const newUrl = await URL.create({
            shortID: shortIdg, // Use the generated shortId
            redirectURL: body.URL,
            visitHistory: []
        });

        return res.json({ id: newUrl.shortID });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: "Error creating short URL" });
    }
}


async function handleGetAnalytics(req, res) {
    const shortId=req.params.shortId; // Change this to shortId
    const result = await URL.findOne({shortId}); // Use shortId in the query
    console.log(shortId);
    // Check if the result exists
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    // Return the total clicks and analytics
    return res.json({
        totalClick: result.visitHistory.length, // Count of visits
        analytics: result.visitHistory // The visit history data
    });
    
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
};