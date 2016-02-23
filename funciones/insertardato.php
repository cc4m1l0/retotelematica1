<?php
$tipo = $_GET['tipo'];
switch($tipo)
{
    case "insertarusuario":
    $nombreusuario = $_GET['nombreusuario'];

    $xml = new DOMDocument();
    $xml->load('usuarios.xml');
    $xml_jugadores = $xml->getElementsByTagName("jugadores")->item(0);
        $xml_jugador = $xml->createElement("jugador");
        $xml_atributo = $xml->createAttribute("id");
        $xml_atributo->value = $nombreusuario;
            $xml_nombre = $xml->createElement("nombre",$nombreusuario);
            $xml_estado = $xml->createElement("estado","0"); //estado 0-sin registrar 1-registrado sin oponente 2-con oponente
            $xml_tablero = $xml->createElement("tablero","0");
    $xml_jugador->appendChild ($xml_nombre);
    $xml_jugador->appendChild ($xml_estado);
    $xml_jugador->appendChild ($xml_tablero);
    $xml_jugador->appendChild ($xml_atributo);
    $xml_jugadores->appendChild ($xml_jugador);
    $xml->save("usuarios.xml");

    /*$file = fopen("../files/usuario.txt", "w");
    fwrite($file, $nombreusuario . ",");
    fclose($file);
    
    $content = "0";
    $fp = fopen("../files/".$nombreusuario.".txt","w");
    fwrite($fp,$content);
    fclose($fp);*/

    print ("guardado");
    break;
    case "buscaroponente":
    $nombreusuario = $_GET['nombreusuario'];
    $respuesta = "";
    $xml = new DOMDocument();
    $xml->load("usuarios.xml");
    $xpath = new DOMXpath($xml);
    $nodeList = $xpath->query('//jugador[@id="'.$nombreusuario.'"]/estado');
    $node = $nodeList->item(0);
    if ($node->nodeValue != "2")
        $node->nodeValue = "1";
    $xml->save("usuarios.xml");

    //empezar a hacer match con los usuarios registrados
    $xml = new DOMDocument();
    $xml->load("usuarios.xml");
    $xpath = new DOMXpath($xml);
    $entradas = $xpath->query('//jugador/estado[.="1"]');
    $numusuariosregistrado = $entradas->length;
    if ($numusuariosregistrado < 2)
    {
        $respuesta = "sinoponentes"; 
        print $respuesta;
    }
    else
    {
        $respuesta = "registrado";
        $oponentes = "";
        $oponente1 = "";
        $oponente2 = "";
        $contador = 0;
        //creo el nombre del tablero con los nombres de los jugadores
        foreach($entradas as $entrada){
            if ($contador == 0){
                $oponente1 = $entrada->previousSibling->nodeValue;
            }
            if ($contador == 1){
                $oponente2 = $entrada->previousSibling->nodeValue;
            }
            if ($contador < 2){
                $oponentes .= $entrada->previousSibling->nodeValue;
                $contador++;
            }
        }
        $contador = 0;
        //actualizo los estados y el tablero de los jugadores
        foreach($entradas as $entrada){
            if ($contador < 2){
                $oponente = $entrada->previousSibling->nodeValue;           
                $nodeList = $xpath->query('//jugador[@id="'.$oponente.'"]/estado');
                $nodeListTablero = $xpath->query('//jugador[@id="'.$oponente.'"]/tablero');
                $node = $nodeList->item(0);
                $node->nodeValue = "2"; 
                $nodetablero = $nodeListTablero->item(0);
                $nodetablero->nodeValue = $oponentes;
                $contador++;
            }
        }
        //guardo el xml de usuarios acutalizando los estados    
        $xml->save("usuarios.xml");
        //creo y guardo el xml con los datos del nuevo tablero
        $xml = new DOMDocument();
        $xml_tableros= $xml->createElement("tableros");
            $xml_tablero = $xml->createElement("tablero");
            $xml_atributo = $xml->createAttribute("id");
            $xml_atributo->value = $oponentes;
                $xml_oponente1 = $xml->createElement("oponente1",$oponente1);
                $xml_oponente2 = $xml->createElement("oponente2",$oponente2);
                $xml_turno = $xml->createElement("turno",$oponente1);
                $xml_numeromovimientos = $xml->createElement("numeromovimientos","0");
                $xml_movimientos = $xml->createElement("movimientos","0,0,0,0,0,0,0,0,0");
                $xml_ganador = $xml->createElement("ganador","0");
        $xml_tablero->appendChild ($xml_oponente1);
        $xml_tablero->appendChild ($xml_oponente2);
        $xml_tablero->appendChild ($xml_turno);
        $xml_tablero->appendChild ($xml_numeromovimientos);
        $xml_tablero->appendChild ($xml_movimientos);
        $xml_tablero->appendChild ($xml_ganador);
        $xml_tablero->appendChild ($xml_atributo);
        $xml_tableros->appendChild ($xml_tablero);
        $xml->appendChild ($xml_tableros);
        $xml->save($oponentes.".xml");
    }
    
    print $respuesta;
    break;
    case "movimientousuario":
    $idtablero = $_GET['idtablero'];
    $oponente1 = $_GET['oponente1']; // el oponente 1 juega con la X
    $oponente2 = $_GET['oponente2']; // el oponente 2 juega con la O
    $turno = $_GET['turno'];
    $nummovimientos = $_GET['nummovimientos'];
    $movimientos = $_GET['movimientos'];
    $ganador = "0";

    //evaluamos los movimientos para ver si hay un ganador o empate
    $arrayMovimientos = explode(',', $movimientos);
    if ($arrayMovimientos[0] == "X" && $arrayMovimientos[1] == "X"  && $arrayMovimientos[2] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[3] == "X" && $arrayMovimientos[4] == "X"  && $arrayMovimientos[5] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[6] == "X" && $arrayMovimientos[7] == "X"  && $arrayMovimientos[8] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[0] == "X" && $arrayMovimientos[3] == "X"  && $arrayMovimientos[6] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[1] == "X" && $arrayMovimientos[4] == "X"  && $arrayMovimientos[7] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[2] == "X" && $arrayMovimientos[5] == "X"  && $arrayMovimientos[8] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[0] == "X" && $arrayMovimientos[4] == "X"  && $arrayMovimientos[8] == "X" ) {
        $ganador = $oponente1;
    }
    if ($arrayMovimientos[2] == "X" && $arrayMovimientos[4] == "X"  && $arrayMovimientos[6] == "X" ) {
        $ganador = $oponente1;
    }
    //ganador O
    
    if ($arrayMovimientos[0] == "O" && $arrayMovimientos[1] == "O"  && $arrayMovimientos[2] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[3] == "O" && $arrayMovimientos[4] == "O"  && $arrayMovimientos[5] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[6] == "O" && $arrayMovimientos[7] == "O"  && $arrayMovimientos[8] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[0] == "O" && $arrayMovimientos[3] == "O"  && $arrayMovimientos[6] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[1] == "O" && $arrayMovimientos[4] == "O"  && $arrayMovimientos[7] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[2] == "O" && $arrayMovimientos[5] == "O"  && $arrayMovimientos[8] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[0] == "O" && $arrayMovimientos[4] == "O"  && $arrayMovimientos[8] == "O" ) {
        $ganador = $oponente2;
    }
    if ($arrayMovimientos[2] == "O" && $arrayMovimientos[4] == "O"  && $arrayMovimientos[6] == "O" ) {
        $ganador = $oponente2;
    }
    if ($nummovimientos == "9")
        $ganador = "empate";
    //abrimos y modificamos el xml que contiene el tablero del usuario
    $xml = new DOMDocument();
    $xml->load($idtablero.".xml");
    $xpath = new DOMXpath($xml);
    //modificamos el turno
    $nodeListTurno = $xpath->query('//tablero[@id="'.$idtablero.'"]/turno');
    $nodeTurno = $nodeListTurno->item(0);
    $nodeTurno->nodeValue = $turno;
    //modificamos el número de movimientos
    $nodeListNumeromovimientos = $xpath->query('//tablero[@id="'.$idtablero.'"]/numeromovimientos');
    $nodeNummovimientos = $nodeListNumeromovimientos->item(0);
    $nodeNummovimientos->nodeValue = $nummovimientos;
    //modificamos los movimientos 
    $nodeListMovimientos = $xpath->query('//tablero[@id="'.$idtablero.'"]/movimientos');
    $nodeMovimientos = $nodeListMovimientos->item(0);
    $nodeMovimientos->nodeValue = $movimientos;
    //modificamos al ganador
    $nodeListGanador = $xpath->query('//tablero[@id="'.$idtablero.'"]/ganador');
    $nodeGanador = $nodeListGanador->item(0);
    $nodeGanador->nodeValue = $ganador;

    //guardamos los cambios en el tablero
    $xml->save($idtablero.".xml");

    break;
    case "jugarotravez":
    $idtablero = $_GET['idtablero'];
    $oponente1 = $_GET['oponente1']; // el oponente 1 juega con la X
    $oponente2 = $_GET['oponente2']; // el oponente 2 juega con la O

    //abrimos y modificamos el xml que contiene el tablero del usuario
    $xml = new DOMDocument();
    $xml->load($idtablero.".xml");
    $xpath = new DOMXpath($xml);
    //modificamos el turno
    $nodeListTurno = $xpath->query('//tablero[@id="'.$idtablero.'"]/turno');
    $nodeTurno = $nodeListTurno->item(0);
    $nodeTurno->nodeValue = $oponente1;
    //modificamos el número de movimientos
    $nodeListNumeromovimientos = $xpath->query('//tablero[@id="'.$idtablero.'"]/numeromovimientos');
    $nodeNummovimientos = $nodeListNumeromovimientos->item(0);
    $nodeNummovimientos->nodeValue = "0";
    //modificamos los movimientos 
    $nodeListMovimientos = $xpath->query('//tablero[@id="'.$idtablero.'"]/movimientos');
    $nodeMovimientos = $nodeListMovimientos->item(0);
    $nodeMovimientos->nodeValue = "0,0,0,0,0,0,0,0,0";
    //modificamos al ganador
    $nodeListGanador = $xpath->query('//tablero[@id="'.$idtablero.'"]/ganador');
    $nodeGanador = $nodeListGanador->item(0);
    $nodeGanador->nodeValue = "0";

    //guardamos los cambios en el tablero
    $xml->save($idtablero.".xml");

    break;
}
?>