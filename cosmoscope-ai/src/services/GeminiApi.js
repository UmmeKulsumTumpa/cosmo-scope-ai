const PORT = 8000;
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Initialize Google AI with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/gemini', upload.single('file'), async (req, res) => {
    try {
        const { history, message } = req.body;
        const file = req.file;

        if (!message && !file) {
            return res.status(400).json({ error: 'Message or file is required' });
        }

        const validMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'video/mp4', 'video/x-matroska'];
        if (file && !validMimeTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: 'Invalid file format. Please upload a PDF, PNG, JPEG, MP4, or MKV file.' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

        const formattedHistory = JSON.parse(history).map(item => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.parts }],
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        let promptData = [message];

        if (file) {
            if (file.mimetype === 'application/pdf') {
                const dataBuffer = fs.readFileSync(file.path);
                const pdfData = await pdfParse(dataBuffer);
                promptData.push(pdfData.text);
            } else if (file.mimetype.startsWith('video/')) {
                const framePath = `uploads/frame-${Date.now()}.png`;
                await extractFrame(file.path, framePath);
                const imageData = {
                    inlineData: {
                        data: Buffer.from(fs.readFileSync(framePath)).toString('base64'),
                        mimeType: 'image/png',
                    },
                };
                promptData.push(imageData);
            } else {
                const imageData = {
                    inlineData: {
                        data: Buffer.from(fs.readFileSync(file.path)).toString('base64'),
                        mimeType: file.mimetype,
                    },
                };
                promptData.push(imageData);
            }
        }

        const result = await chat.sendMessage(promptData);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

const extractFrame = (videoPath, framePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .screenshots({
                count: 1,
                folder: 'uploads/',
                filename: framePath.split('/').pop(),
                size: '320x240'
            });
    });
};

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
