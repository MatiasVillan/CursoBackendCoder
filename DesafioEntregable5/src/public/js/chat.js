const socketClient = io();

const form = document.getElementById('chatForm');
const inputMessage = document.getElementById('chatMessage');
const h3Name = document.getElementById('name');
const divChat = document.getElementById('chat');

Swal.fire({
    title: "Ingrese su usuario:",
    input: "text",
    inputValidator: (value) => {
        if (!value)
            return "Por favor ingrese el usuario."
    },
    confirmButtonText: "Aceptar"
}).then(input => {
    user = input.value;
    h3Name.innerText = `Usuario conectado: ${user}`;
    socketClient.emit("newUser", user);
});

socketClient.on("newUserBroadcast", (user) => {
    
    Toastify({
        text: `${user} se conectó al chat.`,
        duration: 2000
    }).showToast();
    
});

form.onsubmit = (e) => {
    e.preventDefault();

    const infoMessage = {
        user: user,
        message: inputMessage.value
    };

    socketClient.emit('message', infoMessage);
};

socketClient.on('chat', info => {
    
    const chat = info.map( messageObj => `<p>${messageObj.user} dijo: ${messageObj.message}</p>` ).join(' ');

    divChat.innerHTML = chat;
});