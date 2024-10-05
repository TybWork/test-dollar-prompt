'use client'
import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/MessageReceiver/MessageReceiver.module.css'
import Image from "next/image"
import { formateDate } from '@/app/utilities/formateDate'
import { useState, useEffect } from 'react'

const MessageReceiver = ({ text, time, width }) => {
    const [formatedTime, setformatedTime] = useState('')
    useEffect(() => {
        setformatedTime(formateDate(time).date)
    }, [time])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.chatContainer} style={{ width: width || '220px' }}>
                <div className={styles.topSide}></div>
                <div className={styles.leftSide}>
                    {text}
                    <span className={styles.time}>{formatedTime || 'time: ...AM'}</span>
                </div>
                <div className={styles.rightSide}>
                </div>
            </div>
            <Image src={'/assets/imageAssets/ceo_dollarprompt.PNG'} width={0} height={0} sizes='100vw' className={styles.image} />
        </div>
    )
}

export default MessageReceiver