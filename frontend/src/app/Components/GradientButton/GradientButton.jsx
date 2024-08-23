import styles from "@/app/Components/GradientButton/GradientButton.module.css"
const GradientButton = ({ width, title, onClick, type }) => {
    return (
        <input type={type || 'button'} value={title || 'button'} style={{ width: width || 'fitContent' }} className={styles.gradientBtn} onClick={onClick} />
    )
}
export default GradientButton;