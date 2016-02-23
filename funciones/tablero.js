
var oponente1, oponente2, turno, nummovimientos, movimientos, ganador;

function cargardatosbasicosTablero(){
    idusuario = window.localStorage.getItem('idusuario'); //obtengo un dato del almacenamiento local
    idtablero = window.localStorage.getItem('tablerousuario'); //obtengo un dato del almacenamiento local
    var nombreUsuario = document.getElementById("nombreUsuario");
    var nombreOponentes = document.getElementById("nombreOponentes");
    var turnoActual = document.getElementById("turnoactual");
    var turnoActual = document.getElementById("turnoactual");
    var txtganador = document.getElementById("ganador");
    var txtnummovimientos = document.getElementById("nummovimientos");
    var btnjugar = document.getElementById("btnJugar");
    
    nombreUsuario.innerHTML = "usuario: " + idusuario;
    $.ajax({
        url: "funciones/" + idtablero + ".xml",
        dataType: "xml",
        success: function (result) {
            //leemos datos del xml del juego
            $(result).find("tablero").each(function () {
                oponente1 = $(this).find("oponente1").text();
                oponente2 = $(this).find("oponente2").text();
                turno = $(this).find("turno").text();
                nummovimientos = $(this).find("numeromovimientos").text();
                movimientos = $(this).find("movimientos").text();
                ganador = $(this).find("ganador").text();
            });
            //mostramos resultados al usuario
            nombreOponentes.innerHTML = oponente1 + " (X) VS " + oponente2 + " (O)";
            turnoActual.innerHTML = "Turno: " + turno;
            if (idusuario == turno)
                btnjugar.disabled = false;
            if (ganador == "0") {
                $("#btnVolverJugar").addClass('hidden');
                ganador = "sin ganador";
            }
            else {
                btnjugar.disabled = true;
                $("#btnVolverJugar").removeClass('hidden');
            }
            txtganador.innerHTML = "Ganador: " + ganador;
            txtnummovimientos.innerHTML = "Número de movimientos: " + nummovimientos;
            cargarTableroDaemon();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case 404:
                    alert("El oponente ha cerrado el tablero");
                    window.location.href = 'lobby.html';
                    break;    
                default: 
                    alert("Ha ocurrido un error inesperado, intenta nuevamente");
            }
        }
    });
}


function cargarTableroDaemon(){
    intervalo = setInterval(cargarTablero, 1000);
}

function cargarTablero(){
    var nombreOponentes = document.getElementById("nombreOponentes");
    var turnoActual = document.getElementById("turnoactual");
    var turnoActual = document.getElementById("turnoactual");
    var txtganador = document.getElementById("ganador");
    var txtnummovimientos = document.getElementById("nummovimientos");
    var btnjugar = document.getElementById("btnJugar");
    //posiciones del tablero
    txtp11 = document.getElementById("p11");
    txtp12 = document.getElementById("p12");
    txtp13 = document.getElementById("p13");
    txtp21 = document.getElementById("p21");
    txtp22 = document.getElementById("p22");
    txtp23 = document.getElementById("p23");
    txtp31 = document.getElementById("p31");
    txtp32 = document.getElementById("p32");
    txtp33 = document.getElementById("p33");

    $.ajax({
        url: "funciones/" + idtablero + ".xml",
        dataType: "xml",
        success: function (result) {
            //leemos datos del xml del juego
            $(result).find("tablero").each(function () {
                oponente1 = $(this).find("oponente1").text();
                oponente2 = $(this).find("oponente2").text();
                turno = $(this).find("turno").text();
                nummovimientos = $(this).find("numeromovimientos").text();
                movimientos = $(this).find("movimientos").text();
                ganador = $(this).find("ganador").text();
            });
            //mostramos resultados al usuario
            turnoActual.innerHTML = "Turno: " + turno;
            if (idusuario == turno)
                btnjugar.disabled = false;
            else
                btnjugar.disabled = true;
            if (ganador == "0") {
                $("#btnVolverJugar").addClass('hidden');
                ganador = "sin ganador";
            }
            else {
                btnjugar.disabled = true;
                $("#btnVolverJugar").removeClass('hidden');
            }
            txtganador.innerHTML = "Ganador: " + ganador;
            txtnummovimientos.innerHTML = "Número de movimientos: " + nummovimientos;
            //muestro los movimientos del tablero
            var mov = movimientos.split(',');
            var p11 = mov[0];
            var p12 = mov[1];
            var p13 = mov[2];
            var p21 = mov[3];
            var p22 = mov[4];
            var p23 = mov[5];
            var p31 = mov[6];
            var p32 = mov[7];
            var p33 = mov[8];
            if (p11 != "0")
                txtp11.value = p11;
            if (p12 != "0")
                txtp12.value = p12;
            if (p13 != "0")
                txtp13.value = p13;
            if (p21 != "0")
                txtp21.value = p21;
            if (p22 != "0")
                txtp22.value = p22;
            if (p23 != "0")
                txtp23.value = p23;
            if (p31 != "0")
                txtp31.value = p31;
            if (p32 != "0")
                txtp32.value = p32;
            if (p33 != "0")
                txtp33.value = p33;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case 404:
                    alert("El oponente ha cerrado el tablero");
                    window.location.href = 'lobby.html';
                    break;
                default: 
                    alert("Ha ocurrido un error inesperado, intenta nuevamente");
            }
        }
    });
}

