'use client'
import React, { useState, useEffect } from 'react'
import styles from '@/app/Components/(Dashbords)/PromptsOnDropDown/PromptsOnDropDown.module.css'
import axios from 'axios'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'

const PromptsOnDropDown = ({ promptStatus }) => {
    const [category, setcategory] = useState('Dall-E')
    const [promptData, setpromptData] = useState([])

    function selectCategory(e) {
        const category = e.target.value;
        setcategory(category)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/getprompt?promptType=${category}&status=${promptStatus}`, {
                headers: {
                    'Authorization': getTokenFunction().token
                },
                withCredentials: true
            })
            setpromptData(response.data)
        }
        fetchData()
    }, [category, promptStatus])

    return (
        <div className={styles.parentContainer}>
            <select onChange={selectCategory} className='select' defaultValue="Dall-E" name="categories" id="categories">
                <option key="select category" value="select category" disabled>Select Category</option>
                <option value="Dall-E" key="Dall-E">Dall-E</option>
                <option value="Midjourney" key="Midjourney">Midjourney</option>
                <option value="GPT" key="GPT">GPT</option>
            </select>

            {/* prompts type */}
            <div className={styles.promptsContainer}>
                {
                    promptData.map((prompt, index) =>
                        // <ReviewCard key={index} label={e.promptType} image={e?.Image_Url?.[0]} description={`${e.description.slice(0, 48)}...`} href={`/admin/review/${(e.promptType).toLowerCase()}/${e._id}`} promptType={e.promptType} />
                        <AdaptiveCard
                            key={index}
                            mainImage={Array.isArray(prompt.Image_Url) && prompt.Image_Url.length > 0 ? prompt.Image_Url[0] : ''}
                            isSeller={true}
                            deletePromptFunc={() => promptDeleteFunc(prompt._id)}
                            promptId={prompt._id}
                            userHandle={sellerHandle}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default PromptsOnDropDown