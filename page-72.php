<?php
$usuarioID = get_current_user_id();
/**
 * Añadir vue.js y nuestra hoja de estilos
 */
    remove_action( 'genesis_loop', 'genesis_do_loop' );
    add_action( 'genesis_loop', 'muestragrupo');
    add_action( 'wp_enqueue_scripts', 'jaimeenqueue', 0);
    //***Remove Header**/
    remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
    remove_action( 'genesis_header', 'genesis_do_header' );
    remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
function no_user(){
    echo "No polla";
}
// Enqueue Scripts and Styles.
function jaimeenqueue() {
    //wp_enqueue_style( 'reset', get_stylesheet_directory_uri() . '/customcss/mi-polla.css' );
    /*wp_register_script( 'vue_logic', get_stylesheet_directory_uri() . "/vuelogic/app.js", null, null, true );
    wp_enqueue_script('vue_logic');*/
    //wp_register_script( 'chartsg', 'https://www.gstatic.com/charts/loader.js', null, null, true );
    //wp_enqueue_script('chartsg');
    wp_register_script( 'momento', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.js', null, null, true );
    wp_enqueue_script('momento');
    
    wp_register_script( 'html2canvas', 'https://html2canvas.hertzen.com/dist/html2canvas.js', null, null, true );
    wp_enqueue_script('html2canvas');
    wp_register_script( 'axios', 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js', null, null, false );
    wp_enqueue_script('axios');
    wp_register_script( 'lodash', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js', null, null, false );
    wp_enqueue_script('lodash');
    wp_register_script( 'buefy', 'https://unpkg.com/buefy@0.6.2/lib/index.js', null, null, false );
    wp_enqueue_script('buefy');
    wp_register_script( 'appvue', get_stylesheet_directory_uri() . '/polla/dist/build.js', null, null, true );
    $usuarioID = get_current_user_id();
    $ff = (get_user_meta($usuarioID, 'submitted'));
    if ( is_user_logged_in() ) {
        $userlogged = true;
    }    else{
        $userlogged = false;
    }
    $fecha = new DateTime();
    $lafecha = $fecha->getTimestamp();
    date_default_timezone_set('America/Bogota');
    $hora = date('m\-d\-Y\-h\-i\-s\-a', time());
    $foto = um_get_avatar_uri( um_profile( 'profile_photo' ), 100 );
    $datosparavue = array(
        'id' => $usuarioID,
        'data' => (get_user_meta($usuarioID))['nickname'],
        'favoritos' =>(get_user_meta($usuarioID, 'ad_favoritos')),
        'hincha' =>(get_user_meta($usuarioID, 'ad_equipocolombia')[0]),
        'edad' =>(get_user_meta($usuarioID, 'ad_primermundial')[0]),
        'genero' =>(get_user_meta($usuarioID, 'ad_generopollero')[0][0]),
        'polleroamigo' =>(get_user_meta($usuarioID, 'ad_polleroamigo')[0][0]),
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'userlogged' => $userlogged,
        'roles' =>(get_user_meta($usuarioID, 'np_capabilities')),
        'tiempo' => $hora,
        'foto' => $foto,
    );
    wp_localize_script( 'appvue', 'variables_wordpress', $datosparavue );
    wp_enqueue_script('appvue');
    wp_enqueue_style( 'roboto', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
    wp_enqueue_style( 'vuetifycss', 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/0.17.5/vuetify.css');
    wp_enqueue_style( 'materialdesign', '//cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css');
}
function muestragrupo(){
    echo "<div id='app'></div>";    
}
genesis();