'use client'
import React, { useEffect } from 'react'
import styles from "@/app/(Pages)/dallprompt/[promptid]/page.module.css"
import Image from 'next/image';
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import Favourites from '@/app/Components/Favourites/Favourites';
import IconText from '@/app/Components/(liteComponents)/IconText/IconText';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { HiMiniPaintBrush } from "react-icons/hi2";
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import Loading from '@/app/Components/(liteComponents)/Loading/Loading';
import Archieve from '@/app/Components/(liteComponents)/ArchievesDownload/Archieve';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

const page = ({ params }) => {
    const { promptid } = params;



    const [prompt, setPrompt] = useState(null)
    const [heart, setheart] = useState(true)
    const [id, setId] = useState('')
    // function to store data on local storage
    const localStorageFunc = () => {
        const token = getTokenFunction().token
        return async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/add`, {
                "items": [
                    { "promptId": promptid }
                ],
            },
                {
                    headers: {
                        'Authorization': token
                    }
                },
            )
        }
    }
    const queryClient = useQueryClient()
    const cartMutation = useMutation({
        mutationFn: localStorageFunc(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.log('Error:', error);
        },
    });
    useEffect(() => {
        const cookie = getTokenFunction().cookie
        if (cookie) {
            const newUser = jwtDecode(cookie).userId
            setId(newUser)
        }
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dalle/get/${promptid}`)
            .then((response) => {
                setPrompt(response.data)
            })
    }, [promptid])

    if (!prompt) {
        return <Loading />
    }



    // save prompt to local storage


    // formate createdAt date 
    function formateCreateAt(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
    }

    function heartFunc() {
        console.log('heart clicked')
        setheart(prev => !prev)
        console.log(window.Notification)
    }

    return (
        <div className={styles.mainContainer}>
            {/* leftContainer */}
            <div className={styles.leftContainer}>
                <div className={styles.favouriteIcon} onClick={heartFunc}>
                    {
                        heart ? <CiHeart className={styles.favouriteIcon} /> : <FaHeart className={styles.favouriteIcon} style={{ fontSize: '30px' }} />
                    }
                </div>
                {/* background Hero Image */}
                <div className={styles.imageGradient}>
                    <img src={prompt.Image_Url[0]} />
                    <div className={styles.gradient}></div>
                    <div className={styles.logo}>
                        <IconText text="⛵" icon={prompt.promptType} />
                    </div>
                </div>

                <h1 className={styles.heading}>{prompt.title}
                </h1>
                {/* image section */}
                <div className={styles.smallImageSection}>
                    <Image alt={prompt.title} className={styles.image} src={prompt.Image_Url[0]} width={90} height={40} />

                    {/* favourites Container */}
                    <Favourites icon={<IoMdHeart />} text="Favourites" />

                    {/* views container */}
                    <Favourites icon={<MdRemoveRedEye />} text="Favourites" />
                </div>
                {/* other info  */}
                <div className={styles.verifiedInfo}>
                    <IconText text="58" icon="words" />
                    <IconText text="Tested" icon={<RiVerifiedBadgeFill />} />
                    <IconText text="Tips" icon={<RiVerifiedBadgeFill />} />
                    <IconText text="HQ images" icon={<RiVerifiedBadgeFill />} />
                    <IconText text={<HiMiniPaintBrush />} icon={<RiVerifiedBadgeFill />} />
                </div>

                {/* designerInfo */}
                <div className={styles.designerInfoContainer}>
                    <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={25} height={25} alt='logo'/>
                    <div className={styles.designerSocialHandle}><Link href={`/profile/${prompt.userId}`}>@{(prompt.userId).slice(0, 5)}</Link></div>
                </div>

                {/* prompt info */}
                <div className={styles.promptDescription}>
                    {prompt.description}
                </div>

                {/* price */}
                <div className={styles.price}><span>$</span>{prompt.price}</div>

                {/* Get your prompt */}
                <div className={styles.getPromptContainer}>
                    {/* Archieve download button */}
                    <Archieve promptId={promptid} />

                    {/* Add to Cart button */}
                    <div className={styles.cartContainer}>
                        <MdOutlineAddShoppingCart className={styles.cart} onClick={() => cartMutation.mutate()} />
                    </div>
                </div>

                {/* purchasing benefits */}
                <div className={styles.purchasingBenefits}>
                    After purchasing, you will gain access to the prompt file which you can use with DALL·E or the app builder. You'll receive 20 free generation credits with this purchase. By purchasing this prompt, you agree to our terms of service.
                </div>

                {/* creation date */}
                <div className={styles.timeStamp}>{formateCreateAt(prompt.createdAt)}</div>

            </div>

            {/* right container */}
            <div className={styles.rightContainer}>
                {
                    prompt.Image_Url.map((imageUrl, index) =>
                        <Image key={index} src={imageUrl} width={0} height={0} sizes='100vw' style={{ width: '100%', height: 'auto', borderRadius: '10px' }} alt={index + 1} />
                    )
                }
            </div>
        </div >
    )
}

export default page