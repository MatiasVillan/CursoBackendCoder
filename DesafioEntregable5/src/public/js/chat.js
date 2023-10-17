const socketClient = io();

const form = document.getElementById('chatForm');
const inputMessage = document.getElementById('chatMessage');
const h3Name = document.getElementById('name');
const divChat = document.getElementById('chat');

Swal.fire({
    title:"Ingrese su usuario:",
    input:"text",
    inputValidator: (value) => {
        if (!value)
            return "Por favor ingrese el usuario."
    },
    confirmButtonText: "Aceptar"
});