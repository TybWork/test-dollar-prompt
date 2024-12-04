import styles from '@/app/Components/(liteComponents)/InputField/InputField.module.css'

const InputField = ({ type, name, id, placeholder, onchangeFunc, value, isError, errorMsg, onIconClick, showIcon = false, Icon, outlineColor }) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                {
                    showIcon ? (<Icon className={styles.icon} onClick={onIconClick} />) : null
                }
                <input style={{
                    borderColor: outlineColor
                }} className={styles.inputField} type={type || 'text'} name={name} id={id} placeholder={placeholder} onChange={onchangeFunc} value={value} />
            </div>
            <span
                style={{
                    display: isError ? 'block' : 'none'
                }}
                className={styles.error}>
                {errorMsg}
            </span>
        </div>
    )
}
export default InputField