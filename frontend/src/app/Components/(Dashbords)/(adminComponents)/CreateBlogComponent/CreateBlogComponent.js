'use client';
import styles from '@/app/Components/(Dashbords)/(adminComponents)/CreateBlogComponent/CreateBlogComponent.module.css';
import ImageUploader from '@/app/Components/(liteComponents)/ImageUploader/ImageUploader';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import NewImageUploader from '@/app/Components/(updatedDesignComp)/NewImageUploader/NewImageUploader';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import JoditEditorComp from '@/app/Components/JoditEditor/JoditEditor';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const CreateBlogComponent = () => {
    const [data, setData] = useState({});

    const getValue = (val) => {
        const { name, value, type, files } = val.target || {};
        setData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files : value
        }));
    };

    // Handle the content from TextEditor separately
    const handleEditorChange = (content) => {
        setData((prevData) => ({
            ...prevData,
            content: content
        }));
    };

    const onSubmitFunc = async () => {
        // try {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] instanceof FileList) {
                Array.from(data[key]).forEach(file => formData.append(key, file));
            } else {
                formData.append(key, data[key]);
            }
        }

        toast.promise(
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/create`, formData, {
                headers: {
                    'Authorization': getTokenFunction().token,
                    'Content-Type': 'multipart/form-data'
                }
            }),
            {
                pending: 'Post Sumbitting...',
                success: 'Post Submitted',
                error: 'Failed!!'
            }
        ).catch(error => {
            console.log(`Something went wrong ${error}`)
        })
    };
    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.h1}>Create New Posts</h1>
            <div className={styles.imageUploader}>
                <NewImageUploader
                    height={'200px'}
                    mainImgHeight={'200px'}
                    mainImgWidth={'100%'}
                    labelFor={'banner'}
                    onChangeFunc={getValue}
                />
            </div>
            <InputField
                placeholder={'Post Title...'}
                onchangeFunc={getValue}
                name='title'
            />
            <InputField
                placeholder={'Short Description...'}
                onchangeFunc={getValue}
                name='description'
            />

            {/* <TextEditor onChangeFunc={handleEditorChange} /> */}
            <JoditEditorComp onChange={handleEditorChange} />

            <GradientButton
                title='Publish Post'
                width={'fit-content'}
                onClick={onSubmitFunc}
            />

            {/* tags */}

        </div>
    );
};
export default CreateBlogComponent;