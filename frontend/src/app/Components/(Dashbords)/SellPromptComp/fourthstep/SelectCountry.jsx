import styles from '@/app/Components/(Dashbords)/SellPromptComp/fourthstep/SelectCounry.module.css'
import FieldInfo from '@/app/Components/(liteComponents)/FieldInfo/FieldInfo';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import countriesArr from '@/app/jsonFiles/countries';
import Link from 'next/link';

const SelectCountry = ({ onClick }) => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.section}>
                <h2 className={styles.heading}>Enable payouts</h2>
                <p className={styles.info}>Connect your bank account with Stripe to start receiving payouts from PromptBase for sales of your prompts.
                </p>
            </div>

            <div className={styles.section}>
                <FieldInfo
                    title={'Country of residence'}
                    description={
                        <div>
                            We need to know this for sending payouts. Please read our <Link className={styles.link} href="/">FAQ</Link> if your country does not appear here.
                        </div>
                    }
                />

                {/* countries dropdown */}
                <select className='select' name="country" id="country">
                    {
                        countriesArr.map((e) =>
                            <option key={e.value}>{e.name}</option>
                        )
                    }
                </select>
            </div>

            {/* next button proceed to payouts */}
            <GradientButton title="Submit" onClick={onClick} />

        </div >
    )
}

export default SelectCountry;