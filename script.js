function login(){

    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const error = document.getElementById("error");

    // limpiar mensaje
    error.innerText = "";

    // validar campos vacíos
    if(usuario === "" || clave === ""){
        error.innerText = "Ingrese usuario y contraseña";
        return;
    }

    // credenciales de prueba (modo académico)
    if(usuario === "admin" && clave === "1234"){
        window.location.href = "index.html";
    }else{
        error.innerText = "Datos incorrectos";
    }
}


// permitir ENTER para iniciar sesión
document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        login();
    }
});
