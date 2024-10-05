'use client'
import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/MessageSender/MessageSender.module.css'
import { formateDate } from '@/app/utilities/formateDate'
import Image from "next/image"
import { useEffect, useState } from 'react'

const MessageSender = ({ text, time, width }) => {
    const [formatedTime, setformatedTime] = useState('')
    useEffect(() => {
        setformatedTime(formateDate(time).date)
    }, [time])
    return (
        <div className={styles.mainContainer}>
            <Image src={'/assets/imageAssets/ceo_dollarprompt.PNG'} width={0} height={0} sizes='100vw' className={styles.image} />
            <div className={styles.chatContainer} style={{ width: width || '220px' }}>
                <div className={styles.topSide}></div>
                <div className={styles.leftSide}></div>
                <div className={styles.rightSide}>
                    {text}
                    <span className={styles.time}>{formatedTime || 'time: ...PM'}</span>
                </div>
            </div>
        </div>
    )
}

export default MessageSender