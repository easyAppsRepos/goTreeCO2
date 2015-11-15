$JSView.controller = {
    menuTabs:function(e){

        $JSView.dataView({
            'title': 'Tabs'
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




