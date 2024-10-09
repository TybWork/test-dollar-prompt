import styles from '@/app/Components/AdaptiveCard/AdaptiveCard.module.css'
import Image from 'next/image'
import PrimaryBtn from '../(liteComponents)/PrimaryBtn/PrimaryBtn'
import EyeIcon from '../(icons)/EyeIcon'
import HeartIcon from '../(icons)/HeartIcon'
import ArrowIcon from '../(icons)/ArrowIcon'
import { useState } from 'react'
const AdaptiveCard = ({ title, views, likes, shares }) => {
    const [isEnter, setisEnter] = useState(false)
    const mouseEnter = () => {
        setisEnter(prev => !prev)
    }
    const mouseLeave = () => {
        setisEnter(prev => !prev)
    }
    return (
        <div className={styles.mainContainer}>

            <div className={styles.coloredContainer}>
            </div>
            <div className={styles.innerContentContainer} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>

                <Image src={'/assets/imageAssets/sampleCardImage.png'} width={0} height={0} sizes='100vw' className={styles.image} />
                <div className={styles.contentContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>{typeof title === 'string' ? title.slice(0, 20) : "Painting Flower Dall-E Prompt"}...</div>
                        <PrimaryBtn />
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.cardFooter}>
                        <span className={styles.iconText}>
                            <EyeIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${views || '20'}+`}</span>
                        </span>

                        <span className={styles.iconText}>
                            <HeartIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${likes || "10"}+`}</span>
                        </span>

                        <span className={styles.iconText}>
                            <ArrowIcon fill={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${shares || '4'}+`}</span>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdaptiveCard