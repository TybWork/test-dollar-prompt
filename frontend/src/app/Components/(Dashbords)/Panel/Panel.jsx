'use client'
import styles from '@/app/Components/(Dashbords)/Panel/Panel.module.css'
import Image from 'next/image'
import { RxGear } from "react-icons/rx";
import DashboardButton from '@/app/Components/(liteComponents)/DashboardButton/DashboardButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import MultiFuntionBtn from '../../(liteComponents)/MultiFunctionBtn/MultiFuntionBtn';
import TabButton from '../(DashboardsLiteComponent)/TabButton/TabButton';
import { usePathname } from 'next/navigation';
const Panel = ({ headerComponent, buttonMaping }) => {
    const pathname = usePathname();
    const router = useRouter()
    const [component, setcomponent] = useState(buttonMaping[0].component)
    const [profileHandle, setprofileHandle] = useState('')
    const [mobileTabId, setmobileTabId] = useState(0)
    const [userId, setuserId] = useState('')
    const [userRole, setuserRole] = useState('')
    useEffect(() => {
        const token = getTokenFunction().cookie
        const decode = jwtDecode(token)
        setprofileHandle(decode.profileHandle)
        setuserId(decode.userId)
        setuserRole(decode.userRole)

    }, [])
    const buttonClick = (component, id) => {
        setcomponent(component)
        setmobileTabId(id)
    }
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftSettingsTab}>
                {/* logo image  */}
                <div className={styles.sidebarHeaderWrapper}>
                    <h3 className={styles.sidbarHead}>
                        {
                            (() => {
                                if (pathname.includes('/seller')) {
                                    return 'Seller Dashboard'
                                } else if (pathname.includes('/buyer')) {
                                    return 'Buyer Dashboard'
                                } else {
                                    return 'Admin Panel'
                                }
                            })()
                        }
                    </h3>
                    <p className={styles.sidebarProfileHandle}>@{profileHandle}</p>

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

            <div className={styles.mobileTabBtns}>
                {
                    buttonMaping.map((item) =>
                        <TabButton
                            key={item.id} icon={item.icon}
                            text={item.title}
                            onClick={() => buttonClick(item.component, item.id)}
                            isActive={mobileTabId === item.id}
                        />
                    )
                }
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