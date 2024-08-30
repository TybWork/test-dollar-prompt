import styles from '@/app/Components/(Dashbords)/Analytics/Analytics.module.css'
import InfoCardDashboard from '../(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard'
import Calender from '../../Calender/Calender'
const Analytics = () => {
    return (
        <div className={styles.parentContainer}>
            <InfoCardDashboard width={'max-content'} />
            <Calender />
        </div>
    )
}

export default Analytics