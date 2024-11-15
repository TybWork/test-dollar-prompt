import Image from 'next/image'
import styles from '@/app/not-found.module.css'
const NotFound = () => {
    return (
        <div className={styles.container}>
            <Image alt='404-image' src={'/404.svg'} width={0} height={0} sizes='100vw' className={styles.image} />
            <div className={styles.title}></div>
        </div>
    )
}

export default NotFound