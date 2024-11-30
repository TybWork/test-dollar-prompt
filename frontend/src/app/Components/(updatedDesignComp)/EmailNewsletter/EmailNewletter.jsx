import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/EmailNewsletter/EmailNewsletter.module.css'
import NewInput from '../NewInput/NewInput'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import Link from 'next/link'
const EmailNewletter = ({ title, description, btnText, msg, leftInputPlaceholder, rightInputPlaceholder, onChange, firstFieldName, secondeFieldName, formTitle }) => {

    async function handleSubmit(event) {
        alert('function clicked')
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_EMAIL_SECRET);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
        }
    }

    return (
        <div className={styles.newsletterContainer}>
            <div className={styles.headerSection}>
                <h2>
                    {
                        title || 'AI Growth Starts Here: Get News & Join Our Creative Community'
                    }
                </h2>
                <p>
                    {description || "We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Subscribe for regular AI news, updates, and tips. Join our growing community"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.emailCredentials}>
                <div className={styles.inputsContainer}>
                    <input type='hidden' name='form_title' value={formTitle || 'Email Newsletter'} />
                    <div className={styles.input}>
                        <NewInput
                            placeholder={leftInputPlaceholder || 'Name'}
                            onChange={onChange}
                            fieldName={firstFieldName}
                        />
                    </div>
                    <div className={styles.input}>
                        <NewInput
                            placeholder={rightInputPlaceholder || 'Email'}
                            onChange={onChange}
                            fieldName={secondeFieldName}
                        />
                    </div>
                </div>
                <div className={styles.primaryBtnContainer}>
                    <PrimaryBtn isSubmitBtn={true} title={btnText || 'Subscribe'} width={'100%'} height={'100%'} />
                </div>
            </form>

            <div className={styles.info}>{msg || <div className={styles.message}>By signing up you are agreeing our <Link href="/tandcs">Term of Use</Link> and <Link href="/privacy-policy">Privacy Policy</Link></div>}</div>

        </div>
    )
}

export default EmailNewletter