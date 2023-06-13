//Declarando el almacenamiento de los usuarios y su información
let cuentas = [
    { nombre: "Mali", clave: "mali9906*"},
    { nombre: "Mera", clave: "lameramera80!"},
    { nombre: "Maui", clave: "denada*33"}
]
let usuarioLogueado = " ";
const formLogin = document.getElementById("formlogin");

document.addEventListener('DOMContentLoaded', function() {
    
    const formLogin = document.getElementById("formlogin");

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById("usuario").value;
        const clave = document.getElementById("clave").value;

        let coincide = false;
        
        // Validación usuario/clave
        for (let iterar = 0; iterar < cuentas.length; iterar++) {
            if (cuentas[iterar].nombre === nombre && cuentas[iterar].clave === clave){
                coincide = true;
                usuarioLogueado = cuentas[iterar].nombre;
                localStorage.setItem("loginCorrecto", usuarioLogueado);
                break;
            }
        }

        if (coincide == true){
            ingresoBanco();
        } else {
            alert("Usuario o clave fallida, reingresar");
        }
    });
});

function ingresoBanco(){
    window.location.assign("cajero.html")
    console.log("entramos :v")
}