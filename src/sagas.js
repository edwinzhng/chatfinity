import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function connectSocket() {
    const socket = io('http://localhost:3001');
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function subscribeSocket(socket) {
    return eventChannel(emit => {
        socket.on('CONNECT_CHAT', (data) => {
            connectChat(data);
        });
        socket.on('DISCONNECT_CHAT', () => {
            disconnectChat();
        });
        socket.on('SEND_MESSAGE', () => {
            emit();
        });
        socket.on('RECIEVE_MESSAGE', (message) => {
            addMessage(message);
        });
        socket.on('CONNECT_NEW_USER', () => {
            emit();
        });
        return () => {};
    });
}

function *receieveMessage(socket) {
    const channel = yield call(subscribeSocket, socket);
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
}
  
function *sendMessage(socket, message) {
    while (true) {
      socket.emit('SEND_MESSAGE', message);
    }
}
  
function *handleIO(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
}

function *reconnectChat() {
  yield takeEvery("USER_FETCH_REQUESTED");
}

export default function* rootSaga() {
    yield fork(handleIO);
}