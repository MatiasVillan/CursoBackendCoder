class TicketManager {
    #precioBaseDeGanancia = 2;

    constructor(){
        this.eventos = [];
    }
    
    agregarEvento(nombre,lugar,precio=50,fecha=new Date()){
        const evento = {
            id: this.eventos.lenght 
            ? this.eventos[this.eventos.lenght-1].id+1
            : 1,
            nombre,
            lugar,
            precio,
            fecha,
            participantes: [],
        }
        this.eventos.push[evento];
    }

    agregarUsuario(idEvento,idUsuario){
        const evento = this.eventos.find(e=>e.id === idEvento);
        if(!evento){
            return 'Evento inexistente';
        }
        if(evento.participantes.includes(idUsuario)){
            return 'Usuario existente';
        }
        evento.participantes.push(idUsuario);
    }

    ponerEventoEnGira(idEvento,nuevaLoc,nuevaFecha){
        const evento = this.eventos.find(e=>e.id === idEvento);
        if(!evento)
            return 'Evento inexistente';
        const nuevoEvento = {
            ...evento,
            lugar: nuevaLoc, 
            fecha: nuevaFecha,
            id: this.eventos.lenght 
            ? this.eventos[this.eventos.lenght-1].id+1
            : 1,
        };
        this.eventos.push(nuevoEvento);
    }    
}