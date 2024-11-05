import React, { useState } from 'react'
import styles from '@/app/Components/(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel.module.css'
import Image from 'next/image'
import { BsGear } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const ProfileImgWithPanel = ({ imgUrl, dashboardUrl, profileUpdateUrl }) => {
    const router = useRouter();
    const logoutFunc = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {}, {
                withCredentials: true
            });
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`;
            window.location.href = '/'
            // router.push('/')
        } catch (error) {
            console.error(`Failed to logout ${error}`);
        }
    };
    const [isPanelVisible, setisPanelVisible] = useState(false)

    return (
        <div className={styles.container}>
            <Image
                alt='profile-img'
                src={imgUrl || '/assets/imageAssets/dummy.jpg'}
                width={0}
                height={0}
                sizes='100vw'
                className={styles.image}
                onClick={() => setisPanelVisible(prev => !prev)}
            />

            <ul className={styles.optionsPanel}
                style={{
                    display: isPanelVisible ? 'flex' : 'none'
                }}

            >

                <Link href={profileUpdateUrl || '/'}>
                    <li>
                        Settings
                        <BsGear />
                    </li>
                </Link>
                <li onClick={() => { router.push(dashboardUrl) }}>
                    <span>Dashboard</span>
                    <MdOutlineSpaceDashboard />
                </li>

                <li>
                    <input className={styles.button} type="button" value="Logout" onClick={logoutFunc} />
                </li>

            </ul>

        </div>
    )
}

export default ProfileImgWithPanel