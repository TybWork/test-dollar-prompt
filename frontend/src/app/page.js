'use client';
import styles from '@/app/page.module.css'
import HeroSlider from './Components/HeroSlider/HeroSlider';
import AdaptiveCard from './Components/AdaptiveCard/AdaptiveCard';
export default function Home() {

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

        {/* right side text in slider */}
        {/* <div className={styles.slider}></div> */}
        <HeroSlider />
      </div>
      <AdaptiveCard />
    </div>
  );
}