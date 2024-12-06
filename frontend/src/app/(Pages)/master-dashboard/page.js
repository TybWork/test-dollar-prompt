'use client'
import React, { useEffect } from 'react'
import MasterLogin from './master-login/MasterLogin'
import { useState } from 'react'
import MasterPanel from './master-panel/MasterPanel'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { buttons } from '@/app/jsonFiles/dashboardCategoryBtns'
import DashboardHeader from '@/app/Components/DashboardHeader/DashboardHeader'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'

const page = () => {
    const [step, setstep] = useState(0)
    const [userId, setuserId] = useState('')
    const [profileHandle, setprofileHandle] = useState('')
    const [profile, setprofile] = useState({})
    const [userRole, setuserRole] = useState('')

    const [user, setuser] = useState({ email: "", password: "" })
    const getvalue = (e) => {
        const { name, value } = e.target
        setuser(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if (getTokenFunction().cookie) {
            const adminToken = getTokenFunction().cookie
            const decodedToken = jwtDecode(adminToken)
            setprofileHandle(decodedToken.profileHandle)
            setuserId(decodedToken.userId)
            setuserRole(decodedToken.userRole)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (getTokenFunction().cookie) {

                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${userId}`);
                        setprofile(response.data)

                    } catch (err) {
                        console.error("Error fetching seller data:", err);
                    }
                };
                fetchData();

                try {
                    if (userRole === 'super-admin') {
                        setstep(1)
                    } else {
                        setstep(0)
                    }
                } catch (error) {
                    alert("You don't have permission")
                }
                setstep(1)
            } else {
                setstep(0)
            }
        }
    }, [userId])

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/super-admin/login`, user,
                {
                    withCredentials: true
                }
            )
            document.cookie = `token=${response.data.token}; path=/; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;

            const decodedToken = jwtDecode(response.data.token)
            const role = decodedToken.userRole

            if (role === 'super-admin') {
                setstep(1)
            }
            else {
                alert('access denied!!')
            }

        } catch (error) {
            alert(error.response?.data?.msg || 'Login failed');
            setstep(0)
        }
    }

    return (
        <div>
            {step === 0 ? <MasterLogin onSubmit={submitForm} onChange={getvalue} /> : <MasterPanel headerComponent={<DashboardHeader imgUrl={profile.profileImage && profile.profileImage.length > 0 ? profile.profileImage[0] : '/assets/imageAssets/ceo_dollarprompt.PNG'} profileUpdateUrl={`/user/${profileHandle}/profile-update`} />} buttonMaping={buttons.superAdmin} />}
        </div>
    )
}

export default page