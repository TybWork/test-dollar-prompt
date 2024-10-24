import styles from '@/app/Components/(liteComponents)/IconText/IconText.module.css'
const IconText = ({ text, icon }) => {
    return (
        <div className={styles.container}>
            <div>{text}</div>
            {icon}
        </div>
    )
}

export default IconText