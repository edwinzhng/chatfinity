export const CONNECT_CHAT = 'CONNECT_CHAT';
export const DISCONNECT_CHAT = 'DISCONNECT_CHAT';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CONNECT_NEW_USER = 'CONNECT_NEW_USER';
export const CONNECTING_TO_CHAT = 'CONNECTING_TO_CHAT';

export function connectChat() {
    return { 
        type: CONNECT_CHAT 
    };
}

export function disconnectChat() {
    return { 
        type: DISCONNECT_CHAT 
    };
}

export function receiveMessage() {  
    return { 
        type: RECEIVE_MESSAGE 
    };
}

export function sendMessage() {  
    return { 
        type: SEND_MESSAGE 
    };
}

function connectNewUser() {
    return { 
        type: CONNECT_NEW_USER
     };
}

