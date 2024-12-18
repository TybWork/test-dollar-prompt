import StarIcon from '@/app/Components/(icons)/StarIcon'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/IconWithText/IconWithText.module.css'
import React from 'react'

const IconWithText = ({ icon, text, onClick, doHover = false }) => {
    return (
        <div style={{ cursor: doHover ? 'pointer' : 'default' }} className={styles.container} onClick={onClick}>
            {icon || <StarIcon />}
            <span className={styles.text}>{text || ''}</span>
        </div>
    )
}

export default IconWithText