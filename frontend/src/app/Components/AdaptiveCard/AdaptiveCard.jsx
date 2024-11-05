'use client'
import styles from '@/app/Components/AdaptiveCard/AdaptiveCard.module.css'
import Image from 'next/image'
import PrimaryBtn from '../(liteComponents)/PrimaryBtn/PrimaryBtn'
import EyeIcon from '../(icons)/EyeIcon'
import HeartIcon from '../(icons)/HeartIcon'
import ArrowIcon from '../(icons)/ArrowIcon'
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react'
import StarIcon from '../(icons)/StarIcon'
import Link from 'next/link'
const AdaptiveCard = ({ isSeller = false, mainImage, title, promptUrl, views, likes, shares, category, deletePromptFunc, updatePromptLink }) => {
    const [isEnter, setisEnter] = useState(false)
    const [isOptionsVisible, setisOptionsVisible] = useState(false)
    const [optionsPannelBg, setOptionsPannelBg] = useState('var(--homePrimaryClr)')
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
                <div
                    className={styles.optionsPannel}
                    style={{
                        background: optionsPannelBg,
                        top: isOptionsVisible ? '0px' : '-100%'
                    }}
                >
                    <RxCross2 className={styles.hideOption}
                        onClick={() => setisOptionsVisible(false)}
                    />
                    <MdDelete
                        onClick={deletePromptFunc}
                        className={styles.sellerIcon}
                        onMouseOver={() => setOptionsPannelBg('radial-gradient(var(--homePrimaryClr), rgb(221, 146, 146))')}
                        onMouseLeave={() => setOptionsPannelBg('var(--homePrimaryClr)')}
                    />
                    <Link href={updatePromptLink || '/'}>
                        <BiSolidEdit
                            className={styles.sellerIcon}
                            onMouseOver={() => setOptionsPannelBg('radial-gradient(var(--homePrimaryClr), var(--homeMainBtn)')}
                            onMouseLeave={() => setOptionsPannelBg('var(--homePrimaryClr)')}
                        />
                    </Link>
                </div>

                <div className={styles.imageContainer}>
                    <Image src={mainImage || '/assets/imageAssets/sampleCardImage.png'} width={0} height={0} sizes='100vw' className={styles.image} />
                    <div className={styles.category}>{category || 'Dall-E'}</div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>{typeof title === 'string' ? title.slice(0, 20) : "Painting Flower Dall-E Prompt generate now"}...</div>
                        <PrimaryBtn width={'100%'} href={promptUrl} />
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.cardFooter}>
                        <span className={`${styles.iconText} ${styles.shareIcon}`}>
                            <span>
                                <StarIcon fill={isEnter ? '' : ''} />
                            </span>
                            <span>{`${shares || '4.9'}`}</span>
                            <span>{`(${shares || '29K'})`}</span>
                        </span>

                        <span className={styles.iconText}>
                            <EyeIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${views || '20'}`}</span>
                        </span>

                        <span className={styles.iconText}>
                            <HeartIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${likes || "10"}`}</span>
                        </span>

                        <span className={styles.iconText}
                            style={{
                                display: isSeller ? 'none' : 'flex'
                            }}
                        >
                            <ArrowIcon fill={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${shares || '4'}`}</span>
                        </span>

                        <span className={styles.iconText}
                            onClick={() => setisOptionsVisible(prev => !prev)}
                            style={{
                                display: isSeller ? 'flex' : 'none'
                            }}
                        >
                            <ArrowIcon fill={isEnter ? 'var(--homeMainBtn)' : ''} />
                        </span>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdaptiveCard