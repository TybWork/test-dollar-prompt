import styles from '@/app/(Pages)/tandcs/tandcs.module.css'
const page = () => {
    return (
        <div className={styles.parentContainer}>
            <h1 className={styles.mainHeading}>Terms of service</h1>

            {/* refund section */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Refund Policy
                </h2>
                <main className={styles.mainTxt}>
                    Our goal is to ensure customer satisfaction with the prompts purchased from our marketplace. Refunds will be granted solely in cases where the prompt does not work as described. To be eligible for a refund, you must submit a request within 24 hours of your purchase, providing a clear explanation and evidence demonstrating that the prompt is not functioning as described. Upon reviewing your request, we will determine, at our sole discretion, whether your claim is valid and, if so, issue a refund. Refunds will be processed within 5-10 business days after receiving your request.
                </main>
            </section>

            {/* 2. intellectual property section */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Intellectual Property
                </h2>

                <p className={styles.mainTxt}>
                    All prompts available on our marketplace are the intellectual property of their respective creators. You acknowledge that you do not acquire any ownership rights to the prompts by purchasing or using them. You are responsible for ensuring that your use of the prompts does not infringe upon any third-party copyrights, trademarks, or other intellectual property rights.
                </p>
            </section>

            {/* 3. usage policy */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Usage Policy
                </h2>

                <p className={styles.mainTxt}>
                    When you purchase a prompt from our marketplace, you are granted a non-exclusive, worldwide, and perpetual license to use the prompt for any purpose, with the following exceptions:
                </p>
                <ul className={styles.ul}>
                    <li>You may not use the prompt for any harmful, illegal, or malicious activities.
                    </li>
                    <li>You may not directly resell, redistribute, or transfer the prompt without the written consent of the prompt's creator.
                    </li>
                </ul>
                <p className={styles.mainTxt}>
                    We reserve the right to terminate your license to use a prompt if you violate these usage restrictions.
                </p>
            </section>


            {/* 4. intellectual property section */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Right to Issue Refunds
                </h2>

                <p className={styles.mainTxt}>
                    We reserve the right to issue refunds on any payments made through our marketplace at our sole discretion. This may occur in instances where a customer requests a refund in accordance with our Refund Policy, when we detect potentially fraudulent transactions, or in any other situations where we deem it necessary to issue a refund in order to protect our interests and maintain the integrity of our marketplace. By using our services, you acknowledge and agree to our right to issue refunds as described in this clause.
                </p>
            </section>

            {/* 5. intellectual property section */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Liability
                </h2>

                <p className={styles.mainTxt}>
                    Our marketplace is provided "as is" and without any warranties, express or implied. In no event shall we be liable for any direct, indirect, incidental, or consequential damages arising from your use of our marketplace or any prompts purchased through our marketplace. This includes, but is not limited to, any loss of data, profits, or business interruption, even if we have been advised of the possibility of such damages.
                </p>
            </section>

            {/* 6. Prohibition of Web Scraping */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Prohibition of Web Scraping
                </h2>

                <p className={styles.mainTxt}>
                    You are strictly prohibited from using any automated tools, including but not limited to web crawlers, scrapers, or bots, to access, scrape, copy, or monitor any portion of our marketplace, its content, or any prompts available on the site. Unauthorized use of any automated tools on our website may result in legal action, including but not limited to the termination of your access to our services, as well as claims for damages and other remedies under applicable law.
                </p>
            </section>

            {/* 7. Manipulation of Search Rankings*/}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Manipulation of Search Rankings
                </h2>

                <p className={styles.mainTxt}>
                    We strictly prohibit any attempts to manipulate search rankings on our marketplace. This includes, but is not limited to, creating multiple accounts, submitting false reviews, or engaging in any other activities intended to artificially inflate the rankings or visibility of specific prompts. If we determine, in our sole discretion, that you have engaged in any such activities, we reserve the right to suspend or terminate your account without prior notice and take any other appropriate actions, including legal action, to protect the integrity of our marketplace.
                </p>
            </section>

            {/* 8. Chat Feature Usage*/}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Chat Feature Usage
                </h2>

                <p className={styles.mainTxt}>
                    Our website offers a chat feature for the convenience of our users. The chat feature is intended to facilitate communication and collaboration within our community. You are strictly prohibited from using the chat feature to advertise, promote, or spam other services, products, or websites. Engaging in such activities is a violation of our Terms of Service and may result in the suspension or termination of your account without prior notice. We reserve the right to monitor and moderate the chat feature to ensure compliance with our policies and maintain a positive user experience.
                </p>
            </section>

            {/* 9. Privacy Policy*/}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Privacy Policy
                </h2>

                <p className={styles.mainTxt}>
                    Your privacy is important to us. Please review our Privacy Policy, which outlines our practices regarding the collection, use, storage, and protection of your personal information. By using our marketplace, you agree to the terms of our Privacy Policy and consent to the practices described therein.
                </p>
            </section>

            {/* 10. User Content and Conduct*/}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    User Content and Conduct
                </h2>

                <p className={styles.mainTxt}>
                    Users of our marketplace may have the ability to create, upload, or share content, such as reviews, comments, or other materials. By submitting content to our marketplace, you warrant that you have the necessary rights to do so and that your content does not infringe upon any third-party rights. You are solely responsible for the content you submit and the consequences of sharing it.
                </p>
                <p className={styles.mainTxt}>
                    You agree not to engage in any activities on our marketplace that are harmful, harassing, offensive, or otherwise violate the rights of others. We reserve the right to remove any content or suspend or terminate the accounts of users who violate these guidelines, at our sole discretion and without prior notice.
                </p>
            </section>

            {/* 11. Disclaimer of Warranties */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Disclaimer of Warranties
                </h2>

                <p className={styles.mainTxt}>
                    Our marketplace, its content, and the prompts available for purchase are provided "as is" and without any warranties, either express or implied. We disclaim all warranties, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the prompts will meet your requirements or that their quality, accuracy, or performance will be error-free or uninterrupted.
                </p>
            </section>

            {/* 12. Indemnification */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Indemnification
                </h2>

                <p className={styles.mainTxt}>
                    You agree to indemnify, defend, and hold harmless our marketplace, its owners, affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected to your access to or use of our marketplace, your violation of these Terms of Service, or your infringement of any third-party rights.
                </p>
            </section>

            {/* 13. Modification of Terms */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Modification of Terms
                </h2>

                <p className={styles.mainTxt}>
                    We reserve the right to modify these Terms of Service at any time without prior notice. It is your responsibility to review these Terms periodically to ensure that you are aware of any changes. Your continued use of our marketplace constitutes your acceptance of the modified Terms of Service.
                </p>
            </section>
            {/* 14. Governing Law */}
            <section className={styles.section}>
                <h2 className={styles.subHeading}>
                    Governing Law
                </h2>

                <p className={styles.mainTxt}>
                    These Terms of Service shall be governed by and construed in accordance with the laws of the country or state in which your business is registered. Any disputes arising from these Terms shall be resolved through amicable negotiations or, if necessary, by submitting the dispute to the competent courts of the governing jurisdiction.
                </p>
            </section>
        </div>
    )
}

export default page