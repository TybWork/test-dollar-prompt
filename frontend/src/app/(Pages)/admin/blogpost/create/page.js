'use client';
import styles from '@/app/(Pages)/admin/blogpost/create/blogPostCreate.module.css';
import ImageUploader from '@/app/Components/(liteComponents)/ImageUploader/ImageUploader';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import TextEditor from '@/app/Components/TextEditor/TextEditor';
import { useState } from 'react';

const Page = () => {
    // const [content, setContent] = useState('');
    const [data, setData] = useState({});

    const getValue = (val) => {
        const { name, value, type, files } = val.target;
        setData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files : value
        }));
    };

    const onSubmitFunc = async () => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (data[key] instanceof FileList) {
                    Array.from(data[key]).forEach(file => formData.append(key, file));
                } else {
                    formData.append(key, data[key]);
                }
            }
            formData.append('postContent', content);

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogpost/create`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
                }
            });

            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Create New Post</h1>
            <div className={styles.imageUploader}>
                <ImageUploader
                    containerWidth={'100%'}
                    containerHeight={'200px'}
                    labelFor={'postBanner'}
                    onChangeFunc={getValue}
                />
            </div>
            <InputField
                placeholder={'Post Title...'}
                onchangeFunc={getValue}
                name='postTitle'
            />
            {/* <textarea
                name="postContent"
                onChange={getValue}
                placeholder="Enter content here..."
            ></textarea> */}

            <TextEditor />

            <GradientButton
                title='Publish Post'
                width={'fit-content'}
                onClick={onSubmitFunc}
            />
        </div>
    );
};
export default Page;