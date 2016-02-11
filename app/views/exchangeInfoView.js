/**
 * 
 */


app.views.info = Ext.extend(Ext.Panel, {
	id : 'info',
	fullscreen : true,
	layout : 'card',	
	exchageData : getExchageData(),
	
	initComponent : function() {
		console.log("===info initComponent===");		
		
		this.mainPanel = new Ext.Panel({
			
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Info'		
			}]
			//items : [this.userInputPanel,this.resultPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.views.exchangeInfo.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function(){
		console.log("loadMainPanel");	
		
	},
	refleshTab : function(){
		console.log("refleshTab");	
		
	}
});
Ext.reg('info_view', app.views.exchangeInfo);

