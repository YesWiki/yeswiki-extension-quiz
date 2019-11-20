<?php

/**
 * quiz : programme affichant dans une iframe une application reactjs en relation avec une fiche Bazar.
 *
 *@author        Olivier Picot <op@odass.org>
 *
 *@version       $Revision: 0.9 (betat) $ $Date: 2019/07/27 $
 **/

// test de sécurité pour vérifier si on passe par wiki
if (!defined('WIKINI_VERSION')) {
    die('acc&egrave;s direct interdit');
}

$output = '';

// Recuperation de tous les parametres
$GLOBALS['params'] = getAllParameters($this);
$adress = $_SERVER['SERVER_NAME'];
$protocol =  $_SERVER['SERVER_PROTOCOL'];
$reactbuildroot=$this->GetParameter('reactbuilddroot');
if (empty($reactbuildroot)) {
    $reactbuildroot = 'tools/quiz/libs/jeux';
}
$externallink = $this->GetParameter('externallink');
$iframe = $this->GetParameter('iframe');
// on considere que vide = comportement par defaut = yes
if (empty($iframe)) {
    $iframe = 'yes';
}

$idquiz = $this->GetParameter('idquiz');
$idquestions = $this->GetParameter('idquestions');
if (empty($idquestions)) {
    $output .= '<div class="alert alert-danger">Action {{quiz}} : paramètre "idquestions" obligatoire : doit contenir l\'id du formulaire bazar des questions.</div>';
} elseif (empty($idquiz)) {
    $output .= '<div class="alert alert-danger">Action {{quiz}} paramètre "idquiz" obligatoire : doit contenir l\'id du formulaire bazar des quiz.</div>';
} else {
    if ($reactbuildroot && $iframe && ($iframe=='yes' || $iframe=='oui' || $iframe == '1')) {
        $output .= '<iframe class="quiz-frame" src="' ."/". $reactbuildroot . '/build/index.html?params='.$idquestions.','.$idquiz.'"  frameborder="0" width="100%" height="800"></iframe>';
    }
    if ($reactbuildroot && $externallink) {
        $strg =  '<a href="./'.$reactbuildroot . '/build/index.html?params='.$idquestions.','.$idquiz.'" target="_blank">'.$externallink.'</a> ';
        $output .= $strg;
    }
}

echo $output;
