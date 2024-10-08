import React from 'react'
import styles from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn.module.css'
const PrimaryBtn = ({ title, width, padding, height }) => {
    return (
        <button style={{ width: width || '118px', padding: padding, height: height }} className={styles.btns}>{title || 'View Prompt'}</button>
    )
}

export default PrimaryBtn