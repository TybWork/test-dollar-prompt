import styles from '@/app/Components/(liteComponents)/AdminLoginInput/AdminLoginInput.module.css'
const AdminLoginInput = ({ type, label, placeholder, onChange, icon }) => {
    return (
        <div className={styles.container}>
            <span className={styles.icon}>{icon}</span>
            <input className={styles.input} type={type || 'text'} name={label} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default AdminLoginInput