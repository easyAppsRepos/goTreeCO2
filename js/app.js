

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	
	 openFB.init({appId: '981288545270222'});
//FFFFFFFFFFFFFFFFFFF
/*
var mypos = $('#2').offset().top;
var up = false;
var newscroll;

	document.addEventListener("touchmove", function(){


 newscroll = $('#2').offset().top;
    if (newscroll > mypos && !up) {
        $('#menu').stop().slideToggle();
        up = !up;
        console.log(up);
    } else if(newscroll < mypos && up) {
        $('#menu').stop().slideToggle();
        up = !up;
    }
    mypos = newscroll;

;}, false);
*/

//ffffffffffffffffff
	 document.addEventListener("backbutton", onBackKeyDown, false);
	enProceso=false;
	var state = navigator.connection.type;
	if (state == window.Connection.NONE)
	{
	    alert("No tiene internet");	
	    // doesn't have internet, notify
	}
	else
	{
	   // alert("tengo internet");	
	    verificarSesionAnterior(); //activar esto jrch
	}
}
	//onTouchEnd
	function onBackKeyDown() {
	console.log("botonBack");
	if(JSVActualView=='viewLogin'){navigator.app.exitApp();}
	else if(JSVActualView=='viewB' || JSVActualView=='viewC'){backView();
		/*window.history.pushState('menuTabs', '', 'index.html#menuTabs'); 
		var windowState = 'menuTabs';
		$v.select('#' + JSVActualView).classList.add('JSVcontainerRight');
		$v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter');
		$v.select('#' + 'menuTabs' + ' jsv-content > jsv-tab.active').classList.remove('active');
		$v.selectAll('#' + 'menuTabs' + ' jsv-content > jsv-tab')[0].classList.add('active');
		$v.select('#' + 'menuTabs').classList.add('JSVcontainerCenter');
		$v.select('#' + 'menuTabs').classList.remove('JSVcontainerLeft');
		JSVActualView ='menuTabs'; */

		}
	else if(JSVActualView=='menuTabs'){navigator.app.exitApp();}
	else if(JSVActualView=='modalA'){closeModal();}	
	} 


window.addEventListener('load', function() {

    $JSView.run('bottom');
    $JSView.declareView({ 

 	menuTabs: {
            url: '/menuTabs',
            template: 'views/menuTabs.html',
            controller: 'menuTabs'
        },
	viewLogin: {
            url: '/viewLogin',
            template: 'views/viewLogin.html',
            controller: 'viewLogin'
        },
        viewA: {
            url: '/viewA',
            template: 'views/viewA.html',
            controller: 'viewA'
        },
        viewB: {
            url: '/viewB',
            template: 'views/viewB.html',
            controller: 'viewB'
        },
        viewC: {
            url: '/viewC',
            template: 'views/viewC.html',
            controller: 'viewC'
        }
    });
     
    /*Declare modal*/
    $JSView.declareModal({
        modalA: {
            url: '/modalA',
            template: 'views/modalA.html',
            controller: 'modalA'
        }
    });
     
    /*Asign view start
    $JSView
        .initView('menuTabs');*/
	 $JSView
        .initView('viewLogin');//cambiar por login

}, false);


	function darkModalOff(){
		$('#modal').html('');
		$('#modal').hide();
	
	}

	function cerrarNoti(){
	$('#modal').html('');
	$('#modal').hide();
	}
	
	function mostrarNoti(){
	var noti="<div class='containerComprar'><i onClick='cerrarNoti()' style='font-size: 39px; color: #0C8F63;  padding-top: 5px;' class='fa fa-times-circle'></i><p style='font-size: 27px;'>Deposito Valido!</p><div><img src='img/botella.png'><img src='img/check.png'></div><p style='font-size: 18px;'>Puntos: <b style='font-size: 23px;'>+50</b></p><p style='font-size: 18px;'>Exp: <b style='font-size: 23px;'>+50</b></p><div style='height: 10px; width: 100%;'></div></div>"
	$('#modal').html(noti);
	$('#modal').show();
	}


	function comprarModal(){

	}
	function getProfile(data){
		
	console.log(JSON.stringify(data));
	idScretClient = data["idSecretClient"];
	logId = data["idSession"]; 
	userName = data["nombre"]; 
	userPts = data["pts"]; 
	userExp = data["exp"]; 
	userTree = data["tree"]; 
	titulo = data["titulo"]; 
	lvl = data["lvl"];
 	//$.jStorage.set('idSecretClient', data['idSecretClient']);
	//$.jStorage.set('logAs', logAs);
	
	darkModalOff();
	$JSView.goToView('menuTabs');
	
	//apagar spinner
		
	}

	function verificarSesionAnterior(){

		var uuidDevice= typeof device !== 'undefined' ? device.uuid : "Browser";
		
		console.log("verificandoSesion");
		$.post('http://52.20.73.216:8089/sesionAnterior',
		{"uuid":  uuidDevice},
		function(data) {

			if("idSecretClient" in data ){
				/*console.log(data);
				idScretClient = data["idSecretClient"];
				logId = data["logId"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				//notifiOnApp();
				//$JSView.goToView('menuTabs');*/

				getProfile(data);
				
			}else{
				console.log('No hay sesion anterior');
		};


		}).fail(function(e) {
		alert('offLineMode();');
		alert(""+e);
		});
	}

