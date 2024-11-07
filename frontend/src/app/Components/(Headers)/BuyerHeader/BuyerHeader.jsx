import styles from '@/app/Components/(Headers)/BuyerHeader/BuyerHeader.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu } from "react-icons/rx";
import NewSearchInput from '../../(updatedDesignComp)/NewSearchInput/NewSearchInput'
import { BsCartCheckFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import IconWithCoutner from '../../(liteComponents)/IconWithCounter/IconWithCoutner'
import ProfileImgWithPanel from '../../(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel'
import { useEffect, useState } from 'react';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";

const BuyerHeader = () => {
    const [isSellerView, setisSellerView] = useState(true);
    const [role, setrole] = useState('user')
    const [userId, setuserId] = useState('')
    const [profileHandle, setprofileHandle] = useState('')
    const [profile, setprofile] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getTokenFunction().cookie
        const decode = jwtDecode(token)
        setrole(decode.userRole)
        setprofileHandle(decode.profileHandle)
        setuserId(decode.userId)
    }, [])

    if (profile.length === 0) return <div>...loading</div>

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${userId}`);
                console.log(response.data)
                setprofile(response.data)

            } catch (err) {
                console.error("Error fetching seller data:", err);
                setError(err.message); // Capture error message
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <div className={styles.parentContainer}>
            <Link href={'/'} className={styles.Li}>
                <div className={styles.logoContainer}>
                    <Image src={'/assets/imageAssets/dollarprompt-mobile-logo.svg'} width={0} height={0} sizes='100vw' />
                    <div className={styles.logoText}>
                        <div className={styles.logoHeading}>dollar prompts</div>
                        <div className={styles.logoSubHeading}>Sell your prompt</div>
                    </div>
                </div>
            </Link>
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
                            counter={'0'}
                        />
                    </li>

                    {/* <li
                        className={styles.li}
                        style={{
                            display: isSellerView ? 'none' : 'block'
                        }}
                    >
                        <IconWithCoutner
                            Icon={BsCartCheckFill}
                            counterBg={'red'}
                            counter={0}
                        />
                    </li> */}

                    <li className={styles.profileContainer}>
                        <ProfileImgWithPanel
                            imgUrl={profile.profileImage && profile.profileImage.length > 0 ? profile.profileImage[0] : ''}
                            profileUpdateUrl={`/user/${profileHandle}/profile-update`}
                            dashboardUrl={
                                role === 'user' ? `/user/${profileHandle}/buyer-dashboard/buyer` :
                                    isSellerView ? `/user/${profileHandle}/buyer-dashboard/seller` : `/user/${profileHandle}/buyer-dashboard/buyer`
                            }
                        />
                    </li>
                </ul>

            </div>
            {/* hamburger icon */}
            <RxHamburgerMenu className={styles.hamburgerIcon} onClick={() => dispatch(showNav())} />
        </div >
    )
}

export default BuyerHeader