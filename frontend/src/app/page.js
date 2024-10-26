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

const categoriesArr = [
  {
    url: '/',
    title: 'AI News'
  },
  {
    url: '/',
    title: 'Marketing Prompts'
  },
  {
    url: '/',
    title: 'Midjourney Prompts'
  },
  {
    url: '/',
    title: 'ChatGPT Prompts'
  },
  {
    url: '/',
    title: 'Leonardo AI Prompts'
  },
  {
    url: '/',
    title: 'Stable Diffusion Prompts'
  },
  {
    url: '/',
    title: 'Dall-E Prompts'
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

  console.log(isOverflowHidden)

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
                <AdaptiveCard />
                <AdaptiveCard />
                <AdaptiveCard />
              </div>,
              <div style={{ display: 'flex', gap: '8px' }}>
                <AdaptiveCard />
                <AdaptiveCard />
                <AdaptiveCard />
              </div>,
              <div style={{ display: 'flex', gap: '8px' }}>
                <AdaptiveCard />
                <AdaptiveCard />
                <AdaptiveCard />
              </div>,
            ]
          } />
      </div>

      {/* main categories section */}
      <div className={styles.categoriesSection}>
        <ShowAllSection
          title={' '}
          leftGradientWidth={'0px'}
          rightGradientWidth={'0px'}
          content={
            <div className={styles.btnsContainer}>
              {
                categoriesArr.map((btn) =>
                  <NewCategoryBtn url={btn.url} text={btn.title} />
                )
              }
            </div>
          }
        />
      </div>

      {/* Trending prompts */}
      <div className={styles.promptsSection} >

        {/* main categories section */}
        <ShowAllSection
          title={'Trending Prompts'}
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
      </div>

      {/* Featured Prompt Engineers section */}
      <div className={styles.promptsSection}>

        {/* main categories section */}
        <ShowAllSection
          title={'Featured Prompt Engineers'}
          content={
            <div className={styles.cardContainer}>
              {
                categoriesArr.slice(0, 5).map((btn) =>
                  <div className={styles.adaptive}>
                    <FeaturedCardNew />
                  </div>
                )
              }
            </div>
          }
        />

      </div>


      {/* Chat GPT prompts */}
      <div className={styles.promptsSection}>

        {/* main categories section */}
        <ShowAllSection
          title={'Chat GPT prompts'}
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

      </div>
      {/* prompts section */}
      <div className={styles.promptsSection}>

        {/* Dall-E Prompts section */}
        <ShowAllSection
          title={'Dall-E Prompts'}
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

      </div>
      {/* prompts section */}
      <div className={styles.promptsSection}>

        {/* Stable Diffusion section */}
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

      </div>
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
      />

    </div >
  );
}