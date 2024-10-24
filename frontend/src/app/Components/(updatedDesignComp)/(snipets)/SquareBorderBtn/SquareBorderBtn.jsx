import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/SquareBorderBtn/SquareBorderBtn.module.css'

const SquareBorderBtn = ({ title }) => {
    return (
        <button className={styles.btn}>
            {title || 'Follow'}
        </button>
    )
}

export default SquareBorderBtn