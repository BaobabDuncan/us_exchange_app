
Ext.regApplication({
	name : 'app',
	launch : function() {
		console.log("===regApplication Launch===");	
		this.views.viewport = new this.views.Viewport();
		
		//var data = getExchagteData();
		//console.log(data.buy_money)
		//data.buy_money = '80000';
		//saveExchagteData(data);
		//console.log(data.get('buy_money'))
		//data.set
		
		
		
		
		
		if (!app.views.tabbarView) {
			Ext.apply(app.views, {
				tabbarView : new app.views.TabbarView()
			});
			app.views.viewport.add(app.views.tabbarView);
		}
		app.views.viewport.setActiveItem(app.views.tabbarView);
	}
});

app.views.Viewport = Ext.extend(Ext.Panel, 
{
	id : 'viewport',	
	layout : 'card',
	fullscreen : true,
	listeners: {        
        afterlayout : function(){
            //writeLog("viewport afterlayout");
        },        
        beforeadd : function(){
        	//writeLog("viewport beforeadd");
        }       
    },
	initComponent : function() 
	{		
		app.views.Viewport.superclass.initComponent.apply(this, arguments);	    
	}

});