$('#btnJugar').click(function () {
    var movimientostablero = "";
    var turnonuevo = "";
    var nummovimientosmasuno = 0;
    var p11, p12, p13, p21, p22, p23, p31, p32, p33;
    //capturo los datos que hay actualmente en el tablero
    //posiciones del tablero
    p11 = document.getElementById("p11").value;
    p12 = document.getElementById("p12").value;
    p13 = document.getElementById("p13").value;
    p21 = document.getElementById("p21").value;
    p22 = document.getElementById("p22").value;
    p23 = document.getElementById("p23").value;
    p31 = document.getElementById("p31").value;
    p32 = document.getElementById("p32").value;
    p33 = document.getElementById("p33").value;
    //validaciones de los campos
    if (p11 == "")
        p11 = "0";
    else if (p11 != "x" && p11 != "o" && p11 != "X" && p11 != "O") {
        alert("ingresaste un valor inválido: " + p11);
        return;
    }
    else {
        p11 = p11.toUpperCase();
    }
    if (p12 == "")
        p12 = "0";
    else if (p12 != "x" && p12 != "o" && p12 != "X" && p12 != "O") {
        alert("ingresaste un valor inválido: " + p12);
        return;
    }
    else {
        p12 = p12.toUpperCase();
    }
    if (p13 == "")
        p13 = "0";
    else if (p13 != "x" && p13 != "o" && p13 != "X" && p13 != "O") {
        alert("ingresaste un valor inválido: " + p13);
        return;
    }
    else {
        p13 = p13.toUpperCase();
    }
    if (p21 == "")
        p21 = "0";
    else if (p21 != "x" && p21 != "o" && p21 != "X" && p21 != "O") {
        alert("ingresaste un valor inválido: " + p21);
        return;
    }
    else {
        p21 = p21.toUpperCase();
    }
    if (p22 == "")
        p22 = "0";
    else if (p22 != "x" && p22 != "o" && p22 != "X" && p22 != "O") {
        alert("ingresaste un valor inválido: " + p22);
        return;
    }
    else {
        p22 = p22.toUpperCase();
    }
    if (p23 == "")
        p23 = "0";
    else if (p23 != "x" && p23 != "o" && p23 != "X" && p23 != "O") {
        alert("ingresaste un valor inválido: " + p23);
        return;
    }
    else {
        p23 = p23.toUpperCase();
    }
    if (p31 == "")
        p31 = "0";
    else if (p31 != "x" && p31 != "o" && p31 != "X" && p31 != "O") {
        alert("ingresaste un valor inválido: " + p31);
        return;
    }
    else {
        p31 = p31.toUpperCase();
    }
    if (p32 == "")
        p32 = "0";
    else if (p32 != "x" && p32 != "o" && p32 != "X" && p32 != "O") {
        alert("ingresaste un valor inválido: " + p32);
        return;
    }
    else {
        p32 = p32.toUpperCase();
    }
    if (p33 == "")
        p33 = "0";
    else if (p33 != "x" && p33 != "o" && p33 != "X" && p33 != "O") {
        alert("ingresaste un valor inválido: " + p33);
        return;
    }
    else {
        p33 = p33.toUpperCase();
    }
    movimientostablero = p11 + "," + p12 + "," + p13 + "," + p21 + "," + p22 + "," + p23 + "," + p31 + "," + p32 + "," + p33;
    if (movimientos == movimientostablero)
    {
        alert("Debes realizar un movimiento");
        return;
    }
    nummovimientosmasuno = parseInt(nummovimientos) + 1;
    if (turno == oponente1)
        turnonuevo = oponente2;
    else
        turnonuevo = oponente1;
    //enviamos cambios al servidor
    var btnjugar = document.getElementById("btnJugar");
    var random = generarUUID();
    var datastring = "tipo=movimientousuario&idtablero=" + idtablero + "&oponente1=" + oponente1 + "&oponente2=" + oponente2 + "&turno=" + turnonuevo + "&nummovimientos=" + nummovimientosmasuno + "&movimientos=" + movimientostablero + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/insertardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            btnjugar.disabled = true;
        },
        error: function (error) {
            alert("Error al enviar, intenta nuevamente" + JSON.stringify(error, null, 2));
        }
    });
});

$('#btnVolverJugar').click(function () {
    //reset el tablero
    document.getElementById("p11").value = "";
    document.getElementById("p12").value = "";
    document.getElementById("p13").value = "";
    document.getElementById("p21").value = "";
    document.getElementById("p22").value = "";
    document.getElementById("p23").value = "";
    document.getElementById("p31").value = "";
    document.getElementById("p32").value = "";
    document.getElementById("p33").value = "";
    //enviamos cambios al servidor
    var random = generarUUID();
    var datastring = "tipo=jugarotravez&idtablero=" + idtablero + "&oponente1=" + oponente1 + "&oponente2=" + oponente2 + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/insertardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            $("#btnVolverJugar").addClass('hidden');
        },
        error: function (error) {
            alert("Error al enviar, intenta nuevamente" + JSON.stringify(error, null, 2));
        }
    });
});

$('#btnSalir').click(function () {
    var random = generarUUID();
    var datastring = "tipo=eliminartablero&idtablero=" + idtablero + "&oponente1=" + oponente1 + "&oponente2=" + oponente2 + "&rand=" + random;
    $.ajax({
        type: "GET",
        url: "funciones/eliminardato.php?" + datastring,
        dataType: "text",
        success: function (result) {
            if (result == "eliminado") {
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