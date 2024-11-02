import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/IconWithTitleDesc/IconWithTitleDesc.module.css'
const IconWithTitleDesc = ({ IconName, title, description, IconClass }) => {
    return (
        <div className={styles.parentContainer}>
            <span className={IconClass}>
                <IconName className={styles.icon} />
            </span>
            <div className={styles.textContainer}>
                <p className={styles.title}>{title || 'Title'}</p>
                <p className={styles.description}>{description || 'Description'}</p>
            </div>
        </div>
    )
}

export default IconWithTitleDesc