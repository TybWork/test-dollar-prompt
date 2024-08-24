'use client'
import React from 'react'
import MasterLogin from './master-login/MasterLogin'
import { useState } from 'react'
import MasterPanel from './master-panel/MasterPanel'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const page = () => {
    const [step, setstep] = useState(1)

    const [user, setuser] = useState({ email: "", password: "" })
    const getvalue = (e) => {
        // console.log(e.target.name, ":", e.target.value)
        const { name, value } = e.target
        setuser(prev => ({ ...prev, [name]: value }));
        console.log(user)
    }
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
            {step === 0 ? <MasterLogin onSubmit={submitForm} onChange={getvalue} /> : <MasterPanel />}
        </div>
    )
}

export default page