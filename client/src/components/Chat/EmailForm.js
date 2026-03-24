import React, { useEffect, useState } from "react"
import { styles } from "./styles"
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import Avatar from './Avatar'
import {useSelector} from "react-redux";

const EmailForm = props => {
    
    const privateApiKey = "00766548-9fcb-40e7-8acd-bb98399aa393";
    const project_id = "cccfe7ec-6295-4b3f-96fd-8e100b5dbd76";
    const user = useSelector(state => state.auth.user);
    const [email, setEmail] = useState(user?.email || '');
    console.log("email", email);
    const [loading, setLoading] = useState(false)

    async function getOrCreateUser(callback) {
        await axios.put(
            'https://api.chatengine.io/users/',
            {username: email, email: email, secret: email},
            {headers: {"Private-Key": privateApiKey}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    async function getOrCreateChat(callback) {
        await axios.put(
            'https://api.chatengine.io/chats/',
            {
                usernames: ['Customer Support', email], 
                is_direct_chat: true
            },
            {headers: {
                "Project-ID": project_id,
                "User-Name": email,
                "User-Secret": email,
            }}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create chat error', e))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)
        console.log('Sending Email', email)

        getOrCreateUser(
            user => {
                props.setUser && props.setUser(user);
                props.setHaveEmail && props.setHaveEmail(true);
                getOrCreateChat(chat => {
                    setLoading(false)
                    props.setChat && props.setChat(chat)
                })
            }
        )
    }

    useEffect(() => {
        if (user?.email) {
          setEmail(user?.email);
          if (email !== "") {
            setLoading(true);
            console.log("Sending Email", email);
    
            getOrCreateUser((user) => {
              props.setUser && props.setUser(user);
              props.setHaveEmail && props.setHaveEmail(true);
              getOrCreateChat((chat) => {
                setLoading(false);
                props.setChat && props.setChat(chat);
              });
            });
          }
        } else {
          setEmail("");
          props.setHaveEmail && props.setHaveEmail(false);
          props.setUser && props.setUser(null);
          props.setChat && props.setChat(null);
        }
      }, [user]);

    // useEffect(() => {
    //     if(emailState !== '' && email !== '') {
    //     setLoading(true)
    //     console.log('Sending Email', email)

    //     getOrCreateUser(
    //         user => {
    //             props.setUser && props.setUser(user)
    //             getOrCreateChat(chat => {
    //                 setLoading(false)
    //                 props.setChat && props.setChat(chat)
    //             })
    //         }
    //     )}
    // }, [emailState])

    return (
        <div 
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Xin chào bạn đến với TechStore <br/> support 👋
                </div>

                <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Email của bạn'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>

                <div style={styles.bottomText}>
                    Nhập email để bắt đầu.
                </div>
            </div>
        </div>
    )
}

export default EmailForm;