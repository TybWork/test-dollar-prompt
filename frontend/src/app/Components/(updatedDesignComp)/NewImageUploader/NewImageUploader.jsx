import React, { useState } from 'react';
import styles from '@/app/Components/(updatedDesignComp)/NewImageUploader/NewImageUploader.module.css';
import UploadIcon from '../../(icons)/UploadIcon';
import { GoImage } from "react-icons/go";
import { RxDimensions } from "react-icons/rx";
import IconWithTitleDesc from '../(snipets)/IconWithTitleDesc/IconWithTitleDesc';



const NewImageUploader = ({ title, width, height, radius, onChangeFunc, labelFor, imgDimensions, mainImgWidth, mainImgHeight }) => {
    const [fileList, setFileList] = useState([]);

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const highlight = (e) => {
        e.currentTarget.classList.add(styles.highlight);
    };

    const unhighlight = (e) => {
        e.currentTarget.classList.remove(styles.highlight);
    };

    const handleDrop = (e) => {
        preventDefaults(e);
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
        e.currentTarget.classList.remove(styles.highlight);
    };

    const handleFiles = (files) => {
        setFileList([...files]);
    };

    const handleInputChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
        onChangeFunc(e)
    };

    const renderImages = () => {
        return [...fileList].map((file, index) => {
            const src = URL.createObjectURL(file); // Create URL for each file
            return (
                <img
                    key={index}
                    src={src}
                    alt={`Uploaded ${index}`}
                    className={styles.image}
                    style={{
                        width: mainImgWidth,
                        height: mainImgHeight
                    }}
                />
            );
        });
    };

    return (
        <div className={styles.parentContainer}>
            <h2 className={styles.h2}>
                {title || 'Upload Image'}
            </h2>

            {/* image info */}
            <div className={styles.imageInfo}>
                <IconWithTitleDesc IconName={GoImage} title={'Image'} description={'JPG, PNG, WEBP'} IconClass={styles.iconSpan} />
                <IconWithTitleDesc IconName={RxDimensions} title={'Dimension'} description={imgDimensions || '500 x 500'} IconClass={styles.iconSpan} />
            </div>

            {/* drop area */}
            <div
                className={styles.dropArea}
                onDragEnter={highlight}
                onDragOver={(e) => { preventDefaults(e); highlight(e); }} // Prevent default on drag over
                onDragLeave={unhighlight}
                onDrop={handleDrop}
                onClick={() => document.getElementById(labelFor).click()} // Trigger file selection

                style={{
                    width: width || '100%',
                    height: height || '100%',
                    borderRadius: radius || '4px'
                }}
            >
                <UploadIcon className={styles.uploadIcon} />
                <h3 className={styles.h3}>Drag & drop to upload</h3>
                <input
                    type="file"
                    id={labelFor}
                    name={labelFor}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                />
                <label htmlFor={labelFor} className={styles.button}>or browse</label>
            </div>
            <div className={styles.gallery}>
                {renderImages()} {/* Render images using the renderImages function */}
            </div>
        </div>
    );
};

export default NewImageUploader;
