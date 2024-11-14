import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/GuestHeader/GuestHeader.module.css'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import Link from 'next/link'
import NewSearchInput from '../NewSearchInput/NewSearchInput'
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";
import HeaderLogo from '../HeaderLogo/HeaderLogo'

const GuestHeader = () => {
    const dispatch = useDispatch();
    return (
        <div className={styles.parentContainer}>
            {/* logo  */}
            <HeaderLogo />

            {/* nav links */}
            <div className={styles.navLinks}>
                <div className={styles.input}>
                    <NewSearchInput />
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href={'/buy-prompts'}>Buy Prompts</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={'/sell-prompts'}>Sell Prompts</Link>
                    </li>
                    <li className={styles.li}>
                        <PrimaryBtn title={'Sign Up'} href={'/signup'} />
                    </li>
                </ul>

            </div>
            {/* hamburger icon */}
            <RxHamburgerMenu className={styles.hamburgerIcon} onClick={() => dispatch(showNav())} />
        </div>
    )
}

export default GuestHeader