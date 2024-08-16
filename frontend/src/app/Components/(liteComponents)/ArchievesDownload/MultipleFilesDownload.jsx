'use client'
import React, { useEffect, useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from '@/app/Components/(liteComponents)/ArchievesDownload/Archieve.module.css';
import { useSelector } from 'react-redux';
import { IoMdCloudDownload } from "react-icons/io";

const TEMPLATE_URL = '/assets/example.docx'; // Path to your DOCX template

const MultipleFilesDownload = () => {
    const [loading, setLoading] = useState(false);
    const [promptsData, setPromptsData] = useState([]);

    const promptsArray = useSelector((item) => item.cart.cartItems)

    useEffect(() => {
        setPromptsData(promptsArray);
    }, [promptsArray]);

    const fetchTemplate = async () => {
        const response = await fetch(TEMPLATE_URL);
        if (!response.ok) throw new Error('Failed to fetch template');
        return response.arrayBuffer();
    };

    const generateDocument = async (zip, prompt) => {
        const templateData = await fetchTemplate();
        const docZip = new PizZip(templateData);
        const doc = new Docxtemplater(docZip);

        // Set the template variables
        doc.setData({
            title: prompt.title,
            description: prompt.description,
            type: prompt.promptType,
            version: prompt.version,
            uses: prompt.describePrompt,
            instructions: prompt.promptInstruction,
            price: prompt.price,
            time: new Date().toLocaleString()  // Current time in local format
        });

        try {
            doc.render();
        } catch (error) {
            console.error('Error rendering template:', error);
            throw error;
        }

        const docContent = doc.getZip().generate({ type: 'blob' });
        const folderName = `${prompt.title.slice(0, 30)}_Details`; // Folder name based on prompt title
        const docFileName = `${prompt.title.slice(0, 30)}_Details.docx`;

        const promptFolder = zip.folder(folderName);
        promptFolder.file(docFileName, docContent);

        // Create a folder for images inside the prompt folder
        const imageFolder = promptFolder.folder(`${prompt.title.slice(0, 30)}_Images`);

        // Add images to the image folder
        const imageUrls = prompt.Image_Url || [];
        for (const url of imageUrls) {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch image');
            const blob = await response.blob();
            imageFolder.file(url.split('/').pop(), blob); // Add image to the 'images' folder
        }
    };

    const downloadZip = async () => {
        setLoading(true);

        try {
            const zip = new JSZip();

            // Generate DOCX files and add them to ZIP
            await Promise.all(promptsData.map(prompt => generateDocument(zip, prompt)));

            // Generate ZIP file
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'prompts.zip');

        } catch (error) {
            console.error('Error generating ZIP:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={styles.button} onClick={downloadZip} disabled={loading}>
            {loading ? 'Downloading... ' : 'Download Cart Prompts '} <IoMdCloudDownload style={{ fontSize: '24px' }} />
        </button>
    );
};

export default MultipleFilesDownload;
