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

    const [user, setuser] = useState({ email: "", password: "" })
    const getvalue = (e) => {
        // console.log(e.target.name, ":", e.target.value)
        const { name, value } = e.target
        setuser(prev => ({ ...prev, [name]: value }));
        console.log(user)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const adminToken = getTokenFunction().cookie
            if (adminToken) {
                try {
                    const decodedToken = jwtDecode(adminToken)
                    if (decodedToken.userRole === 'super-admin') {
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
    }, [])

    const submitForm = async (e) => {
        console.log('submit btn triggered')
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/super-admin/login`, user,
                {
                    withCredentials: true
                }
            )
            document.cookie = `token=${response.data.token}; path=/; httpOnly; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;

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
            {step === 0 ? <MasterLogin onSubmit={submitForm} onChange={getvalue} /> : <MasterPanel headerComponent={<DashboardHeader />} buttonMaping={buttons.superAdmin} />}
        </div>
    )
}

export default page