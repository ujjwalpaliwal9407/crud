import React, { Component } from 'react';
import firebase from './firebase';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
export default class Logout extends Component {
    componentDidMount(){
        { firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("signOut")
            localStorage.removeItem("token")
           
        }).catch((error) => {
            // An error happened.
            console.log(error)
        })}
    }
    render() {
        return (
            <div style={{marginTop:60}}>
                 <h1>Thank You For Shopping</h1>
                 <div className="login">
                 <Link to="/"><Button variant="primary">Login Again</Button>{' '}</Link>
                 </div>
                 
            </div>
        )
    }
}
