'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill wrapper
import 'quill/dist/quill.snow.css'; // Import Quill's default CSS
import 'react-quill/dist/quill.snow.css';

import styles from '@/app/Components/TextEditor/TextEditor.module.css'; // Import CSS Module
import '@/app/globals.css'; // Import CSS Module


const TextEditor = () => {
    const [editorHtml, setEditorHtml] = useState('');

    const handleChange = (value) => {
        setEditorHtml(value);
        console.log(value)
    };

    return (
        <div className={styles.appContainer}>
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
