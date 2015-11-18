

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){

	var state = navigator.connection.type;
	if (state == window.Connection.NONE)
	{
	    alert("No tiene internet");	
	    // doesn't have internet, notify
	}
	else
	{
	   // alert("tengo internet");	
	    verificarSesionAnterior();
	}
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
        .initView('viewLogin');

}, false);
	
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
	}else{

	console.log('Ha ocurrido un error');
	}	
	}).fail(function(e) {
	console.log('error de conexion fail');
	});
	}catch(e){}  

	}
}


	
function logOut(){
	$.post('http://52.20.73.216:8089/logout', {"logId" : logId}, function(data){
	//$.jStorage.flush();
	//try{navigator.splashscreen.show();}catch(e){}
	//window.location.reload(true);
	console.log(data);
	});
	$JSView.goToView('viewLogin');	
		}

function loginButton(){
	
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
	if(data["status"] == 200){getProfile(data);}
	else{alert('Credenciales Invalidos, intente nuevamente');}	
	}).fail(function(e) {alert('error de conexion fail');});
	}catch(e){alert('error de conexion catch'+e);
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
	var puntosGanados = 100;
	alert("Ha realizado un deposito exitoso de: "+tipoDep+"\n" +
                "Ha ganado: " + puntosGanados + "pts");
	//efectofalta
	userPts=userPts+puntosGanados;
	$JSView.controller.menuTabs('menuTabs');
}






