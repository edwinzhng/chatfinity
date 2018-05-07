import {
    CONNECT_CHAT, DISCONNECT_CHAT, 
    RECEIVE_MESSAGE, SEND_MESSAGE, 
    CONNECT_NEW_USER, CONNECTING_TO_CHAT
} from '../actions/chatActions';

const initialState = {
    isConnected: false,
    room: '',
    connectedName: '',
    text: '',
    messageID: 0,
    messages: [],
};

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
        case CONNECT_CHAT:
            return Object.assign({}, state, {
                isConnected: true,
            })
        case DISCONNECT_CHAT:
            return Object.assign({}, state, {
                isConnected: false,
            })
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                messages: [...state.messages, message],
            })
        case SEND_MESSAGE:
            return Object.assign({}, state, {
                messageID: state.messageID + 1,
            })
        case CONNECT_NEW_USER:
            return Object.assign({}, state, {
                isConnected: true,
            })
        case CONNECTING_TO_CHAT:
            return Object.assign({}, state, {
                isConnected: false,
            })
        default: 
            return state;
    }
}