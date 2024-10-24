import StarIcon from '@/app/Components/(icons)/StarIcon'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/IconWithText/IconWithText.module.css'
import React from 'react'

const IconWithText = ({ icon, text }) => {
    return (
        <div className={styles.container}>
            {icon || <StarIcon />}
            <span className={styles.text}>{text || 'text'}</span>
        </div>
    )
}

export default IconWithText