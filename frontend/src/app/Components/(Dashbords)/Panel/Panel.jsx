'use client'
import styles from '@/app/Components/(Dashbords)/Panel/Panel.module.css'
import Image from 'next/image'
import { RxGear } from "react-icons/rx";
import DashboardButton from '@/app/Components/(liteComponents)/DashboardButton/DashboardButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
const Panel = ({ headerComponent, buttonMaping }) => {
    const router = useRouter()
    const [component, setcomponent] = useState(buttonMaping[0].component)
    const [profileHandle, setprofileHandle] = useState('')
    useEffect(() => {
        const token = getTokenFunction().cookie
        const decode = jwtDecode(token)
        setprofileHandle(decode.profileHandle)
    }, [])
    const buttonClick = (component) => {
        setcomponent(component)
    }
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftSettingsTab}>
                {/* logo image  */}
                <div className={styles.logoContainer}>
                    {/* <Image width={0} height={0} sizes='100vw' src='/assets/imageAssets/dollarprompt-desktop-logo.svg' alt='dollar-prompt' className={styles.siteLogo} /> */}
                    <Image width={0} height={0} sizes='100vw' src='/assets/imageAssets/dummy.jpg' alt='dollar-prompt' className={styles.profileLogo} />
                </div>

                {/* buttons */}
                <div className={styles.btnContainer}>
                    {
                        buttonMaping.map((item) =>
                            <DashboardButton key={item.id} icon={item.icon} text={item.title} onClick={() => buttonClick(item.component)} />
                        )
                    }
                </div>

                {/* border */}
                <hr className={styles.border} />

                {/* setting button */}
                <DashboardButton icon={<RxGear />} text='Settings' onClick={() => router.push(`/user/${profileHandle}/profile-update`)} />

                {/*visual illustration  */}
                <Image width={0} height={0} sizes='100vw' src='/assets/imageAssets/master-dashboard1.svg' alt='super-admin-dashboard' className={styles.illustration} />

            </div>
            <div className={styles.rightDetailTab}>
                {/* <DashboardHeader /> */}
                {headerComponent}
                {component}
            </div>
        </div>
    )
}

export default Panel