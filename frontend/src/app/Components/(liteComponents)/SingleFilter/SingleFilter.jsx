import styles from '@/app/Components/(liteComponents)/SingleFilter/SingleFilter.module.css'
const SingleFilter = ({ label, name, onClick, isDisabled = false, isChecked }) => {
    return (
        <>
            <div className={styles.singleFilterContainer}>
                <div className={styles.line}></div>
                <input defaultChecked={isChecked} className={styles.inputBox} disabled={isDisabled} type='radio' name={name} id={label} onClick={onClick} />
                <label htmlFor={label}>{label}</label>
            </div>
        </>
    )
}

export default SingleFilter