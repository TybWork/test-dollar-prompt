import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/FooterLogo/FooterLogo.module.css'
import Image from 'next/image'

const FooterLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <Image src={'/assets/imageAssets/dollarprompt-mobile-logo.svg'} width={0} height={0} sizes='100vw' />
            <div className={styles.logoText}>
                <div className={styles.logoHeading}>dollar prompts</div>
                <div className={styles.logoSubHeading}>Dollarize your prompts</div>
            </div>
        </div>
    )
}

export default FooterLogo