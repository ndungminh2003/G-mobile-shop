import React, { useEffect, useState } from "react";

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'

const ChatEngine = props => {
    const [showChat, setShowChat] = useState(false)

    useEffect(() => {
        if (props.visible && props.haveEmail) {
            setTimeout(() => {
                setShowChat(true)
            }, 500)
        }
        else {
            setShowChat(false);
        }
    },[props.visible, props.haveEmail])


    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                }
            }}
        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID="cccfe7ec-6295-4b3f-96fd-8e100b5dbd76"
                        userName={props.user?.email || ''}
                        userSecret={props.user?.email || ''}
                    />
                    <ChatFeed activeChat={props.chat?.id || ''} />
                </ChatEngineWrapper>
            }
        </div>
    )
}

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    }
}