import React, { useState, useContext, useEffect } from 'react';
import '../css/sidebar.css'
import { ArrowBack, Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChats from './SidebarChats';
import MenuItem from './MenuItem';
import MenuDropDown from './MenuDropdown';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from '../axios'
import Context, { ContextValue } from '../Context';
import { useHistory } from 'react-router';
import { SET_CONTEXT } from '../contextReducer';

const Sidebar = () => {
    const [isMenuOpened, setMenuOpened] = useState(false)
    const [isNewContactClicked, setNewContactClicked] = useState(false)
    const [contactNo, setContactNo] = useState(0)
    const [isExists, setExists] = useState(false)
    const [contactName, setContactName] = useState('')
    const [error, setError] = useState()
    const [chats, setChats] = useState([])
    const [state, dispatch] = useContext(ContextValue)

    const history = useHistory()

    useEffect(() => {
        let localstate = JSON.parse(localStorage.getItem('reducerState'))
        console.log(typeof localstate, localstate)
        if (localstate !== null) {
            console.log(typeof localstate)
            console.log("local state is not null")
            console.log(localstate.token)
            dispatch({ type: SET_CONTEXT, payload: localstate })
        } else {
            console.log('local staet is null')
            console.log(state)
            localStorage.setItem("reducerState", JSON.stringify(state))
        }
        axios.post('/chats', {}, {
            headers: {
                Authorization: "Bearer " + (state.token ? state.token : localstate.token)
            }
        }).then((res) => {
            if (res.data.error) {
                if (res.data.redirectUrl) {
                    return history.push(res.data.redirectUrl)
                }
                return setError(res.data.error)
            }
            console.log(res.data)
            setChats(res.data.chats)
        })
        console.log("calling")
    }, [])


    const newContactClickHandler = () => {
        setNewContactClicked(true)
    }


    const newContactSaveHandler = () => {
        if (contactName !== '' && contactNo !== 0) {
            axios.post('/newContact', {
                contactName,
                contactNo
            }, {
                headers: {
                    Authorization: "Bearer " + state.token
                }
            }).then((res) => {
                if (res.data.error) {
                    if (res.data.redirectUrl) {
                        return history.push(res.data.redirectUrl)
                    }
                    return setError(res.data.error)
                }
                setNewContactClicked(false)
            })
        } else {
            setError("All fields are required")
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton onClick={() => setMenuOpened(!isMenuOpened)}>
                        <MoreVert />
                        {isMenuOpened && <MenuDropDown>
                            <MenuItem onClick={newContactClickHandler} name="New Contact" />
                            <MenuItem name="Profile" />
                            <MenuItem name="Delete Chat" />
                        </MenuDropDown>}
                    </IconButton>
                </div>
            </div>
            {
                isNewContactClicked &&
                <div className="newContact">
                    <div className="newContactBack">
                        <IconButton onClick={() => setNewContactClicked(false)}>
                            <ArrowBack />
                        </IconButton>
                    </div>
                    <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact Name" type="text" className="newContactName" />
                    <div className="newContactContent">
                        <PhoneInput
                            country={'lk'}
                            value={contactNo}
                            onChange={phone => setContactNo(phone)}
                        />
                        {error && <span>{error}</span>}
                    </div>
                    <div onClick={newContactSaveHandler} className="saveContact">
                        <p>Save</p>
                    </div>
                </div>
            }


            {!isNewContactClicked && <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <SearchOutlined />
                    <input placeholder="Search or new chat" type="text" />
                </div>
            </div>}
            {!isNewContactClicked && <div className="sidebar_chats">
                <SidebarChats />
                <SidebarChats />
                <SidebarChats />
            </div>}

        </div>
    )
}

export default Sidebar