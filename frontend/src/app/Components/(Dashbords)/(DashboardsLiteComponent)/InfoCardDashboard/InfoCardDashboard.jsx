import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard.module.css'
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import SalesCardContentComp from '../SalesCardContentComp/SalesCardContentComp';
const InfoCardDashboard = ({ mainTitle, contentComponent, width }) => {
    return (
        <div className={styles.container} style={{ width: width }}>
            <div className={styles.headerWraper}>
                <div className={styles.header}>
                    <div className={styles.iconText}>
                        <PiShoppingBagOpenFill />
                        <span className={styles.headerText}>{mainTitle || 'dummyTitle'}</span>
                    </div>
                    <PiDotsThreeOutlineFill />
                    <div>Calendar</div>
                </div>
            </div>

            {/* content */}
            <div className={styles.content}>
                {contentComponent || <SalesCardContentComp />}
            </div>

        </div>
    )
}

export default InfoCardDashboard