import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Toast, LineLoader} from "../ui";
import {
    focus,
    isValidEmail,
    keyupListener,
    keyCodes
} from "../core"

 
function Signin(props) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)



    const _forgot = () => {
        if(email == null){ 
            focus("._email");
            Toast.show({ html: "Please enter your email", time: 5 });
        }
        axios.post(
            `${global.baseurl}:8000/api/auth/request-password-reset`, {email: email.toString()})
            .then((response) =>{ 
                console.log(response) 
                const {success, message} = response.data;
                setLoading(true) 
                if(success){
                    setLoading(false) 
                    Toast.show({ html: "Password Reset request has been received! Please check your email inbox", type: success ? "ok" : 'error', time: 5 }); 
                }    
            })  
            .catch ((error) => {  
                setLoading(false) 
                console.log(error.response)  
                const {success, message} = error.response.data;
                Toast.show({ html: message, type: success ? "warn" : 'error', time: 6 });
            })
    } 
  
    return (
        <div className="sign-p login rel flex aic">
            <img src="/images/right-btm.svg" className="rig-btm fixed" />
            <img src="/images/circle.svg" className="circle fixed abc" />
            <img src="/images/left-btm.svg" className="lef-btm fixed" />
            <div className="block flex flex-col rel">
                {loading && 
                    <div className="loading cover abs fill flex aic">
                        <LineLoader />
                    </div>
                }
                <div className="hdr flex aic">
                    <div className="lef flex aic">
                        <img src="/images/logo.svg" className="logo" />
                    </div>
                </div> 
                <div className="form">
                    <div className="item rel">
                        <input 
                            type="text" 
                            placeholder="Email"
                            className="cleanbtn _email iput font s15 cfff anim"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_forgot()})}} 
                        /> 
                    </div>
                    <div className="ftr flex aic">
                        <button 
                            className="button font s15 cfff anim" 
                            onClick={()=>_forgot()}
                            onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_forgot()})}} 
                        >Reset Password</button>  
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Signin;