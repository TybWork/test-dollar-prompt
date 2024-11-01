import styles from '@/app/Components/(liteComponents)/IconWithCounter/IconWithCounter.module.css'
const IconWithCoutner = ({ icon, Icon, counterBg, counter, top, right, chatClickFunc }) => {
    return (
        <div className={styles.container} onClick={chatClickFunc}>
            {/* {icon} */}
            <Icon className={styles.icon} />
            <span className={styles.counter} style={{ background: counterBg || 'var(--homeCardGradient)', top: top || '-2px', right: right || '-5px' }}>{counter || 30}</span>
        </div>
    )
}

export default IconWithCoutner