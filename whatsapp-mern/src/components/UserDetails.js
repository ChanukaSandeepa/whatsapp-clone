import React, { useEffect, useState } from 'react';
import '../css/user_details.css'
import default_user_image from '../assests/default-user.jpg'
import { CameraAlt } from '@material-ui/icons';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

const UserDetails = () => {

    const [fileRef, setFileRef] = useState()

    const fileselecting = () => {
        fileRef.click()
    }



    useEffect(() => {
        alert(firebase.auth().currentUser)
        console.log('firebase auth start')
        console.log(firebase.auth().currentUser)
        console.log('firebase auth end')
    }, [])

    return (
        <div className="page">
            <div className="form-page">

                <form>
                    <h2>Information</h2>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="caption" placeholder="Caption" />
                    <div className="image-container">
                        <img src={default_user_image} />
                        <div onClick={fileselecting} className="browser">
                            <CameraAlt />
                        </div>
                    </div>
                    <input ref={(ref) => setFileRef(ref)} style={{ display: "none" }} type="file" name="profile" />
                    <div className="submit-button">
                        Save
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(UserDetails)