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

const CreateUser = () => {
    const router = useRouter();
    const users = {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
    }
    const [user, setuser] = useState(users);
    const [isPasswordHidden, setisPasswordHidden] = useState(true)


    // function to get input handle
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
    }

    // function to handle submit
    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup`, user)
        setuser(users)
        router.push('/login')
    }

    const showPassword = () => {
        isPasswordHidden ? setisPasswordHidden(false) : setisPasswordHidden(true)
    }

    return (
        <div className={styles.container}>
            <Image src="/assets/imageAssets/dollarprompt-mobile-logo.svg" width={0} height={0} className={styles.logo} sizes="100vw" alt="site-logo" />
            {/* heading */}
            <h1 className={styles.heading}>Create An Account</h1>
            <form onSubmit={submitForm} action="" className={styles.formContainer}>

                <InputField name="firstName" id="firstName" onchangeFunc={inputHandler} placeholder="First Name *" value={user.firstName} />

                <InputField name="lastName" id="lastName" onchangeFunc={inputHandler} placeholder="Last Name *" value={user.lastName} />

                <InputField name="country" id="country" onchangeFunc={inputHandler} placeholder="Country *" value={user.country} />

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

                <div className={styles.genderInputContainer}>
                    <div className={styles.genderInput}>
                        <input type="radio" id="male" name="gender" value="male" onChange={inputHandler} />
                        <label htmlFor="male">Male</label><br />

                        <input type="radio" id="female" name="gender" value="female" onChange={inputHandler} />
                        <label htmlFor="female">Female</label><br />
                    </div>
                </div>

                <input className={styles.submitBtn} type="submit" value="Signup" />

                {/* borderbottom  */}
                <hr className={styles.borderBottom} />
            </form>

            {/* google button */}
            {/* <button className={styles.googleBtn}>
                <Image src="/assets/icons/googleIcon.png" width={30} height={30} alt="site-logo" />
                Google
            </button> */}

            {/* terms & condition */}
            <div className={styles.terms}>By creating an account, you agree to our <Link href="/tandcs">terms of service.</Link></div>

            {/* already have account */}
            <Link className={styles.link} href="/login">I already have an account</Link>
        </div>
    )
}
export default CreateUser;