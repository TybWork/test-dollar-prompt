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

const Page = ({ params }) => {
    const { promptId, promptModel } = params;

    const [prompt, setPrompt] = useState(null);
    const [id, setId] = useState('');
    const [sellerProfile, setSellerProfile] = useState({});
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
                    setSellerProfile(response.data);
                } catch (error) {
                    console.error("Error fetching seller data:", error);
                }
            }
        };

        fetchSellerProfile();
    }, [prompt]);

    if (!prompt) {
        return <Loading />;
    }

    const profileImage = sellerProfile.profileImage && sellerProfile.profileImage.length > 0
        ? sellerProfile.profileImage[0]
        : null;


    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.profileInfo}>
                    <AboutSeller
                        profileHandle={sellerProfile.profileHandle}
                        profileImage={profileImage}
                        linkToProfile={`/profile/${prompt.userId}`}
                    />
                    <p className={styles.sellerDescription}>
                        {sellerProfile.profileDescription} <Link href={`/profile/${sellerProfile.userId}`}>read more</Link>
                    </p>
                    <Reviews />
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
                    buyPromptBtn={<Archieve promptId={promptId} promptData={prompt} promptType={prompt.promptType.toLowerCase()} isUser={isUser} />}
                />
            </div>

            <div className={styles.promptSlider}>
                <ContentWithHeading
                    title={'Similar Prompts'}
                    linkText={'View All'}
                    content={
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}>
                            <div className={styles.adaptive}>
                                <AdaptiveCard />
                            </div>
                            {/* Add more AdaptiveCards as needed */}
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Page;
