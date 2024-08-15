'use client'
import React, { useEffect, useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
// import styles from '@/app '

const TEMPLATE_URL = '/assets/example.docx'; // Path to your DOCX template

const GenerateAndDownloadZip = () => {
    const [loading, setLoading] = useState(false);
    const [promptData, setPromptData] = useState({});

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dalle/filter?_id=667ecccb05de29ad3943b5d2`);
                setPromptData(response.data[0]);
            } catch (error) {
                console.error('Error fetching prompt data:', error);
            }
        })();
    }, []);

    const fetchTemplate = async () => {
        const response = await fetch(TEMPLATE_URL);
        if (!response.ok) throw new Error('Failed to fetch template');
        return response.arrayBuffer();
    };

    const generateDocument = async (zip) => {
        const templateData = await fetchTemplate();
        const docZip = new PizZip(templateData);
        const doc = new Docxtemplater(docZip);

        // Set the template variables
        doc.setData({
            title: promptData.title,
            description: promptData.description,
            type: promptData.promptType,
            version: promptData.version,
            uses: promptData.describePrompt,
            instructions: promptData.promptInstruction,
            price: promptData.price,
            time: new Date().toLocaleString()  // Current time in local format
        });

        try {
            doc.render();
        } catch (error) {
            console.error('Error rendering template:', error);
            throw error;
        }

        const docContent = doc.getZip().generate({ type: 'blob' });
        zip.file('document.docx', docContent);
    };

    const downloadZip = async () => {
        setLoading(true);

        try {
            const zip = new JSZip();

            // Generate DOCX file and add to ZIP
            await generateDocument(zip);

            // Create a folder for images in the ZIP
            const imageFolder = zip.folder('images');

            // Add other files (e.g., images) to the ZIP
            const imageUrls = promptData.Image_Url || [];

            for (const url of imageUrls) {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch image');
                const blob = await response.blob();
                imageFolder.file(url.split('/').pop(), blob);  // Add image to the 'images' folder
            }

            // Generate ZIP file
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'files.zip');

        } catch (error) {
            console.error('Error generating ZIP:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={downloadZip} disabled={loading}>
            {loading ? 'Generating...' : 'Download ZIP'}
        </button>
    );
};

export default GenerateAndDownloadZip;
