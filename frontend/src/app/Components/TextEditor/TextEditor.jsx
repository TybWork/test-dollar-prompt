'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to ensure it is only loaded on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import styles from '@/app/Components/TextEditor/TextEditor.module.css';
import '@/app/globals.css';

const TextEditor = ({ onChangeFunc }) => {
    const [editorHtml, setEditorHtml] = useState('');

    // Update editorHtml state when editor content changes
    const handleChange = (value) => {
        setEditorHtml(value);
        onChangeFunc(value);
        console.log(value); // Log the editor content for debugging
    };

    return (
        <div className={styles.appContainer}>
            {/* Render ReactQuill only on the client side */}
            <ReactQuill
                value={editorHtml}
                onChange={handleChange}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                placeholder='Write Blogpost...'
                theme="snow"
            />
            {/* <div className={styles.output}>
                <h2>Output:</h2>
                <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
            </div> */}
        </div>
    );
};

// Define custom modules for the toolbar
TextEditor.modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'link', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['image', 'clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
};

// Define formats for the editor
TextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'align'
];

export default TextEditor;
