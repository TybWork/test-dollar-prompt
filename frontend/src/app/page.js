'use client';
import styles from '@/app/page.module.css'
import HeroSlider from './Components/HeroSlider/HeroSlider';
import AdaptiveCard from './Components/AdaptiveCard/AdaptiveCard';
import FeaturedCardNew from './Components/FeaturedCardNew/FeaturedCardNew';
import NewCategoryBtn from './Components/(updatedDesignComp)/NewCategoryBtn/NewCateogryBtn';
import ShowAllSection from './Components/(updatedDesignComp)/ShowAllSection/ShowAllSection';
import GearIcon from './Components/(icons)/GearIcon';
import Image from 'next/image';
import PrimaryBtn from './Components/(liteComponents)/PrimaryBtn/PrimaryBtn';
import NewInput from './Components/(updatedDesignComp)/NewInput/NewInput';
import GuestHeader from './Components/(updatedDesignComp)/GuestHeader/GuestHeader';
import NewFooter from './Components/(updatedDesignComp)/NewFooter/NewFooter';

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
  return (
    <div className={styles.parentContainer}>
      <GuestHeader />
      <div className={styles.heroSlider}>
        {/* left side text in slider */}
        <div className={styles.content}>
          <h1>A curated Marketplace to Buy & sell AI prompts</h1>
          <p>Dollar Prompts is a dynamic platform to buy and sell AI-powered prompts
            for Midjourney, ChatGPT, Leonardo AI, Stable Diffusion, and more, with
            over 130,000 curated prompts. List your AI prompts, and let buyers
            Dollarize Your Prompts to see your side hustle grow.</p>
        </div>

        {/* right side text in slider */}
        {/* <div className={styles.slider}></div> */}
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
      <ShowAllSection
        title={' '}
        leftGradientWidth={'0px'}
        rightGradientWidth={'0px'}
        padding={'0px var(--mainPadding)'}
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

      {/* Trending prompts */}
      <div className={styles.promptsSection}>

        {/* main categories section */}
        <ShowAllSection
          title={'Trending Prompts'}
          content={
            <div className={styles.cardContainer}>
              {
                categoriesArr.slice(0, 5).map((btn) =>
                  <AdaptiveCard />
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
                  <FeaturedCardNew />
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
                  <AdaptiveCard />
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
                  <AdaptiveCard />
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
                  <AdaptiveCard />
                )
              }
            </div>
          }
        />

      </div>
      {/* <AdaptiveCard />
      <FeaturedCardNew /> */}


      {/* timeline section */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineContent}>
          <h2 >Make your AI enthusiasm work and sell the AI prompts you've created.</h2>
          <p>Dollar Prompts is where AI creators can shine. Upload your best prompts, set your price, and get paid effortlessly when they sell. Build your brand and make your AI work for you.</p>
        </div>

        {/* timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <Image className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
            <div className={styles.timelineItemContent}>
              <h3>Easy Account Setup</h3>
              <span>Create your account in minutes and start selling AI prompts.</span>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Image className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
            <div className={styles.timelineItemContent}>
              <h3>Earn as You Create</h3>
              <span>Get paid automatically when your prompts sell.</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <Image className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
            <div className={styles.timelineItemContent}>
              <h3>Effortless Payments</h3>
              <span>Get paid automatically when your prompts sell.</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <PrimaryBtn width={'100%'} title={'SignUp'} />
          </div>

        </div>

      </div>


      {/* email newsletter section */}
      <div className={styles.newsletterContainer}>
        <h2>
          AI Growth Starts Here: Get News & Join Our Creative Community
        </h2>
        <p>
          We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Subscribe for regular AI news, updates, and tips. Join our growing community
        </p>

        <div className={styles.emailCredentials}>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <NewInput placeholder={'Name'} />
            </div>
            <div className={styles.input}>
              <NewInput placeholder={'Email'} />
            </div>
          </div>
          <PrimaryBtn title={'Subscribe'} width={'256px'} height={'48px'} />
        </div>

        <div className={styles.info}>By signing up you are agreeing our Term of use and Privacy policy</div>

      </div>

      {/* footer section */}
      {/* <NewFooter /> */}

    </div>
  );
}