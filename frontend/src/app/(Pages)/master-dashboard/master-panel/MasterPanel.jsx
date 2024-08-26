import styles from '@/app/(Pages)/master-dashboard/master-panel/MasterPanel.module.css'
import Image from 'next/image'
import { RxGear } from "react-icons/rx";
import DashboardButton from '@/app/Components/(liteComponents)/DashboardButton/DashboardButton';
import { useState } from 'react';
const MasterPanel = ({ headerComponent, buttonMaping }) => {
    const [component, setcomponent] = useState(buttonMaping[0].component)

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
                        buttonMaping.map((item) =>
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
                {/* <DashboardHeader /> */}
                {headerComponent}
                {component}
            </div>
        </div>
    )
}

export default MasterPanel