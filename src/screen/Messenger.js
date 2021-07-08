import React,{useState, useEffect, forwardRef, useRef} from 'react';
import FlipMove from 'react-flip-move';
import {keyupListener,keyCodes, focus} from "../core/index"
import {useDispatch, useSelector} from "react-redux"

import firebase from 'firebase/app'
import {db, storageRef, storage} from "../config" 
 
function Messenger(props) {

    const {room, orderDetails} = props

    //console.log(orderDetails)

    const [input, setInput]  = useState('');
    const [fileUrl, setFileUrl] = useState(null)
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
            if(input == '' && fileUrl == null){
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
                        fileUrl: fileUrl,
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
                        fileUrl: fileUrl,
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
        document.getElementById("file_upload").value = null;
        setFileUrl(null)
        document.querySelector('#image_name').innerHTML = ''
    }  

  
   //console.log(messages)

    /* Messages */
    const  Messages = forwardRef(({message}, ref) => {
 
        const isUser = user.email === message.user; 

        const downloadimg = async (e) => {
            // const file = await fetch(message.fileUrl)
            // const blob = file.blob();
            // const url = window.URL.createObjectURL(blob);
            if((e.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null)){
                var ext = 'jpg'
            }
            else{
                var ext = 'doc'
            }
            const link = document.createElement('a');
            link.href = e;
            link.setAttribute('download', `file.${ext}`); //or any other extension
            link.setAttribute('href', `file.${ext}`); //or any other extension
            document.body.appendChild(link);
            link.click();

            // Clean up and remove the link 
            link.parentNode.removeChild(link);
        }
        
        
        return (    
            <div className={`message-blk flex aic amim ${isUser ? "user" : "frd"}`}>
                {
                    (message.fileUrl == null || message.fileUrl == '') ?
                    <div ref={ref} className="item">
                        <div className={`txt font s14 c333 ${isUser && "user-txt"}`}>{message.msg}</div> 
                    </div>
                    :
                    [
                        (((message.fileUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null))
                            ? <div ref={ref} className="item">
                                <button className="cleanbtn" type='submit' onClick={() => downloadimg(message.fileUrl)}>
                                    <img src={message.fileUrl} className="file" />
                                </button> 
                            </div>
                            : <div ref={ref} className="item">
                                <button className="cleanbtn" type='submit' onClick={() => downloadimg(message.fileUrl)}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNckVhMiWCawrigw2z5mQwNZeUYMv8lMLpVDpOxNms4SN1f9WbX1Z6Fd9QPvJHYxohWJQ&usqp=CAU" className="file" />
                                </button> 
                            </div>
                        ),
                    ]
                }
            </div>
        ); 
    
    }) 

    /*Generate Random ID*/
    const generateID = () =>{
        var min = 1000;
        var max = 999999999999;
        var rand = Math.floor( Math.random() * (max - min) ) + min;
        return rand;
    }

    /* Upload Files */
    const _uploadFile = async (e) => {
        let file = e.target.files[0];
        var ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
        const fileNname = generateID() + "." + ext;
        
        const storageRef = storage.ref()
        const fileRef = storageRef.child(fileNname)
        await fileRef.put(file).then(() => {
            console.log("Uploaded File", fileNname) 
            document.querySelector('#image_name').innerHTML = fileNname
        })
        setFileUrl(await fileRef.getDownloadURL())
    }

    return (
        <div className="messenger flex flex-col rel">
            {
                user ? 
                <React.Fragment>
                    {
                        (buyStatus == 'escrow' || buyStatus == 'paid') ? user &&
                        <div className='wrap flex flex-col'>
                            <p className={`text-center py-2 rounded text-success ${(buyStatus != 'escrow' && buyStatus != 'paid') && 'd-none'}`}><b>You can now start the chat.</b></p>
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
                        <div className="feild flex aic">
                            <input 
                                type="text" 
                                className={`cleanbtn iput _input font s15 c000 anim ${(buyStatus != 'escrow' && buyStatus != 'paid') && 'disble'}`} 
                                placeholder="Type a message"
                                value={input} 
                                disabled={(buyStatus != 'escrow' && buyStatus != 'paid')}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{sendMessages()})}} 
                                onChange={(e)=>setInput(e.target.value)} 
                            />
                            <input id="file_upload" multiple = {true} className='iputhidden  reset' type="file"  onChange={e => {_uploadFile(e)} }  style={{visibility: 'hidden', width:'164px'}} />
                            
                        </div>
                    <span id='image_name'></span>
                    <button disabled={(buyStatus != 'escrow' && buyStatus != 'paid')} onClick={e => {document.getElementById("file_upload").click()}} style={{background: 'transparent', width:'50px', border: 'none' }} className='ml-3'><img src={"/images/upload.png"} className="w-100" /></button>
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