function cargarPerfil(){
    var mensajeusuario = document.getElementById("mensajeBienvenida");
    mensajeestado = document.getElementById("mensajeEstado");
    var nombreUsuario = window.localStorage.getItem('idusuario');//obtengo un dato del almacenamiento local
    mensajeusuario.innerHTML = "Bienvenido " + nombreUsuario;
    return false;
}

$('#btnBuscaroponente').click(function () {
    var nombreusuario = window.localStorage.getItem('idusuario'); //obtengo un dato del almacenamiento local
    var random = generarUUID();
    var datastring = "tipo=buscaroponente&nombreusuario=" + nombreusuario + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/insertardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            if (result == "registrado") {
                esperarOponente();
            }
            else{
                esperarOponente();
            }
        },
        error: function (error) {
            alert("Error al ingresar, intenta nuevamente" + JSON.stringify(error, null, 2));
        }
    });
});

//evento del botón salir para hacer logout de la aplicación
$('#btnSalir').click(function () {
    var nombreusuario = window.localStorage.getItem('idusuario'); //obtengo un dato del almacenamiento local
    var random = generarUUID();
    var datastring = "tipo=eliminarusuario&nombreusuario=" + nombreusuario + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/eliminardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            if (result == "borrado") {
                window.localStorage.clear();
                window.location.href = 'index.html';
            }
        },
        error: function (error) {
            alert("Error al ingresar, intenta nuevamente" + JSON.stringify(error, null, 2));
        }
    });
});

function esperarOponente(){
    intentos = 0;
    intervalo = setInterval(confirmarOponente, 1000);
}

/*confirma si el usuario tiene oponente, recibe el estado seguido del tablero si 
se le asignó uno ej - si se asigno oponente (2:####), si no tiene oponente (1:0)
estado 0-sin registrar 1-registrado sin oponente 2-con oponente*/
function confirmarOponente(){
    intentos++;
    if (intentos <= 15) {
        var nombreusuario = window.localStorage.getItem('idusuario'); //obtengo un dato del almacenamiento local
        var random = generarUUID();
        var datastring = "tipo=consultarestado&nombreusuario=" + nombreusuario + "&rand=" + random;
        $.ajax({
            type: "GET",
            url: "funciones/listardato.php?" + datastring,
            dataType: "text",
            success: function (result) {
                var res = result.split(':');
                var estadousuario = res[0];
                var tablerousuario = res[1];
                if(estadousuario == "2"){
                    window.clearInterval(intervalo);
                    intentos = 0;
                    window.localStorage.setItem('tablerousuario', tablerousuario);//guardo el resultado en el almacenamiento local para que persista
                    window.location.href = 'tablero.html';
                }
                else{        
                    mensajeestado.innerHTML = "Intentos: " + intentos + ". Estamos buscando tu oponente, espera un momento...";
                }
            },
            error: function (error) {
                alert("Error al ingresar, intenta nuevamente" + JSON.stringify(error, null, 2));
            }
        });
    }
    else{
        mensajeestado.innerHTML = "Se han agotado los intentos para encontrar oponente, por favor intenta nuevamente.";
        window.clearInterval(intervalo);
        intentos = 0;
    }
}

function generarUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}