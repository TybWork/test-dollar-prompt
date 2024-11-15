'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineMessage } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import styles from "@/app/Components/Header/Header.module.css"
import { RxHamburgerMenu } from "react-icons/rx";
import { PiCaretRightBold } from "react-icons/pi";

// bottom nav imports
import { TbBoxModel } from "react-icons/tb";
import Search from "../(liteComponents)/Search/Search";
import { useDispatch } from "react-redux";
import { showNav } from "@/app/Redux/Features/navbar/navbarSlice";
import categoriesArr from "@/app/jsonFiles/promptsCategories";
import { ImArrowRight2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { showCart } from "@/app/Redux/Features/cart/cartSlice";
import { useCartQuery } from "@/app/utilities/hooks/useCartQuery";
import NewSearchInput from "../(updatedDesignComp)/NewSearchInput/NewSearchInput";

const Header = () => {
    const router = useRouter();

    const [categoryHeading, setcategoryHeading] = useState()
    const [subHeadingTitle, setsubHeadingTitle] = useState()
    const [seller, setSeller] = useState({ text: "Login", link: "/login" })
    const [checkActiveHeader, setcheckActiveHeader] = useState(false)
    const [subCategory, setsubCategory] = useState([]);
    const [innerLinks, setinnerLinks] = useState([])
    const dispatch = useDispatch();
    const [logout, setLogout] = useState(false)
    const [role, setRole] = useState('user')
    const { data } = useCartQuery()

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
                        setSeller({ text: "Start Selling", link: '/sellerinfo' });
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
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`;
            setSeller({ text: 'Login', link: '/login' });
            setLogout(false);
            router.push('/');
        } catch (error) {
            console.error(`Failed to logout ${error}`);
        }
    };


    // ...........................functions for hide/show sub categories......................

    const [hideTimeOut, sethideTimeOut] = useState(null)

    // show sub categories container
    const showSubCategories = (val, index) => {
        clearTimeout(hideTimeOut)
        setcheckActiveHeader(true)
        setsubCategory(val.SubCategories);
        setcategoryHeading(val.name);
    }

    const hideSubCategories = () => {
        sethideTimeOut(setTimeout(() => {
            setcheckActiveHeader(false)
        }, 100)
        )
    }

    const categoryContainer = () => {
        clearTimeout(hideTimeOut)
        setcheckActiveHeader(true)
    }

    // showing innerLinks function 
    function innerLinksFunc(showCategory) {
        setsubHeadingTitle(showCategory.subCategoryTitle);
        setinnerLinks(showCategory.innerCategroies);
    }

    const cartProducts = useSelector((state) => state.cart.cartItems)

    return (
        <>
            <header className={styles.headerContainer}>
                {/* ------------- top header------------- */}
                <div className={styles.topHeader}>
                    {/* logo  */}
                    <Link className={styles.desktopLogo} href='/'><img src="/assets/imageAssets/dollarprompt-desktop-logo.svg" style={{ width: "150px" }} alt="site-logo" /></Link>
                    <Link className={styles.mobileLogo} href='/'><img style={{ width: '36px' }} src="/assets/imageAssets/dollarprompt-mobile-logo.svg" alt="site-logo" /></Link>

                    {/* search component */}
                    <Search placeholder="Search Prompts" />
                    {/* <NewSearchInput /> */}

                    {/* top nav icons */}
                    <nav className={styles.mainNav}>
                        <ul>
                            <li><Link className={styles.link} style={{ display: role === 'admin' ? 'none' : 'block' }} href="/market">Marketplace</Link></li>
                            <li style={{ width: seller.text == 'Start Selling' ? '105px' : 'initial' }}><Link className={styles.link} href={seller.link}>{seller.text}</Link></li>
                            <li className={styles.link} style={{ display: `${logout == true ? 'block' : 'none'}` }} onClick={logoutFunc}>Logout</li>
                        </ul>
                    </nav>
                    <div className={styles.topNavIconsContainer} style={{ display: role === "admin" ? 'none' : 'flex' }}>
                        <MdOutlineMessage className={styles.topNavIcons} />
                        <GoBell className={`${styles.topNavIcons} ${styles.bellIcon}`} />
                        <div className={styles.cartContainer}>
                            <HiOutlineShoppingCart className={styles.topNavIcons} onClick={() => dispatch(showCart())} />
                            <div className={styles.cartCounter}>{data ? data.length : 0}</div>
                        </div>
                        <RxHamburgerMenu className={`${styles.topNavIcons} ${styles.hamburgerIcon}`} onClick={() => dispatch(showNav())} />
                    </div>
                </div>
                {/*------------- bottom navbar --------------- */}
                <nav className={styles.bottomNav} style={{ display: role === 'admin' ? 'none' : 'block' }}>
                    <ul>
                        {
                            categoriesArr.map((val, index) =>
                                <li onMouseLeave={hideSubCategories} onMouseEnter={() => showSubCategories(val, index)} key={index}><TbBoxModel /> <span>{val.name}</span></li>
                            )
                        }
                    </ul>
                </nav>
            </header>
            {/* subcategories links */}
            {/* <div className={styles.subCategoriesContainer} style={{ display: `${checkActiveHeader ? 'flex' : 'none'}` }} */}
            <div className={styles.subCategoriesContainer} style={{ height: `${checkActiveHeader ? '400px' : '0px'}` }}
                onMouseOver={categoryContainer} onMouseLeave={hideSubCategories}
            >

                <div className={styles.subCategories}>

                    <div className={styles.categoryHeading}>All {categoryHeading}<ImArrowRight2 className={styles.arrowIcons} /></div>
                    {
                        subCategory.map((val, subIndex) => <div className={styles.singleSubCategory} key={subIndex} onMouseEnter={() => innerLinksFunc(val, subIndex)}>{val.subCategoryTitle} <PiCaretRightBold className={styles.arrowIcons} /></div>
                        )
                    }
                </div>

                <div className={styles.innerPromptLinksContainer}>
                    <div className={styles.subHeadingTitle}>All {subHeadingTitle}</div>
                    {
                        innerLinks.map((e, index) =>
                            <div key={index} className={styles.innerPromptLink}>{e.name}</div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Header;