function validateEmail(ss) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(ss);
}

function createUser(){
	

	var name=$('.createUs input').eq(0).val();
	var email=$('.createUs input').eq(1).val();
	var pass1=$('.createUs input').eq(2).val();
	var pass2=$('.createUs input').eq(3).val();
	if(pass1 != pass2){alert("La contrasena no son iguales");return;}
	if(!validateEmail(email)){alert("Email incorrecto");return;}
	else{
		try{
	//var logAs =email.match(patFemail)[1];
	var logAs =email;
	$.post('http://52.20.73.216:8089/crearUsuario',{
	"nombre" : name,
	"email": email,
	"password": pass1
	},function(data){

	if(data["status"] == 200){
		alert("Cuenta creada Exitosamente");
		
		$JSView.closeModal('modalA');
	}else{
	
	alert('Ha ocurrido un error');
	}	
	}).fail(function(e) {
	
	alert('error de conexion fail');
	});
	}catch(e){alert("Ha ocurrido un error inesperado");}  

	}
}



	
function logOut(){
	darkModal();
	$.post('http://52.20.73.216:8089/logout', {"logId" : logId}, function(data){	
	//try{navigator.splashscreen.show();}catch(e){}
	//window.location.reload(true);
	if(data["status"] == 200){
	darkModalOff();
	$.jStorage.flush();
	$JSView.goToView('viewLogin');
	console.log("cerrando session");
	
	}
	else{darkModalOff();alert("Ha ocurrido un error cerrando la sesion");}

	});
		
		}

	function backView(){
	console.log("backView9999");
	$JSView.back();
	$JSView.goToView('menuTabs');
	


	}

	function darkModal(){
	$('#modal').html('<i style="font-size: 68px; display: block; text-align: center; margin-top: 137px; color: white;" class="fa fa-circle-o-notch fa-spin"></i>');
		$('#modal').show();
	}

	function fbStatus(){
	 openFB.getLoginStatus( function(response) {
	     if(response.status === 'connected') {
		
		
		//alert('Facebook token: ' + response.authResponse.accessToken);
		//console.log(response);
		            } else {
		               // alert('Facebook login failed: ' + response.error);
				 alert('Sesion no iniciada en facebook: ' + response.error);
		            }
		        }); 
	}


	function getInfo() {
        openFB.api({
            path: '/me',
            success: function(data) {
		nameFace=data.name;
		idFace=data.id;
		loginWithFace();
                //document.getElementById("userName").innerHTML = data.name;
                //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: errorHandler});
    }


	function loginFace(){
	        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        //alert('Sesion Iniciada: ' + response.authResponse.accessToken);
			$.jStorage.set("fbToken", response.authResponse.accessToken);
			
			console.log(response);
			getInfo();
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'public_profile,email,user_friends'});
	}
	   

 function errorHandler(error) {
        alert(error.message);
    }

	function loginWithFace(){

		darkModal();	
		try{
		$.post('http://52.20.73.216:8089/loginFace',{
		"idFace" : idFace,
		"nombre" : nameFace,
		"phone": typeof device !== 'undefined' ? device.model : "Browser",
		"os": typeof device !== 'undefined' ? device.platform : "Browser",
		"uuid":  typeof device !== 'undefined' ? device.uuid : "Browser",
		"pushKey":  typeof device !== 'undefined' ? "Browser" : "Browser"
		},function(data){
		if(data["status"] == 200){console.log("Autenticado Correctamente"); getProfile(data);}
		else{ darkModalOff();alert('Credenciales Invalidos, intente nuevamente');}	
		}).fail(function(e) { darkModalOff();alert('error de conexion fail');});
		}catch(e){darkModalOff();alert('error de conexion catch'+e);
		} 


}

function loginButton(){
	darkModal();
	
	var whirPass= $('.loginPage div label input').eq(1).val();
	var email=$('.loginPage div label input').eq(0).val();
	try{
	var logAs =email;
	$.post('http://52.20.73.216:8089/login',{
	"email" : email,
	"password": whirPass,
	"phone": typeof device !== 'undefined' ? device.model : "Browser",
	"os": typeof device !== 'undefined' ? device.platform : "Browser",
	"uuid":  typeof device !== 'undefined' ? device.uuid : "Browser",
	"pushKey":  typeof device !== 'undefined' ? "Browser" : "Browser"
	},function(data){
	if(data["status"] == 200){console.log("Autenticado Correctamente"); getProfile(data);}
	else{ darkModalOff();alert('Credenciales Invalidos, intente nuevamente');}	
	}).fail(function(e) { darkModalOff();alert('error de conexion fail');});
	}catch(e){darkModalOff();alert('error de conexion catch'+e);
	} 
}


function getQR(){

  cordova.plugins.barcodeScanner.scan(
      function (result) {
	var str = result.text;
	var res = str.split(" ");
	var codigo=res[0]; 
	 tipoDep = res[1]; 
          /*alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
	try{
	
	$.post('http://52.20.73.216:8089/verificarQR',{
	"email" : idScretClient,
	"codigo": codigo,
	"tipo": tipoDep},function(data){
	if(data["status"] == 200){depositoExitoso(tipoDep);}
	else{alert('Lo sentimos, codigo invalido');}	
	}).fail(function(e) {alert('error de conexion fail');});
	}catch(e){alert('error de conexion catch'+e);
	} 

      }, 
      function (error) {
          alert("Error en el scan: " + error);
      }
   );
	
}

function depositoExitoso(tipoDep){
	var puntosGanados = 50;
	mostrarNoti();		
	//efectofalta
	userPts=userPts+puntosGanados;
	userExp=userExp+50;
	calcularPorcentaje();
	$JSView.controller.menuTabs('menuTabs');//eval controller jrCH
	$v.select('#' + 'menuTabs' + ' jsv-tabs > jsv-tab.active').classList.remove('active');
        $v.selectAll('jsv-tabs jsv-tab')[1].classList.add('active');
	$v.select('#' + 'menuTabs' + ' jsv-content > jsv-tab.active').classList.remove('active');
        $v.selectAll('#' + 'menuTabs' + ' jsv-content > jsv-tab')[1].classList.add('active');
}

/*
<jsv-item class="item" style="background-color:aliceblue">
  <div class="photo"><img src="img/user.png"></div>
  <h3>h</h3>
  <text><h3>EXP ganada: 200</h3></text>
  <img src='img/iconosGame/1.png'>
</jsv-item>

*/


function cargarRanking(){
	 refreshRank();

	var rank ='<jsv-list class="photo-list">';

	try{
	$.post('http://52.20.73.216:8089/getRanking',{"s":"s"},function(data){
	if(data["status"] == 200){console.log(data['data'][0].nombre);
			for(i=0;i<data["data"].length;i++){
	i%2==0?color="background-color:aliceblue":color="";
	rank=rank+'<jsv-item class="item" style="'+color+'"'+'><div class="photo"><img src="img/user.png"></div><h3>'+data['data'][i].nombre+'</h3><text><h3>EXP ganada: '+data['data'][i].cantExp+'</h3></text><img class="numberRank" src="img/iconosGame/'+(i+1)+".png"+'"></jsv-item>';
	
	}
		rank=rank+'</jsv-list>';
		$("#ranking").html(rank); 
	console.log(rank);

		}
	else{alert('Ha ocurrido un error');}	
	}).fail(function(e) {alert('error de conexion fail');});
	}catch(e){alert('error de conexion catch'+e);
	} 

}
	function abrirMenu(){
	
		darkModal();
				$('#modal').html('<div class="containerComprar"><button onClick="darkModalOff()" style="font-size: 28px;"><i class="fa fa-times-circle-o"></i></button><button>Sobre MindCO2</button><button>Configuracion</button><button>Preguntas frecuentes</button><button onClick="logOut()">Cerrar sesion</button></div>');

	}
	function hacerMision(){alert("Las misiones no estan habilitadas en esta version :'c");}

	function calcularPorcentaje(){
		var maxP = lvl==1 ? 200 : lvl==2 ? 400 : lvl==3 ? 650 : 0;
	porcent = Math.round((userExp/maxP)*100);
	 console.log(porcent+"-"+maxP+"-"+userExp);
	//$('#progressbar div').css({"width": porcent+'%'});
	}



	/*
$("*").scrollstart(function(ev){
	console.log("tttt" );
});
*/

	

   function refreshRank(){
        console.log('refreshRank');
        $("#ranking").html(spinner);
    }//jrCH

   function closeModal(){$JSView.closeModal('modalA');
			console.log('modalCerrado');}

   function openModal(){
	$JSView.openModal('modalA');
	}


	    function logoutFace() {
        openFB.logout(
                function() {
                    alert('Logout successful');
                },
                errorHandler);
    }






