import styles from '@/app/(Pages)/master-dashboard/master-login/MasterLogin.module.css'
import AdminLoginInput from '@/app/Components/(liteComponents)/AdminLoginInput/AdminLoginInput'
import HeaderLogo from '@/app/Components/(updatedDesignComp)/HeaderLogo/HeaderLogo';
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import Image from 'next/image'
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
const MasterLogin = ({ onChange, onSubmit, imgDisplay }) => {

    return (
        <div className={styles.mainContainer}>
            <HeaderLogo />
            <div className={styles.container}>
                <Image alt='super-admin-image' className={styles.userImage} width={0} height={0} style={{ display: imgDisplay }} sizes='100vw' src='/assets/imageAssets/ceo_dollarprompt.PNG' />
                <form className={styles.form} onSubmit={onSubmit}>
                    <AdminLoginInput placeholder="login@gmail.com" label={'email'} onChange={onChange} icon={<AiOutlineUser />} />
                    <AdminLoginInput type="password" placeholder="Password" label={'password'} onChange={onChange} icon={<CiLock />} />
                    {/* submit button */}
                    <div className={styles.submitButton}>
                        <GradientButton title='Login' type='submit' width="100%" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MasterLogin