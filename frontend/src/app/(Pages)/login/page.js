'use client'
import { useEffect, useState } from "react";
import styles from '@/app/(Pages)/login/login.module.css'
import Image from "next/image";
import InputField from "@/app/Components/(liteComponents)/InputField/InputField";
import Link from "next/link";
import { post } from "@/app/Services/ApiEndpoint.js";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
const loginUser = () => {
    const users = {
        email: "",
        password: "",
    }
    const [user, setuser] = useState(users);
    const [isPasswordHidden, setisPasswordHidden] = useState(true)

    // useEffect(() => {
    //     if(isPasswordHidden){

    //     }
    // })

    const showPassword = () => {
        isPasswordHidden ? setisPasswordHidden(false) : setisPasswordHidden(true)
    }

    // function to get input handle
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
    }

    // function to handle submit
    const submitForms = async (e) => {
        e.preventDefault();
        try {
            const request = await post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, user, {
                withCredentials: true,
            })
            const response = request.data
            document.cookie = `token=${response.token}; path=/; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
            window.location.href = '/'
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className={styles.container}>
            <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={0} height={0} className={styles.logo} sizes="100vw" alt="site-logo" />
            {/* heading */}
            <h1 className={styles.heading}>Account Login</h1>
            <form onSubmit={submitForms} action="" className={styles.formContainer}>

                <InputField name="email" id="email" onchangeFunc={inputHandler} placeholder="Email *" value={user.email} />

                <div className={styles.passwordContainer} >
                    {
                        isPasswordHidden ? (
                            <IoEyeSharp className={styles.showPassword} onClick={showPassword} />
                        ) : (
                            <IoEyeOffSharp className={styles.showPassword} onClick={showPassword} />
                        )
                    }
                    <InputField name="password" id="password" onchangeFunc={inputHandler} placeholder="Password *" type={isPasswordHidden ? 'password' : 'text'} value={user.password} />
                </div>

                <input className={styles.submitBtn} type="submit" value="Login" />

                {/* borderbottom  */}
                <div className={styles.borderBottom}></div>

                {/* google button */}
            </form>

            <button className={styles.googleBtn}>
                <Image src="/assets/icons/googleIcon.png" width={30} height={30} alt="google-logo" />
                Google
            </button>

            {/* terms & condition */}
            <div className={styles.terms}>By creating an account, you agree to our <Link href="/tandcs">terms of service.</Link></div>

            {/* already have account */}
            <Link className={styles.link} href="/signup">Create a new account</Link>
        </div>
    )
}
export default loginUser;