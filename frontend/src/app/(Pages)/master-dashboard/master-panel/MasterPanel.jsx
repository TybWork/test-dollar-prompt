import styles from '@/app/(Pages)/master-dashboard/master-panel/MasterPanel.module.css'
import DashboardHeader from '@/app/Components/DashboardHeader/DashboardHeader'
import Image from 'next/image'
import { RxGear } from "react-icons/rx";
import DashboardButton from '@/app/Components/(liteComponents)/DashboardButton/DashboardButton';
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { useState } from 'react';
const MasterPanel = ({ header, }) => {
    const [component, setcomponent] = useState('dashboard')
    const buttons = [
        {
            id: 0,
            icon: <RxDashboard />,
            title: 'Dashboard',
            component: 'This Dashboard'
        },
        {
            id: 1,
            icon: <IoChatbubblesOutline />,
            title: 'Conversation',
            component: 'This Conversation'
        },
        {
            id: 2,
            icon: <GrAnalytics />,
            title: 'Analytics',
            component: 'This Analytics'
        },
        {
            id: 3,
            icon: <HiOutlineCreditCard />,
            title: 'Billing',
            component: 'This Billing'
        },
    ]

    const buttonClick = (component) => {
        setcomponent(component)
        console.log(component)
    }
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftSettingsTab}>
                {/* logo image  */}
                <div className={styles.logoContainer}>
                    <Image width={0} height={0} sizes='100vw' src='/assets/imageAssets/dollarprompt-desktop-logo.svg' alt='dollar-prompt' className={styles.siteLogo} />
                </div>

                {/* buttons */}
                <div className={styles.btnContainer}>
                    {
                        buttons.map((item) =>
                            <DashboardButton key={item.id} icon={item.icon} text={item.title} onClick={() => buttonClick(item.component)} />
                        )
                    }
                </div>

                {/* border */}
                <hr className={styles.border} />

                {/* setting button */}
                <DashboardButton icon={<RxGear />} text='Settings' />

                {/*visual illustration  */}
                <Image width={0} height={0} sizes='100vw' src='/assets/imageAssets/master-dashboard1.svg' alt='super-admin-dashboard' className={styles.illustration} />

            </div>
            <div className={styles.rightDetailTab}>
                <DashboardHeader />
                {component}
            </div>
        </div>
    )
}

export default MasterPanel