import React, { useState } from "react"

import { styles } from "./styles";
import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";


const SupportWindow = props => {

    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    const [haveEmail, setHaveEmail] = useState(false)

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' },
                ...{ visibility: props.visible ? 'visible' : 'hidden' }
            }}
        >
            <EmailForm 
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)} 
                setHaveEmail={haveEmail => setHaveEmail(haveEmail)}
            />

            <ChatEngine 
                visible={user !== null && chat !== null}
                haveEmail={haveEmail}
                user={user} 
                chat={chat} 
            />
        </div>

    )
}

export default SupportWindow;