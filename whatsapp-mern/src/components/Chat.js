import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, DonutLarge, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import '../css/chat.css'
import axios from '../axios'
import MenuDropDown from './MenuDropdown';
import MenuItem from './MenuItem';

const Chat = ({ messages }) => {

    const [input, setInput] = useState('')
    const [isMenuOpened, setMenuOpened] = useState(false)

    const sendMessage = async (e) => {

        e.preventDefault()
        await axios.post('messages/new', {
            name: 'Demo App',
            message: input,
            timestamp: 'Just now!',
            received: false
        })
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>Room name</h3>
                    <p>last seen at ....</p>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <AttachFile />

                    </IconButton>
                    <IconButton onClick={() => { setMenuOpened(!isMenuOpened) }}>
                        <MoreVert />
                        {isMenuOpened && <MenuDropDown>
                            <MenuItem name="New Contact" />
                            <MenuItem name="Profile" />
                            <MenuItem name="Delete Chat" />
                        </MenuDropDown>}
                    </IconButton>


                </div>
            </div>

            <div className="chat_body">
                {
                    messages.map((message, index) => (
                        <p key={index} className={`chat_message ${message.received && "chat_receiver"}`}>
                            <span className="chat_name">{message.name}</span>
                            <span className="single-message">{message.message}</span>
                            <span className="chat_timestamp">
                                {message.timestamp}
                            </span>
                        </p>
                    ))
                }
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a new message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat