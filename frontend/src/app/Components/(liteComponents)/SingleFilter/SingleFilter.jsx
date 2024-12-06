import styles from '@/app/Components/(liteComponents)/SingleFilter/SingleFilter.module.css'
const SingleFilter = ({ label, name, onClick, isDisabled = false }) => {
    return (
        <>
            <div className={styles.singleFilterContainer}>
                <div className={styles.line}></div>
                <input className={styles.inputBox} disabled={isDisabled} type='radio' name={name} id={label} onClick={onClick} />
                <label htmlFor={label}>{label}</label>
            </div>
        </>
    )
}

export default SingleFilter