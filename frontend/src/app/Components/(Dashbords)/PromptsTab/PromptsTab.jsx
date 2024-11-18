'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/Components/(Dashbords)/PromptsTab/PromptsTab.module.css'
import { getTokenFunction } from '@/app/utilities/getTokenFunction';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import SellerPromptCard from '../../SellerPromptCard/SellerPromptCard';
import AdaptiveCard from '../../AdaptiveCard/AdaptiveCard';
import Loading from '../../(liteComponents)/Loading/Loading';
import UnverifiedPromptsComponent from '../(adminComponents)/UnverifiedPromptsComponent/UnverifiedPromptsComponent';
import PromptsOnDropDown from '../PromptsOnDropDown/PromptsOnDropDown';

const PromptsTab = () => {
    const [promptsArr, setPromptsArr] = useState([]);
    const [activeTabId, setActiveTabId] = useState(0);
    const [status, setstatus] = useState('active')
    const [sellerId, setsellerId] = useState('')
    const [sellerHandle, setsellerHandle] = useState('')
    const [category, setcategory] = useState('Dall-E')


    // get seller detail
    useEffect(() => {
        const token = getTokenFunction().cookie
        const decode = jwtDecode(token)
        setsellerId(decode.userId)
        setsellerHandle(decode.profileHandle)
    }, [])

    const tabBtns = [
        {
            id: 0,
            title: 'Active'
        },
        {
            id: 1,
            title: 'Pending'
        },
        {
            id: 2,
            title: 'Rejected'
        }
    ];

    const detectTab = (id) => {
        setActiveTabId(id);
        if (id === 0) {
            setstatus('active')
        } else if (id === 1) {
            setstatus('pending')
        } else {
            setstatus('paused')
        }
    };

    function selectCategory(e) {
        const category = e.target.value;
        setcategory(category)
        console.log(category)
    }

    console.log(category, status, sellerId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dalle/filter/?userId=${sellerId}&&status=${status}`);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/all-filterd-prompt?promptType=${category}&promptStatus=${status}&userId=${sellerId}`);
                if (response.data && Array.isArray(response.data)) {
                    setPromptsArr(response.data);
                } else {
                    setPromptsArr([]);
                }
            } catch (error) {
                console.error('Error fetching prompts:', error);
                setPromptsArr([]);
            }
        };
        fetchData()
    }, [sellerId, status, category])

    if (!promptsArr) return <div>Loading...</div>
    console.log('promptsArr', promptsArr)
    console.log(category, status, sellerId)

    // delete prompt function
    async function promptDeleteFunc(id) {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL} / api / prompt / dalle / delete/${id}`)
        setPromptsArr((prevPrompts) => prevPrompts.filter((prompt) => prompt._id !== id))
    }

    return (
        <div className={styles.parentContainer}>
            <ul className={styles.ul}>
                {tabBtns.map((btn) => (
                    <li
                        key={btn.id}
                        onClick={() => detectTab(btn.id)}
                        style={{
                            background: activeTabId === btn.id ? 'var(--homeMainBtn)' : 'var(--homePrimaryClr)',
                            color: activeTabId === btn.id ? 'var(--homePrimaryClr)' : 'var(--homeMainBtn)'
                        }}
                    >
                        {btn.title}
                    </li>
                ))}
            </ul>

            {/* select prompt type div */}
            <select onChange={selectCategory} className='select' defaultValue="Dall-E" name="categories" id="categories">
                <option key="select category" value="select category" disabled>Select Category</option>
                <option value="Dall-E" key="Dall-E">Dall-E</option>
                <option value="Midjourney" key="Midjourney">Midjourney</option>
                <option value="GPT" key="GPT">GPT</option>
            </select>

            {/* prompts container */}
            <div className={styles.promptsContainer}>
                <div className={styles.innerContainer}>
                    {
                        promptsArr && promptsArr.length > 0 ? (
                            promptsArr.map((prompt, index) => (
                                // <SellerPromptCard
                                //     previewPromptLink={`/dallprompt/${prompt._id}`}
                                //     updatePromptLink={`/user/${sellerHandle}/updateprompt/${prompt._id}`}
                                //     deletePromptFunc={() => promptDeleteFunc(prompt._id)}
                                //     key={index}
                                //     label={prompt.promptType}
                                //     image={Array.isArray(prompt.Image_Url) && prompt.Image_Url.length > 0 ? prompt.Image_Url[0] : ''}
                                //     description={prompt.description}
                                // />

                                <AdaptiveCard
                                    key={index}
                                    title={prompt.title}
                                    promptType={category.toLocaleLowerCase()}
                                    mainImage={prompt?.Image_Url?.[0]}
                                    isSeller={true}
                                    updatePromptLink={`/user/${sellerHandle}/updateprompt/${prompt._id}`}
                                    deletePromptFunc={() => promptDeleteFunc(prompt._id)}
                                    promptId={prompt._id}
                                    userHandle={sellerHandle}
                                    category={category}
                                    promptUrl={`/prompts/${prompt._id}/${category.toLocaleLowerCase()}`}

                                />
                                // <PromptsOnDropDown promptStatus={'pending'} />
                            ))
                        ) : (
                            <p className={styles.promptsMessage}>Looks like there are no <span>{status}</span> prompts right now!!</p>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default PromptsTab;
