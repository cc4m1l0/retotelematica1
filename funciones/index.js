//evento del botón ingresar para guardar el usuario en el archivo y navegar al lobby
$('#btnIngresar').click(function () {
    var nombreusuario = $("#txtNombreusuario").val();
    if (nombreusuario == "") {
        alert("Ingrese un nombre de usuario");
        return false;
    }
    if (!/^[a-zA-Z]*$/g.test(nombreusuario)) {
        alert("Solo admitimos letras sin espacios para los nombres de usuario");
        return false;
    }
    var random = generarUUID();
    var datastring = "tipo=insertarusuario&nombreusuario=" + nombreusuario + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/insertardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            if (result == "guardado") {
                window.localStorage.setItem('idusuario', nombreusuario);//guardo el resultado en el almacenamiento local para que persista
                window.location.href = 'lobby.html';
            }
        },
        error: function (error) {
            alert("Error al ingresar, intenta nuevamente" + JSON.stringify(error, null, 2));
        }
    });
});

function generarUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}