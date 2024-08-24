import styles from '@/app/Components/(liteComponents)/DashboardButton/DashboardButton.module.css'
const DashboardButton = ({ icon, text, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <span className={styles.icon}>{icon}</span>
            <span>{text}</span>
        </button>
    )
}

export default DashboardButton