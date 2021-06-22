import React,{useState,useEffect} from 'react';
import {Link ,useHistory} from 'react-router-dom';
import axios from "axios";
import {Toast, LineLoader} from "../ui";
import {
    focus,
    isValidpassword,
    keyupListener,
    keyCodes
} from "../core"


function Signin(props) {
    
    const [password, setpassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [lineon, setlineon] = useState(true)

    let history = useHistory();

    axios.post(
        `${global.baseurl}:8000/api/auth/check-user`, {token: props.match.params.id})
        .then((response) =>{ 
            console.log(response) 
            
            if(response.data.authenticated){
                setLoading(true) 
                setlineon(false)
            } 
            else{
                setlineon(true)
                setLoading(false) 
                setTimeout(() => {
                    history.push('/login')
                }, 3000);
            }   
        })  
        .catch ((error) => {  
            setLoading(false) 
        })

    const _changePassword = () => {
        if(password == null){ 
            Toast.show({ html: "Please enter your password", time: 5 });
        }
        axios.post(
            `${global.baseurl}:8000/api/auth/reset-password`, {new_key: password , token: props.match.params.id})
            .then((response) =>{ 
                console.log(response) 
                const {status, message} = response.data;
                if(status == 200){
                    Toast.show({ html: message, type: status ? "ok" : 'error', time: 5 });
                    setlineon(true)
                    setTimeout(() => {
                        history.push('/login')
                    }, 1000);
                } 
                else{
                    Toast.show({ html: message, type: status ? "ok" : 'error', time: 5 });
                }   
            })  
            .catch ((error) => {  
                console.log(error) 
            })
    } 
  
    return (
        <div className="sign-p login rel flex aic">
            <img src="/images/right-btm.svg" className="rig-btm fixed" />
            <img src="/images/circle.svg" className="circle fixed abc" />
            <img src="/images/left-btm.svg" className="lef-btm fixed" />
            <div className="block flex flex-col rel">
                <div className="hdr flex aic">
                    <div className="lef flex aic">
                        <img src="/images/logo.svg" className="logo" />
                    </div>
                </div> 
                {lineon && 
                    <div className="loading cover abs fill flex aic">
                        <LineLoader />
                    </div>
                }
            {loading   
                ?
                <div className="form">
                    <div className="item rel">
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="cleanbtn _password iput font s15 cfff anim"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                            onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_changePassword()})}} 
                        /> 
                    </div>
                    <div className="ftr flex aic">
                        <button 
                            className="button font s15 cfff anim" 
                            onClick={()=>_changePassword()}
                            onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_changePassword()})}} 
                        >Change Password</button>  
                    </div>
                </div>
                :<div className="reset_jds" style={{height: '300px'}}>
                    <p style={{color: '#fff'}}>Oops looks like the link is broken. Please try to reset the password again</p>
                </div>
            }
            </div>
        </div> 
    );
}

export default Signin;