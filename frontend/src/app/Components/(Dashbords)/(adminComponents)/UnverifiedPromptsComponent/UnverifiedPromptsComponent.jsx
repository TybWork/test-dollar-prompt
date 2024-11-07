'use client'
import React, { useState, useEffect } from 'react'
import styles from '@/app/Components/(Dashbords)/(adminComponents)/UnverifiedPromptsComponent/UnverifiedPromptsComponent.module.css'
import axios from 'axios'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'
import ReviewCard from '@/app/Components/reviewCard/ReviewCard'


const UnverifiedPromptsComponent = () => {
    const [prompt, setprompt] = useState('')
    const [promptData, setpromptData] = useState([])

    function selectCategory(e) {
        const category = e.target.value;
        if (category == 'dalle') {
            setprompt(category)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/getprompt?status=pending&promptType=Dall-E`, {
                headers: {
                    'Authorization': getTokenFunction().token
                },
                withCredentials: true
            })
            setpromptData(response.data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.parentContainer}>
            <select onChange={selectCategory} className='select' defaultValue="select category" name="categories" id="categories">
                <option key="select category" value="select category" disabled>Select Category</option>
                <option value="dalle" key="dalle">Dalle Prompts</option>
                <option value="midjourney" key="midjourney">Midjourney Prompts</option>
            </select>

            {/* prompts type */}
            <div className={styles.promptsContainer}>
                {
                    promptData.map((e, index) =>
                        <ReviewCard key={index} label={e.promptType} image={e.Image_Url[0]} description={`${e.description.slice(0, 48)}...`} onClick={() => router.push(`/admin/review/dalle/${e._id}`)} />
                    )
                }
            </div>
        </div>
    )
}

export default UnverifiedPromptsComponent