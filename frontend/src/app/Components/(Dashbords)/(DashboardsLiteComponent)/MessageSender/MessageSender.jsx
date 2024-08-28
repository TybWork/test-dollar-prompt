import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/MessageSender/MessageSender.module.css'
import Image from "next/image"

const MessageSender = ({ text, time }) => {
    return (
        <div className={styles.mainContainer}>
            <Image src={'/assets/imageAssets/ceo_dollarprompt.PNG'} width={0} height={0} sizes='100vw' className={styles.image} />
            <div className={styles.chatContainer}>
                <div className={styles.topSide}></div>
                <div className={styles.leftSide}></div>
                <div className={styles.rightSide}>
                    {text}
                    <span className={styles.time}>{time || 'time: ...PM'}</span>
                </div>
            </div>
        </div>
    )
}

export default MessageSender