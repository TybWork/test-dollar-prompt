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

const PromptsTab = ({ isSellerComp = true }) => {
    const [promptsArr, setPromptsArr] = useState([]);
    const [activeTabId, setActiveTabId] = useState(0);
    const [status, setstatus] = useState('active')
    const [sellerId, setsellerId] = useState('')
    const [sellerHandle, setsellerHandle] = useState('')
    const [category, setcategory] = useState('dall-e')


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
        setcategory(category.toLowerCase())
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (sellerId) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fetch-user-logs?status=${status}&userId=${sellerId}`);
                    if (response?.data) {
                        setPromptsArr(isSellerComp ? response.data.sellingHistory : response.data.buyingHistory);
                    } else {
                        setPromptsArr([]);
                    }
                }
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/all-filterd-prompt?promptType=${category}&promptStatus=${status}&userId=${sellerId}`);
            } catch (error) {
                console.log('Error fetching prompts:', error);
                setPromptsArr([]);
            }
        };
        fetchData()
    }, [sellerId, status])

    if (!promptsArr) return <div>Loading...</div>

    console.log(promptsArr)
    // delete prompt function
    async function promptDeleteFunc(id) {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${category}/delete/${id}`)
        setPromptsArr((prevPrompts) => prevPrompts.filter((prompt) => prompt._id !== id))
    }

    return (
        <div className={styles.parentContainer}>
            <ul style={{ display: isSellerComp ? 'flex' : 'none' }} className={styles.ul}>
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
                {/* <option value="dalle" key="dalle">Dall-E</option>
                <option value="midjourney" key="midjourney">Midjourney</option>
                <option value="gpt" key="gpt">GPT</option> */}
            </select>

            {/* prompts container */}
            <div className={styles.promptsContainer}>
                <div className={styles.innerContainer}>
                    {
                        promptsArr ? (
                            promptsArr[category]?.map((prompt, index) => (
                                <AdaptiveCard
                                    key={index}
                                    isSeller={isSellerComp}
                                    title={prompt.title}
                                    promptType={category.toLocaleLowerCase()}
                                    mainImage={prompt?.Image_Url?.[0]}
                                    updatePromptLink={`/user/${sellerHandle}/updateprompt/${category}/${prompt._id}`}
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
