'use client'
import styles from '@/app/(Pages)/user/[username]/updateprompt/[promptType]/[promptid]/updateprompt.module.css'
import FieldInfo from '@/app/Components/(liteComponents)/FieldInfo/FieldInfo';
import TextArea from '@/app/Components/(liteComponents)/TextAreaComponent/TextArea';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import InputImage from '@/app/Components/(liteComponents)/InputImage/InputImage';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/app/Components/(liteComponents)/Loading/Loading';

const Page = () => {
    const router = useRouter();
    const params = useParams()
    const { promptType, promptid } = params;

    const [promptData, setpromptData] = useState(
        () => {
            if (promptType === 'dall-e') {
                return {
                    title: '',
                    description: '',
                    version: '',
                    describePrompt: '',
                    promptInstruction: '',
                    price: '',
                    status: 'pending'
                }
            }
            else if (promptType === 'midjourney') {
                return {
                    title: '',
                    description: '',
                    promptInstructions: '',
                    price: ''
                }
            }
            else if (promptType === 'gpt') {
                return {
                    title: '',
                    description: '',
                    gptType: '',
                    gptPromptType: '',
                    promptInstructions: '',
                    examplePrompts: [],
                    price: '',
                    gptLink: '',
                }
            }
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptType}/get/${promptid}`);
                let fetchedData = response.data;
                console.log('fetchData', fetchData)
                setpromptData(fetchedData);
            } catch (error) {
                console.error('Error fetching prompt data:', error);
            }
        };

        fetchData();
    }, [promptid]);

    // onchange function
    function handleOnChange(event) {
        const { name, value, type, files } = event.target;

        setpromptData((prevData) => {
            if (type === 'file') {
                return { ...prevData, myfiles: files };
            } else {
                return { ...prevData, [name]: value };
            }
        });
    }

    const handleSamplePrompt = (e, index) => {
        const { name, value } = e.target
        const field = name.split('-')[0]

        // setprompt data including sample text
        setpromptData((prevPromptData) => {
            const updatedPrompt = [...prevPromptData.examplePrompts]
            if (field === 'title') {
                updatedPrompt[index].title = value
            } else if (field === 'text') {
                updatedPrompt[index].text = value
            }
            return { ...prevPromptData, examplePrompts: updatedPrompt }
        })
    }

    console.log('promptData', promptData)

    const updateDataFunc = async () => {
        await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptType}/update/${promptid}`, { ...promptData, status: 'pending' })
        router.push(`/`)

        alert("form updated successfully")
        const formData = new FormData();
        for (const key in promptData) {
            if (key === 'myfiles') {
                Array.from(promptData[key]).forEach(file => formData.append(key, file));
            } else {
                formData.append(key, promptData[key]);
            }
        }

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptType}/update/${promptid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
        } catch (error) {
            console.log("myError is here:", error);
        }
    }

    if (!promptData) {
        return <Loading />
    }

    return (
        <div className={styles.parentContainer}>
            <h2 className={styles.heading}>Prompt Details</h2>

            {/*............... dalle prompt update .................*/}
            {
                promptType === 'dall-e' ? (
                    <div>
                        {/* name field */}
                        <div>
                            <FieldInfo title="Title" description="Suggest a title for this prompt." />
                            <InputField
                                placeholder="Movie to Emoji Generator"
                                name="title"
                                id="title"
                                value={promptData.title}
                                onchangeFunc={handleOnChange}
                            />
                        </div>

                        {/* textArea field */}
                        <div>
                            <FieldInfo title="Description" description="Describe what your prompt does to a potential buyer. A more detailed description will increase your sales." />
                            <TextArea
                                placeholder="Movie to Emoji Generator"
                                rows="3"
                                name="description"
                                id="description"
                                margin="0px"
                                value={promptData.description}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* version */}
                        <div>
                            <FieldInfo title="Version" description="Select the version of DALL-E you're using." />
                            <select
                                className="select"
                                value={promptData.version}
                                name="version"
                                id="version"
                                onChange={handleOnChange}
                            >
                                <option key="DALL-E 2" value="DALL-E 2">Dall-E 2</option>
                                <option key="DALL-E 3" value="DALL-E 3">Dall-E 3</option>
                            </select>
                        </div>

                        {/* prompt */}
                        <div>
                            <FieldInfo title="*Prompt" description="Put any variables in [square brackets]." />
                            <TextArea
                                placeholder="An Impressionist oil painting of [Flower] in a purple vase.."
                                rows="18"
                                name="describePrompt"
                                margin="0px"
                                id="describePrompt"
                                value={promptData.describePrompt}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* *Prompt Instructions */}
                        <div>
                            <FieldInfo title="*Prompt Instructions" description="Any extra tips or examples for the buyer on how to use this prompt." />
                            <TextArea
                                placeholder="To get the most out of this prompt you need to.."
                                rows="18"
                                name="promptInstruction"
                                margin="0px"
                                id="promptInstruction"
                                value={promptData.promptInstruction}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* price */}
                        <div>
                            <FieldInfo title="Estimated Price" description="What do you think the price of this prompt should be?" />
                            <div className={styles.pricingContainer}>
                                <select
                                    className="select"
                                    // defaultValue='3.99'
                                    value={promptData.price}
                                    name="price"
                                    id="price"
                                    style={{ width: '100px' }}
                                    onChange={handleOnChange}
                                >
                                    <option key="2.99" value="2.99">$2.99</option>
                                    <option key="3.99" value="3.99">$3.99</option>
                                    <option key="4.99" value="4.99">$4.99</option>
                                    <option key="5.99" value="5.99">$5.99</option>
                                    <option key="6.99" value="6.99">$6.99</option>
                                </select>
                            </div>
                        </div>

                    </div>
                ) : null
            }


            {/*............... Midjourney prompt update .................*/}
            {
                promptType === 'midjourney' ? (
                    <div>
                        {/* name field */}
                        <div>
                            <FieldInfo title="Title" description="Suggest a title for this prompt." />
                            <InputField
                                placeholder="Movie to Emoji Generator"
                                name="title"
                                id="title"
                                value={promptData.title}
                                onchangeFunc={handleOnChange}
                            />
                        </div>

                        {/* textArea field */}
                        <div>
                            <FieldInfo title="Description" description="Describe what your prompt does to a potential buyer. A more detailed description will increase your sales." />
                            <TextArea
                                placeholder="Movie to Emoji Generator"
                                rows="3"
                                name="description"
                                id="description"
                                margin="0px"
                                value={promptData.description}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* *Prompt Instructions */}
                        <div>
                            <FieldInfo title="*Prompt Instructions" description="Any extra tips or examples for the buyer on how to use this prompt." />
                            <TextArea
                                placeholder="To get the most out of this prompt you need to.."
                                rows="18"
                                name="promptInstructions"
                                margin="0px"
                                id="promptInstructions"
                                value={promptData.promptInstructions}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* price */}
                        <div>
                            <FieldInfo title="Estimated Price" description="What do you think the price of this prompt should be?" />
                            <div className={styles.pricingContainer}>
                                <select
                                    className="select"
                                    // defaultValue='3.99'
                                    value={promptData.price}
                                    name="price"
                                    id="price"
                                    style={{ width: '100px' }}
                                    onChange={handleOnChange}
                                >
                                    <option key="2.99" value="2.99">$2.99</option>
                                    <option key="3.99" value="3.99">$3.99</option>
                                    <option key="4.99" value="4.99">$4.99</option>
                                    <option key="5.99" value="5.99">$5.99</option>
                                    <option key="6.99" value="6.99">$6.99</option>
                                </select>
                            </div>
                        </div>

                    </div>
                ) : null
            }


            {/*............................ gpt prompt update ........................*/}

            {
                promptType === 'gpt' ? (
                    <div>
                        {/* name field */}
                        <div>
                            <FieldInfo title="Title" description="Suggest a title for this prompt." />
                            <InputField
                                placeholder="Movie to Emoji Generator"
                                name="title"
                                id="title"
                                value={promptData.title}
                                onchangeFunc={handleOnChange}
                            />
                        </div>

                        {/* gpt Engine */}

                        <div>
                            <FieldInfo
                                title={'*GPT prompt type'}
                                description={'Select what type of GPT prompt this is.'}
                            />

                            {/* gptType  */}
                            <select className='select' defaultValue="chat" value={'chat'} style={{ width: '200px' }} name="gptPromptType" id="gptPromptType" onChange={handleOnChange}>
                                <option key="selectType" value="selectType" disabled>Select Gpt Type</option>
                                {/* <option key="Completion" value="Completion">Completion (Regular Gpt)</option> */}
                                <option key="chat" value="chat">Chat (Chat Gpt)</option>
                            </select>
                        </div>


                        {/* Gpt engine  */}
                        <div className={styles.section}>
                            <FieldInfo
                                title={'*Engine'}
                                description={'What GPT Engine does this prompt use'}
                            />
                            <select className='select' value={promptData.gptPromptType} defaultValue="disabled" style={{ width: '200px' }} name="gptPromptType" id="gptPromptType" onChange={handleOnChange}>
                                <option value="disabled" disabled>Select Gpt engine</option>
                                <option value="Chat gpt-4o">Chat gpt-4o</option>
                                <option value="Chat gpt-4-turbo">Chat gpt-4-turbo</option>
                                <option value="Chat gpt-4">Chat gpt-4</option>
                                <option value="Chat gpt-3.5-turbo">Chat gpt-3.5-turbo</option>
                            </select>
                        </div>


                        {/* instructions */}
                        <div>
                            <FieldInfo title="Description" description="Describe what your prompt does to a potential buyer. A more detailed description will increase your sales." />
                            <TextArea
                                placeholder="Movie to Emoji Generator"
                                rows="3"
                                name="description"
                                id="description"
                                margin="0px"
                                value={promptData.description}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* *Prompt Instructions */}
                        <div>
                            <FieldInfo title="*Prompt Instructions" description="Any extra tips or examples for the buyer on how to use this prompt." />
                            <TextArea
                                placeholder="To get the most out of this prompt you need to.."
                                rows="18"
                                name="promptInstructions"
                                margin="0px"
                                id="promptInstructions"
                                value={promptData.promptInstructions}
                                onChange={handleOnChange}
                            />
                        </div>

                        {/* samples container */}
                        <div className={styles.sampleContainer}>
                            <FieldInfo title="Prompt Samples" description="Each sample must have a title and sample text" />
                            {
                                promptData?.examplePrompts?.map((samples, index) =>
                                    <div key={index}>
                                        <FieldInfo title={`Sample ${index + 1}`} description="" />
                                        <InputField
                                            placeholder="Title..."
                                            name={`title-${index}`}
                                            id="title"
                                            value={samples.title}
                                            onchangeFunc={(e) => handleSamplePrompt(e, index)}

                                        />
                                        <TextArea
                                            name={`text-${index}`}
                                            id='description'
                                            placeholder={'Sample prompt...'}
                                            rows={7}
                                            value={samples.text}
                                            onChange={(e) => handleSamplePrompt(e, index)}
                                        />
                                    </div>
                                )
                            }
                        </div>


                        {/* price */}
                        <div>
                            <FieldInfo title="Estimated Price" description="What do you think the price of this prompt should be?" />
                            <div className={styles.pricingContainer}>
                                <select
                                    className="select"
                                    // defaultValue='3.99'
                                    value={promptData.price}
                                    name="price"
                                    id="price"
                                    style={{ width: '100px' }}
                                    onChange={handleOnChange}
                                >
                                    <option key="2.99" value="2.99">$2.99</option>
                                    <option key="3.99" value="3.99">$3.99</option>
                                    <option key="4.99" value="4.99">$4.99</option>
                                    <option key="5.99" value="5.99">$5.99</option>
                                    <option key="6.99" value="6.99">$6.99</option>
                                </select>
                            </div>
                        </div>

                        {/* gpt link  */}
                        <div>
                            <FieldInfo title="Chat Gpt Share link" description='Copy the "Share chat" link to you using this prompt in ChatGPT.' />
                            <InputField
                                placeholder="https://chatgpt.com/share/00000000-0000-0000-0000-0000000000"
                                name="gptLink"
                                id="gptLink"
                                value={promptData.gptLink}
                                onchangeFunc={handleOnChange}
                            />
                        </div>

                    </div>
                ) : null
            }


            {/* *Example images */}
            {/* <div>
                <InputImage onChange={handleOnChange} />
            </div> */}
            <GradientButton title="Update Prompt" onClick={updateDataFunc} />
        </div>
    );
};
export default Page;
