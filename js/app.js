window.addEventListener('load', function() {

    $JSView.run('bottom');
    $JSView.declareView({ 

 	menuTabs: {
            url: '/menuTabs',
            template: 'views/menuTabs.html',
            controller: 'menuTabs'
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
     
    /*Asign view start*/
    $JSView
        .initView('menuTabs');
 
}, false);
