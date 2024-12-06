import React, { useState } from "react";
import styles from '@/app/Components/TextEditor/TextEditor.module.css';
import JoditEditorComp from "../JoditEditor/JoditEditor";

const TextEditor = () => {
    const [data, setData] = useState("");

    return (
        <div className={styles.appContainers}>
            <JoditEditorComp
                value={data}
                onChange={(value) => setData(value)}
            />
        </div>
    );
};

export default TextEditor;
