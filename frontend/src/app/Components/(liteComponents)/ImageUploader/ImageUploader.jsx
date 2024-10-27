import styles from '@/app/Components/(liteComponents)/ImageUploader/ImageUploader.module.css'
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadIcon from '../../(icons)/UploadIcon';
import NewImageUploader from '../../(updatedDesignComp)/NewImageUploader/NewImageUploader';
const ImageUploader = ({ containerWidth, containerHeight, iconWidth, iconHeight, labelFor, onChangeFunc }) => {
    const [link, setlink] = useState('/assets/imageAssets/placeholder-banner.png');
    function bannerChange(e) {
        const file = e.target.files[0]
        setlink(URL.createObjectURL(file))
        onChangeFunc(e);
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.bannerContainer} style={{ width: containerWidth, height: containerHeight }}>
                <img src={link} alt="" />
                <label className={styles.uploadImage} htmlFor={labelFor}><AiFillPlusCircle className={styles.uploadIcon} style={{ width: iconWidth, height: iconHeight }} /></label>
                <input onChange={bannerChange} type="file" className={styles.bannerInput} name={labelFor} id={labelFor} />
            </div>
        </div>
    )
}

export default ImageUploader