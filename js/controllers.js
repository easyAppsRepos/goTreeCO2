$JSView.controller = {
    menuTabs:function(e){
	

/*******************************************************************************/
		var maxP = lvl==1 ? 200 : lvl==2 ? 400 : lvl==3 ? 650 : 0;
	porcent = Math.round((userExp/maxP)*100);
	 console.log(porcent+"-"+maxP+"-"+userExp);
	//$('#progressbar div').css({"width": porcent+'%'});
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




