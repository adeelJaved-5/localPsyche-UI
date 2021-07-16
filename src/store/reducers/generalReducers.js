const initState = {
    loading: false,
    dialogID: null,
    isUser: false,
    buyStatus: null,
    userInfo: {}, 
    rateCommunication: 0,
    rateTrust: 0,
    rateSpeed: 0,
    notifi: true,
    pair: 'bfredx/eth',
} 
 
const generalReducers = (state = initState, action) => {
    const {type, payload} = action
    switch(type){ 
        case 'LOADING':
            return {...state, loading: payload}
        case 'DIALOG_ID':
            return {...state, dialogID: payload}
        case 'USER_INFO':
            return {...state, userInfo: action.payload}
        case 'IS_USER':
            return {...state, isUser: payload}
        case 'BUY_ORDER':
            return {...state, buyStatus: action.payload}
        case 'notifi':
            return {...state, notifi: action.payload}
        case 'RATE_COM':
            return {...state, rateCommunication: action.payload}
        case 'RATE_TRUST':
            return {...state, rateTrust: action.payload}
        case 'RATE_SPEED':
            return {...state, rateSpeed: action.payload}
        case 'pair':
            return {...state, pair: action.payload}
        default: 
            return state
    }
}   
 
export default generalReducers
