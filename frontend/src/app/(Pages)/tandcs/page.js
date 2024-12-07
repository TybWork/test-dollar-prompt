import styles from '@/app/(Pages)/tandcs/tandcs.module.css'
import LoadingCircle from '@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle'
const page = () => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.headingContainer}>
                <h1 className={styles.mainHeading}>Dollar Prompts Terms of Use</h1>
                <div>Last Updated: 10.10.2024</div>
            </div>

            {/* content section */}
            <div className={styles.contentSection}>

                <div className={styles.subDetail}>
                    <p>Welcome to Dollar Prompts. By accessing and using our platform, you agree to comply with the following terms and conditions. Please read these Terms of Use carefully before using the platform. If you do not agree with any part of these terms, you may not use our services.</p>
                </div>

                {/* 1. Acceptance of Terms */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        1. Acceptance of Terms
                    </h3>

                    <p className={styles.mainTxt}>
                        By creating an account or using any services provided by Dollar Prompts, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and any future amendments or updates.
                    </p>
                </section>

                {/* 2. Eligibility */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        2. Eligibility
                    </h3>

                    <p className={styles.mainTxt}>
                        You must be at least 18 years old to create an account and use Dollar Prompts. By signing up, you confirm that you meet this age requirement and that all information provided during registration is accurate and complete.
                    </p>
                </section>

                {/* 3. Seller Registration and Account Use */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        3. Seller Registration and Account Use
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>Each seller may only register one account. The creation of multiple or duplicate accounts is prohibited. If Dollar Prompts detects duplicate accounts, all associated accounts will be suspended or terminated without notice.</li>
                            <li>Sellers are responsible for maintaining the confidentiality of their account login credentials and for any activities that occur under their account.</li>
                            <li>You must provide valid and up-to-date payment information to receive payouts for sales of your prompts.</li>
                        </ul>
                    </p>
                </section>

                {/* 4. Selling AI-Powered Prompts */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        4. Selling AI-Powered Prompts
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>As a seller, you can list your AI-powered prompts for sale on the platform. You are solely responsible for the originality, accuracy, and legality of the content you upload. By submitting prompts, you confirm that you hold all necessary rights to sell them and that they do not infringe on any intellectual property rights of others.</li>
                            <li>Dollar Prompts reserves the right to remove any prompt listings that violate these Terms of Use, contain inappropriate content, or do not meet our quality standards.</li>
                        </ul>
                    </p>
                </section>

                {/* 5. Pricing and Fees */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        5. Pricing and Fees
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>You are free to set your own prices for the AI prompts you sell on the platform. You may keep it between $5-$10 as per Prompts outcome and results.</li>
                            <li>Dollar Prompts will charge a service fee on each sale made through the platform. The service fee percentage will be clearly communicated to sellers and may be updated from time to time.</li>
                            <li>Sellers are responsible for any taxes applicable to their earnings, and Dollar Prompts may deduct such taxes if required by law.</li>
                        </ul>
                    </p>
                </section>

                {/* 6. Payment Terms for Sellers */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        6. Payment Terms for Sellers
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>Payment Threshold: Sellers must reach a minimum earnings threshold of $50 before they are eligible to request a payout. Once this threshold is met, sellers can withdraw their funds via the available payment methods.</li>
                            <li>Payout Schedule: Payments will be processed within a reasonable time after a withdrawal request is made, typically within 14 days, subject to verification and security checks.</li>
                            <li>One Account per Seller: Each seller may have only one account. Creating multiple accounts will lead to the suspension of all associated accounts. If a seller is found using duplicate accounts, they may lose their right to receive payments, and their access to the platform may be permanently revoked.</li>
                            <li>Final Rights: Dollar Prompts reserves the final right to suspend, terminate, or withhold payments to any account that is found to violate these terms, engage in fraudulent activity, or otherwise act against the interests of the platform or its users.</li>
                        </ul>
                    </p>
                </section>

                {/* 7. Content Ownership and License */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        7. Content Ownership and License
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>By uploading AI prompts to Dollar Prompts, you retain ownership of the content but grant Dollar Prompts a worldwide, non-exclusive, royalty-free license to display, distribute, and promote your prompts on the platform.</li>
                            <li>You may remove your prompts from the platform at any time, but any sales made prior to removal will remain valid, and you will continue to receive earnings for those sales.</li>
                        </ul>
                    </p>
                </section>

                {/* 8. Prohibited Activities */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        8. Prohibited Activities
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>You agree not to engage in any of the following prohibited activities:</li>
                            <ul className={styles.nestedLi}>
                                <li>Posting or selling AI prompts that infringe on the intellectual property rights of others.</li>
                                <li className={styles.special}>Try to list a Prompts that promote or generate 18+ adult content ( Lead to account suspension and blocked from the platform)</li>
                                <li>Using the platform to distribute harmful, illegal, or misleading content.</li>
                                <li>Using the platform to distribute harmful, illegal, or misleading content.</li>
                                <li>Creating multiple accounts to manipulate the platform’s ranking system or payment terms.</li>
                                <li>Engaging in any form of fraud, hacking, or exploitation of vulnerabilities within the platform.</li>
                            </ul>
                        </ul>
                    </p>
                </section>

                {/* 9. Account Suspension and Termination */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        9. Account Suspension and Termination
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>Dollar Prompts reserves the right to suspend or terminate any account at its sole discretion if the user is found to be in violation of these Terms of Use, applicable laws, or if any form of fraudulent or abusive behavior is detected.</li>
                            <li>In the event of account suspension or termination, Dollar Prompts reserves the right to withhold any unpaid earnings related to activities that violate these terms.</li>
                            <li>You may remove your prompts from the platform at any time, but any sales made prior to removal will remain valid, and you will continue to receive earnings for those sales.</li>
                        </ul>
                    </p>
                </section>

                {/* 10. Intellectual Property */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        10. Intellectual Property
                    </h3>

                    <p className={styles.mainTxt}>
                        All content on the Dollar Prompts platform, including text, graphics, logos, and software, is the property of Dollar Prompts or its licensors and is protected by intellectual property laws. You may not use, modify, or distribute any of the platform’s content without prior written consent.
                    </p>
                </section>

                {/* 11. Disclaimers*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        11. Disclaimers
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>Dollar Prompts provides the platform on an "as is" and "as available" basis. We make no guarantees or warranties regarding the accuracy, reliability, or availability of the platform.</li>
                            <li>We do not guarantee that you will generate a specific level of sales or income by using Dollar Prompts.</li>
                        </ul>
                    </p>
                </section>

                {/* 12. Limitation of Liability*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        12. Limitation of Liability
                    </h3>

                    <p className={styles.mainTxt}>
                        <ul>
                            <li>To the maximum extent permitted by law, Dollar Prompts shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform, including but not limited to loss of revenue, data, or profits.</li>
                            <li>Our total liability for any claim arising under these Terms of Use will not exceed the total fees paid to you in the three months prior to the claim arising.</li>
                        </ul>
                    </p>
                </section>

                {/* 13. Changes to Terms */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        13. Changes to Terms
                    </h3>

                    <p className={styles.mainTxt}>
                        Dollar Prompts reserves the right to modify or update these Terms of Use at any time without prior notice. Any significant changes will be communicated to users via email or platform notifications. Your continued use of the platform after the changes have been posted constitutes your acceptance of the updated terms.
                    </p>
                </section>

                {/* 14. Governing Law*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        14. Governing Law
                    </h3>

                    <p className={styles.mainTxt}>
                        These Terms of Use shall be governed by and construed in accordance with the laws of [residing  country ], without regard to its conflict of law principles.
                    </p>
                </section>

                {/* 15. Contact Us*/}
                <section className={styles.section}>
                    <hr />
                    <h3 className={styles.subHeading}>
                        15. Contact Us
                    </h3>

                    <p className={styles.mainTxt}>
                        If you have any questions or concerns about these Terms of Use, please contact us at support@dollarprompts.com.
                    </p>
                    <p className={styles.mainTxt}>
                        By using Dollar Prompts, you acknowledge and agree to these terms. Failure to comply may result in suspension or termination of your account and forfeiture of any unpaid earnings.
                    </p>
                </section>
            </div>

        </div>
    )
}

export default page