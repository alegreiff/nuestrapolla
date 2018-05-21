<?php 

/*
$usuarioID = get_current_user_id();
d(get_user_meta($usuarioID));

function my_assets() {
    wp_enqueue_style( 'reset', get_stylesheet_directory_uri() . '/customcss/paises.css' );
    wp_register_script('lodash_nuestrapolla', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js', array('lodash'),'4.17.4', true);
    wp_enqueue_script('lodash_nuestrapolla');
}
add_action( 'wp_enqueue_scripts', 'my_assets' );


remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'muestragrupo');

function muestragrupo(){
	global $dbpolla;

	$bombos = fullcalendario_grupo('A');
    echo pintagrupo($bombos);
    $bombos = fullcalendario_grupo('B');
    echo pintagrupo($bombos);
    $bombos = fullcalendario_grupo('C');
    echo pintagrupo($bombos);
    $bombos = fullcalendario_grupo('D');
    echo pintagrupo($bombos);
}

function pintagrupo($calendario){
    $salida ='
        <table id="tablapolla">
        <thead>
            <tr>
                <th>Ciudad</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
        </thead>
        <tbody>

    ';
    for($i = 0; $i<6; $i++){
        $salida.='<tr>';
        $salida.='<td>'.$calendario[$i]->ciudad.'</td>';

        $salida.= '<td>'.date('Y-m-d H:i:s',strtotime('-'.(5 + $calendario[$i]->hora).' hour',strtotime($calendario[$i]->fecha))).'</td>';
        $salida.='<td>'.$calendario[$i]->hora.'</td>';
        $salida.='</tr>';
    }
    $salida.= '</tbody></table>';
    return $salida;
}
*/

remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'muestragrupo');


function muestragrupo(){
	echo '<div id="app"></div>';
}




genesis();