'use client'
import axios from "axios";
import { useState } from "react";
import styles from '@/app/(Pages)/signup/signup.module.css'
import Image from "next/image";
import InputField from "@/app/Components/(liteComponents)/InputField/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import { signupValidation } from "@/app/clientValidations/clientValidations";

const CreateUser = () => {
    const router = useRouter();
    const users = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: ""
    };
    const [user, setUser] = useState(users);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState({});

    // Helper function for input handling
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // Validate the form using Zod
    const validateForm = () => {
        try {
            signupValidation.parse(user); // Validate the user data with the Zod schema
            return {};  // Return an empty object if validation is successful
        } catch (error) {
            // Return the validation errors if any
            const formErrors = error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;  // Format errors into an object
                return acc;
            }, {});
            return formErrors;
        }
    }

    // Submit form function
    const submitForm = async (e) => {
        e.preventDefault();

        // Validate form before submission
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);  // Show errors
            return;  // Don't proceed with the form submission
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup`, user);
            setUser(users);  // Reset user state
            setError(false);
            alert('Please check your inbox for a verification email and click the link to verify your account.')
            // router.push('/login');
        } catch (error) {
            setError(true);
            setMsg(error.response?.data?.msg || "Something went wrong");
        }
    }

    const showPassword = () => {
        setIsPasswordHidden(!isPasswordHidden);
    }

    return (
        <div className={styles.container}>
            <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={0} height={0} className={styles.logo} sizes="100vw" alt="site-logo" />
            {/* heading */}
            <h1 className={styles.heading}>Create An Account</h1>
            <form onSubmit={submitForm} className={styles.formContainer}>

                <InputField
                    isError={error.firstName}
                    errorMsg={error.firstName}
                    name="firstName"
                    id="firstName"
                    onchangeFunc={inputHandler}
                    placeholder="First Name *"
                    value={user.firstName}
                    outlineColor={error.firstName ? 'red' : 'var(--homeMainBtn)'}
                />

                <InputField
                    isError={error.lastName}
                    errorMsg={error.lastName}
                    name="lastName"
                    id="lastName"
                    onchangeFunc={inputHandler}
                    placeholder="Last Name *"
                    value={user.lastName}
                    outlineColor={error.lastName ? 'red' : 'var(--homeMainBtn)'}
                />

                <InputField
                    isError={error.country}
                    errorMsg={error.country}
                    name="country"
                    id="country"
                    onchangeFunc={inputHandler}
                    placeholder="Country *"
                    value={user.country}
                    outlineColor={error.country ? 'red' : 'var(--homeMainBtn)'}
                />

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

                <div className={styles.passwordContainer}>
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
                        onIconClick={showPassword}
                        outlineColor={error.password ? 'red' : 'var(--homeMainBtn)'}
                    />
                </div>

                <input className={styles.submitBtn} type="submit" value="Signup" />

                {/* borderbottom */}
                <hr className={styles.borderBottom} />
            </form>

            {/* terms & condition */}
            <div className={styles.terms}>By creating an account, you agree to our <Link href="/tandcs">terms of service.</Link></div>

            {/* already have account */}
            <Link className={styles.link} href="/login">I already have an account</Link>
        </div>
    )
}

export default CreateUser;
