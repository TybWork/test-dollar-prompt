import styles from "@/app/Components/GradientButton/GradientButton.module.css"
const GradientButton = ({ width, title, onClick, type, background }) => {
    return (
        <input
            type={type || 'button'}
            value={title || 'button'}
            style={{
                width: width || 'fitContent',
                background: background
            }}
            className={styles.gradientBtn}
            onClick={onClick} />
    )
}
export default GradientButton;