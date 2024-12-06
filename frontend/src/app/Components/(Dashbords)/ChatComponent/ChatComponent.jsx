'use client';
import styles from '@/app/Components/(Dashbords)/ChatComponent/ChatComponent.module.css';
import MessageSender from '../(DashboardsLiteComponent)/MessageSender/MessageSender';
import MessageReceiver from '../(DashboardsLiteComponent)/MessageReceiver/MessageReceiver';
import ChatHeader from '../ChatHeader/ChatHeader';
import PicWithNameRole from '../../(liteComponents)/PicWithNameRole/PicWithNameRole';
import InputChat from '../(DashboardsLiteComponent)/InputChat/InputChat';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const ChatComponent = ({ senderIdString, receiverIdString }) => {
    const [chatRoom, setChatRoom] = useState(null);
    //if we provide senderIdString getting my profile
    const [senderId, setSenderId] = useState('');
    const [roomId, setroomId] = useState('')
    const [userChat, setUserChat] = useState([]);
    const [input, setInput] = useState('');
    const [separateRoom, setseparateRoom] = useState([])

    const fetchData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/fetch-rooms/${senderIdString}`);
        if (response) {
            setChatRoom(response.data);
        } else {
            setChatRoom(null)
        }
    };

    // Fetch chat room data

    useEffect(() => {
        fetchData();
    }, [receiverIdString]);

    const onChangeFunc = (e) => {
        setInput(e.target.value);
    };

    const sendMessageFunc = () => {
        if (!input) return;

        socket.emit('msgSend', {
            roomId: roomId || `${senderIdString}-${receiverIdString}`,
            senderId: senderIdString,
            receiverId: receiverIdString,
            message: input
        });
        socket.emit('fetchRoom', senderIdString)

        setInput('');
    };

    useEffect(() => {
        const handleIncomingMessage = (message) => {
            setChatRoom([message])
        };

        socket.on('Message Sent', handleIncomingMessage);

        return () => {
            socket.off('Message Sent', handleIncomingMessage);
        };
    }, [chatRoom]);


    if (!chatRoom) return <div>Loading...</div>;

    return (
        <div className={styles.parentContainer}>
            {/* Profiles container */}
            <div className={styles.profilesContainer}>
                {chatRoom.map((profile, index) => (
                    <div className={styles.singleProfile} key={index}>
                        <PicWithNameRole
                            width={'40px'}
                            name={profile.roomId}
                            role={`${profile.messages[0].message.slice(0, 20)}..`}
                            hidePicDot={false}
                            dotSize={'16px'}
                            picDot={profile.status}
                            dotBorder={'3px solid var(--tertiaryClr)'}
                            onClick={() => setroomId(profile.roomId)}
                        />
                        <span className={styles.time}>{profile.time}</span>
                    </div>
                ))}
            </div>

            {/* Chats container */}
            <div className={styles.chatParentContainer}>
                <ChatHeader />
                <div className={styles.chatsContainer}>
                    {chatRoom && chatRoom.length > 0 ? (chatRoom[0].messages.map((chat, index) => (
                        <div key={index} className={chat.senderId === senderIdString ? styles.receiverMessage : styles.senderMessage}>
                            {chat.senderId === senderIdString ? (
                                <MessageReceiver text={chat.message} time={chat.timestamp} width={'260px'} />
                            ) : (
                                <MessageSender text={chat.message} time={chat.timestamp} width={'260px'} />
                            )}
                        </div>
                    ))) : (
                        <div>hello</div>
                    )}
                </div>
                {/* Input chat */}
                <InputChat inputValue={input} onChange={onChangeFunc} onSendMsg={sendMessageFunc} />
            </div>
        </div>
    );
};

export default ChatComponent;