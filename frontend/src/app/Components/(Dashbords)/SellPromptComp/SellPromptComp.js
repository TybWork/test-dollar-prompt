'use client'
import { useState, useEffect } from "react"
import First from "./firststep/First"
import Second from "./secondstep/Second"
import Dall3 from "./ThirdStep/dall/Dall3"
import Gpt3 from "./ThirdStep/gpt/Gpt3"
import StepsCounter from "@/app/Components/(liteComponents)/StepsCounter/StepsCounter"
import styles from '@/app/(Pages)/user/[username]/sell/sell.module.css'
import SelectCountry from "./fourthstep/SelectCountry"
import axios from "axios"
import Leonardo from "./ThirdStep/leonardo/Leonardo"
import Llama from "./ThirdStep/Llama/Llama"
import Midjourney from "./ThirdStep/Midjourney/Midjourney"
import StableDiffusion from "./ThirdStep/StableDiffusion/StableDiffusion"
import { getTokenFunction } from "@/app/utilities/getTokenFunction.js"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode"

const SellPromptComp = () => {
    const router = useRouter()
    const [step, setstep] = useState(1);
    const [selected, setselected] = useState('');
    const [counter, setcounter] = useState(20);
    const [stepCount, setstepCount] = useState(1)
    const [user, setuser] = useState({})
    const [data, setdata] = useState(user)
    const [file, setfile] = useState([])
    const [url, seturl] = useState('')
    const [profileHandle, setprofileHandle] = useState('')
    const [role, setrole] = useState('user')

    useEffect(() => {
        const myToken = getTokenFunction().cookie
        const myDecodeToken = jwtDecode(myToken)
        const myProfileHandle = myDecodeToken.profileHandle
        setprofileHandle(myProfileHandle)
        setrole(myDecodeToken.userRole)
    }, [])

    // next button handle
    function handleNext() {
        setstep((prev) => prev + 1)
        setcounter(prev => prev + 20)
        setstepCount(prev => prev + 1)
    }

    // previous button handle
    function handlePrev() {
        if (stepCount < 2) {
            setstepCount(1)
        } else {
            setstep(prev => prev - 1)
            setcounter(prev => prev - 20)
            setstepCount(prev => prev - 1)
        }
    }

    function handleSelect(select) {
        const seletedValue = select.target.value;
        setselected(`${seletedValue}`)
    }

    const imageChangeFunc = (selectedFiles) => {
        handleOnchange({ target: { name: 'myfiles', value: selectedFiles, type: 'file' } });

    };

    // this function will append samplePrompts object to mainobject when gpt is active 
    function getSamplePromptFunc(myObj) {
        if (selected == "GPT" || selected === "Llama" || selected === "Midjourney" || selected === "Stable Diffusion") {
            setuser(prevUser => ({ ...prevUser, examplePrompts: myObj }))
        }
    }
    function handleOnchange(changeVal) {
        const { name, value, type } = changeVal.target;

        if (type === 'file') {
            setfile(value);
            setuser(prevUser => ({ ...prevUser, [name]: value }));
        } else {
            setuser(prevUser => ({ ...prevUser, [name]: value }));
        }
        setdata(user);
    }

    console.log('this is whole data', user)

    // get sample prompts

    useEffect(() => {
        // set url on base of ai model
        if (selected === "Dall-E") {
            seturl('/api/prompt/dalle/create')
        }
        else if (selected === 'Midjourney') {
            seturl('/api/prompt/midjourney/create')
        }
        else if (selected === "GPT") {
            seturl('/api/prompt/gpt/create')
        }
        else if (selected === "Leonardo Ai") {
            seturl('/api/prompt/midjourney/create')
        }
        else if (selected === "Llama") {
            seturl('/api/prompt/midjourney/create')
        } else if (selected === "Stable Diffusion") {
            seturl('/api/prompt/diffusion/create')
        }
        // else {
        // }
    }, [selected])


    // role transfer function

    const refreshCookie = async (userId, userRole) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/refreshcookie`, {
                userId,
                userRole,
            }, {
                withCredentials: true
            });
            return response.data.newToken; // Return the new token
        } catch (error) {
            console.error('Failed to refresh cookie', error);
            throw error; // Throw error to be handled in caller
        }
    };

    // Handle becoming a seller
    const becomeSeller = async () => {
        const token = getTokenFunction().cookie;
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const newToken = await refreshCookie(userId, 'seller'); // Await the token refresh
            document.cookie = `token=${newToken}; path=/; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`; // Update cookie
        } catch (error) {
            console.error('Failed to decode token or become seller', error);
        }
    };

    const handleSubmit = async () => {

        const payload = user;

        const formData = new FormData();
        for (const key in user) {
            if (key === 'myfiles') {
                Array.from(user[key]).forEach(file => formData.append(key, file));
            } else {
                formData.append(key, user[key]);
            }
        }

        toast.promise(
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
                selected === "GPT" ? payload : formData
                , {
                    headers: {
                        'Authorization': getTokenFunction().token,
                        'Content-Type': selected === 'GPT' ? 'application/json' : undefined
                    },
                    withCredentials: true
                }),
            {
                pending: 'Prompt Submitting...',
                success: 'Prompt submitted and is under review...',
                error: 'Failed to post data!'
            }
        )
            .then(async response => {
                if (role === 'user' || role === '') {
                    await becomeSeller()

                    setTimeout(() => {
                        window.location.href = `/user/${profileHandle}/buyer-dashboard/seller`
                    }, 2300);
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
            });
    };

    return (
        <div className={styles.parentContainer}>
            <ToastContainer />
            <StepsCounter stepCount={stepCount} onPrev={handlePrev} width={counter} />
            {step === 1 && <First onNext={handleNext} />}
            {step === 2 && <Second onSelect={handleSelect} onNext={handleNext} onChange={handleOnchange} />}

            {/* *************conditional rendering (step3)*********** */}

            {/* dalle prompt sell */}
            {selected === "Dall-E" && step >= 3 && (
                <div>
                    {step === 3 && <Dall3 onNext={handleNext} onChange={handleOnchange} imgFunc={imageChangeFunc} />}
                </div>
            )}

            {/* dalle prompt sell */}
            {selected === "GPT" && step >= 3 && (
                <div>
                    {step === 3 && <Gpt3 onNext={handleNext} onChange={handleOnchange} promptSamples={getSamplePromptFunc} />}
                </div>
            )}

            {/* Leonardo prompt sell */}
            {selected === "Leonardo Ai" && step >= 3 && (
                <div>
                    {step === 3 && <Leonardo onNext={handleNext} onChange={handleOnchange} imgFunc={imageChangeFunc} />}
                </div>
            )}

            {/* Leonardo prompt sell */}
            {selected === "Llama" && step >= 3 && (
                <div>
                    {step === 3 && <Llama onNext={handleNext} onChange={handleOnchange} promptSamples={getSamplePromptFunc} />}
                </div>
            )}

            {/* Midjourney prompt sell */}
            {selected === "Midjourney" && step >= 3 && (
                <div>
                    {step === 3 && <Midjourney onNext={handleNext} onChange={handleOnchange} imgFunc={imageChangeFunc} />}
                </div>
            )}

            {/* stable diffusion prompt sell */}
            {selected === "Stable Diffusion" && step >= 3 && (
                <div>
                    {step === 3 && <StableDiffusion onNext={handleNext} onChange={handleOnchange} imgFunc={imageChangeFunc} />}
                </div>
            )}

            {/* ************* select Country (step4)*********** */}
            {step === 4 && <SelectCountry onClick={handleSubmit} />}

        </div >
    )
}

export default SellPromptComp;