import styles from '@/app/Components/(Dashbords)/ChatComponent/ChatComponent.module.css'
import MessageSender from '../(DashboardsLiteComponent)/MessageSender/MessageSender'
import MessageReceiver from '../(DashboardsLiteComponent)/MessageReceiver/MessageReceiver'
import ChatHeader from '../ChatHeader/ChatHeader'
import PicWithNameRole from '../../(liteComponents)/PicWithNameRole/PicWithNameRole'
import InputChat from '../(DashboardsLiteComponent)/InputChat/InputChat'

const history = [
    {
        type: 'sender',
        sms: '1send 1',
        timestamp: '12:03PM'
    },
    {
        type: 'sender',
        sms: '2send 2 asdfasdfasdfasdfasdsf as fass dsasaf assdfasdsfasdsfasdfsadsa  dasfs asdfas s asdsf asds',
        timestamp: '12:04PM'
    },
    {
        type: 'receiver',
        sms: '3receive 1 asdfass asdsf asdsf asdsf sadf asdsdfas ds',
        timestamp: '12:06PM'
    },
    {
        type: 'sender',
        sms: '4send 3',
        timestamp: '12:06PM'
    },
    {
        type: 'receiver',
        sms: '5receive 1 asdfass asdsf asdsf asdsf sadf asdsdfas ds asdf asdf adfa sdfa ss',
        timestamp: '12:06PM'
    },
    {
        type: 'sender',
        sms: '6send 3',
        timestamp: '12:06PM'
    },
    {
        type: 'receiver',
        sms: '7receive 1 asdfass asdsf asdsf asdsf sadf asdsdfas ds',
        timestamp: '12:06PM'
    },
    {
        type: 'receiver',
        sms: '8receive 1 asdfass asdsf asdsf asdsf sadf asdsdfas ds',
        timestamp: '12:06PM'
    },
]

const profiles = [
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '12:32pm',
        status: 'online'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '08:13pm',
        status: 'offline'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '11:10am',
        status: ''
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '03:02pm',
        status: 'online'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '10:01pm',
        status: 'offline'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '06:19pm',
        status: 'offline'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '08:40pm',
        status: 'offline'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '07:50pm',
        status: 'offline'
    },
    {
        Name: 'Ahmad',
        sms: 'Hello! I hope youre having a fantastic day.',
        time: '10:05pm',
        status: 'offline'
    },
]



const ChatComponent = () => {
    return (
        <div className={styles.parentContainer}>

            {/* profiles container */}
            <div className={styles.profilesContainer}>
                {
                    profiles.map((profile) =>
                        <div className={styles.singleProfile}>
                            <PicWithNameRole
                                width={'40px'}
                                role={`${profile.sms.slice(0, 20)}..`}
                                hidePicDot={false}
                                dotSize={'16px'}
                                picDot={profile.status}
                                dotBorder={'3px solid var(--tertiaryClr)'}
                            />
                            <span className={styles.time}>{profile.time}</span>
                        </div>
                    )
                }
            </div>


            {/* chats container */}
            <div className={styles.chatParentContainer}>
                <ChatHeader />
                <div className={styles.chatsContainer}>
                    {
                        history.map((sms, index) =>
                            <div
                                key={index}
                                className={sms.type === 'sender' ? styles.senderMessage : styles.receiverMessage}
                            >

                                {sms.type === "sender" ? <MessageSender text={sms.sms} time={sms.timestamp} width={'260px'} /> : <div ><MessageReceiver text={sms.sms} time={sms.timestamp} width={'260px'} /></div>}
                            </div>
                        )
                    }
                </div>
                {/* input chat */}
                <InputChat />
                <div className={styles.inputChat}>

                </div>
            </div>
        </div>
    )
}

export default ChatComponent