'use strict';

const serverOutput = document.getElementById('server-message');
const clientInput = document.getElementById('user-message');
const sendButton = document.getElementById('send');

let isOnConnect = false;

// const socketURL = 'wss://server.onrender.com';
const socketURL = 'ws://localhost:9000';

let socket = new WebSocket(socketURL);

socket.onopen = function () {
    isOnConnect = true;

    socket.onmessage = function( message ) {
        let messageText = JSON.parse(message.data);
        serverOutput.innerHTML = messageText.data;
    }

    socket.onclose = function(event) {
        isOnConnect = false;
        serverOutput.innerHTML = 'Мы потеряли сервер...';
        console.log('соединение разорвоно:', event);
    }

    socket.onerror = function(error) {
        isOnConnect = false;
        serverOutput.innerHTML = 'Мы потеряли сервер...';
        console.log('ошибка соединения:', error);
    };
};

sendButton.onclick = function() {
    if (!isOnConnect) return;

    let message = clientInput.value.trim();
    if (!message) return;

    clientInput.value = '';
    socket.send( JSON.stringify({ side: 'CLIENT', data: message }) );
}