import styles from '@/app/Components/(updatedDesignComp)/NewInput/NewInput.module.css'
const NewInput = ({ placeholder, onChange, fieldName }) => {
    return (
        <input onChange={onChange} className={styles.input} placeholder={placeholder || 'input...'} name={fieldName} />
    )
}

export default NewInput