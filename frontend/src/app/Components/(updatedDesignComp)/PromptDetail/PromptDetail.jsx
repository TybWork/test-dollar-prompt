'use client'
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
import { jwtDecode } from 'jwt-decode'
import Archieve from '../../(liteComponents)/ArchievesDownload/Archieve'
const PromptDetail = ({ promptModel = 'dall-e', slug, promptData }) => {

    const router = useRouter()
    const [isShare, setisShare] = useState(false)
    const [isLiked, setisLiked] = useState(null)
    const [visiterId, setvisiterId] = useState(null)
    const [isLogedIn, setisLogedIn] = useState(false)
    const { data } = useLikeQuery(promptModel, slug)

    const shareFunc = () => {
        setisShare(prev => !prev)
    }

    useEffect(() => {
        const cookie = getTokenFunction().cookie;
        if (cookie) {
            const logedInUser = jwtDecode(cookie).userId;
            setvisiterId(logedInUser)
            setisLogedIn(true)
        }
    }, [])

    const likeFunc = async () => {
        if (!visiterId) {
            router.push('/login')
        } else {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/interactions/like?userId=${visiterId}&id=${promptData._id}&type=${promptModel.toLocaleLowerCase()}`)
            if (response.data.message === 'Liked') {
                setisLiked(true)
            } else {
                setisLiked(false)
            }
        }
    }

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
            const findItem = response.data.likedPrompts[promptModel.toLocaleLowerCase()].some((item) => item._id === promptData._id)
            if (findItem) {
                setisLiked(true)
            } else {
                setisLiked(false)
            }
        }
        if (visiterId) {
            fetchpromptId();
        }
    }, [visiterId, promptData._id, promptModel, data])

    return (
        <div className={styles.promptDetail}>
            <div
                style={{
                    transform: `translateX(-50%) ${isShare ? 'scale(1)' : 'scale(0)'}`
                }}
                className={styles.shareContainer}>
                <ShareWidget isCross={true} crossFunc={() => setisShare(prev => !prev)} url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prompts/${promptModel.toLocaleLowerCase()}/${slug}`} />
            </div>

            {/* ......1.ai tool....... */}
            <span className={styles.aiToolBadge}>{promptData.promptType || 'Dall-E'}</span>

            {/* prompt images */}
            <div className={styles.promptImages}>
                {
                    promptModel === 'dall-e' || promptModel === 'midjourney' ? (
                        promptData?.Image_Url && promptData?.Image_Url.slice(0, 3).map((imgUrl, index) =>
                            <Image alt='prompt-image' key={index} width={0} height={0} sizes='100vw' className={styles.img} src={imgUrl} />
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
                <h3 className={styles.title}>{promptData.title || 'Vintage Junk Journal Pages'}</h3>
                <p className={styles.promptDescription}>
                    {promptData.description || 'This prompt generates beautiflly depicitions of vintage junk journal pages. These Nostalgic and textured desing can be used for scrapbooking , journaling ,invitations , or create projects , adding a rustic and timless touch to any collection.'}
                </p>
            </div>

            {/*............. SampleTextComp display on logic base ............*/}
            {/* <SampleTextPromptComp samplePromptsArr={examplePrompts} promptType={promptModel} /> */}

            {/* .........category......... */}
            <div className={styles.categoryContainer}>
                {
                    (() => {
                        if (promptData.promptType === 'Dall-E' || promptData.promptType === 'GPT') {
                            return <div className={styles.category}>
                                Version: <span>{promptData.version || promptData.gptPromptType || '0'}</span>
                            </div>
                        } else {
                            return null
                        }
                    })()
                }
                <div className={styles.authenticity}>
                    <span>Tested</span>
                    <VerifiedIcon width={'16px'} />
                </div>
            </div>


            {/* .........parameters......... */}
            <div className={styles.parametersContainer}>
                <IconWithText
                    icon={<EyeIcon stroke={'var(--homeMainBtn)'} width='20px' />}
                    text={promptData.views || '0'}
                />
                <IconWithText
                    doHover={true}
                    icon={
                        <HeartIcon fill={isLiked ? 'var(--homeMainBtn)' : 'none'} width='20px' stroke={'var(--homeMainBtn)'} />
                    }
                    text={data?.likes || '0'}
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
                        <div className={styles.originalPrice}>$<s>{promptData.price || 8.99}</s></div>
                        <div className={styles.percentageOff}>Free</div>
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.primaryBtn}>
                            <Archieve userId={promptData.userId} promptId={prompt._id} slug={slug} promptData={promptData} promptType={promptModel} isUser={isLogedIn} />
                        </div>
                        {/* <div className={styles.cartIcon} onClick={cartClickFunc}>
                            <CartIcon
                                width={'100%'}
                            />
                        </div> */}
                    </div>
                </div>

                <p className={styles.note}>
                    After purchase use this prompt in <span>{promptData.promptType || 'Dall-E'}</span> to get desired result.
                </p>
            </div>
        </div>
    )
}

export default PromptDetail;