import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/GuestHeader/GuestHeader.module.css'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import Link from 'next/link'
import NewSearchInput from '../NewSearchInput/NewSearchInput'
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx";

const GuestHeader = () => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.logoContainer}>
                <Image src={'/assets/imageAssets/dollarprompt-mobile-logo.svg'} width={0} height={0} sizes='100vw' />
                <div className={styles.logoText}>
                    <div className={styles.logoHeading}>dollar prompts</div>
                    <div className={styles.logoSubHeading}>Dollarize your prompts</div>
                </div>
            </div>
            <div className={styles.navLinks}>
                <div className={styles.input}>
                    <NewSearchInput />
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href={'/'}>Buy Prompts</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={'/'}>Sell Prompts</Link>
                    </li>
                    <li className={styles.li}>
                        <PrimaryBtn title={'Sign Up'} />
                    </li>
                </ul>

            </div>
            {/* hamburger icon */}
            <RxHamburgerMenu className={styles.hamburgerIcon} />
        </div>
    )
}

export default GuestHeader