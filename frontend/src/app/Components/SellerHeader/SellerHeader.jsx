'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/Components/SellerHeader/SellerHeader.module.css";
import Image from "next/image";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";

const SellerHeader = () => {
    const router = useRouter();
    const [seller, setseller] = useState({ text: "Login", link: "/login" });
    const [logout, setlogout] = useState(false);
    const [role, setrole] = useState('user'); // Default role
    const [profileHandle, setprofileHandle] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const getCookieValue = (name) => {
                const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                return match ? decodeURIComponent(match[2]) : null;
            };

            const token = getCookieValue('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    const profileHandle = decodedToken.profileHandle;
                    const userRole = decodedToken.userRole;
                    setprofileHandle(profileHandle)

                    setrole(userRole);

                    if (userRole === 'seller') {
                        setseller({ text: 'Profile', link: `/user/${profileHandle}/seller-dashboard` });
                        setlogout(true);
                    } else {
                        setseller({ text: 'Login', link: '/login' });
                        setlogout(false);
                    }
                } catch (error) {
                    console.error('Failed to decode token', error);
                }
            }
        }
    }, []); // Empty dependency array to run only on component mount

    const logoutFunc = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {
                withCredentials: true
            });
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`
            setseller({ text: 'Login', link: '/login' });
            setlogout(false);
            setrole('user');
            router.push('/');
        } catch (error) {
            console.error(`Failed to logout: ${error}`);
            // Optionally, show a user-friendly error message here
        }
    };

    return (
        <header className={styles.headerContainer}>
            {/* ------------- top header ------------- */}
            <div className={styles.topHeader}>
                {/* logo  */}
                <Link className={styles.desktopLogo} href='/'>
                    <Image src="/assets/imageAssets/dollarprompt-desktop-logo.svg" alt="site-logo" width={150} height={50} />
                </Link>
                <Link className={styles.mobileLogo} href='/'>
                    <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" alt="site-logo" width={36} height={36} />
                </Link>

                {/* top nav icons */}
                <nav className={styles.mainNav}>
                    <ul>
                        <li><Link className={styles.link} href='/market'>Marketplace</Link></li>
                        <li><Link className={styles.link} href={seller.link}>{seller.text}</Link></li>
                        <li><Link className={styles.link} href={`/user/${profileHandle}/chat`}>Chat</Link></li>
                        {logout && <li className={styles.link} onClick={logoutFunc}>Logout</li>}
                    </ul>
                    <RxHamburgerMenu className={styles.hamburgerIcon} onClick={() => dispatch(showNav())} />
                </nav>
            </div>
        </header>
    );
}

export default SellerHeader;
