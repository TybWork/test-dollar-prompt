import styles from '@/app/(Pages)/privacy-policy/privacy-policy.module.css'
const page = () => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.headingContainer}>
                <h1 className={styles.mainHeading}>Dollar Prompts Privacy Policy</h1>
                <div>Lasr Updated: 10.10.2024</div>
            </div>

            {/* content section */}
            <div className={styles.contentSection}>

                <div className={styles.subDetail}>
                    <p>At Dollar Prompts, your privacy is a top priority. This Privacy Policy explains how we collect, use, and share information about you when you visit and use our platform, including any related services, sales, or marketing activities. By using Dollar Prompts, you consent to the practices described in this policy.</p>
                </div>

                {/* 1. Information We Collect */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        1. Information We Collect
                    </h3>

                    <p className={styles.mainTxt}>
                        We collect various types of information from and about users of our platform, including:
                    </p>
                </section>

                {/*1.1 Information You Provide to Us */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        1.1 Information You Provide to Us
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>
                            <span>Account Information:</span> When you register for an account, we collect personal information such as your name, email address, phone number, and payment details.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Prompt Listings:</span>  Any information, including images or descriptions, you submit as part of listing AI prompts for sale.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Communication:</span>  When you contact us via email or customer support, we collect the information you provide, including the content of your message and any attachments.
                        </p>
                    </div>
                </section>

                {/*1.2 Information We Collect Automatically */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        1.2 Information We Collect Automatically
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>
                            <span>Usage Data:</span>We collect information about your interactions with the platform, such as the pages you view, links you click, and how you interact with our content.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Device Information:</span>   We collect details about the device you use to access the platform, such as your IP address, browser type, operating system, and device identifiers.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Cookies and Tracking Technologies:</span>   We use cookies and similar tracking technologies to collect information about your activity on our platform and personalize your experience.
                        </p>
                    </div>
                </section>

                {/*2. How We Use Your Information */}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        2. How We Use Your Information
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We use the information we collect to:</p>
                        <p className={styles.mainTxt}>
                            <span>Provide and Improve Our Services:</span> To operate and enhance the functionality of Dollar Prompts, including processing transactions, offering support, and developing new features.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Personalize Your Experience:</span> Tailor the content and features we show you based on your interactions and preferences.
                            Process Payments: Handle and facilitate payments between buyers and sellers.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Communicate with You:</span>  Send you updates, promotions, and notifications regarding your account or prompt listings. You can opt out of marketing emails at any time.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Ensure Security and Prevent Fraud:</span> Protect the integrity of our platform and users by monitoring for suspicious activities and ensuring compliance with our Terms of Use.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>Legal Compliance:</span> To comply with any legal obligations, respond to lawful requests, and defend against legal claims.
                        </p>
                    </div>
                </section>

                {/*3. Sharing of Information*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        3. Sharing of Information
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We may share your information with:</p>
                        <p className={styles.mainTxt}>
                            <span>3.1 Third-Party Service Providers</span><br /> We may share your data with trusted third-party companies that assist us in operating our platform and delivering services. These providers may include payment processors, cloud hosting services, and email service providers. They are required to use your data only for the specific tasks assigned to them and in accordance with this Privacy Policy.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>3.2 Business Transfers</span> <br /> If we merge with or are acquired by another company, or if some or all of our assets are transferred to another organization, your information may be transferred as part of that transaction. In such cases, we will notify you before your information becomes subject to a different privacy policy.
                        </p>
                        <p className={styles.mainTxt}>
                            <span>3.3 Legal and Regulatory Requirements</span><br /> We may disclose your information if required to do so by law, or if we believe it is necessary to:
                            <ul className={styles.specialLi}>
                                <li>Comply with legal obligations;</li>
                                <li>Protect the rights, property, or safety of Dollar Prompts, its users, or others;</li>
                                <li>Prevent fraud or security issues.</li>
                            </ul>
                        </p>
                    </div>
                </section>

                {/*4. Data Retention*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        4. Data Retention
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We retain your personal information for as long as is necessary to provide the services outlined in this Privacy Policy, and as required by law and business practices. If you wish to delete your account, we will remove your personal information, except where necessary for compliance with legal obligations, dispute resolution, or enforcement of our agreements.</p>
                    </div>
                </section>

                {/* 5. Your Privacy Rights*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        5. Your Privacy Rights
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>Depending on your location, you may have specific rights regarding your personal information. These rights may include:</p>
                        <p className={styles.mainTxt}><span>Access:</span>Request access to the personal data we hold about you.</p>
                        <p className={styles.mainTxt}><span>Correction:</span>Request correction of any inaccurate information.</p>
                        <p className={styles.mainTxt}><span>Deletion:</span> Request the deletion of your personal data.</p>
                        <p className={styles.mainTxt}><span>Opt-Out:</span> You may unsubscribe from our marketing communications by clicking the "unsubscribe" link in any email. You can also manage cookie preferences in your browser settings.</p>
                        <p className={styles.mainTxt}><span>Data Portability:</span> Request a copy of your data in a structured, machine-readable format</p>
                        <p className={styles.mainTxt}>To exercise any of these rights, please contact us at <a href="mailto:support@dollarprompts.com">support@dollarprompts.com</a>.</p>
                    </div>
                </section>

                {/* 6. Data Security*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        6. Data Security
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We implement a variety of security measures to protect your personal information from unauthorized access, use, or disclosure. These measures include encryption, secure servers, and periodic security reviews. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

                    </div>
                </section>

                {/* 7. International Data Transfers*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        7. International Data Transfers
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>If you are accessing Dollar Prompts from outside of [Country], please be aware that your information may be transferred to, stored, and processed in other countries where our servers or service providers are located. By using the platform, you consent to these transfers, which may have different data protection laws than your jurisdiction.</p>

                    </div>
                </section>

                {/* 8. Children's Privacy*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        8. Children's Privacy
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>Dollar Prompts is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
                        </p>
                    </div>
                </section>

                {/*9. Cookies and Tracking Technologies*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        9. Cookies and Tracking Technologies
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We use cookies and similar tracking technologies to enhance your experience on Dollar Prompts. These technologies help us remember your preferences, track your usage, and serve personalized content. You can adjust your browser settings to refuse cookies, but this may impact your experience on our platform.
                        </p>
                    </div>
                </section>

                {/*10. Third-Party Links*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        10. Third-Party Links
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>Dollar Prompts may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We recommend reviewing their privacy policies before providing any personal information.
                        </p>
                    </div>
                </section>

                {/*11. Changes to This Privacy Policy*/}
                <section className={styles.section}>
                    <h3 className={styles.subHeading}>
                        11. Changes to This Privacy Policy
                    </h3>

                    <div>
                        <p className={styles.mainTxt}>We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of Dollar Prompts after such updates constitutes your acceptance of the revised policy.
                        </p>
                    </div>
                </section>

                {/* 12. Contact Us*/}
                <section className={styles.section}>
                    <hr />
                    <h3 className={styles.subHeading}>
                        12. Contact Us
                    </h3>

                    <p className={styles.mainTxt}>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@dollarprompts.com">support@dollarprompts.com</a>.
                    </p>
                    <p className={styles.mainTxt}>
                        By using Dollar Prompts, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
                    </p>
                </section>

            </div>

        </div>
    )
}

export default page