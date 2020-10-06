import { Avatar } from '@material-ui/core';
import React from 'react';
import '../css/sidebarchats.css'

const SidebarChats = () => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>This should be the last message</p>
            </div>
        </div>
    )
}

export default SidebarChats