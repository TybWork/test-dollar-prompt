'use client'
import Filter from '@/app/Components/Filter/Filter';
import styles from '@/app/(Pages)/market/market.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/Components/(liteComponents)/Loading/Loading';
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard';

const Page = () => {
  const [filterObject, setFilterObject] = useState({
    category: 'all',
    sort: 'trending'
  });
  const [promptData, setPromptData] = useState(null);

  // Function to fetch data based on filters
  const fetchData = async () => {
    try {
      const query = new URLSearchParams(filterObject).toString();
      console.log(query)
      const response = await axios.get(
        // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dall-e/get?${query}`
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/major-filter?${query}`
      );
      setPromptData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Refetch data whenever filters are updated
  useEffect(() => {
    fetchData();
  }, [filterObject]);

  if (!promptData) {
    return <Loading />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterComponent}>
        {/* Pass setFilterObject to Filter */}
        <Filter setFilterObject={setFilterObject} />
      </div>
      <div className={styles.leftContainer}>
        {promptData.map((item, index) => (
          <AdaptiveCard
            key={index}
            mainImage={item.Image_Url[0]}
            category={item.promptType}
            title={item.title}
            promptUrl={`/prompts/${item._id}/${item.promptType.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
