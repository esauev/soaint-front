export class Operation {
    id:number;
    operacion:string;
    importe:string;
    cliente:string;
    referencia:number;
    estatus:string;
    secreto:string;

    setSecreto(text:string) {
        this.secreto = text;
    }

    setEstatus(text:string) {
        this.estatus = text;
    }
}
