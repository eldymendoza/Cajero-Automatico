//info de los usuarios
let cuentas = [
    { nombre: "Mali", saldo: 200 },
    { nombre: "Mera", saldo: 290 },
    { nombre: "Maui", saldo: 67 } 
]

let quienIngresa = localStorage.getItem('loginCorrecto');
console.log("in: " + quienIngresa);

let indexQuienEntro = cuentas.findIndex(function(cuenta){
    return cuenta.nombre === quienIngresa;
});
console.log("index: " + indexQuienEntro);


document.addEventListener("DOMContentLoaded", function() {
    const botonConsulta = document.getElementById("consulta");
    const botonRetiro = document.getElementById("retiro");
    const botonDeposito = document.getElementById("deposito");
    const botonSalir = document.getElementById("cerrarSesion");
    // Esconder el formulario al ingresar, será visible de nuevo cuando los botones retirar/ingresar dinero se presionen
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "none";

    botonConsulta.addEventListener("click", function() {
        console.log("Boton consultar presionado");
        consultarSaldo();
    });

    botonRetiro.addEventListener("click", function() {
        console.log("Boton Retirar presionado");
        retiro();
    });

    botonDeposito.addEventListener("click", function() {
        console.log("Boton ingresar dinero presionado");
        deposito();
    });

    botonSalir.addEventListener("click", function() {
        window.location.assign("ventanaLogin.html")
    });
});
//consulta de saldo: 
function consultarSaldo(){
    const textoAviso = document.getElementById("textoCambiable");
    const saludoUsuario = document.getElementById("saludoUsuario");
    //El formulario no es útil al momento de realizar una consulta, por ello se "esconde"
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "none";
    saludoUsuario.style.display = "none";
    //Mostrar información del saldo de la cuenta
    textoAviso.innerHTML = "Tu saldo es: " + cuentas[indexQuienEntro].saldo;
    console.log("Consulta saldo completa");
}
//retiro de dinero: 
function retiro(){
    //inicio transacción y aviso relevante
    const textoAviso = document.getElementById("textoCambiable");
    const textoAviso2 = document.getElementById("textoCambiable2");
    const saludoUsuario = document.getElementById("saludoUsuario");
    saludoUsuario.style.display = "none";
    textoAviso.innerHTML = "Cuánto desea retirar?";
    textoAviso2.innerHTML = "Recuerde que la cuenta debe tener un saldo mínimo de $10 después del retiro";
    
    //recibir el valor de la transacción y mostrar el formulario
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "flex";

    retiroDeposito.addEventListener("submit", function(event){
        event.preventDefault();
        const valorTransaccion = document.getElementById("montoTransaccion").value;
        console.log("Retiro: " + valorTransaccion);

        //convertir el valor recolectado en datos que podemos operar
        const cantidad = parseInt(valorTransaccion);

        //validar si el valor del retiro cumple la regla de negocio
        if ((cuentas[indexQuienEntro].saldo - cantidad) >= 10){

            cuentas[indexQuienEntro].saldo -= cantidad;
            console.log("Saldo luego del retiro: " + cuentas[indexQuienEntro].saldo);
            //informar al usuario del valor retirado y nuevo saldo
            textoAviso2.innerHTML = "Perfecto, retiraste " + cantidad + " ahora te quedan " + cuentas[indexQuienEntro].saldo;
            textoAviso2.style.color = "black";
        } else {
            textoAviso2.innerHTML = "No tienes saldo suficiente, consulta el saldo antes de retirar";
            textoAviso2.style.color = "red";
        }
    });
}
//ingreso de dinero:
function deposito(){
    //inicio transacción y avisos relevantes
    const textoAviso = document.getElementById("textoCambiable");
    const textoAviso2 = document.getElementById("textoCambiable2");
    const saludoUsuario = document.getElementById("saludoUsuario");
    saludoUsuario.style.display = "none";
    textoAviso.innerHTML = "Cuánto desea depositar?";
    textoAviso2.innerHTML = "Recuerde que el saldo máximo de la cuenta puede ser $990";
    
    //recibir el valor de la transacción y mostrar el formulario
    const retiroDeposito = document.getElementById("retiroDeposito");
    retiroDeposito.style.display = "flex";

    retiroDeposito.addEventListener("submit", function(event){
        event.preventDefault();
        const valorTransaccion = document.getElementById("montoTransaccion").value;
        console.log("Deposito: " + valorTransaccion);

        //convertir el valor recolectado en datos que podamos operar
        const cantidad = parseInt(valorTransaccion);

        //Validar si el deposito cumple la regla de negocio
        if ((cuentas[indexQuienEntro].saldo + cantidad) <= 990) {

            cuentas[indexQuienEntro].saldo += cantidad;
            console.log("Saldo luego del depósito: " + cuentas[indexQuienEntro].saldo);
            //Informar al usuario de la cantidad ingresada y el nuevo saldo
            textoAviso2.innerHTML = "Luego de depositar $" + cantidad + ", tu nuevo saldo es " + cuentas[indexQuienEntro].saldo;
            textoAviso2.style.color = "black";
        } else {
            textoAviso2.innerHTML = "Límite excedido, consulta el saldo y corrige la cantidad a depositar";
            textoAviso2.style.color = "red";
        }
    });
}