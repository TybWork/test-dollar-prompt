'use client'
import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/InputChat/InputChat.module.css'
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { GoPaperclip } from "react-icons/go";
import { useEffect, useState } from 'react';
import { emoji } from '@/app/jsonFiles/emoji';

const InputChat = ({ onChange, onSendMsg, inputValue }) => {
    const [emojiArr, setemojiArr] = useState([])
    useEffect(() => {
        setemojiArr(emoji)
    }, [])

    return (
        <div className={styles.inputChatContainer}>
            <input type="text" className={styles.input} onChange={onChange} placeholder={'Write Message'} value={inputValue} />
            <div className={styles.icons}>
                <GoPaperclip />
                <div className={styles.emojiContainer}>
                    {/* <div className={styles.emoji}>
                        {
                            emojiArr.map((item) =>
                                <span>{item}</span>
                            )
                        }
                    </div> */}
                    <GrEmoji />
                </div>
                <span className={styles.divider}>|</span>
                <FiSend onClick={onSendMsg} />
            </div>
        </div>
    )
}

export default InputChat