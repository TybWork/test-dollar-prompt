import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/InputChat/InputChat.module.css'
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { GoPaperclip } from "react-icons/go";

const InputChat = () => {
    return (
        <div className={styles.inputChatContainer}>
            <input type="text" className={styles.input} placeholder={'Write Message'} />
            <div className={styles.icons}>
                <GoPaperclip />
                <GrEmoji />
                <span className={styles.divider}>|</span>
                <FiSend />
            </div>
        </div>
    )
}

export default InputChat