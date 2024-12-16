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
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from 'react'
import StarIcon from '../(icons)/StarIcon'
import Link from 'next/link'
import { MdTextSnippet } from "react-icons/md";
import axios from 'axios'

const AdaptiveCard = ({ isSeller = false, mainImage, title, promptUrl, views, likes, shares, ratingAverage, ratingCount, category, deletePromptFunc, updatePromptLink, promptId, userHandle, promptType = 'dall-e' }) => {
    const memorizedPromptType = promptType.toLocaleLowerCase()
    const [isEnter, setisEnter] = useState(false)
    const [isOptionsVisible, setisOptionsVisible] = useState(false)
    const [optionsPannelBg, setOptionsPannelBg] = useState('var(--homePrimaryClr)')
    const mouseEnter = () => {
        setisEnter(prev => !prev)
    }
    const mouseLeave = () => {
        setisEnter(prev => !prev)
    }

    const viewIncrementFunc = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/interactions/view?id=${promptId}&type=${memorizedPromptType}`)
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
                    <Link href={updatePromptLink || `/user/${userHandle}/updateprompt/${promptId}`}>
                        <BiSolidEdit
                            className={styles.sellerIcon}
                            onMouseOver={() => setOptionsPannelBg('radial-gradient(var(--homePrimaryClr), var(--homeMainBtn)')}
                            onMouseLeave={() => setOptionsPannelBg('var(--homePrimaryClr)')}
                        />
                    </Link>
                </div>

                <div className={styles.imageContainer}>
                    {
                        memorizedPromptType === 'dall-e' || memorizedPromptType === 'midjourney' ? (
                            <Image alt='prompt-image' src={mainImage || '/assets/imageAssets/sampleCardImage.png'} width={0} height={0} sizes='100vw' className={styles.image} />
                        ) : (
                            <div className={styles.iconBg}>
                                <MdTextSnippet />
                            </div>
                        )
                    }
                    <div className={styles.category}>{category || 'Dall-E'}</div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>{title && title.length > 42 ? title.slice(0, 39) + "..." : title || ("Painting Flower Dall-E Prompt generate now").slice(0, 39) + '...'}</div>
                        <PrimaryBtn width={'100%'} href={promptUrl} onClick={viewIncrementFunc} />
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.cardFooter}>

                        {/* ratings */}
                        {/* <span
                            style={{ display: ratingCount > 0 ? 'flex' : 'flex' }}
                            className={`${styles.iconText} ${styles.shareIcon}`}>
                            <span>
                                <StarIcon fill={isEnter ? '' : ''} />
                            </span>
                            <span>{`${ratingAverage || '0'}`}</span>
                            <span>{`(${ratingCount || '0'})`}</span>
                        </span> */}

                        <span
                            style={{ display: views >= 0 ? 'flex' : 'flex' }}
                            className={styles.iconText}>
                            <EyeIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${views || '0'}`}</span>
                        </span>

                        <span
                            style={{ display: likes > 0 ? 'flex' : 'flex' }}
                            className={styles.iconText}>
                            <HeartIcon stroke={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{`${likes || "0"}`}</span>
                        </span>

                        <span
                            className={styles.iconText}
                            style={{
                                display: isSeller ? 'none' : (shares > 0 ? 'flex' : 'flex')
                            }}
                        >
                            <ArrowIcon fill={isEnter ? 'var(--homeMainBtn)' : ''} />
                            <span>{''}</span>
                        </span>

                        <span className={styles.iconText}
                            onClick={() => setisOptionsVisible(prev => !prev)}
                            style={{
                                display: isSeller ? 'flex' : 'none'
                            }}
                        >
                            <HiDotsHorizontal style={{
                                color: isEnter ? 'var(--homeMainBtn)' : 'var(--homeMainBtn)',
                                fontWeight: 'bold',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }} />
                        </span>

                    </div>

                </div>
            </div>
        </div >
    )
}

export default AdaptiveCard