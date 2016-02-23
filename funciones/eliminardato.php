<?php
$tipo = $_GET['tipo'];
switch($tipo)
{
    case "eliminarusuario":
    $nombreusario = $_GET['nombreusuario'];

    $xml = new DOMDocument();
    $xml->load("usuarios.xml");
    $xpath = new DOMXpath($xml);
    $nodeList = $xpath->query('//jugador[@id="'.$nombreusario.'"]');
    foreach($nodeList as $element)
    {
        $element->parentNode->removeChild($element);
    }
    $xml->save("usuarios.xml");
    print ("borrado");
    break;
    case"eliminartablero":
    $idtablero = $_GET['idtablero'];
    $oponente1 = $_GET['oponente1'];
    $oponente2 = $_GET['oponente2'];
    
    $xml = new DOMDocument();
    $xml->load("usuarios.xml");
    $xpath = new DOMXpath($xml);
    //cambiamos el estado y el tablero del oponente 1 para q vuelva a estar disponible a jugar
    $nodeListo1 = $xpath->query('//jugador[@id="'.$oponente1.'"]/estado');
    $nodeo1 = $nodeListo1->item(0);
    $nodeo1->nodeValue = "0";
    $nodeListt1 = $xpath->query('//jugador[@id="'.$oponente1.'"]/tablero');
    $nodet1 = $nodeListt1->item(0);
    $nodet1->nodeValue = "0";
    //cambiamos el estado y el tablero del oponente 2 para q vuelva a estar disponible a jugar
    $nodeListo2 = $xpath->query('//jugador[@id="'.$oponente2.'"]/estado');
    $nodeo2 = $nodeListo2->item(0);
    $nodeo2->nodeValue = "0";
    $nodeListt2 = $xpath->query('//jugador[@id="'.$oponente2.'"]/tablero');
    $nodet2 = $nodeListt2->item(0);
    $nodet2->nodeValue = "0";

    $xml->save("usuarios.xml");

    if (file_exists($idtablero.".xml")) {
        unlink($idtablero.".xml");
    } else {
        // code when file not found
    }
    print ("eliminado");
    break;
}
?>