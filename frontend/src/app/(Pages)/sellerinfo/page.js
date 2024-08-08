'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '@/app/(Pages)/sellerinfo/sellerinfo.module.css';
import TextArea from '@/app/Components/(liteComponents)/TextAreaComponent/TextArea';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import FieldInfo from '@/app/Components/(liteComponents)/FieldInfo/FieldInfo';
import ImageUploader from '@/app/Components/(liteComponents)/ImageUploader/ImageUploader';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState({});

    // Extract token from cookies
    const getTokenFromCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const getAuthorizationHeader = () => {
        const token = getTokenFromCookie('token')
        return token ? `Bearer ${token}` : ''
    }

    // Handle input and file changes
    const getValue = (val) => {
        const { name, value, type, files } = val.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === "file" ? files : value
        }));
    };

    // Refresh cookie after user becomes a seller
    const refreshCookie = async (userId, userRole) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/refreshcookie`, {
                userId,
                userRole
            }, {
                withCredentials: true
            });
            document.cookie = `token=${response.data.newToken}; path=/; secure; sameSite=None; domain=.test-dollar-prompt.vercel.app`;
            // setSeller({ text: 'Profile', link: `/` });
            console.log('Cookie refreshed successfully', response.data);
        } catch (error) {
            console.error('Failed to refresh cookie', error);
        }
    };

    // Handle becoming a seller
    const becomeSeller = async () => {
        const token = getTokenFromCookie('token');
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            await refreshCookie(userId, 'seller');
            // router.push(`/seller/${userId}`);
        } catch (error) {
            console.error('Failed to decode token or become seller', error);
        }
    };

    // Handle form submission
    const onSubmitFunc = async () => {
        await becomeSeller(); // Ensure this completes before proceeding

        const formData = new FormData();
        for (const key in user) {
            if (user[key] instanceof FileList) {
                Array.from(user[key]).forEach(file => formData.append(key, file));
            } else {
                formData.append(key, user[key]);
            }
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/postdata`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': getAuthorizationHeader()
                },
                withCredentials: true
            });
            console.log('Server response: ', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <FieldInfo title="Upload Profile Image" />
                <ImageUploader
                    onChangeFunc={getValue}
                    labelFor="profileImage"
                    containerWidth="100px"
                    containerHeight="100px"
                    iconWidth="50px"
                    iconHeight="50px"
                />
            </div>
            <div>
                <FieldInfo title="Upload Banner Image" />
                <ImageUploader
                    onChangeFunc={getValue}
                    labelFor="profileBanner"
                    containerWidth="100%"
                    containerHeight="150px"
                    iconWidth="70px"
                    iconHeight="70px"
                />
            </div>
            <div>
                <FieldInfo title="Profile Handle" />
                <InputField
                    name="profileHandle"
                    onchangeFunc={getValue}
                    placeholder="@profilehandle"
                />
            </div>
            <div>
                <FieldInfo title="Profile Description" />
                <TextArea
                    name="profileDescription"
                    onChange={getValue}
                    placeholder="Short Profile description..."
                    rows={10}
                    margin="0px"
                />
            </div>
            <div className={styles.submitBtn}>
                <GradientButton title="Submit" onClick={onSubmitFunc} />
            </div>
        </div>
    );
};

export default Page;
