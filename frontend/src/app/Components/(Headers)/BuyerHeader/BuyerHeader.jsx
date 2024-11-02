import styles from '@/app/Components/(Headers)/BuyerHeader/BuyerHeader.module.css'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import Link from 'next/link'
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx";
import NewSearchInput from '../../(updatedDesignComp)/NewSearchInput/NewSearchInput'
import { BsCartCheckFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import IconWithCoutner from '../../(liteComponents)/IconWithCounter/IconWithCoutner'
import ProfileImgWithPanel from '../../(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel'
import { useEffect, useState } from 'react';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';

const BuyerHeader = () => {
    const [isSellerView, setisSellerView] = useState(true);
    const [role, setrole] = useState('user')
    const [profileHandle, setprofileHandle] = useState('')

    useEffect(() => {
        const token = getTokenFunction().cookie
        const decode = jwtDecode(token)
        setrole(decode.userRole)
        setprofileHandle(decode.profileHandle)
    }, [])

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
                        <Link href={'/market'}>Marketplace</Link>
                    </li>

                    <li className={styles.li}>
                        <Link
                            href={
                                role === 'user' ? '/sell-prompts/sell'
                                    : isSellerView ? `/user/${profileHandle}/buyer-dashboard/buyer` : `/user/${profileHandle}/buyer-dashboard/seller`
                            }
                            onClick={() => setisSellerView(prev => !prev)}
                        >
                            {
                                role === "user" ? 'Sell Prompts'
                                    : isSellerView ? 'Switch to buy' :
                                        'Switch to sell'
                            }
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <IconWithCoutner
                            Icon={GoBell}
                            counterBg={'red'}
                        />
                    </li>

                    <li
                        className={styles.li}
                        style={{
                            display: isSellerView ? 'none' : 'block'
                        }}
                    >
                        <IconWithCoutner
                            Icon={BsCartCheckFill}
                            counterBg={'red'}
                        />
                    </li>

                    <li className={styles.li}>
                        <ProfileImgWithPanel
                            profileUpdateUrl={`/user/${profileHandle}/profile-update`}
                            dashboardUrl={
                                isSellerView ? `/user/${profileHandle}/buyer-dashboard/seller` : `/user/${profileHandle}/buyer-dashboard/buyer`
                            }
                        />
                    </li>
                </ul>

            </div>
            {/* hamburger icon */}
            <RxHamburgerMenu className={styles.hamburgerIcon} />
        </div >
    )
}

export default BuyerHeader