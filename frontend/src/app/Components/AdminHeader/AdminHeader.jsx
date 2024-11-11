// 'use client';
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "@/app/Components/AdminHeader/AdminHeader.module.css";

// // bottom nav imports
// import { jwtDecode } from "jwt-decode"; // Import as a default
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import axios from "axios";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { useDispatch } from "react-redux";
// import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";
// import Image from "next/image";


// const AdminHeader = () => {
//     const router = useRouter();
//     const pathname = usePathname()
//     const [seller, setSeller] = useState({ text: "Login", link: "/login" });
//     const [logout, setLogout] = useState(false);
//     const [role, setRole] = useState('user');
//     const dispatch = useDispatch()

//     useEffect(() => {
//         // Function to get cookie value
//         const getCookieValue = (name) => {
//             const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//             return match ? decodeURIComponent(match[2]) : null;
//         };

//         const token = getCookieValue('token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             setRole(decodedToken.userRole);
//             const userId = decodedToken.userId;
//             const profileHandle = decodedToken.profileHandle;

//             if (decodedToken.userRole === 'admin') {
//                 setSeller({ text: 'Admin', link: '/admin' });
//                 setLogout(true);
//                 if (!pathname.includes('/admin')) {
//                     router.push('/admin');
//                 }
//             } else {
//                 setSeller({ text: "Login", link: '/login' });
//                 setLogout(false);
//                 router.push('/');
//             }
//         } else {
//             setSeller({ text: "Login", link: '/login' });
//             setLogout(false);
//             router.push('/');
//         }
//     }, [router]);

//     // Effect to handle role changes
//     useEffect(() => {
//         if (role === 'admin') {
//             setSeller({ text: 'Admin', link: '/admin' });
//             setLogout(true);
//         } else {
//             setSeller({ text: "Login", link: '/login' });
//             setLogout(false);
//         }
//     }, [role]);

//     // Logout Function
//     const logoutFunc = async () => {
//         try {
//             await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {
//                 withCredentials: true
//             });
//             // Optionally, you might want to clear cookies here if needed
//             // Delete a cookie named 'token'
//             document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`;

//             setSeller({ text: 'Login', link: '/login' });
//             setLogout(false);
//             setRole('user');
//             router.push('/');
//         } catch (error) {
//             console.log(`Failed to logout ${error}`);
//         }
//     };

//     return (
//         <header className={styles.headerContainer}>
//             {/* ------------- top header------------- */}
//             <div className={styles.topHeader}>
//                 {/* logo  */}
//                 <Link href={'/'} className={styles.Li}>
//                     <div className={styles.logoContainer}>
//                         <Image src={'/assets/imageAssets/dollarprompt-mobile-logo.svg'} width={0} height={0} sizes='100vw' />
//                         <div className={styles.logoText}>
//                             <div className={styles.logoHeading}>dollar prompts</div>
//                             <div className={styles.logoSubHeading}>Sell your prompt</div>
//                         </div>
//                     </div>
//                 </Link>

//                 {/* top nav icons */}
//                 <nav className={styles.mainNav}>
//                     <ul>
//                         <li><Link className={styles.link} href='/admin/blogpost/create'>Create Blog</Link></li>
//                         <li><Link className={styles.link} href='/market'>Marketplace</Link></li>
//                         <li><Link className={styles.link} href={seller.link}>{seller.text}</Link></li>
//                         {logout && <li className={styles.link} onClick={logoutFunc}>Logout</li>}
//                     </ul>

//                     <RxHamburgerMenu className={styles.hamburgerIcon} onClick={() => dispatch(showNav())} />

//                 </nav>
//             </div>
//         </header>
//     );
// };

// export default AdminHeader;



import styles from '@/app/Components/AdminHeader/AdminHeader.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCartCheckFill } from "react-icons/bs";
import NewSearchInput from '../(updatedDesignComp)/NewSearchInput/NewSearchInput';
import { GoBell } from "react-icons/go";
import IconWithCoutner from '../(liteComponents)/IconWithCounter/IconWithCoutner';
import ProfileImgWithPanel from '../(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel';
import { useEffect, useState } from 'react';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";
import { useRouter } from 'next/navigation';

const AdminHeader = () => {
    const router = useRouter()

    const [isSellerView, setisSellerView] = useState(true);
    const [role, setrole] = useState('admin')
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
        router.push('/admin')
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
                <ul className={styles.ul}>

                    <li className={styles.li}>
                        <Link href={'/admin'}>Admin Dashboard</Link>
                    </li>

                    <li className={styles.li}>
                        <Link href={'/market'}>Marketplace</Link>
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

export default AdminHeader