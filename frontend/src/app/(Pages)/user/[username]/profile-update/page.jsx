'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/app/(Pages)/user/[username]/profile-update/profile-update.module.css';
import TextArea from '@/app/Components/(liteComponents)/TextAreaComponent/TextArea';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import NewImageUploader from '@/app/Components/(updatedDesignComp)/NewImageUploader/NewImageUploader';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
const Page = () => {

    const [user, setUser] = useState({});
    const [userRole, setuserRole] = useState('')
    const [profileHandle, setProfileHandle] = useState('')
    const [userId, setuserId] = useState('')

    useEffect(() => {
        const myToken = getTokenFunction().cookie
        if (!myToken) {
            return;
        }
        try {
            const decodeMyToken = jwtDecode(myToken)
            setuserRole(decodeMyToken.userRole)
            setuserId(decodeMyToken.userId)
            setProfileHandle(decodeMyToken.profileHandle)
        } catch (error) {
            console.log(`Failed to fetch token ${error}`)
        }

    }, [])

    const getValue = (val) => {
        const { name, value, type, files } = val.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'file' ? files : value

        }));
    };

    const refreshCookie = async (userId, userRole) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/refreshcookie`, {
                userId,
                userRole,
            }, {
                withCredentials: true
            });
            return response.data.newToken; // Return the new token
        } catch (error) {
            console.error('Failed to refresh cookie', error);
            throw error; // Throw error to be handled in caller
        }
    };

    // Handle becoming a seller
    const updateProfile = async () => {
        try {
            const newToken = await refreshCookie(userId, userRole); // Await the token refresh
            document.cookie = `token=${newToken}; path=/; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`; // Update cookie
        } catch (error) {
            console.error('Failed to Refresh token', error);
        }
    };

    // ............Handle form submission..............
    const onSubmitFunc = async () => {
        try {

            const formData = new FormData();
            for (const key in user) {
                if (user[key] instanceof FileList) {
                    Array.from(user[key]).forEach(file => formData.append(key, file));
                } else {
                    formData.append(key, user[key]);
                }
            }

            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/profile-update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': getTokenFunction().token
                },
                withCredentials: true
            });

            await updateProfile();
            window.location.href = `/user/${profileHandle}/buyer-dashboard/buyer`

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>

            <div>
                {/* <FieldInfo title="Profile Handle" /> */}
                <h3 className={styles.heading}>
                    Profile Handle
                </h3>
                <InputField
                    name="profileHandle"
                    onchangeFunc={getValue}
                    placeholder="@profilehandle"
                />
            </div>

            <div>
                {/* <FieldInfo title="Profile Description" /> */}
                <h3 className={styles.heading}>
                    Profile Bio
                </h3>

                <TextArea
                    name="profileDescription"
                    onChange={getValue}
                    placeholder="Short Profile description..."
                    rows={10}
                    margin="0px"
                />
            </div>

            <div>
                <NewImageUploader
                    onChangeFunc={getValue} labelFor="profileImage"
                    title={'Upload profile image'} imgDimensions={"400 x 400 or 200 x 200"}
                    mainImgWidth={'100px'}
                    mainImgHeight={'100px'}
                />
            </div>
            <div>

                <NewImageUploader
                    onChangeFunc={getValue} labelFor="profileBanner"
                    title={'Upload profile banner'} imgDimensions={'1500 x 400 , in app-cropping'}
                    mainImgWidth={'100%'}
                    mainImgHeight={'170px'}
                />
            </div>

            <div className={styles.submitBtn}>
                <GradientButton
                    title="Submit"
                    onClick={onSubmitFunc}
                    background={'var(--homeMainBtn)'}
                />
            </div>
        </div>
    );
};

export default Page;
