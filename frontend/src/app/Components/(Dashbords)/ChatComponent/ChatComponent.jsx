'use client';
import styles from '@/app/Components/(Dashbords)/ChatComponent/ChatComponent.module.css';
import MessageSender from '../(DashboardsLiteComponent)/MessageSender/MessageSender';
import MessageReceiver from '../(DashboardsLiteComponent)/MessageReceiver/MessageReceiver';
import ChatHeader from '../ChatHeader/ChatHeader';
import PicWithNameRole from '../../(liteComponents)/PicWithNameRole/PicWithNameRole';
import InputChat from '../(DashboardsLiteComponent)/InputChat/InputChat';
import { useEffect, useState } from 'react';
import axios from 'axios';

import io from 'socket.io-client'
const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

const ChatComponent = () => {
    const [chatRoom, setChatRoom] = useState(null);
    const [senderId, setsenderId] = useState('');
    const [userChat, setuserChat] = useState([]);


    useEffect(() => {
        socket.on('receiveMessage')
    }, [])

    // Fetch chat rooms functionality
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:4001/api/chat/chatRoom/6662ff2b1c4e19a5896f2bfe`);
            setChatRoom(response.data);
        };
        fetchData();
    }, [senderId]);

    // handle incoming messages
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setuserChat((prevUserChat) => [...prevUserChat, message])
        })
        return () => {
            socket.off('receiveMessage')
        }
    }, [])

    useEffect(() => {
        if (chatRoom && senderId) {
            const specificChat = chatRoom.msgRooms.find((item) => item.id === senderId)
            setuserChat(specificChat ? specificChat.chat : [])
        }
    }, [userChat, senderId])

    if (!chatRoom) return <div>Loading...</div>;

    return (
        <div className={styles.parentContainer}>
            {/* Profiles container */}
            <div className={styles.profilesContainer}>
                {chatRoom.msgRooms.map((profile, index) => (
                    <div className={styles.singleProfile} key={index}>
                        <PicWithNameRole
                            width={'40px'}
                            name={profile.name}
                            role={`${profile.chat[0].message.slice(0, 20)}..`}
                            hidePicDot={false}
                            dotSize={'16px'}
                            picDot={profile.status}
                            dotBorder={'3px solid var(--tertiaryClr)'}
                            onClick={() => setsenderId(profile.id)}
                        />
                        <span className={styles.time}>{profile.time}</span>
                    </div>
                ))}
            </div>

            {/* Chats container */}
            <div className={styles.chatParentContainer}>
                <ChatHeader />
                <div className={styles.chatsContainer}>

                    {userChat && userChat.map((chat, index) => (
                        <div
                            key={index}
                            className={chat.id === senderId ? styles.senderMessage : styles.receiverMessage}
                        >
                            {chat.id === senderId ? (
                                <MessageSender text={chat.message} time={chat.timestamp} width={'260px'} />
                            ) : (
                                <MessageReceiver text={chat.message} time={chat.timestamp} width={'260px'} />
                            )}
                        </div>
                        // <div
                        //     key={index}
                        //     className={room.id === chat.id ? styles.senderMessage : styles.receiverMessage}
                        // >
                        //     {room.id === chat.id ? (
                        //         <MessageSender text={chat.message} time={chat.timestamp} width={'260px'} />
                        //     ) : (
                        //         <MessageReceiver text={chat.message} time={chat.timestamp} width={'260px'} />
                        //     )}
                        // </div>
                        // <div
                        //     key={index}
                        //     className={chat.type === 'sender' ? styles.senderMessage : styles.receiverMessage}
                        // >
                        //     {chat.type === 'sender' ? (
                        //         <MessageSender text={chat.message} time={chat.timestamp} width={'260px'} />
                        //     ) : (
                        //         <MessageReceiver text={chat.message} time={chat.timestamp} width={'260px'} />
                        //     )}
                        // </div>
                    ))}
                </div>
                {/* Input chat */}
                <InputChat />
            </div>
        </div>
    );
};

export default ChatComponent;