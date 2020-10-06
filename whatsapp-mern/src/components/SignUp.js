import React, { useEffect, useState, useContext } from 'react';
import '../css/signup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from '../axios'
import { useHistory, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { ContextValue, useStateValue } from '../Context';
import { ADD_TOKEN } from '../contextReducer';

const SignUp = (props) => {

    const history = useHistory()

    const [contactNo, setContactNo] = useState(0)
    const [email, setEmail] = useState('')

    const [state, dispatch] = useStateValue()


    useEffect(() => {
        console.log(localStorage.getItem('reducerState'))
    }, [])



    const submitButtonHandler = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            axios.post('user/register', {
                email: user.email,
                contactNo,
                image: user.photoURL,
                displayName: user.displayName
            }).then(async (res) => {
                const token = res.data.token
                dispatch({ type: ADD_TOKEN, payload: token })
                history.push(res.data.redirectUrl)
            })
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    return (
        <div className="page">
            <div className="form-page">

                <form>
                    <h2>Sign Up</h2>
                    <div className=".codeselector">
                        <PhoneInput
                            country={'lk'}
                            value={contactNo}
                            onChange={phone => setContactNo(phone)}
                        />
                    </div>
                    <div onClick={submitButtonHandler} className="submit-button">
                        Submit
                    </div>
                </form>

            </div>
        </div>
    )
}

export default withRouter(SignUp)