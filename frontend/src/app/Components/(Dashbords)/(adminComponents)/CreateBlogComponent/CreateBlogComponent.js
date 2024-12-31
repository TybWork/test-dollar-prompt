'use client';
import styles from '@/app/Components/(Dashbords)/(adminComponents)/CreateBlogComponent/CreateBlogComponent.module.css';
import ImageUploader from '@/app/Components/(liteComponents)/ImageUploader/ImageUploader';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn';
import NewImageUploader from '@/app/Components/(updatedDesignComp)/NewImageUploader/NewImageUploader';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import JoditEditorComp from '@/app/Components/JoditEditor/JoditEditor';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { TiArrowBack } from "react-icons/ti";

const CreateBlogComponent = ({ BackBtnFunc, postId = null }) => {
    const [data, setData] = useState({
        title: '',
        description: '',
        content: '',
        banner: null,
    });

    // State for controlled inputs
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [isBackBtnActive, setIsBackBtnActive] = useState(false)

    // Fetch blog data for update if postId is provided
    useEffect(() => {
        if (postId) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get-single-post/${postId}`, {
                headers: {
                    'Authorization': getTokenFunction().token
                }
            })
                .then(response => {
                    const blogData = response.data;
                    setData(blogData);
                    setTitleValue(blogData.title || '');
                    setDescriptionValue(blogData.description || '');
                })
                .catch(error => {
                    console.error("Failed to fetch blog data for update", error);
                });
        }
    }, [postId]);

    // Handle field value changes
    const getValue = (val) => {
        const { name, value, type, files } = val.target || {};
        setData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files : value
        }));

        // Update controlled inputs (title and description) separately
        if (name === 'title') {
            setTitleValue(value);
        } else if (name === 'description') {
            setDescriptionValue(value);
        }
    };

    // Handle the content from TextEditor separately
    const handleEditorChange = (content) => {
        setData((prevData) => ({
            ...prevData,
            content: content
        }));
    };

    // Submit the form (create or update)
    const onSubmitFunc = async () => {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] instanceof FileList) {
                Array.from(data[key]).forEach(file => formData.append(key, file));
            } else {
                formData.append(key, data[key]);
            }
        }

        toast.promise(
            axios({
                method: postId ? 'put' : 'post', // Use PUT for update, POST for create
                url: postId
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/update/${postId}` // Update route
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/create`, // Create route
                data: formData,
                headers: {
                    'Authorization': getTokenFunction().token,
                    'Content-Type': 'multipart/form-data'
                }
            }),
            {
                pending: 'Submitting Post...',
                success: postId ? 'Post Updated Successfully' : 'Post Created Successfully',
                error: 'Submission Failed'
            }
        ).catch(error => {
            console.error("Something went wrong during the submission:", error);
        });
    };

    return (
        <>
            <ToastContainer />

            <div className={styles.parentContainer}>
                <div
                    onClick={BackBtnFunc}
                    onMouseOver={() => setIsBackBtnActive(true)}
                    onMouseLeave={() => setIsBackBtnActive(false)}
                    className={styles.backBtnContainer}
                    style={{
                        width: isBackBtnActive ? '150px' : '40px'
                    }}
                >
                    <TiArrowBack
                        className={styles.backBtn}
                    />
                    <span
                        style={{
                            transform: `scale(${isBackBtnActive ? '1' : '0'})`,
                            transition: '.3s'
                        }}
                    >
                        {isBackBtnActive ? 'Go Back' : ''}
                    </span>

                </div>
                <div className={styles.container}>
                    <h1 className={styles.h1}>{postId ? 'Update Post' : 'Create New Post'}</h1>

                    {/* Image uploader component */}
                    <div className={styles.imageUploader}>
                        <NewImageUploader
                            height={'200px'}
                            mainImgHeight={'200px'}
                            mainImgWidth={'100%'}
                            labelFor={'banner'}
                            onChangeFunc={getValue}
                            value={data.banner}
                        />
                    </div>

                    {/* Title input */}
                    <InputField
                        placeholder={'Post Title...'}
                        onchangeFunc={getValue}
                        name='title'
                        value={titleValue}  // Controlled value for title
                    />

                    {/* Description input */}
                    <InputField
                        placeholder={'Short Description...'}
                        onchangeFunc={getValue}
                        name='description'
                        value={descriptionValue}  // Controlled value for description
                    />

                    {/* Jodit TextEditor for blog content */}
                    <JoditEditorComp
                        onChange={handleEditorChange}
                        value={data.content || ''}  // Pre-fill content if updating
                    />

                    {/* Submit button */}
                    <GradientButton
                        title={postId ? 'Update Post' : 'Publish Post'}
                        width={'fit-content'}
                        onClick={onSubmitFunc}
                    />
                </div>
            </div>
        </>
    );
};

export default CreateBlogComponent;
