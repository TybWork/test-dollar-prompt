'use client';
import styles from '@/app/page.module.css'
import HeroSlider from './Components/HeroSlider/HeroSlider';
import AdaptiveCard from './Components/AdaptiveCard/AdaptiveCard';
import FeaturedCardNew from './Components/FeaturedCardNew/FeaturedCardNew';
import NewCategoryBtn from './Components/(updatedDesignComp)/NewCategoryBtn/NewCateogryBtn';
import ShowAllSection from './Components/(updatedDesignComp)/ShowAllSection/ShowAllSection';
import PrimaryBtn from './Components/(liteComponents)/PrimaryBtn/PrimaryBtn';
import NewInput from './Components/(updatedDesignComp)/NewInput/NewInput';
import { useRef, useEffect, useState } from 'react';
import Timeline from './Components/(updatedDesignComp)/Timeline/Timeline';
import EmailNewletter from './Components/(updatedDesignComp)/EmailNewsletter/EmailNewletter';
import axios from 'axios';
import Loading from './Components/(liteComponents)/Loading/Loading';
import LoadingCircle from './Components/(liteComponents)/LoadingCircle/LoadingCircle';

const categoriesArr = [
  {
    url: '/blog',
    title: 'AI News'
  },
  // {
  //   url: '/',
  //   title: 'Marketing Prompts'
  // },
  {
    url: '/market',
    title: 'Midjourney Prompts'
  },
  {
    url: '/market',
    title: 'GPT Prompts'
  },
  // {
  //   url: '/',
  //   title: 'Leonardo AI Prompts'
  // },
  // {
  //   url: '/',
  //   title: 'Stable Diffusion Prompts'
  // },
  {
    url: '/market',
    title: 'Dall-E Prompts'
  },
  {
    url: '/market',
    title: 'All Prompts'
  },
]

