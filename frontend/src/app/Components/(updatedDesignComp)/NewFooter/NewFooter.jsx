import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/NewFooter/NewFooter.module.css'
import Image from 'next/image'
import Link from 'next/link'
import FooterLogo from '../FooterLogo/FooterLogo'

const NewFooter = () => {
    return (
        <footer className={styles.mainContainer}>
            <div className={styles.liteContainer}>

                <div className={styles.innerContainer}>
                    {/* logo */}
                    <FooterLogo />

                    {/* hyperlinks section */}
                    <div className={styles.hyperlinksContainer}>
                        <ul className={styles.section}>
                            <li><Link href={'/'}>Sell on Dollar Prompt</Link></li>
                            <li><Link href={'/'}>Categories</Link></li>
                            <li><Link href={'/'}>AI Tools</Link></li>
                            <li><Link href={'/'}>AI News</Link></li>
                        </ul>

                        <ul className={styles.section}>
                            <li><Link href={'/'}>Join our Community</Link></li>
                            <li><Link href={'/'}>Buy Prompts</Link></li>
                            <li><Link href={'/'}>Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* copyright section */}
                    <div className={styles.copyrightSection}>
                        <div className={styles.middleSection}>
                            <div className={styles.footerTitle}> A Project by TYBWORK</div>
                            <div className={styles.copyright}>© 2024 Dollar Prompts.</div>
                        </div>

                        {/* terms of use links */}
                        <ul className={styles.termsSection}>
                            <li><Link href={'/'}>Join our Community</Link></li>
                            <li><Link href={'/'}>Buy Prompts</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default NewFooter