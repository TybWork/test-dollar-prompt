import styles from '@/app/Components/(Dashbords)/Analytics/Analytics.module.css'
import InfoCardDashboard from '../(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard'
const Analytics = () => {
    return (
        <div className={styles.parentContainer}>
            <InfoCardDashboard width={'max-content'} />
        </div>
    )
}

export default Analytics