import styles from '@/app/Components/(liteComponents)/InputImage/InputImage.module.css';
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import FieldInfo from '../FieldInfo/FieldInfo';

const InputImage = ({ onChange }) => {
    const [selectedFiles, setselectedFiles] = useState([]);

    const onInputChange = (e) => {
        const files = Array.from(e.target.files);

        // Update selectedFiles state with new files
        const updatedFiles = [...selectedFiles, ...files];

        // Limit selectedFiles to 7 files
        if (updatedFiles.length > 7) {
            updatedFiles.splice(7); // Keep only the first 7 files
        }

        // Update state with the limited files array
        setselectedFiles(updatedFiles);

        // Pass updatedFiles to parent component onChange
        onChange(updatedFiles);
    };

    const deleteFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);

        // Update state with the filtered files array
        setselectedFiles(updatedFiles);

        // Pass updatedFiles to parent component onChange
        onChange(updatedFiles);
    };

    return (
        <div className={styles.outputImgContainer}>
            {selectedFiles.map((file, index) => (
                <div key={index} className={styles.singleImgContainer}>
                    <FaPlus className={styles.cancel} onClick={() => deleteFile(index)} />
                    <img src={URL.createObjectURL(file)} alt="" />
                </div>
            ))}
            <input
                onChange={onInputChange}
                className={styles.imageInput}
                type="file"
                name="myfiles"
                accept="image/jpeg,image/png,video/*"
                multiple
                required
                disabled={selectedFiles.length > 6}
            />
        </div>
    );
};

export default InputImage;
