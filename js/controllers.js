$JSView.controller = {
    menuTabs:function(e){
	

/*******************************************************************************/

calcularPorcentaje();
/********************************************************************************/


        $JSView.dataView({
            'title': 'Tabs',
	    'name':userName,
	    'userPts':userPts,
	    'userTree':userTree,
	    'titulo':titulo,
	    'lvl':lvl,
	    'porcent': porcent
        },e)

       $JSView.initTabs(e);
    },
    viewLogin: function(e){
		$JSView.dataView({},e);
		
	},
    viewA: function(e){
		$JSView.dataView({},e)
	},
    viewB: function(e){
		$JSView.dataView({},e)	
	},
    viewC: function(e){
		$JSView.dataView({},e)
	},
    modalA: function(e){
		$JSView.dataView({},e)	
	}
}




