import styles from '@/app/Components/(liteComponents)/InputField/InputField.module.css'

const InputField = ({ type, name, id, placeholder, onchangeFunc, value }) => {
    return (
        <input className={styles.inputField} type={type || 'text'} name={name} id={id} placeholder={placeholder} onChange={onchangeFunc} value={value} />
    )
}
export default InputField