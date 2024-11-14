import styles from '@/app/Components/(updatedDesignComp)/HeaderLogo/HeaderLogo.module.css'
import Image from 'next/image'
const HeaderLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <Image src={'/assets/imageAssets/dollarprompt-mobile-logo.svg'} width={0} height={0} sizes='100vw' />
            <div className={styles.logoText}>
                <div className={styles.logoHeading}>dollar prompt</div>
                <div className={styles.logoSubHeading}>Sell your prompt</div>
            </div>
        </div>
    )
}

export default HeaderLogo