import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/IconWithTitleDesc/IconWithTitleDesc.module.css'
const IconWithTitleDesc = ({ IconName, title, description }) => {
    return (
        <div className={styles.parentContainer}>
            <IconName className={styles.icon} />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title || 'Title'}</p>
                <p className={styles.description}>{description || 'Description'}</p>
            </div>
        </div>
    )
}

export default IconWithTitleDesc