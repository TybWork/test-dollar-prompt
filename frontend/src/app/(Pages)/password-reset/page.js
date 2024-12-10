'use client'
import React from 'react'
import styles from '@/app/(Pages)/password-reset/passwordReset.module.css'
import Image from 'next/image';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
const page = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [msg, setMsg] = useState(null);
    const [isPwdMatch, setisPwdMatch] = useState(true)

    const id = searchParams.get('id')
    const token = searchParams.get('token')

    console.log(`topId${id} topToken=${token}`)

    // toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordHidden(prev => !prev);
    };

    // onChange handler
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    console.log(user)

    const submitForm = async (e) => {
        e.preventDefault()

        if (!id && !token) {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/password-change/passwordreset`, user)
        } else {
            if (user.password !== user.confirmPassword) {
                setisPwdMatch(false)
                return;
            }
            else {
                setisPwdMatch(true)
                console.log(id, token)
                await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/password-change/${id}/${token}`, user)
                router.push('/login')
            }
        }
    }

    return (
        <div className={styles.container}>
            <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={0} height={0} className={styles.logo} sizes="100vw" alt="site-logo" />
            <h1 className={styles.heading}>Forgot Password</h1>
            <form onSubmit={submitForm} className={styles.formContainer}>

                {
                    !id && !token ? (
                        <InputField
                            isError={error.email}
                            errorMsg={error.email}
                            name="email"
                            id="email"
                            onchangeFunc={inputHandler}
                            placeholder="Email *"
                            value={user.email}
                            outlineColor={error.email ? 'red' : 'var(--homeMainBtn)'}
                        />
                    ) : (
                        <div className={styles.passwordFields}>
                            <InputField
                                isError={error.password}
                                errorMsg={error.password}
                                name="password"
                                id="password"
                                onchangeFunc={inputHandler}
                                placeholder="Password *"
                                type={isPasswordHidden ? 'password' : 'text'}
                                value={user.password}
                                showIcon={true}
                                Icon={isPasswordHidden ? IoEyeSharp : IoEyeOffSharp}
                                onIconClick={togglePasswordVisibility}
                                outlineColor={error.password ? 'red' : 'var(--homeMainBtn)'}
                            />
                            <InputField
                                isError={error.password}
                                errorMsg={error.password}
                                name="confirmPassword"
                                id="confirmPassword"
                                onchangeFunc={inputHandler}
                                placeholder="Confirm Password *"
                                type={isPasswordHidden ? 'password' : 'text'}
                                value={user.confirmPassword}
                                showIcon={true}
                                Icon={isPasswordHidden ? IoEyeSharp : IoEyeOffSharp}
                                onIconClick={togglePasswordVisibility}
                                outlineColor={error.password ? 'red' : 'var(--homeMainBtn)'}
                            />

                            <span style={{ display: isPwdMatch ? 'none' : 'block' }} className={styles.error}>{'Passwords must be matched'}</span>
                        </div>
                    )
                }
                <div
                    className={styles.error}>
                    {msg}
                </div>

                <input className={styles.submitBtn} type="submit" value={!id && !token ? "Send Reset Email" : 'Reset Password'} />
            </form>
        </div>
    );
}

export default page;