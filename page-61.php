<?php 


$usuarioID = get_current_user_id();
d(get_user_meta($usuarioID));


$hinchacol = get_user_meta($usuarioID, 'hinchacol', true);
d($hinchacol);
function my_assets() {
	
	wp_enqueue_style( 'reset', get_stylesheet_directory_uri() . '/customcss/paises.css' );
	//wp_enqueue_script( 'owl-carousel', get_stylesheet_directory_uri() . '/owl.carousel.js', array( 'jquery' ) );
	//wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri() . '/website-scripts.js', array( 'owl-carousel', 'jquery' ), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'my_assets' );

remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'bombos' );

function muestra_paises_bombo($bombo){
	$resultados = paises_bombo($bombo);
	$res = "";
	foreach ($resultados as $resultado) {
		$res.= '<p class="np_paises">'.$resultado->nombre.'</p>';
	}
	return $res;
}

function bombos(){
	//global $dbpolla;
	global $hinchacol;
	//$bombos = $dbpolla->get_results('select distinct bombo from paises order by bombo');
	$bombos = carga_bombos();
	d($bombos);
	$cuantos_bombos = count($bombos);
	$salida = '<h2>Bombos '.$hinchacol.' </h2><div class="wrapper">';
	//for($i = 0; $i < $cuantos_bombos; $i ++ ){
		//$salida.= $bombos[$i];
	//}
	foreach ($bombos as $bombo) {
		//echo $carrera->nombre_carrera . '<br />';
		$salida.= '<div class="box a">'.$bombo->bombo . muestra_paises_bombo($bombo->bombo).'</div>';
	}
	$salida.= '</div>';
	echo $salida;
}


function insertdata(){
    global $dbpolla;	
    d($dbpolla);
    
    $sql = "INSERT INTO `usuarios`
(`nombreusuario`,`user_id`,`comentario`) 
values ('Jaime de Greiff', '13', 'la vida es dura como un demonio')";

$dbpolla->query($sql);
    
}
add_action( 'genesis_loop', 'insertdata' );

function np_formulario(){
	$salida = '
	<div class="contain">
	
	  <div class="wrapperx">
		<div class="contacts">
		  <h3>Our contacts</h3>
	
		  <ul>
			<li>San Joe St.</li>
			<li>00-1212121-11</li>
			<li>mail@mail.com</li>
		  </ul>
		</div>
	
		<div class="form">
		  <h3>Send us a message</h3>
		  <form action="">
			<p>
			  <label for="">Your name</label>
			  <input type="text">
			</p>
			<p>
			  <label for="">Skype</label>
			  <input type="text">
			</p>
			<p>
			  <label for="">Email Address</label>
			  <input type="text">
			</p>
			<p>
			  <label for="">Topic</label>
			  <input type="text">
			</p>
			<p class="full-width">
			  <label for="">Write your message</label>
			  <textarea name="" id="" cols="30" rows="7"></textarea>
			</p>
			<p class="full-width">
			  <button>Send</button>
			</p>
		  </form>
		</div>
	  </div>
	</div>
	';
	echo $salida;
}
add_action( 'genesis_loop', 'np_formulario' );

genesis();