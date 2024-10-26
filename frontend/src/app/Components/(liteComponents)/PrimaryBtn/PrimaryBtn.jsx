import React from 'react'
import styles from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn.module.css'
import Link from 'next/link'
const PrimaryBtn = ({ title, width, padding, height, href }) => {

    return (
        <Link href={href || '/prompts/asdf234sd32'}>
            <button style={{ width: width || '118px', padding: padding, height: height }} className={styles.btns}>{title || 'View Prompt'}</button>
        </Link>
    )
}

export default PrimaryBtn