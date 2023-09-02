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


    }

}
