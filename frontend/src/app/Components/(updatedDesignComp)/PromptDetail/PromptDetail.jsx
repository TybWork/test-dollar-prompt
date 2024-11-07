import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/PromptDetail/PromptDetail.module.css'
import Image from 'next/image'
import VerifiedIcon from '../../(icons)/VerifiedIcon'
import IconWithText from '../(snipets)/IconWithText/IconWithText'
import StarIcon from '../../(icons)/StarIcon'
import EyeIcon from '../../(icons)/EyeIcon'
import HeartIcon from '../../(icons)/HeartIcon'
import ArrowIcon from '../../(icons)/ArrowIcon'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import { BiSolidCartAdd } from "react-icons/bi";
import CartIcon from '../../(icons)/CartIcon'
const PromptDetail = ({ promptImageUrl, aiTool, promptTitle, promptDescription, version, promptRating, views, favourites, shares, originalPrice, salePrice, percentageOff, cartClickFunc, buyPromptBtn, imgArray }) => {

    return (
        <div className={styles.promptDetail}>

            {/* ......1.ai tool....... */}
            <span className={styles.aiToolBadge}>{aiTool || 'Dall-E'}</span>

            {/* prompt images */}
            <div className={styles.promptImages}>
                {
                    imgArray && imgArray.slice(0, 3).map((imgUrl) =>
                        <Image width={0} height={0} sizes='100vw' className={styles.img} src={promptImageUrl || imgUrl} />
                    )
                }
            </div>

            {/* .........aboutPrompt......... */}
            <div className={styles.aboutPrompt}>
                <h3 className={styles.title}>{promptTitle || 'Vintage Junk Journal Pages'}</h3>
                <p className={styles.promptDescription}>
                    {promptDescription || 'This prompt generates beautiflly depicitions of vintage junk journal pages. These Nostalgic and textured desing can be used for scrapbooking , journaling ,invitations , or create projects , adding a rustic and timless touch to any collection.'}
                </p>
            </div>


            {/* .........category......... */}
            <div className={styles.categoryContainer}>
                <div className={styles.category}>
                    Version: <span>{version || ''}</span>
                </div>
                <div className={styles.authenticity}>
                    <VerifiedIcon width={'16px'} />
                    <span>Tested</span>
                </div>
            </div>


            {/* .........parameters......... */}
            <div className={styles.parametersContainer}>
                <IconWithText
                    icon={<StarIcon width='14px' />}
                    text={
                        <>
                            <span style={{ color: 'var(--ratingClr)' }}>{promptRating || '0.0'}</span>
                            (500)
                        </>
                    }
                />
                <IconWithText
                    icon={<EyeIcon stroke={'var(--homeMainBtn)'} width='20px' />}
                    text={views || 100}
                />
                <IconWithText
                    icon={<HeartIcon width='20px' stroke={'var(--homeMainBtn)'} />}
                    text={favourites || 100}
                />
                <IconWithText
                    icon={<ArrowIcon width='20px' fill={'var(--homeMainBtn)'} />}
                    text={shares || 1000}
                />
            </div>

            <div className={styles.lastSection}>
                {/* horizontal rule */}
                <hr className={styles.hr} />

                {/* buttonSection */}
                <div className={styles.btnSection}>
                    <div className={styles.priceSection}>
                        <div className={styles.salePrice}>${salePrice || 4.99}</div>
                        {/* <div className={styles.originalPrice}>$<s>{originalPrice || 8.99}</s></div>
                        <div className={styles.percentageOff}>${percentageOff || 50}% off</div> */}
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.primaryBtn}>
                            {
                                buyPromptBtn || <PrimaryBtn
                                    title={'Buy Prompt'}
                                    height={'100%'}
                                    width={'100%'}
                                />
                            }
                        </div>
                        <div className={styles.cartIcon} onClick={cartClickFunc}>
                            <CartIcon
                                width={'100%'}
                            />
                        </div>
                    </div>
                </div>

                <p className={styles.note}>
                    After purchase use this prompt in {aiTool || 'Dall-E'} to get desired result.
                </p>
            </div>




        </div>
    )
}

export default PromptDetail