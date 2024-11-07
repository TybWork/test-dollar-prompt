'use client'
import styles from '@/app/(Pages)/admin/admin.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import ReviewCard from '@/app/Components/reviewCard/ReviewCard'
import Loading from '@/app/Components/(liteComponents)/Loading/Loading'
import { getTokenFunction } from '@/app/utilities/getTokenFunction.js'
import { buttons } from '@/app/jsonFiles/dashboardCategoryBtns'
import Panel from '@/app/Components/(Dashbords)/Panel/Panel'
const page = () => {
    const router = useRouter();
    const [isAdmin, setisAdmin] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cookie = getTokenFunction().cookie
            if (cookie) {
                const decodeCookie = jwtDecode(cookie);
                const userRole = decodeCookie.userRole;

                if (userRole == 'admin') {
                    setisAdmin(true);
                } else {
                    setisAdmin(false);
                    router.push('/');
                }
            } else {
                setisAdmin(false);
                router.push('/login');
            }
        }


    }, [router]);

    if (!isAdmin) return null

    return (
        <div className={styles.parentContainer}>
            <Panel
                buttonMaping={
                    buttons.admin
                }
            />
        </div>
    )
}

export default page