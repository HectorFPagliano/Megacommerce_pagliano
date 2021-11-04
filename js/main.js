// alert("Recuerde que esta disponible la promocion de hasta 6 cuotas sin interes y tambien descuento del 10% para pagos de contado, si usted elige mas de 6 cuotas existe un 10% de interes");
//Defino el objeto 
class Sistema{
    constructor(tipoSistema, precio, cantCuotas) {
        this.tipo = tipoSistema;
        this.precio = precio;
        this.cantCuotas   = cantCuotas;
        this.valcuota = this.calcularMontoCouota();
    }
// Arreglo creado para que pagos en una couata tenga un descuento del 10% en pagos de contado 
    descuento () {
        this.precio = this.precio  - this.precio*.10;
        this.calcularMontoCouota();
    }
// Metodo para calcular el monto de la cuota
    calcularMontoCouota () {
        
        if (this.cantCuotas <= 6) {
            this.valcuota = this.precio / this.cantCuotas;

        }else if (this.cantCuotas > 6  && this.cantCuotas <= 12 ) {
            this.valcuota = (this.precio * 1.10) / this.cantCuotas  ; 
        }

        this.valcuota = Math.round(this.valcuota); 
        
        return this.valcuota;
    }
    // Metodo para actualizar el monto de las cuotas 
    actualizarCantidadCuotas (cantCuotas) {
        if(cantCuotas <= 12 && cantCuotas >= 1) {
            this.cantCuotas   = cantCuotas;
        }
        this.calcularMontoCouota();
    }
// Metodo para ver los montos de cada cuota, seg la cantidad elegida
    verMontoCuotas () {
        alert('El valor de la cuota del sistema ' + this.tipo + ' es de: $' + this.valcuota);
    }
}

let createBoxBtn = document.getElementById("createBoxBtn");

let selectcuotas =  document.getElementById("cars");

selectcuotas.addEventListener('change',createBox);

function createBox() {

    let cantidadcuotas = selectcuotas.value;
    // Arrays  que permite acceder al precio y descuento del 10% pago contado
    
    let arraySistemas = [];
    arraySistemas.push(new Sistema('Empresa', 100000, cantidadcuotas));
    arraySistemas.push(new Sistema('Supermecado', 120000,cantidadcuotas));
    arraySistemas.push(new Sistema('Ess', 150000, cantidadcuotas));
    
    const cantidadDeCuotas = { cantidadcuotas: cantidadcuotas };
    const cantidadDeCuotasJSON    = JSON.stringify(cantidadDeCuotas);

    localStorage.setItem('cantidadDeCuotasJSON', cantidadDeCuotasJSON)

    //Nos muestra el valor final del sistema en caso de elegir 1 solo pago
    for (const sistemaa of arraySistemas)
        if (sistemaa.cantCuotas == 1)
            sistemaa.descuento();
    
    let tableContenido = `<tr>
    <th>Sistema</th>
    <th>Precio</th>
    <th>Cantidad Cuotas</th>
    <th>Valor Cuota</th>
    </tr> `;
    
    for (const sistemaa of arraySistemas) {
        tableContenido += `<tr>
        <td>${sistemaa.tipo}</td>
        <td>${sistemaa.precio}</td>
        <td>${sistemaa.cantCuotas}</td>
        <td>${sistemaa.valcuota}</td>
        </tr>`;
    }
            
    let table = document.getElementById("table-precios");
    
    table.innerHTML = tableContenido;

}

window.addEventListener('DOMContentLoaded', (event) => {
    let cantidadDeCuotasJSON = localStorage.getItem('cantidadDeCuotasJSON');
    if(cantidadDeCuotasJSON) {
        let selectcuotas =  document.getElementById("cars");
        //selectcuotas.value = cantidadDeCuotasJSON
        let cantidadDeCuotas = JSON.parse(cantidadDeCuotasJSON);
        selectcuotas.value = cantidadDeCuotas.cantidadcuotas;
        createBox();
    }
});

