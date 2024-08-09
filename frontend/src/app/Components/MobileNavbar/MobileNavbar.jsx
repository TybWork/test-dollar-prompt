"use client";
import styles from '@/app/Components/MobileNavbar/MobileNavbar.module.css';
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import categoriesArr from '@/app/jsonFiles/promptsCategories';
import { getUserLinks } from '@/app/jsonFiles/getUserLinks.js';
import { hideNav } from '@/app/Redux/Features/navbar/navbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenFunction } from '@/app/utilities/getTokenFunction.js';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { logoutFunc } from '@/app/utilities/logoutFunction.js';

const MobileNavbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const hideNavbar = useSelector((state) => state.navbar.position);

    const [hideCategory, setHideCategory] = useState(null);
    const [hideSubCategory, setHideSubCategory] = useState(null);
    const [arrowIcon, setArrowIcon] = useState(null);
    const [subArrowIcon, setSubArrowIcon] = useState(null);
    const [role, setRole] = useState('user');
    const [profileHandle, setProfileHandle] = useState(null);
    const [userLinks, setUserLinks] = useState(getUserLinks().users);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const cookie = getTokenFunction().cookie;
        if (cookie) {
            try {
                const decodedToken = jwtDecode(cookie);
                const decodeRole = decodedToken.userRole;
                const decodeProfileHandle = decodedToken.profileHandle;
                setRole(decodeRole);
                setProfileHandle(decodeProfileHandle);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setIsLoggedIn(false); // Set login state if no cookie is found
        }
    }, []);

    useEffect(() => {
        if (role === 'user') {
            setUserLinks(getUserLinks().users);
        } else if (role === 'seller') {
            setUserLinks(getUserLinks(profileHandle).seller);
        } else if (role === 'admin') {
            setUserLinks(getUserLinks().admin);
        }
    }, [role, profileHandle]);

    const appendFunc = (index) => {
        setHideCategory(hideCategory === index ? null : index);
        setArrowIcon(arrowIcon === index ? null : index);
    };

    const appendSubCategory = (index) => {
        setHideSubCategory(hideSubCategory === index ? null : index);
        setSubArrowIcon(subArrowIcon === index ? null : index);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logoutFunc();
            setIsLoggedIn(false); // Update login state
            dispatch(hideNav());
            router.push('/login'); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className={styles.parentContainer} style={{ left: `${hideNavbar}` }}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <Image src="/assets/imageAssets/logo.png" width={30} height={30} alt="Logo" />
                    </div>
                    <div className={styles.crossIcon}>
                        <RxCross2 onClick={() => dispatch(hideNav())} />
                    </div>
                </div>
                <div className={styles.explore}>Explore</div>
            </div>

            {/* Prompts categories */}
            {categoriesArr.map((e, index) => (
                <div className={styles.promptCategories} key={index}>
                    <div className={styles.mainCategories} onClick={() => appendFunc(index)}>
                        {e.name}
                        <FaAngleRight
                            className={styles.bottomIcon}
                            style={{ transform: arrowIcon === index ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                        />
                    </div>
                    <div className={styles.subCategories} style={{ display: hideCategory === index ? 'block' : 'none' }}>
                        {e.SubCategories.map((subCat, subIndex) => (
                            <div key={subIndex}>
                                <div className={styles.subCategoryHeading} onClick={() => appendSubCategory(subIndex)}>
                                    {subCat.subCategoryTitle}
                                    <FaAngleRight
                                        style={{ transform: subArrowIcon === subIndex ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                                        className={styles.bottomIcon}
                                    />
                                </div>
                                <div className={styles.subCategoryTitle} style={{ display: hideSubCategory === subIndex ? 'block' : 'none' }}>
                                    {subCat.innerCategories.map((val, innerIndex) => (
                                        <div key={innerIndex} className={styles.innerCategories}>{val.name}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Pages link container */}
            <div className={styles.pagesLinkContainer}>
                <div className={styles.general}>GENERAL</div>
                {userLinks.map((linksData, linkIndex) => (
                    <div key={linkIndex} className={styles.linksContainer}>
                        <Link className={styles.link} href={linksData.link}>{linksData.title}</Link>
                    </div>
                ))}
                <Link
                    href={isLoggedIn ? '#' : '/login'}
                    className={styles.link}
                    onClick={isLoggedIn ? handleLogout : undefined}
                >
                    {isLoggedIn ? 'Logout' : 'Login'}
                </Link>
            </div>
        </div>
    );
};

export default MobileNavbar;
