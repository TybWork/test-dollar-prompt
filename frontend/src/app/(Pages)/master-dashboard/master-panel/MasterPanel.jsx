import styles from '@/app/(Pages)/master-dashboard/master-panel/MasterPanel.module.css'
import DashboardHeader from '@/app/Components/DashboardHeader/DashboardHeader'
const MasterPanel = () => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftSettingsTab}></div>
            <div className={styles.rightDetailTab}>
                <DashboardHeader />
            </div>
        </div>
    )
}

export default MasterPanel