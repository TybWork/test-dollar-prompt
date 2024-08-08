'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineMessage } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbBoxModel } from "react-icons/tb";
import { ImArrowRight2 } from "react-icons/im";
import { PiCaretRightBold } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "@/app/Components/Header/Header.module.css";
import Search from "../(liteComponents)/Search/Search";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";
import { showCart } from "@/app/Redux/Features/cart/cartSlice";
import categoriesArr from "@/app/jsonFiles/promptsCategories";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.cartItems);

    const [categoryHeading, setCategoryHeading] = useState('');
    const [subHeadingTitle, setSubHeadingTitle] = useState('');
    const [seller, setSeller] = useState({ text: "Login", link: "/login" });
    const [showHeaderBox, setShowHeaderBox] = useState(false);
    const [checkActiveHeader, setCheckActiveHeader] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [innerLinks, setInnerLinks] = useState([]);
    const [logout, setLogout] = useState(false);
    const [role, setRole] = useState('user');

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
                    setRole(decodedToken.userRole);
                    const profileHandle = decodedToken.profileHandle;

                    if (decodedToken.userRole === 'seller') {
                        setSeller({ text: "Profile", link: `/user/${profileHandle}/seller-dashboard` });
                        setLogout(true);
                    } else if (decodedToken.userRole === 'user') {
                        setSeller({ text: "Become Seller", link: '/sellerinfo' });
                        setLogout(true);
                    } else if (decodedToken.userRole === 'admin') {
                        setSeller({ text: 'Admin', link: '/admin' });
                        setLogout(true);
                    }
                } catch (error) {
                    console.error('Token decoding error:', error);
                }
            } else {
                setSeller({ text: "Login", link: '/login' });
                setLogout(false);
            }
        }
    }, []);

    const logoutFunc = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {}, {
                withCredentials: true
            });
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=test-dollar-prompt.vercel.app; secure; sameSite=None';
            setSeller({ text: 'Login', link: '/login' });
            setLogout(false);
            setRole('user');
            router.push('/');
        } catch (error) {
            console.error(`Failed to logout ${error}`);
        }
    };

    const showSubCategories = (val) => {
        setCheckActiveHeader(true);
        setSubCategory(val.SubCategories);
        setCategoryHeading(val.name);
    };

    const hideSubCategories = () => {
        setCheckActiveHeader(false);
    };

    const categoryContainer = () => {
        setCheckActiveHeader(true);
    };

    const innerLinksFunc = (showCategory) => {
        setSubHeadingTitle(showCategory.subCategoryTitle);
        setInnerLinks(showCategory.innerCategories);
    };

    return (
        <>
            <header className={styles.headerContainer}>
                {/* ------------- top header ------------- */}
                <div className={styles.topHeader}>
                    {/* logo */}
                    <Link className={styles.desktopLogo} href='/'><img src="/assets/imageAssets/dollarprompt-desktop-logo.svg" style={{ width: "150px" }} alt="site-logo" /></Link>
                    <Link className={styles.mobileLogo} href='/'><img style={{ width: '36px' }} src="/assets/imageAssets/dollarprompt-mobile-logo.svg" alt="site-logo" /></Link>

                    {/* search component */}
                    <Search placeholder="Search Prompts" />

                    {/* top nav icons */}
                    <nav className={styles.mainNav}>
                        <ul>
                            <li><Link className={styles.link} style={{ display: role === 'admin' ? 'none' : 'block' }} href="/Marketplace">Marketplace</Link></li>
                            <li><Link className={styles.link} href={seller.link}>{seller.text}</Link></li>
                            {logout && <li className={styles.link} onClick={logoutFunc}>Logout</li>}
                        </ul>
                    </nav>
                    <div className={styles.topNavIconsContainer} style={{ display: role === "admin" ? 'none' : 'flex' }}>
                        <MdOutlineMessage className={styles.topNavIcons} />
                        <GoBell className={`${styles.topNavIcons} ${styles.bellIcon}`} />
                        <div className={styles.cartContainer}>
                            <HiOutlineShoppingCart className={styles.topNavIcons} onClick={() => dispatch(showCart())} />
                            <div className={styles.cartCounter}>{cartProducts.length}</div>
                        </div>
                        <RxHamburgerMenu className={`${styles.topNavIcons} ${styles.hamburgerIcon}`} onClick={() => dispatch(showNav())} />
                    </div>
                </div>
                {/* ------------- bottom navbar --------------- */}
                <nav className={styles.bottomNav} style={{ display: role === 'admin' ? 'none' : 'block' }}>
                    <ul>
                        {categoriesArr.map((val, index) =>
                            <li onMouseLeave={hideSubCategories} onMouseEnter={() => showSubCategories(val)} key={index}>
                                <TbBoxModel /> <span>{val.name}</span>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
            {/* subcategories links */}
            <div className={styles.subCategoriesContainer} style={{ display: checkActiveHeader ? 'flex' : 'none' }}
                onMouseOver={categoryContainer} onMouseLeave={hideSubCategories}
            >
                <div className={styles.subCategories}>
                    <div className={styles.categoryHeading}>All {categoryHeading}<ImArrowRight2 className={styles.arrowIcons} /></div>
                    {subCategory.map((val, subIndex) =>
                        <div className={styles.singleSubCategory} key={subIndex} onMouseEnter={() => innerLinksFunc(val)}>
                            {val.subCategoryTitle} <PiCaretRightBold className={styles.arrowIcons} />
                        </div>
                    )}
                </div>
                <div className={styles.innerPromptLinksContainer}>
                    <div className={styles.subHeadingTitle}>All {subHeadingTitle}</div>
                    {innerLinks.map((e, index) =>
                        <div className={styles.innerPromptLink} key={index}>{e.name}</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
