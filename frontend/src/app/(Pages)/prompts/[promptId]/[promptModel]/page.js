'use client';
import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller';
import styles from '@/app/(Pages)/prompts/[promptId]/prompts.module.css';
import Link from 'next/link';
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews';
import PromptDetail from '@/app/Components/(updatedDesignComp)/PromptDetail/PromptDetail';
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard';
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading';
import Archieve from '@/app/Components/(liteComponents)/ArchievesDownload/Archieve';
import Loading from '@/app/Components/(liteComponents)/Loading/Loading';
import axios from 'axios';

import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import LoadingCircle from '@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle';
import { useLikeQuery } from '@/app/utilities/hooks/useCartQuery';

const Page = ({ params }) => {
    const { promptId, promptModel } = params;
    const [fetchPrompts, setfetchPrompts] = useState(null)

    const { data } = useLikeQuery(promptId, promptModel)
    console.log('amdata', data)

    const [prompt, setPrompt] = useState(null);
    const [id, setId] = useState('');
    const [sellerProfile, setSellerProfile] = useState(null);
    const [isUser, setisUser] = useState(false)

    const queryClient = useQueryClient();

    const cartMutation = useMutation({
        mutationFn: async () => {
            const token = getTokenFunction().token;
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/add`,
                {
                    items: [{ promptId }],
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.log('Error:', error);
        },
    });

    useEffect(() => {
        const cookie = getTokenFunction().cookie;
        if (cookie) {
            const newUser = jwtDecode(cookie).userId;
            setId(newUser);
            setisUser(true)
        }
        else {
            setisUser(false)
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptModel}/get/${promptId}`)
            .then((response) => {
                setPrompt(response.data);
            });
    }, [promptId, promptModel]);

    useEffect(() => {
        const fetchSellerProfile = async () => {
            if (prompt?.userId) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${prompt.userId}&withPrompts=false`);
                    const prompts = await axios.get(
                        // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dall-e/get?${query}`
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/major-filter?category=${promptModel}&sort=trending`
                    );
                    setSellerProfile(response.data);
                    setfetchPrompts(prompts.data)
                } catch (error) {
                    console.error("Error fetching seller data:", error);
                }
            }
        };

        fetchSellerProfile();
    }, [prompt]);

    if (!prompt && !fetchPrompts && !sellerProfile) {
        return <LoadingCircle />;
    }

    const profileImage = sellerProfile?.profileImage && sellerProfile?.profileImage.length > 0 ? sellerProfile?.profileImage[0] : null;


    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.profileInfo}>
                    <AboutSeller
                        profileHandle={sellerProfile?.profileHandle}
                        profileImage={profileImage}
                        linkToProfile={`/profile/${prompt.userId}`}
                    />
                    <p className={styles.sellerDescription}>
                        {sellerProfile?.profileDescription}
                        {/* {sellerProfile.profileDescription} <Link href={`/profile/${sellerProfile.userId}`}>read more</Link> */}
                    </p>

                    {/* ...............reviews component................ */}

                    {/* <Reviews /> */}
                </div>

                <PromptDetail
                    aiTool={prompt.promptType}
                    imgArray={prompt.Image_Url}
                    promptModel={promptModel}
                    promptTitle={prompt.title}
                    promptDescription={prompt.description}
                    examplePrompts={prompt.examplePrompts}
                    version={prompt.version || prompt.gptPromptType}
                    salePrice={prompt.price}
                    cartClickFunc={() => cartMutation.mutate()}
                    buyPromptBtn={<Archieve userId={prompt.userId} promptId={promptId} promptData={prompt} promptType={prompt.promptType.toLowerCase()} isUser={isUser} />}
                    views={prompt.views}
                    likes={data.likes}
                    shares={prompt.shares}
                    promptId={promptId}
                    visiterId={id}
                />
            </div>

            <div className={styles.promptSlider}>
                <ContentWithHeading
                    title={'Trending Prompts'}
                    linkText={'View All'}
                    link={'/market'}
                    content={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                flexWrap: 'wrap',
                                width: '100%'
                            }}
                        >
                            {
                                fetchPrompts &&
                                fetchPrompts?.map((e, index) => (
                                    <div key={index} className={styles.adaptive}>
                                        <AdaptiveCard
                                            category={e.promptType}
                                            mainImage={e.Image_Url[0]}
                                            title={e.title}
                                            promptUrl={`/prompts/${e._id}/${(e.promptType).toLowerCase()}`}
                                            promptType={e.promptType}
                                            promptId={e._id}
                                            views={e.views}
                                            likes={e.likes}
                                            shares={e.shares}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Page;
