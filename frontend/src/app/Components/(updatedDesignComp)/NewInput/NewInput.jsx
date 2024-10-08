import styles from '@/app/Components/(updatedDesignComp)/NewInput/NewInput.module.css'
const NewInput = ({ placeholder, onChange }) => {
    return (
        <input onChange={onChange} className={styles.input} placeholder={placeholder || 'input...'} />
    )
}

export default NewInput