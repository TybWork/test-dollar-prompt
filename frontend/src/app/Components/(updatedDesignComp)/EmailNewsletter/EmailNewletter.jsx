import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/EmailNewsletter/EmailNewsletter.module.css'
import NewInput from '../NewInput/NewInput'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
import Link from 'next/link'
const EmailNewletter = ({ title, description, btnText, msg, leftInputPlaceholder, rightInputPlaceholder, onChange, fieldName }) => {
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

            <div className={styles.emailCredentials}>
                <div className={styles.inputsContainer}>
                    <div className={styles.input}>
                        <NewInput
                            placeholder={leftInputPlaceholder || 'Name'}
                            onChange={onChange}
                            fieldName={fieldName}
                        />
                    </div>
                    <div className={styles.input}>
                        <NewInput
                            placeholder={rightInputPlaceholder || 'Email'}
                            onChange={onChange}
                            fieldName={fieldName}
                        />
                    </div>
                </div>
                <div className={styles.primaryBtnContainer}>
                    <PrimaryBtn title={btnText || 'Subscribe'} width={'100%'} height={'100%'} />
                </div>
            </div>

            <div className={styles.info}>{msg || <div className={styles.message}>By signing up you are agreeing our <Link href="/tandcs">Term of Use</Link> and <Link href="/privacy-policy">Privacy Policy</Link></div>}</div>

        </div>
    )
}

export default EmailNewletter