export default function Home() {

  let screenWidth;
  if (typeof window !== 'undefined') {
    screenWidth = window.screen.width
  }

  const targetRef = useRef(null);
  const [isOverflowHidden, setIsOverflowHidden] = useState(false);
  const [timelineScroll, settimelineScroll] = useState(false)
  const [dallePrompts, setdallePrompts] = useState(null)
  const [midjourneyPrompts, setmidjourneyPrompts] = useState(null)
  const [gptPrompts, setgptPrompts] = useState(null)
  const [trendingPrompts, settrendingPrompts] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        if (rect.top <= 300 && rect.bottom >= 0) {
          setIsOverflowHidden(true);
        } else {
          setIsOverflowHidden(false);
        }
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOverflowHidden) {
      document.body.style.overflowY = 'hidden';
      settimelineScroll(false)
      // setIsOverflowHidden(false)
      const timer = setTimeout(() => {
        document.body.style.overflowY = 'scroll';
        settimelineScroll(true)
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflowY = '';
    }
  }, [isOverflowHidden]);


  // .................prompts fetching function................
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const [dalle, midjourney, gpt, trending] = await Promise.all(
          [
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dall-e/filter?status=active`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/midjourney/filter?status=active`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/gpt/get`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/trending`),
          ]
        )
        settrendingPrompts(trending.data)
        setdallePrompts(dalle.data);
        setmidjourneyPrompts(midjourney.data)
        setgptPrompts(gpt.data)
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchPrompts();
  }, []);


  if (!dallePrompts && !trendingPrompts && !midjourneyPrompts && !gptPrompts) return <LoadingCircle />

  // const trendingImg = trendingPrompts?.mainImage[0]
  return (
    <div className={styles.parentContainer}>

      <div className={styles.heroSlider}>
        {/* left side text in slider */}
        <div className={styles.content}>
          <h1>A curated Marketplace to Buy & sell AI prompts</h1>
          <p>Dollar Prompts is a dynamic platform to buy and sell AI-powered prompts
            for Midjourney, ChatGPT, Leonardo AI, Stable Diffusion, and more, with
            over 130,000 curated prompts. List your AI prompts, and let buyers
            Dollarize Your Prompts to see your side hustle grow.</p>
        </div>
        <HeroSlider
          slidesArray={
            [
              <div style={{ display: 'flex', gap: '8px' }}>
                {
                  dallePrompts?.slice(0, 3).map((dalle, index) =>
                    <AdaptiveCard
                      key={index}
                      mainImage={dalle.Image_Url[0]}
                      promptUrl={`/prompts/${dalle.promptType.toLowerCase()}/${dalle.slug}`}
                      title={dalle.title}
                      promptId={dalle._id}
                      category={dalle.promptType}
                      promptType={dalle.promptType}
                      likes={dalle.likes}
                      views={dalle.views}
                      shares={dalle.shares}
                      slug={dalle.slug}
                    />
                  )
                }
              </div>,
              <div style={{ display: 'flex', gap: '8px' }}>
                {
                  midjourneyPrompts?.slice(0, 3).map((midjourney, index) =>
                    <AdaptiveCard
                      key={index}
                      mainImage={midjourney.Image_Url[0]}
                      promptUrl={`/prompts/${midjourney.promptType.toLowerCase()}/${midjourney.slug}`}
                      title={midjourney.title}
                      category={midjourney.promptType}
                      promptType={midjourney.promptType}
                      promptId={midjourney._id}
                      views={midjourney.views}
                      likes={midjourney.likes}
                      shares={midjourney.shares}
                      slug={midjourney.slug}
                    />
                  )
                }
              </div>,
              <div style={{ display: 'flex', gap: '8px' }}>
                {
                  trendingPrompts?.slice(0, 3).map((trending, index) =>
                    <AdaptiveCard
                      key={index}
                      mainImage={trending.Image_Url[0]}
                      promptUrl={`/prompts/${trending.promptType.toLowerCase()}/${trending.slug}`}
                      title={trending.title}
                      category={trending.promptType}
                      promptType={trending.promptType}
                      promptId={trending._id}
                      views={trending.views}
                      likes={trending.likes}
                      shares={trending.shares}
                      slug={trending.slug}
                    />
                  )
                }
              </div>,
            ]
          } />
      </div>

      {/* main categories section */}
      <div className={styles.categoriesSection}>
        <div className={styles.btnsContainer}>
          {
            categoriesArr.map((btn, index) =>
              <NewCategoryBtn key={index} url={btn.url} text={btn.title} />
            )
          }
        </div>
      </div>


      {/* Trending prompts */}
      <div className={styles.promptsSection}>
        <ShowAllSection
          title={'Trending Prompts'}
          linkText={'View All Trending Prompts'}
          link={'/market'}
          content={
            <div className={styles.cardContainer}>
              {
                trendingPrompts && trendingPrompts.slice(0, 5).map((trending, index) =>
                  <div className={styles.adaptive} key={index}>
                    <AdaptiveCard
                      mainImage={trending?.Image_Url?.[0]}
                      promptUrl={`/prompts/${trending.promptType.toLowerCase()}/${trending.slug}`}
                      title={trending.title}
                      category={trending.promptType}
                      promptType={trending.promptType}
                      promptId={trending._id}
                      views={trending.views}
                      likes={trending.likes}
                      shares={trending.shares}
                      slug={trending.slug}
                    />
                  </div>
                )
              }
            </div>
          }
        />
      </div>

      {/* Chat GPT prompts */}
      {/* <div className={styles.promptsSection}>
        <ShowAllSection
          title={'GPT prompts'}
          linkText={'View All GPT Prompts'}
          content={
            <div className={styles.cardContainer}>
              {
                gptPrompts && gptPrompts.slice(0, 5).map((gpt, index) =>
                  <div className={styles.adaptive} key={index}>
                    <AdaptiveCard
                      promptType='gpt'
                      promptUrl={`/prompts/${gpt._id}/${gpt.promptType.toLowerCase()}`}
                      title={gpt.title}
                      category={gpt.promptType}
                    />
                  </div>
                )
              }
            </div>
          }
        />

      </div> */}

      {/*dalle prompts section */}
      <div className={styles.promptsSection}>
        <ShowAllSection
          title={'DALL-E Prompts'}
          linkText={'View All DALL-E Prompts'}
          link={'/market'}
          content={
            <div className={styles.cardContainer}>
              {
                dallePrompts && dallePrompts.slice(0, 5).map((dalle, index) =>
                  <div className={styles.adaptive} key={index}>
                    <AdaptiveCard
                      mainImage={dalle.Image_Url[0]}
                      promptUrl={`/prompts/${dalle.promptType.toLowerCase()}/${dalle.slug}`}
                      title={dalle.title}
                      category={dalle.promptType}
                      promptType={dalle.promptType}
                      promptId={dalle._id}
                      views={dalle.views}
                      likes={dalle.likes}
                      shares={dalle.shares}
                      slug={dalle.slug}
                    />
                  </div>
                )
              }
            </div>
          }
        />
      </div>

      {/*midjourney prompts section */}
      <div className={styles.promptsSection}>
        <ShowAllSection
          title={'Midjourney Prompts'}
          linkText={'View All Midjourney Prompts'}
          link={'/market'}
          content={
            <div className={styles.cardContainer}>
              {
                midjourneyPrompts && midjourneyPrompts.slice(0, 5).map((midjourney, index) =>
                  <div className={styles.adaptive} key={index}>
                    <AdaptiveCard
                      mainImage={midjourney.Image_Url[0]}
                      promptUrl={`/prompts/${midjourney.promptType.toLowerCase()}/${midjourney.slug}`}
                      title={midjourney.title}
                      category={midjourney.promptType}
                      promptType={midjourney.promptType}
                      promptId={midjourney._id}
                      views={midjourney.views}
                      likes={midjourney.likes}
                      shares={midjourney.shares}
                      slug={midjourney.slug}
                    />
                  </div>
                )
              }
            </div>
          }
        />
      </div>

      {/* prompts section */}
      {/* <div className={styles.promptsSection}>
        <ShowAllSection
          title={'Stable Diffusion'}
          content={
            <div className={styles.cardContainer}>
              {
                categoriesArr.slice(0, 5).map((btn) =>
                  <div className={styles.adaptive}>
                    <AdaptiveCard />
                  </div>
                )
              }
            </div>
          }
        />
      </div> */}

      {/* <AdaptiveCard />
      <FeaturedCardNew /> */}

      {/* timeline section */}
      <div className={styles.timelineSection}
      >
        <div className={styles.timelineContent}>
          <h2 >Make your AI enthusiasm work and sell the AI prompts you've created.</h2>
          <p>Dollar Prompts is where AI creators can shine. Upload your best prompts, set your price, and get paid effortlessly when they sell. Build your brand and make your AI work for you.</p>
        </div>

        {/* timeline */}
        <div className={styles.timelineCardsContainer}>

          <div className={styles.timelineWraper} ref={targetRef}>
            <Timeline shouldAnimate={isOverflowHidden} />
          </div>
        </div>

      </div>


      {/* email newsletter section */}

      <EmailNewletter
        title={'AI Growth Starts Here: Get News & Join Our Creative Community'}
        description={"We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Subscribe for regular AI news, updates, and tips. Join our growing community"}
        leftInputPlaceholder={'Name'}
        rightInputPlaceholder={'Email Address'}
        firstFieldName={'Name'}
        secondeFieldName={'Email'}
        formTitle={'Email Newsletter'}
        confirmationText={'Subscribed'}
      />
    </div >
  );
}