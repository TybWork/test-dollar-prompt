import React, { useEffect, useState } from 'react'
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
import { useLikeQuery } from '@/app/utilities/hooks/useCartQuery'
import CartIcon from '../../(icons)/CartIcon'
import { MdTextSnippet } from 'react-icons/md'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'
import SampleTextPromptComp from '../../(liteComponents)/SampleTextPromptComp/SampleTextPromptComp'
import ShareWidget from '../../(liteComponents)/ShareWidget/ShareWidget'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useQueryClient, useMutation } from '@tanstack/react-query'
const PromptDetail = ({ promptImageUrl, aiTool, promptTitle, promptDescription, version, promptRating, views, likes, shares, originalPrice, salePrice, percentageOff, cartClickFunc, buyPromptBtn, imgArray, visiterId, promptId, promptModel = 'dall-e', examplePrompts, isUser }) => {

    const router = useRouter()
    const [isShare, setisShare] = useState(false)
    const [isLiked, setisLiked] = useState(null)

    const shareFunc = () => {
        setisShare(prev => !prev)
    }

    const likeFunc = async () => {
        if (!visiterId) {
            router.push('/login')
        } else {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/interactions/like?userId=${visiterId}&id=${promptId}&type=${promptModel.toLocaleLowerCase()}`)
            console.log('this is response', response)
            if (response.data.message === 'Liked') {
                setisLiked(true)
            } else {
                setisLiked(false)
            }
        }
    }

    console.log('is liked value', isLiked)

    const queryClient = useQueryClient()
    const likeMutation = useMutation({
        mutationFn: likeFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['like'] });
        },
        onError: (error) => {
            console.log('Error:', error);
        },
    });

    useEffect(() => {
        const fetchpromptId = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fetch-user-logs?userId=${visiterId}&status=active&isLiked=true`)
            const findItem = response.data.likedPrompts[promptModel.toLocaleLowerCase()].some((item) => item._id === promptId)
            if (findItem) {
                setisLiked(true)
            } else {
                setisLiked(false)
            }
        }
        if (visiterId) {
            fetchpromptId();
        }
    }, [visiterId, promptId, promptModel])

    return (
        <div className={styles.promptDetail}>
            <div
                style={{
                    transform: `translateX(-50%) ${isShare ? 'scale(1)' : 'scale(0)'}`
                }}
                className={styles.shareContainer}>
                <ShareWidget isCross={true} crossFunc={() => setisShare(prev => !prev)} url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prompts/${promptId}/${promptModel.toLocaleLowerCase()}`} />
            </div>

            {/* ......1.ai tool....... */}
            <span className={styles.aiToolBadge}>{aiTool || 'Dall-E'}</span>

            {/* prompt images */}
            <div className={styles.promptImages}>
                {
                    promptModel === 'dall-e' || promptModel === 'midjourney' ? (
                        imgArray && imgArray.slice(0, 3).map((imgUrl, index) =>
                            <Image alt='prompt-image' key={index} width={0} height={0} sizes='100vw' className={styles.img} src={promptImageUrl || imgUrl} />
                        )

                    ) :
                        (

                            <div className={styles.iconBg}>
                                <MdTextSnippet />
                            </div>
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

            {/*............. SampleTextComp display on logic base ............*/}
            {/* <SampleTextPromptComp samplePromptsArr={examplePrompts} promptType={promptModel} /> */}

            {/* .........category......... */}
            <div className={styles.categoryContainer}>
                <div className={styles.category}>
                    Version: <span>{version || ''}</span>
                </div>
                <div className={styles.authenticity}>
                    <span>Tested</span>
                    <VerifiedIcon width={'16px'} />
                </div>
            </div>


            {/* .........parameters......... */}
            <div className={styles.parametersContainer}>
                <IconWithText
                    icon={<EyeIcon stroke={'var(--homeMainBtn)'} width='20px' />}
                    text={views || '0'}
                />
                <IconWithText
                    doHover={true}
                    icon={
                        <HeartIcon fill={isLiked ? 'var(--homeMainBtn)' : 'none'} width='20px' stroke={'var(--homeMainBtn)'} />
                    }
                    text={likes || '0'}
                    onClick={() => likeMutation.mutate()}
                />

                <IconWithText
                    doHover={true}
                    icon={<ArrowIcon width='20px' fill={'var(--homeMainBtn)'} />}
                    text={''}
                    onClick={shareFunc}
                />
            </div>

            <div className={styles.lastSection}>
                {/* horizontal rule */}
                <hr className={styles.hr} />

                {/* buttonSection */}
                <div className={styles.btnSection}>
                    <div className={styles.priceSection}>
                        {/* <div className={styles.salePrice}>${salePrice || 4.99}</div> */}
                        {/* <div className={styles.originalPrice}>$<s>{originalPrice || 8.99}</s></div> */}
                        <div className={styles.originalPrice}>$<s>{salePrice || 8.99}</s></div>
                        <div className={styles.percentageOff}>Free</div>
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.primaryBtn}>
                            {buyPromptBtn}
                        </div>
                        {/* <div className={styles.cartIcon} onClick={cartClickFunc}>
                            <CartIcon
                                width={'100%'}
                            />
                        </div> */}
                    </div>
                </div>

                <p className={styles.note}>
                    After purchase use this prompt in {aiTool || 'Dall-E'} to get desired result.
                </p>
            </div>
        </div>
    )
}

export default PromptDetail;