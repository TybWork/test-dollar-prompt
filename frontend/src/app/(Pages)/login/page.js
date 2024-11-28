'use client';
import { useState, useRef } from "react";
import styles from '@/app/(Pages)/login/login.module.css';
import Image from "next/image";
import InputField from "@/app/Components/(liteComponents)/InputField/InputField";
import Link from "next/link";
import { post } from "@/app/Services/ApiEndpoint.js";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";

const LoginUser = () => {

    const path = usePathname()

    const [user, setUser] = useState({ email: "", password: "" });
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [captchaToken, setCaptchaToken] = useState('');
    const captchaRef = useRef(null);

    const togglePasswordVisibility = () => {
        setIsPasswordHidden(prev => !prev);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleCaptcha = () => {
        setCaptchaToken(captchaRef.current.getValue());
    };

    const submitForms = async (e) => {
        setCaptchaToken("")
        e.preventDefault();
        const token = captchaToken;
        if (!token) {
            alert(`To proceed, please verify the reCAPTCHA.`)
        } else {
            try {
                const response = await post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, { ...user, token }, {
                    withCredentials: true,
                });
                document.cookie = `token=${response.data.token}; path=/; secure; sameSite=None; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;
                const redirectToPrompt = localStorage.getItem('redirectTo')
                window.location.href = redirectToPrompt || '/';
                captchaRef.current.reset();
            } catch (error) {
                alert(error.response?.data?.msg || 'Login failed');
                captchaRef.current.reset();
            }
        }
    };

    return (
        <div className={styles.container}>
            <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={0} height={0} className={styles.logo} sizes="100vw" alt="site-logo" />
            <h1 className={styles.heading}>Account Login</h1>
            <form onSubmit={submitForms} className={styles.formContainer}>
                <InputField name="email" id="email" onchangeFunc={inputHandler} placeholder="Email *" value={user.email} />
                <div className={styles.passwordContainer}>
                    {isPasswordHidden ? (
                        <IoEyeSharp className={styles.showPassword} onClick={togglePasswordVisibility} />
                    ) : (
                        <IoEyeOffSharp className={styles.showPassword} onClick={togglePasswordVisibility} />
                    )}
                    <InputField name="password" id="password" onchangeFunc={inputHandler} placeholder="Password *" type={isPasswordHidden ? 'password' : 'text'} value={user.password} />
                </div>
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    theme="light"
                    size="normal"
                    ref={captchaRef}
                    onChange={handleCaptcha}
                />
                <input className={styles.submitBtn} type="submit" value="Login" />
                <hr className={styles.borderBottom} />
            </form>
            <button className={styles.googleBtn} >
                <Image src="/assets/icons/googleIcon.png" width={30} height={30} alt="google-logo" />
                Google
            </button>
            <div className={styles.terms}>
                By creating an account, you agree to our <Link href="/tandcs">terms of service.</Link>
            </div>
            <Link className={styles.link} href="/signup">Create a new account</Link>
        </div>
    );
};

export default LoginUser;
