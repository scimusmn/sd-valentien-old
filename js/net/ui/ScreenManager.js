define([ 'net/AppData'], function( AppData ){


    function ScreenManager(){
    	
    }
    
    //Constants
    ScreenManager.SCREEN_MAIN = 'main';
    ScreenManager.SCREEN_VIEWER = 'viewer';
    
    ScreenManager.init = function(){

    	//Init screens
    	this.screens = []; 

    };
    
    ScreenManager.addScreen = function(screen){
    	this.screens.push(screen);
    }
    
    ScreenManager.showScreen = function( screenContainerId ) {
        	
        // console.log("ScreenManager.showScreen: " + screenContainerId);

        if (screenContainerId == AppData.currentScreenId) return; 

        //transition out current screen 
        var isFirstScreen = false;
		if(this.currentScreen) {
			this.currentScreen.transitionOut();
			$(this.currentScreen.containerDiv).css("z-index", "0");
		} else {
			isFirstScreen = true;
		}
						
		switch (screenContainerId) {
		
			case ScreenManager.SCREEN_MAIN:
				this.currentScreen = this.screens[0];
			break;
			case ScreenManager.SCREEN_VIEWER:
				this.currentScreen = this.screens[1];
			break;
		  	
		}
		
		//update app data
		AppData.setCurrentScreen( screenContainerId );
		
		//Do any preparation before transition
		this.currentScreen.refresh();
		
		//show new screen
		$(this.currentScreen.containerDiv).show();

		//transition new current screen
		$(this.currentScreen.containerDiv).css("z-index", "1");
		if (isFirstScreen==false) this.currentScreen.transitionIn();
		
    }

    return ScreenManager;
    
});