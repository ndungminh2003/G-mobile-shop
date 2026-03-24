import React from 'react'
import { ChatEngine } from 'react-chat-engine'

export default function ChatSupport() {
  return (
    <ChatEngine 
      projectID="cccfe7ec-6295-4b3f-96fd-8e100b5dbd76"
      userName='Customer Support'
      userSecret='123123'
      height='calc(80vh - 12px)'
      
      onConnect={(creds, chats) => {
        console.log('Connected to ChatEngine:', creds);
      }}
      onFail={(error) => {
        console.error('ChatEngine connection failed:', error);
      }}
    />
  )
}
