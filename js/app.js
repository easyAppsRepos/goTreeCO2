

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
alert("1234567890");
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


	function verificarSesionAnterior(){


		
		console.log("verificandoSesion");
		$.post('http://52.20.73.216:8089/sesionAnterior',
		{uuid:  typeof device !== 'undefined' ? device.uuid : "Browser" },
		function(data) {

			if("idSecretClient" in data ){
				console.log(data);
				idScretClient = data["idSecretClient"];
				logId = data["logId"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				//notifiOnApp();
				$JSView.goToView('menuTabs');
			}else{
				alert('No hay sesion anterior');
		};


		}).fail(function(e) {
		console.log('offLineMode();');
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
	$.jStorage.flush();
	//try{navigator.splashscreen.show();}catch(e){}
	window.location.reload(true);
	});
		
		}

function loginButton(){
var ppp=  typeof device !== 'undefined' ? device.platform : "Browser";
var sss=  typeof device !== 'undefined' ? device.uuid : "Browser";
	//var networkState = navigator.connection.type;
 	alert("id: "+sss+" dvice os: "+ppp);

	alert("sss22"+navigator.connection.type);
	
	/*

	//var patFemail = /(\S+)@/;
	var whirPass= $('.loginPage div label input').eq(1).val();
	var email=$('.loginPage div label input').eq(0).val();

		 
	try{
	//var logAs =email.match(patFemail)[1];
	var logAs =email;

	$.post('http://52.20.73.216:8089/login',{
	"email" : email,
	"password": whirPass,
	"phone": typeof device !== 'undefined' ? device.model : "Browser",
	"os": typeof device !== 'undefined' ? device.platform : "Browser",
	"uuid":  typeof device !== 'undefined' ? device.uuid : "Browser",
	"pushKey":  typeof device !== 'undefined' ? PN : "Browser"
	},function(data){
	if(data["status"] == 200){

	console.log(JSON.stringify(data));
	idScretClient = data["idSecretClient"];
	logId = data["idSession"]; 

	$.jStorage.set('idSecretClient', data['idSecretClient']);
	$.jStorage.set('logAs', logAs);

	$JSView.goToView('menuTabs');	

	}else{
	console.log('Credenciales Invalidos, intente nuevamente');

	}	
	}).fail(function(e) {
	console.log('error de conexion fail');
	});
	}catch(e){
	console.log('error de conexion catch'+e);

	}  

*/
}
