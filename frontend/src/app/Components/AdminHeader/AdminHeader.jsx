'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/Components/AdminHeader/AdminHeader.module.css";

// bottom nav imports
import { jwtDecode } from "jwt-decode"; // Import as a default
import { useRouter } from "next/navigation";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";


const AdminHeader = () => {
    const router = useRouter();
    const [seller, setSeller] = useState({ text: "Login", link: "/login" });
    const [logout, setLogout] = useState(false);
    const [role, setRole] = useState('user');
    const dispatch = useDispatch()

    useEffect(() => {
        // Function to get cookie value
        const getCookieValue = (name) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? decodeURIComponent(match[2]) : null;
        };

        const token = getCookieValue('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.userRole);
            const userId = decodedToken.userId;
            const profileHandle = decodedToken.profileHandle;

            if (decodedToken.userRole === 'admin') {
                setSeller({ text: 'Admin', link: '/admin' });
                setLogout(true);
                router.push('/admin');
            } else {
                setSeller({ text: "Login", link: '/login' });
                setLogout(false);
                router.push('/');
            }
        } else {
            setSeller({ text: "Login", link: '/login' });
            setLogout(false);
            router.push('/');
        }
    }, [router]);

    // Effect to handle role changes
    useEffect(() => {
        if (role === 'admin') {
            setSeller({ text: 'Admin', link: '/admin' });
            setLogout(true);
        } else {
            setSeller({ text: "Login", link: '/login' });
            setLogout(false);
        }
    }, [role]);

    // Logout Function
    const logoutFunc = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {
                withCredentials: true
            });
            // Optionally, you might want to clear cookies here if needed
            // Delete a cookie named 'token'
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=test-dollar-prompt.vercel.app; secure; sameSite=None';

            setSeller({ text: 'Login', link: '/login' });
            setLogout(false);
            setRole('user');
            router.push('/');
        } catch (error) {
            console.log(`Failed to logout ${error}`);
        }
    };

    return (
        <header className={styles.headerContainer}>
            {/* ------------- top header------------- */}
            <div className={styles.topHeader}>
                {/* logo  */}
                <Link className={styles.desktopLogo} href='/'><img src="/assets/imageAssets/dollarprompt-desktop-logo.svg" style={{ width: "150px" }} alt="site-logo" /></Link>
                <Link className={styles.mobileLogo} href='/'><img style={{ width: '36px' }} src="/assets/imageAssets/dollarprompt-mobile-logo.svg" alt="site-logo" /></Link>

                {/* top nav icons */}
                <nav className={styles.mainNav}>
                    <ul>
                        <li><Link className={styles.link} href='/market'>Marketplace</Link></li>
                        <li><Link className={styles.link} href={seller.link}>{seller.text}</Link></li>
                        {logout && <li className={styles.link} onClick={logoutFunc}>Logout</li>}
                    </ul>

                    <RxHamburgerMenu onClick={() => dispatch(showNav())} />

                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
