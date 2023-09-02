class Contador {
    constructor(nombre){
        this.nombre = nombre;
        this.contadorIndividual = 0;
    }

    static contadorGlobal = 0;

    getResponsable(){
        return this.nombre;
    }

    contar(){
        this.contadorIndividual++;
        Contador.contadorGlobal++;
    }
    
    getCuentaIndividual(){
        return `${this.nombre} tiene #${this.contadorIndividual}`;
    }

    getCuentaGlobal(){
        return `La cuenta total es #${Contador.contadorGlobal}`;
    }

}

const carlos = new Contador("Carlos");
const laura = new Contador("Laura");

console.log(carlos.getResponsable());
console.log(laura.getResponsable());

carlos.contar();
carlos.contar();
carlos.contar();
laura.contar();
laura.contar();

console.log(carlos.getCuentaIndividual());
console.log(laura.getCuentaIndividual());
console.log(laura.getCuentaGlobal());
laura.contar();
laura.contar();
laura.contar();
laura.contar();
laura.contar();
console.log(carlos.getCuentaGlobal());