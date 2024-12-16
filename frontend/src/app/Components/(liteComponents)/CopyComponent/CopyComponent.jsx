import React from 'react'
import styles from '@/app/Components/(liteComponents)/CopyComponent/CopyComponent.module.css'
import { useState } from 'react'

const CopyComponent = ({ url = 'hello' }) => {
    const [isCopied, setisCopied] = useState(false)
    const copyFunc = () => {
        window.navigator.clipboard.writeText(url)
        setisCopied(true)
        setTimeout(() => {
            setisCopied(false)
        }, 1000);
    }
    return (
        <div className={styles.parent}>
            <input type="text" className={styles.input} value={url} readOnly />
            <button className={styles.copyBtn} onClick={copyFunc}>{isCopied ? 'Copied!!' : 'Copy link'}</button>
        </div>
    )
}

export default CopyComponent