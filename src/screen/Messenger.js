import React,{useState, useEffect, forwardRef, useRef} from 'react';
import FlipMove from 'react-flip-move';
import {keyupListener,keyCodes, focus} from "../core/index"
import {useDispatch, useSelector} from "react-redux"

import firebase from 'firebase/app'
import {db} from "../config" 

function Messenger(props) {

    const {room, orderDetails} = props

    //console.log(orderDetails)

    const [input, setInput]  = useState('');
    const [messages, setMessages] = useState([]);

    const generalReducers = useSelector(state => state);
    const {userInfo, buyStatus} = generalReducers;
    const {user} = userInfo;
    const dummy = useRef()
 

    useEffect(()=>{
        _getMessages()
    },[])

    const _getMessages = () => {
        db.collection(room)
        .where('orderId', '==', orderDetails._id)
        .orderBy('currentTime', 'asc')
        .onSnapshot((snp) => { 
            setMessages(
                snp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
            )
        })
    }

    const sendMessages = () =>{
        if(buyStatus == 'escrow' || buyStatus == 'paid'){
            if(input == ''){
                focus("._input")
            } 
            else { 
                if(room == 'sellToBuy'){
                    db.collection(room).add({
                        msg: input,   
                        user: user.email, 
                        orderId: orderDetails._id,
                        sellerId: orderDetails.email,
                        buyerId: orderDetails.buyerId,
                        buyOrder: orderDetails.buyOrder,
                        currentTime: firebase.firestore.FieldValue.serverTimestamp(),
                    })  
                }
                if(room == 'buyToSell'){
                    db.collection(room).add({
                        msg: input,   
                        user: user.email, 
                        orderId: orderDetails._id,
                        sellerId: orderDetails.sellerId,
                        buyerId: orderDetails.email,
                        buyOrder: orderDetails.sellOffer,
                        currentTime: firebase.firestore.FieldValue.serverTimestamp(),
                    })  
                }
                setInput('');
                dummy.current.scrollIntoView(
                    {    
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                        alignToTop: false
                    }
                );
            }
        } else {<></>}
    } 
  
    //console.log(messages)

    /* Messages */
    const  Messages = forwardRef(({message}, ref) => {
 
        const isUser = user.email === message.user; 

        return (  
            <div className={`message-blk flex aic amim ${isUser ? "user" : "frd"}`}>
                <div ref={ref} className="item">
                    {isUser === false &&  
                        <div className="dp">
                            <div className="img" style={{backgroundImage: "url(https://placeimg.com/350/350/people?5)"}}/>
                        </div>   
                    }
                    <div className={`txt font s14 c333 ${isUser && "user-txt"}`}>{message.msg}</div> 
                </div>
            </div>
        ); 
    
    }) 

    return (
        <div className="messenger flex flex-col rel">
            {
                user ? 
                <React.Fragment>
                    {
                        (buyStatus == 'escrow' || buyStatus == 'paid') ? user &&
                        <div className='wrap flex flex-col'>
                            <FlipMove> 
                            {
                                messages.map((data, index) =>( 
                                    <Messages key={index}  message={data}/>
                                ))
                            }   
                            </FlipMove>                
                            <div ref={dummy}></div>
                        </div> 
                        :
                        <div className='wrap flex flex-col'></div>
                    }  
                    <div className="msf-ftr flex aic fixed">
                    <input 
                        type="text" 
                        className={`cleanbtn iput _input font s15 c000 anim ${(buyStatus != 'escrow' && buyStatus != 'paid') && 'disble'}`} 
                        placeholder="Type a message"
                        value={input} 
                        disabled={(buyStatus != 'escrow' && buyStatus != 'paid')}
                        onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{sendMessages()})}} 
                        onChange={(e)=>setInput(e.target.value)} 
                    />
                    <button 
                        onClick={sendMessages} 
                        className={`cleanbtn btn icon-send s22 cfff flex aic ${(buyStatus != 'escrow' && buyStatus != 'paid') && 'disble'}`} 
                        disabled={(buyStatus != 'escrow' && buyStatus != 'paid')}
                    />
                </div>
                    <div className="cleanftr"/> 
                </React.Fragment>
                :
                <div className="empty font s15 c000">Message Box</div>
            }
        </div>
    ); 
}

export default Messenger;