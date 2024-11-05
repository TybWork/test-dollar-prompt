import styles from "@/app/Components/GradientButton/GradientButton.module.css"
const GradientButton = ({ width, height, title, onClick, type, background, disabled }) => {
    return (
        <input
            disabled={disabled}
            type={type || 'button'}
            value={title || 'button'}
            style={{
                width: width || 'fitContent',
                height: height,
                background: background
            }}
            className={styles.gradientBtn}
            onClick={onClick} />
    )
}
export default GradientButton;