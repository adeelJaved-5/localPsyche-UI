import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import QRCode from 'qrcode'
import SpeakEasy from 'speakeasy'
import {Toast, LineLoader} from "../ui";
import {
    focus,
    isValidEmail,
    keyupListener,
    keyCodes
} from "../core"
import {useDispatch} from 'react-redux'

 
function Signin(props) {

    const [check, setCheckbox] = useState(false)
    const [email, setEmail] = useState('')
    const [verification, setverification] = useState('')
    const [verificationtwofa, setverificationtwofa] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [fa, setfa] = useState(true)
    const [apitoken, setapitoken] = useState('')
    const [tofa, setcode] = useState('')
    const [scan, setscan] = useState(false)
    const [userInfo, setuserInfo] = useState()

    

    const dispatch = useDispatch()
    

    useEffect(() => {

        if(sessionStorage.getItem('loginInfo'))
        {
            const logininfo = (sessionStorage.getItem('loginInfo'))
            setEmail(JSON.parse(logininfo).email)
            setPassword(JSON.parse(logininfo).password)
            setCheckbox(true)
        }
    },[])

    const _getUserInfo = async (token) => {
        try {
        const { data } = await axios({
            method: 'post', 
            url: `${global.baseurl}:8000/api/auth/user-profile`,
            data: {token: token},
            headers: {
              "Content-Type": "application/json",
              "Authorization":  token
            }  
        });  
        if(data){
            dispatch({type: 'USER_INFO', payload: data})
            // console.log(scan)
            // if(data.user.twoFA){
            //     setscan(false)
            // }
            // else{
            //     const secret = SpeakEasy.generateSecret({
            //         name: email
            //     });
            //     console.log(secret)
        
            //     sessionStorage.setItem("secret", JSON.stringify(secret));
        
            //     QRCode.toDataURL(secret.otpauth_url, function(err,data){
            //         sessionStorage.setItem("imgURL", data.toString());
            //     })
            // }
            setuserInfo(data)
        }
      } catch (error) { 
        console.log(error)
      }
    }

    const _check = () => {
        if(sessionStorage.getItem('loginInfo'))
        {
            sessionStorage.removeItem('loginInfo')
            setCheckbox(false)
        }
        else if(check && !sessionStorage.getItem('loginInfo'))
        {
            setCheckbox(false)
        }
        else 
        { 
            setCheckbox(true)
        }
    } 

    const _login = () => {
        if(email == null){ 
            focus("._email");
            Toast.show({ html: "Please enter your email", time: 5 });
        } else if (!isValidEmail(email)){
            focus("._email"); 
            Toast.show({ html: "Please enter valid email", time: 5 }); 
        } else if (password == null){
            focus("._password");
            Toast.show({ html: "Please enter password email", time: 5 });
        } else {
            setLoading(true) 
            axios.post(
                `${global.baseurl}:8000/api/auth/sign-in`, {email: email, key: password})
                .then((response) =>{ 
                    //console.log(response) 
                    setLoading(true)
                    const {success, message, token} = response.data;
                    setapitoken(token)
                    _getUserInfo(token)
                    if(success){
                        axios.post(
                            `${global.baseurl}:8000/api/auth/generateCode`, {email: email})
                            .then((response) =>{ 
                                const {success, code, message} = response.data;
                                if(success){
                                    setcode(code)
                                    Toast.show({ html: message, type: success ? "warn" : 'error', time: 6 });  
                                }  
                            })  
                            .catch ((error) => {  
                                const {success, message} = error.response;
                                Toast.show({ html: message, type: success ? "warn" : 'error', time: 6 });
                            })
                        setTimeout(() => {
                            setLoading(false)
                            setfa(false)
                        }, 2000);
                    }   
                })  
                .catch ((error) => {  
                    setLoading(false) 
                    console.log(error.response)  
                    const {success, message} = error.response.data;
                    Toast.show({ html: message, type: success ? "warn" : 'error', time: 6 });
                })
            
        } 
    } 

    const save2fa = async () => {
        const secretobj = sessionStorage.getItem('secret')
        const secret = JSON.parse(secretobj)
        const { data } = await axios({
            method: 'post', 
            url: `${global.baseurl}:3000/saveTwoFA`,
            data: {
                id: secret.ascii.toString(),
                image: sessionStorage.getItem('imgURL')
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization":  apitoken
            } 
        }); 
        if(data.success){
            _getUserInfo(apitoken)
            sessionStorage.setItem("key", apitoken);
            dispatch({type: 'IS_USER', payload: true})
            props.history.push("/")
            if(check){sessionStorage.setItem('loginInfo', JSON.stringify({email, password}))}
            Toast.show({ html: "Login Successfully", type:'success', time: 6 });
        } 
    }

    const _after2fa = () => {
        const secretobj = sessionStorage.getItem('secret')
        const secret = JSON.parse(secretobj)
        var verified = SpeakEasy.totp.verify({
            secret: secret.ascii,
            encoding: 'ascii',
            token: verification,
        })
        if(verified){
            save2fa()
        }  
        else{
            Toast.show({ html: "Verification Code is invalid !!", type:'error', time: 6 });
        }  
    }

    const _verify2fa = () =>{
        // var verified = SpeakEasy.totp.verify({
        //     secret: userInfo.user.twoFA,
        //     encoding: 'ascii',
        //     token: verification,
        // })
        if(verificationtwofa == tofa){
            _getUserInfo(apitoken)
            sessionStorage.setItem("key", apitoken);
            dispatch({type: 'IS_USER', payload: true})
            props.history.push("/")
            if(check){sessionStorage.setItem('loginInfo', JSON.stringify({email, password}))}
            sessionStorage.setItem("pair", 'bfredx/eth');
            Toast.show({ html: "Login Successfully", type:'success', time: 6 });
        }
        else{
            Toast.show({ html: "Verification Code is invalid !!", type:'error', time: 6 });
        } 
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
                {fa
                    ?<div className="form">
                        <div className="item rel">
                            <input 
                                type="text" 
                                placeholder="Email"
                                className="cleanbtn _email iput font s15 cfff anim"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_login()})}} 
                            /> 
                        </div>
                        <div className="item rel">
                            <input 
                                type="password" 
                                placeholder="Password"
                                className="cleanbtn _password iput font s15 cfff anim"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_login()})}} 
                            /> 
                        </div>
                        <div className="item flex aic">
                            <div className="box flex aic">
                                <button 
                                    className={`checkbox cleanbtn ${check === true ? "on icon-check" : ""}`} 
                                    onClick = {()=>{_check()}}
                                />
                                <div className="lbl font s14 c333">Remember Me</div>
                            </div>
                            <Link to="/forgot-password" className="lin font s14">Forgot Password</Link>
                        </div>
                        <div className="ftr flex aic">
                            <button 
                                className="button font s15 cfff anim" 
                                onClick={()=>_login()}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_login()})}} 
                            >Sign In</button>  
                        </div>
                        <div className='blk flex aic'>
                            <div className="lbl font s15 anim">Already have a account?&nbsp;<Link to="/register" className='cfff'>Signup</Link></div>
                        </div>
                        <div className="blk flex aic">
                            <div className="lbl font s15 anim">Or login with</div>
                            <a href="https://localpsyche.com:3000/auth/google" className="cleanbtn link flex aic"><img src="/images/google-logo.svg"  className="img"/></a>
                            {/*<button className="cleanbtn link flex aic"><img src="/images/apple-logo.svg"  className="img"/></button>*/}
                        </div>
                    </div>
                    :scan
                        ?<div className="text-center pt-5">
                            <img className="w-75" src={sessionStorage.getItem('imgURL')} />
                            <div className="form">
                                <div className="item rel">
                                    <input 
                                        type="text" 
                                        placeholder="Enter 6 digit Verification code"
                                        className="cleanbtn _email iput font s15 cfff anim"
                                        value={verification}
                                        onChange={e => setverification(e.target.value)}
                                        onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_after2fa()})}} 
                                    /> 
                                </div>
                                <div className="ftr flex aic">
                                    <button 
                                        className="button font s15 cfff anim" 
                                        onClick={()=>_after2fa()}
                                    >Verify</button>  
                                </div>
                            </div>
                        </div>
                        :<div className="text-center pt-5">
                            <div className="form">
                                <div className="item rel">
                                    <input 
                                        type="text" 
                                        placeholder="Enter 6 digit Verification code"
                                        className="cleanbtn _email iput font s15 cfff anim"
                                        value={verificationtwofa}
                                        onChange={e => setverificationtwofa(e.target.value)}
                                        onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_verify2fa()})}} 
                                    /> 
                                </div>
                                <div className="ftr flex aic">
                                    <button 
                                        className="button font s15 cfff anim" 
                                        onClick={()=>_verify2fa()}
                                    >Verify</button>  
                                </div>
                            </div>
                        </div>
                }
                
            </div>
        </div>
        
    );
}

export default Signin;