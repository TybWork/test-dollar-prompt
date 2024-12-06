'use client'
import styles from '@/app/Components/Filter/Filter.module.css';
import SingleFilter from '../(liteComponents)/SingleFilter/SingleFilter';
import { useState } from 'react';

const Filter = ({ setFilterObject }) => {
    const [selectedCategory, setselectedCategory] = useState('dall-e')
    const [selectedSort, setselectedSort] = useState('trending')
    const handleFilterChange = (key, value) => {
        setFilterObject((prev) => ({
            ...prev,
            [key]: value
        }));
    };


    return (
        <div className={styles.parentContainer}>
            <div>
                {/* products */}
                <div className={styles.heading}>Product</div>
                <SingleFilter
                    label="Dall-E"
                    name="category"
                    isChecked={selectedCategory === 'dall-e'}
                    onClick={() => (
                        setselectedCategory('dall-e'),
                        handleFilterChange('category', 'dall-e')
                    )}
                />
                <SingleFilter
                    label="Midjourney"
                    name="category"
                    isChecked={selectedCategory === 'midjourney'}
                    onClick={() => (
                        setselectedCategory('midjourney'),
                        handleFilterChange('category', 'midjourney')
                    )}
                />
                <SingleFilter
                    label="GPT"
                    name="category"
                    isChecked={selectedCategory === 'gpt'}
                    onClick={() => (
                        setselectedCategory('gpt'),
                        handleFilterChange('category', 'gpt')
                    )}
                />
                <SingleFilter
                    label="All"
                    name="category"
                    isChecked={selectedCategory === 'all'}
                    onClick={() => (
                        setselectedCategory('all'),
                        handleFilterChange('category', 'all')
                    )}
                />

                {/* Sort by */}
                <div className={styles.heading}>Sort by</div>
                <SingleFilter
                    label="Trending"
                    name="sort"
                    isChecked={selectedSort === 'trending'}
                    onClick={() => (
                        setselectedSort('trending'),
                        handleFilterChange('sort', 'trending')
                    )}
                />
                <SingleFilter
                    label="Most Popular"
                    name="sort"
                    isChecked={selectedSort === 'popular'}
                    onClick={() => (
                        setselectedSort('popular'),
                        handleFilterChange('sort', 'popular')
                    )}
                />
                <SingleFilter
                    label="Newest"
                    name="sort"
                    isChecked={selectedSort === 'newest'}
                    onClick={() => (
                        setselectedSort('newest'),
                        handleFilterChange('sort', 'newest')
                    )}
                />
            </div>
        </div>
    );
};

export default Filter;