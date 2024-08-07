'use client';
import styles from '@/app/(Pages)/admin/admin.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ReviewCard from '@/app/Components/reviewCard/ReviewCard';
import Loading from '@/app/Components/(liteComponents)/Loading/Loading';

const Page = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [promptData, setPromptData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    // Function to get the value of a specific cookie by name
    const getCookieValue = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (typeof window !== 'undefined') {
                const token = getCookieValue('token');

                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        const userRole = decodedToken.userRole;

                        if (userRole === 'admin') {
                            setIsAdmin(true);
                            await fetchData();
                        } else {
                            setIsAdmin(false);
                            router.push('/');
                        }
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        setIsAdmin(false);
                        router.push('/login');
                    }
                } else {
                    setIsAdmin(false);
                    router.push('/login');
                }
            }
        };

        checkAdminStatus();
    }, [router]);

    // Fetch data from the server
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/getprompt?status=pending&promptType=Dall-E`, {
                withCredentials: true,
            });
            setPromptData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error appropriately here
            // e.g., show an error message to the user
        } finally {
            setLoading(false);
        }
    };

    // Render loading state or content
    if (loading) return <Loading />;
    if (!isAdmin) return null;

    return (
        <div className={styles.parentContainer}>
            <select onChange={(e) => setPrompt(e.target.value)} className='select' defaultValue="select category" name="categories" id="categories">
                <option key="select category" value="select category" disabled>Select Category</option>
                <option value="dalle" key="dalle">Dalle Prompts</option>
                <option value="midjourney" key="midjourney">Midjourney Prompts</option>
            </select>

            {/* prompts type */}
            <div className={styles.promptsContainer}>
                {promptData.map((e, index) => (
                    <ReviewCard
                        key={index}
                        label={e.promptType}
                        image={e.Image_Url[0]}
                        description={`${e.description.slice(0, 48)}...`}
                        onClick={() => router.push(`/admin/review/dalle/${e._id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
