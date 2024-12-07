'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle.module.css';

const LoadingCircle = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % 3); // Cycles through 0, 1, 2
        }, 200);
        return () => clearInterval(interval);
    }, []);

    console.log(index)

    return (
        <div className={styles.mainContainer}>
            <div className={styles.parent}>
                {
                    Array.from({ length: index + 1 }).map((_, i) => (
                        <span key={i}></span>
                    ))
                }
            </div>
        </div>
    );
};

export default LoadingCircle;
