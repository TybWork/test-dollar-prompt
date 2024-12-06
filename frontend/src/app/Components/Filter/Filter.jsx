'use client'
import styles from '@/app/Components/Filter/Filter.module.css';
import SingleFilter from '../(liteComponents)/SingleFilter/SingleFilter';

const Filter = ({ setFilterObject }) => {
    const handleFilterChange = (key, value) => {
        // Update the filterObject in the parent
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
                <SingleFilter label="Dall-E" name="category" onClick={() => handleFilterChange('category', 'dall-e')} />
                <SingleFilter label="Midjourney" name="category" onClick={() => handleFilterChange('category', 'midjourney')} />
                <SingleFilter label="GPT" name="category" onClick={() => handleFilterChange('category', 'gpt')} />
                <SingleFilter label="All" name="category" onClick={() => handleFilterChange('category', 'all')} />

                {/* Type */}
                {/* <div className={styles.heading}>Type</div>
                <SingleFilter label="All" name="type" onClick={() => handleFilterChange('type', 'all')} />
                <SingleFilter label="Image" name="type" onClick={() => handleFilterChange('type', 'image')} />
                <SingleFilter label="Text" name="type" onClick={() => handleFilterChange('type', 'text')} /> */}

                {/* Sort by */}
                <div className={styles.heading}>Sort by</div>
                <SingleFilter label="Trending" name="sort" onClick={() => handleFilterChange('sort', 'trending')} />
                <SingleFilter label="Most Popular" name="sort" onClick={() => handleFilterChange('sort', 'popular')} />
                <SingleFilter label="Newest" name="sort" onClick={() => handleFilterChange('sort', 'newest')} />
            </div>
        </div>
    );
};

export default Filter;