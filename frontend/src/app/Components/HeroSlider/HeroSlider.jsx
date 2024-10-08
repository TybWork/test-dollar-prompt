import { useState, useEffect } from 'react';
import styles from '@/app/Components/HeroSlider/HeroSlider.module.css'; // Ensure this path is correct

const HeroSlider = ({ slidesArray }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = slidesArray || ['slide1', 'slide2', 'slide3'];
    const totalSlides = slides.length;

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 6000);

        return () => clearInterval(autoSlide);
    }, [currentIndex]);

    const showSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    return (
        <div className={styles.slider}>
            <div className={styles.gradientDivLeft}></div>
            <div className={styles.gradientDivRight}></div>

            <div className={styles.slides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className={`${styles.slide} ${currentIndex === index ? styles.active : ''}`}>
                        {slide}
                    </div>
                ))}
            </div>
            <div className={styles.dots}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                        onClick={() => showSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
