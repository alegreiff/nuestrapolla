<?php
$usuarioID = get_current_user_id();
//d(get_user_meta($usuarioID));
//echo get_stylesheet_directory_uri() . "/polla/dist/build.js";
//echo '<div id="app"></div>';
/**
 * Añadir vue.js y nuestra hoja de estilos
 */
//if ( is_user_logged_in() ) {
    remove_action( 'genesis_loop', 'genesis_do_loop' );
    add_action( 'genesis_loop', 'muestragrupo');
    add_action( 'wp_enqueue_scripts', 'jaimeenqueue', 0);

    //***Remove Header**/
    remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
    remove_action( 'genesis_header', 'genesis_do_header' );
    remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
 

    
    
/*} else {
    add_action( 'genesis_loop', 'no_user');
}*/

function no_user(){
    echo "No polla";
}

// Enqueue Scripts and Styles.
function jaimeenqueue() {
    //wp_enqueue_style( 'reset', get_stylesheet_directory_uri() . '/customcss/mi-polla.css' );
    
    
    
    
    /*wp_register_script( 'vue_logic', get_stylesheet_directory_uri() . "/vuelogic/app.js", null, null, true );
    wp_enqueue_script('vue_logic');*/
    
    wp_register_script( 'html2canvas', 'https://html2canvas.hertzen.com/dist/html2canvas.js', null, null, true );
    wp_enqueue_script('html2canvas');
    wp_register_script( 'axios', 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js', null, null, false );
    wp_enqueue_script('axios');
    wp_register_script( 'lodash', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js', null, null, false );
    wp_enqueue_script('lodash');
    //wp_register_script( 'buefy', 'https://unpkg.com/buefy', null, null, false );
    wp_register_script( 'buefy', 'https://unpkg.com/buefy@0.6.2/lib/index.js', null, null, false );

    
    wp_enqueue_script('buefy');
    

    /*wp_register_script( 'jQuery', 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js', null, null, false );
    wp_enqueue_script('jQuery');*/
    /*wp_register_script( 'vue-router', 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.js', null, null, false );
    wp_enqueue_script('vue-router');*/
    wp_register_script( 'appvue', get_stylesheet_directory_uri() . '/polla/dist/build.js', null, null, true );
    
    $usuarioID = get_current_user_id();
    //d(get_user_meta($usuarioID));
//$ff = (get_user_meta($usuarioID, 'np_favoritos'));

$ff = (get_user_meta($usuarioID, 'submitted'));
//d($ff);
//      $favoritos = (get_user_meta($usuarioID));
//        d(unserialize($favoritos));
if ( is_user_logged_in() ) {
    $userlogged = true;
}    else{
    $userlogged = false;
}

//global $ultimatemember;
//$ultimatemember->user->set( $usuarioID ); 

//$display_name = um_user('display_name');
//$tt = um_fetch_user($usuarioID);
//$fff = um_user('polla_equipo');
$fecha = new DateTime();
$lafecha = $fecha->getTimestamp();
date_default_timezone_set('America/Bogota');
$hora = date('m\-d\-Y\-h\-i\-s\-a', time());
$foto = um_get_avatar_uri( um_profile( 'profile_photo' ), 100 );

    $datosparavue = array(
        'id' => $usuarioID,
        //'KKK' => $fff,
        //'POLLAEQUIPO' => $display_name,
        //'ROLE' => um_user('role'),
        //'TTT' => (get_userdata($usuarioID)),
        
        'data' => (get_user_meta($usuarioID))['nickname'],
        'favoritos' =>(get_user_meta($usuarioID, 'ad_favoritos')),
        'hincha' =>(get_user_meta($usuarioID, 'ad_equipocolombia')[0]),
        'edad' =>(get_user_meta($usuarioID, 'ad_primermundial')[0]),
        'genero' =>(get_user_meta($usuarioID, 'ad_generopollero')[0][0]),
        'polleroamigo' =>(get_user_meta($usuarioID, 'ad_polleroamigo')[0][0]),
        //'rol' =>(get_user_meta($usuarioID, 'role')[0]),
        //'ols_data' => (get_user_meta($usuarioID)),
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'userlogged' => $userlogged,
        'roles' =>(get_user_meta($usuarioID, 'np_capabilities')),
        'tiempo' => $hora,
        'foto' => $foto,
    );
    

    wp_localize_script( 'appvue', 'variables_wordpress', $datosparavue );
    wp_enqueue_script('appvue');
    
    /*wp_enqueue_style( 'vuetifycss', 'https://unpkg.com/vuetify/dist/vuetify.min.css' );*/
    //wp_enqueue_style( 'buefy', 'https://unpkg.com/buefy/lib/buefy.min.css');
    wp_enqueue_style( 'roboto', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
    wp_enqueue_style( 'vuetifycss', 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/0.17.5/vuetify.css');
    
    //wp_enqueue_style( 'bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    wp_enqueue_style( 'materialdesign', '//cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css');
    
        
        
    
}

/*
wp_localize_script( 'wp-api', 'wpApiSettings', array(
    'root' => esc_url_raw( rest_url() ),
    'nonce' => wp_create_nonce( 'wp_rest' )
) );
*/





function muestragrupo(){
    
    echo "<div id='app'></div>";    
    /*echo '
    <div id="app">
    <div class="grid"> <!-- contenedor -->
    <div class="a"><pre> {{ posts }} </pre></div> <!-- cada uno de los ítems del grid -->
    <div class="b">Item 2</div>
    <div class="c">Item 3</div>
    <div class="d">Item 4</div>
  </div>
        {{ message }}
        <div></div>
        <div><pre> {{ errors }} </pre></div>
    </div>    
    ';*/
    /*echo '
    <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
    ';*/
}
genesis();
