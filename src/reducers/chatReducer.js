import {
    CONNECT_CHAT, DISCONNECT_CHAT, 
    RECEIVE_MESSAGE, SEND_MESSAGE, 
    CONNECT_NEW_USER
} from '../actions/chatActions';

const initialState = {
    isConnected: false,
    room: '',
    peerName: '',
    text: '',
    messageID: 0,
    messages: [],
};

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
        case CONNECT_CHAT:
            return Object.assign({}, state, {
                isConnected: true,
                room: action.data.room,
                peerName: action.data.username,
                messages: []          
            })
        case DISCONNECT_CHAT:
            return Object.assign({}, state, {
                isConnected: false,
                room: '',
                peerName: '',
                messages: []
            })
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                messages: [...state.messages, action.data.message],
            })
        case SEND_MESSAGE:
            return Object.assign({}, state, {
                messageID: state.messageID + 1,
            })
        case CONNECT_NEW_USER:
            return Object.assign({}, state, {
                isConnected: true,
                room: action.data.room,
                peerName: action.data.username,
                messages: []     
            })
        default: 
            return state;
    }
}