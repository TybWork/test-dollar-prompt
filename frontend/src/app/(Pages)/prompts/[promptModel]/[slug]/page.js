import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller';
import styles from '@/app/(Pages)/prompts/[promptModel]/prompts.module.css';
import Link from 'next/link';
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews';
import PromptDetail from '@/app/Components/(updatedDesignComp)/PromptDetail/PromptDetail';
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard';
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading';
import Archieve from '@/app/Components/(liteComponents)/ArchievesDownload/Archieve';

import LoadingCircle from '@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle';
import { fetchDataFunc } from '@/app/utilities/fetchDataFunc';

const Page = async ({ params }) => {
    const { promptModel, slug } = await params;

    // const [prompt, setPrompt] = useState(null);
    // const [id, setId] = useState('');
    // const [sellerProfile, setSellerProfile] = useState(null);
    // const [isUser, setisUser] = useState(false)

    // const queryClient = useQueryClient();

    // const cartMutation = useMutation({
    //     mutationFn: async () => {
    //         const token = getTokenFunction().token;
    //         await axios.post(
    //             `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/add`,
    //             {
    //                 items: [{ slug }],
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //     },

    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['cart'] });
    //     },
    //     onError: (error) => {
    //         console.log('Error:', error);
    //     },
    // });

    let { data: prompt } = await fetchDataFunc(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptModel}/filter?slug=${slug}`)
    prompt = prompt[0]
    const { data: sellerProfile } = await fetchDataFunc(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${prompt.userId}&withPrompts=false`)
    const { data: fetchPrompts } = await fetchDataFunc(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/major-filter?category=${promptModel}&sort=trending`)


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
                    promptData={prompt}
                    promptModel={promptModel}
                    slug={prompt.slug}
                // cartClickFunc={() => cartMutation.mutate()}
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
                                            promptUrl={`/prompts/${(e.promptType).toLowerCase()}/${e.slug}`}
                                            promptType={e.promptType}
                                            promptId={e._id}
                                            views={e.views}
                                            shares={e.shares}
                                            slug={e.slug}
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
