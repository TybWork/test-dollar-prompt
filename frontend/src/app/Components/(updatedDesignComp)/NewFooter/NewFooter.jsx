import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/NewFooter/NewFooter.module.css'
import Link from 'next/link'
import FooterLogo from '../FooterLogo/FooterLogo'

const NewFooter = () => {
    return (
        <footer className={styles.mainContainer}>
            <div className={styles.contentSection}>

                {/* top section */}
                <div className={styles.topSection}>
                    {/* Logo section */}
                    <div className={styles.logoSection}>
                        <FooterLogo />
                        <div className={styles.description}>
                            Dollar Prompt is a platform that helps prompt creators sell their most valuable prompts to others, bringing ease to their lives. With everyone using AI nowadays, why not get paid for your amazing AI prompts and earn money from them?
                        </div>
                    </div>

                    <div className={styles.linksMainSection}>
                        {/* promptsLinks Section */}
                        <ul className={styles.ul}>
                            <li className={styles.heading}>Prompts</li>
                            <li><Link href={'/buy-prompts'}>Buy Prompts</Link></li>
                            <li><Link href={'/sell-prompts'}>Sell Prompts</Link></li>
                            <li><Link href={'/market'}>Trending Prompts</Link></li>
                            <li><Link href={'/signup'}>Sign Up</Link></li>
                        </ul>

                        {/* Quick Links Section */}
                        <ul className={styles.ul}>
                            <li className={styles.heading}>Quick Links</li>
                            <li><Link href={'/buy-prompts#newsletter'}>Join Our Community</Link></li>
                            <li><Link href={'/blog'}>AI News</Link></li>
                            <li><Link href={'/market'}>Trending AI Tools</Link></li>
                        </ul>

                        {/* Contact Links Section */}
                        <ul className={styles.ul}>
                            <li className={styles.heading}>Contact</li>
                            <li><a href="mailto:Contact@dollarprompt.com">Contact@dollarprompt.com</a></li>
                            <li><a href="/">Facebook</a></li>
                            <li><a href="/">YouTube</a></li>
                        </ul>
                    </div>

                </div>

                {/* hr */}
                <hr className={styles.hr} />

                {/* footer texts */}
                <ul className={styles.bottomLinks}>
                    <li className={`${styles.desktopLinks} ${styles.brandName}`}>
                        A Project by <span>TYBWORK</span>
                    </li>

                    <li className={`${styles.copyrightText} ${styles.mobileLinksLinks}`}>
                        © 2024 Dollar Prompts.
                    </li>


                    <li className={`${styles.privacyLinks} ${styles.desktopLinks}`}>
                        <Link href={'/tandcs'}>Term of Use</Link>
                        <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    </li>

                    {/* on small screen */}
                    <li className={styles.mobileLinks}>
                        {/* <li className={styles.copyrightText}>
                            © 2024 Dollar Prompts.
                        </li> */}
                        <li className={styles.brandName}>
                            A Project by <span>TYBWORK</span>
                        </li>

                        <li className={styles.privacyLinks}>
                            <Link href={'/tandcs'}>Term of Use</Link>
                            <Link href={'/privacy-policy'}>Privacy Policy</Link>
                        </li>
                    </li>
                </ul>

            </div>

        </footer >
    )
}

export default NewFooter