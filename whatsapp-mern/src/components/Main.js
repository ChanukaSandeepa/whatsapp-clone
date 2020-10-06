import React, { useEffect, useState } from 'react';
import '../App.css';
import Chat from './Chat';
import Sidebar from './sidebar';
import Pusher from 'pusher-js'
import axios from '../axios'
import firebase from '../firebase'
import Context from '../Context';

function Main() {

    const [user, setUser] = useState()
    const [isLoading, setLoading] = useState(false)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get('/messages/sync')
            .then((response) => {
                setMessages(response.data)
            })
        firebase.auth().onAuthStateChanged(function (user) {
            setUser(user)
        });
    }, [])

    useEffect(() => {
        if (user !== null) {
            setLoading(true)
        }
    }, [user])

    useEffect(() => {
        const pusher = new Pusher('40a295310b3d5bc07f91', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (data) => {
            const dr = []
            dr.push(data)
            setMessages([...messages, data])
        });

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }

    }, [messages])

    return !isLoading ? <div>
        <h1>Loading</h1>
    </div> : (

            <div className="app">

                <div className="app_body">
                    <Sidebar />
                    <Chat messages={messages} />
                </div>

            </div>

        );
}

export default Main;
