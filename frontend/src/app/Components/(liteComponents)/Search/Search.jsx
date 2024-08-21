import styles from '@/app/Components/(liteComponents)/Search/Search.module.css'
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ placeholder, width }) => {
    return (
        <div className={styles.inputContainer} style={{ width: width || '100%' }}>
            <input className={styles.input} type="text" name="" id="" placeholder={placeholder} />
            <IoSearchOutline className={styles.searchIcon} />
        </div>
    )
}

export default Search