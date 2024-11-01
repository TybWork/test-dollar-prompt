import styles from "@/app/Components/(liteComponents)/FieldInfo/FieldInfo.module.css"
import Link from "next/link"
const FieldInfo = ({ margin, color, title, description, linkUrl, linkText }) => {
    return (
        <div className={styles.fieldContainer} style={{ margin: margin, color: color }}>
            <div className={styles.fieldTitle}>{title}</div>
            <i className={styles.fieldDescription}>{description} <Link href={`/${linkUrl}`}>{linkText}</Link></i>
        </div>
    )
}

export default FieldInfo