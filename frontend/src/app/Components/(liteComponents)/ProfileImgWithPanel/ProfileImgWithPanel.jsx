import React, { useState } from 'react'
import styles from '@/app/Components/(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel.module.css'
import Image from 'next/image'
import { BsGear } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import axios from 'axios';
import Link from 'next/link';

const ProfileImgWithPanel = ({ imgUrl, dashboardUrl, profileUpdateUrl }) => {
    const [isPanelVisible, setisPanelVisible] = useState(false)

    const logoutFunc = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {}, {
                withCredentials: true
            });
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`;
            setisPanelVisible(false)

            window.location.href = '/'
        } catch (error) {
            console.error(`Failed to logout ${error}`);
        }
    };

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
                onMouseLeave={() => setisPanelVisible(false)}

            >

                <Link href={profileUpdateUrl || '/'} onClick={() => setisPanelVisible(false)}>
                    <li>
                        Settings
                        <BsGear />
                    </li>
                </Link>
                <Link href={dashboardUrl || '/'} onClick={() => setisPanelVisible(false)}>
                    <li>
                        Dashboard
                        <MdOutlineSpaceDashboard />
                    </li>
                </Link>

                <li>
                    <input className={styles.button} type="button" value="Logout" onClick={logoutFunc} />
                </li>

            </ul>

        </div>
    )
}

export default ProfileImgWithPanel