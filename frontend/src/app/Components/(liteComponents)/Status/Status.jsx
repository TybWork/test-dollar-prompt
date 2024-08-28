import styles from '@/app/Components/(liteComponents)/Status/Status.module.css'
const Status = ({ isActive, onClick }) => {
    return (
        <div className={`${styles.status} ${isActive ? styles.active : styles.disabled}`} onClick={onClick}>{isActive ? 'Active' : 'Disabled'}</div>
    )
}

export default Status