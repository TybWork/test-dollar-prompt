import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/InfoCards/InfoCards.module.css'
import ProfileIcon from '../../(icons)/ProfileIcon'
const InfoCards = ({ icon, title, description }) => {
    return (
        <div className={styles.card}>
            {icon || <ProfileIcon />}
            <h3>{title || 'Easy account Setup'} </h3>
            <p>{description || 'Create your account with Dollar Prompts, verify your email, and gain access to all the tools needed to sell your highly effective prompts that consistently generate accurate results.'}</p>
        </div>
    )
}

export default InfoCards