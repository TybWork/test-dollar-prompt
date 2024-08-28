import styles from '@/app/Components/(Dashbords)/ChatHeader/ChatHeader.module.css'
import Image from 'next/image'
import { IoIosCall } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from 'next/link';
const ChatHeader = ({ imgSrc, name, phone }) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.userInfo}>
                <Image width={0} height={0} sizes='100vw' src={imgSrc || '/assets/imageAssets/dummy.jpg'} className={styles.image} alt={`${name}-pic` || 'dummy-pic'} />
                <span>{name || 'name'}</span>
            </div>
            <div className={styles.options}>
                <a href={`tel:${phone}`} className={styles.phoneLink}>
                    <IoIosCall className={styles.icon} />
                </a>
                <HiOutlineDotsVertical className={styles.icon} />
            </div>
        </div>
    )
}

export default ChatHeader