'use client'
import React, { useEffect, useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import GradientButton from '../../GradientButton/GradientButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// const TEMPLATE_URL = '/assets/example.docx'; // Path to your DOCX template

const Archieve = ({ userId, promptId, promptType, isUser, promptData }) => {
    const [TEMPLATE_URL, setTEMPLATE_URL] = useState('/assets/example.docx')
    const [documentData, setdocumentData] = useState({})

    useEffect(() => {
        if (promptType === 'dall-e') {
            setTEMPLATE_URL('/assets/dalle.docx')
            setdocumentData({
                title: promptData.title,
                description: promptData.description,
                type: promptData.promptType,
                version: promptData.version,
                uses: promptData.describePrompt,
                instructions: promptData.promptInstruction,
                price: promptData.price,
                time: new Date().toLocaleString()  // Current time in local format
            })
        } else if (promptType === 'midjourney') {
            setTEMPLATE_URL('/assets/midjourney.docx')
            setdocumentData({
                title: promptData.title,
                description: promptData.description,
                type: promptData.promptType,
                instructions: promptData.promptInstructions,
                price: promptData.price,
                time: new Date().toLocaleString()
            })
        }
        else if (promptType === 'gpt') {
            setTEMPLATE_URL('/assets/gpt.docx')
            setdocumentData({
                title: promptData.title,
                description: promptData.description,
                type: promptData.promptType,
                gptType: promptData.gptType,
                gptPromptType: promptData.gptPromptType,
                instructions: promptData.promptInstructions,
                gptLink: promptData.gptLink,
                price: promptData.price,
                // exmple prompts
                exampleTitle1: promptData.examplePrompts[0].title,
                exampleText1: promptData.examplePrompts[0].text,

                exampleTitle2: promptData.examplePrompts[1].title,
                exampleText2: promptData.examplePrompts[1].text,

                exampleTitle3: promptData.examplePrompts[2].title,
                exampleText3: promptData.examplePrompts[2].text,

                exampleTitle4: promptData.examplePrompts[3].title,
                exampleText4: promptData.examplePrompts[3].text,

                // download time
                time: new Date().toLocaleString()  // Current time in local format
            })
        }
    }, [])

    const router = useRouter()
    const [loading, setLoading] = useState(false);

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
        doc.setData(documentData);

        try {
            doc.render();
        } catch (error) {
            console.error('Error rendering template:', error);
            throw error;
        }

        const docContent = doc.getZip().generate({ type: 'blob' });
        zip.file(`${promptData.title.slice(0, 30)}_Details.docx`, docContent);
    };

    const downloadZip = async () => {
        setLoading(true);

        if (isUser) {
            try {
                const zip = new JSZip();

                // Generate DOCX file and add to ZIP
                await generateDocument(zip);

                // Create a folder for images in the ZIP
                const imageFolder = zip.folder(`${promptData.title.slice(0, 30)}_Images`);

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
                saveAs(content, `${promptData.title.slice(0, 30)}.zip`);

                //generate log
                await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-user-logs?userId=${userId}&promptId=${promptId}&promptType=${promptType}&isSelling=false`)

            } catch (error) {
                console.error('Error generating ZIP:', error);
            } finally {
                setLoading(false);
            }
        } else {
            localStorage.setItem('redirectTo', `/prompts/${promptId}/${promptType}`)
            router.push('/login')
        }
    };

    return (
        <GradientButton
            width={'100%'}
            height={'100%'}
            title={isUser ? loading ? 'Downloading... ' : 'Get Prompt ' : 'Get Prompt'}
            onClick={downloadZip}
            disabled={loading}
        />
    );
};


export default Archieve;
