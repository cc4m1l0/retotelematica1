<?php
$tipo = $_GET['tipo'];
switch($tipo)
{
    case "consultarestado":
    $nombreusuario = $_GET['nombreusuario'];
    $respueta = ""; //la respuesta tendrá el estado del usuario y el id del tablero asignado
    $xml = new DOMDocument();
    $xml->load("usuarios.xml");
    $xpath = new DOMXpath($xml);
    $nodeList = $xpath->query('//jugador[@id="'.$nombreusuario.'"]/estado');
    $nodeListTablero = $xpath->query('//jugador[@id="'.$nombreusuario.'"]/tablero');
    $estadousuario = $nodeList->item(0)->nodeValue;
    $tablerousuario = $nodeListTablero->item(0)->nodeValue; 
  
    $respueta = $estadousuario.":".$tablerousuario;
    print $respueta;

    break;
}
?>
