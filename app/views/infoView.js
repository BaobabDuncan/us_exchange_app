app.views.info = Ext.extend(Ext.Panel, {
	id : 'info',
	fullscreen : true,
	layout : 'card',	
	exchageData : getExchageData(),
	
	initComponent : function() {
		console.log("===info initComponent===");		
		this.infoPanel = new Ext.Panel({
			style: {	                    
                margin: '10px'               
            },
			html : '<div id="info_view"><h1>Thank you!</h1>'+
			'<p>This application for your smart trip</p>'+
			'<p>If you find some error or comment please contact me</p>'+
			'<p class="supportmail"><a href="mailto:ukmarket.bond@gmail.com">@UkSmart</a></p>'+
			'<p>You can  see the more uksmart application</p>'+
			'<a href="http://uk-smart.appspot.com/redirect"><img class="logo" src="./resources/images/logo.png"></a></div>',
			listeners : {				
				el : {
					'click': {fn:this.handleTapEvent,scope:this,delegate:''}
				}
			}
		});
		this.mainPanel = new Ext.Panel({
			
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Info'		
			}],
			items : [this.infoPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.views.info.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function(){
		console.log("loadMainPanel");	
		
	},
	refleshTab : function(){
		console.log("refleshTab");	
		
	},
	handleTapEvent : function(e,index) {
		if (e.getTarget('img.logo2')) {
			document.location.href = "http://uk-smart.appspot.com/redirect";
		}
	}
});
Ext.reg('info_view', app.views.info);

