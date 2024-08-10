import styles from '@/app/Components/(liteComponents)/ScrollToTop/ScrollToTop.module.css'
import { LuArrowUpFromDot } from "react-icons/lu";
import { useEffect, useState } from 'react'
const ScrollToTop = () => {
    const [isVisible, setisVisible] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setisVisible(true)
            } else {
                setisVisible(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const scrollFunc = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <>
            <div style={{ display: isVisible ? 'flex' : 'none' }} className={styles.scrollBtn} onClick={scrollFunc}>
                <LuArrowUpFromDot className={styles.arrow} />
            </div>

        </>
    )
}

export default ScrollToTop