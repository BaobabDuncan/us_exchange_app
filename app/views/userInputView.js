/**
 * 
 */


app.views.userInput = Ext.extend(Ext.Panel, {
	id : 'userInput',
	fullscreen : true,
	layout : 'card',	
	exchageData : getExchageData(),
	
	initComponent : function() {
		console.log("===userInput initComponent===");	
		var me = this;
		this.userInputPanel = new Ext.Panel({
			items : [
				{
			    xtype: 'fieldset',
			    title: 'Buy Info',
			    style: {	                    
                    marginLeft: '10px',
                    marginRight: '10px'
                },
			    //instructions: 'Please enter the information above.<br>Are auto saved',
			    defaults: {
			        required: true,
			        labelAlign: 'left',
			        labelWidth: '40%'
			    },
				items: [
	                    {
	                        xtype: 'numberfield',
	                        name : 'Money',
	                        label: 'Money',
	                        value : me.exchageData.buy_money,
	                        useClearIcon: true,
	                        listeners: {	                    
	                        	keyup: function (number, e) {		                        		
	                        		if (checkforPrice(number.getValue())){
	                        			var exchageData = getExchageData();
	    	                    		exchageData.buy_money = number.getValue();
	    	                    		saveExchagteData(exchageData);
	                        		}
	                        		else{	                        			
	                        			number.setValue();
	                        		}	                        		
    		                    }
    		                }
	                        
	                        
	                    },
	                    {
	                    	xtype: 'selectfield',
	                    	id : 'buy_contry_select',
    	                    name: 'options',    	                    
    	                    options: selectCurrencyData,
    	                    listeners: {	                    
    	                    	change: function (select, value) {	                        
    	                    		var exchageData = getExchageData();
    	                    		exchageData.buy_contry = value;
    	                    		saveExchagteData(exchageData);
    		                    }
    		                }
	    				}
	            ]
			    },
			    {
				    xtype: 'fieldset',
				    title: 'Exchange Info',
				    style: {	                    
				    	marginLeft: '10px',
	                    marginRight: '10px'
	                },
				    instructions: 'Please enter the Exchange Money information above.',
				    defaults: {
				        required: true,
				        labelAlign: 'left',
				        labelWidth: '40%'
				    },
					items: [
		                    {
		                        xtype: 'numberfield',
		                        name : 'Money',
		                        label: 'Money',
		                        value : me.exchageData.get_money,
		                        useClearIcon: true,
		                        autoCapitalize : false,
		                        listeners: {	                    
		                        	keyup: function (number, e) {				                        		
		                        		if (checkforPrice(number.getValue())){
		                        			var exchageData = getExchageData();
		    	                    		exchageData.get_money = number.getValue();
		    	                    		saveExchagteData(exchageData);
		                        		}
		                        		else{	                        			
		                        			number.setValue();
		                        		}	                        		
	    		                    }
	    		                }
		                    },
		                    {
		                    	xtype: 'selectfield',
		                    	id : 'get_contry_select',
	    	                    name: 'options',
	    	                    options: selectCurrencyData,
	    	                    listeners: {	                    
	    	                    	change: function (select, value) {	       
	    		                    	  
	    		                    	  var exchageData = getExchageData();
	    		                    	  exchageData.get_contry = value;
	    		                    	  saveExchagteData(exchageData);
	    		                    }
	    		                }
	    	                    
		    				}
		            ]
				 }
			]
		});
		
		this.mainPanel = new Ext.Panel({
			
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'Exchage'		
			}],
			items : [this.userInputPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.views.userInput.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function(){
		console.log("loadMainPanel");
		var me = this;	
		me.refleshTab();
		
	},
	refleshTab : function(){
		var me = this;
		var exchageData = getExchageData();
		
		setTimeout(function() {							
			Ext.getCmp('buy_contry_select').setValue(Store_Country.data.items[exchageData.buy_contry-1].data.Currency+'('+Store_Country.data.items[exchageData.buy_contry-1].data.Name+')');			
			Ext.getCmp('get_contry_select').setValue(Store_Country.data.items[exchageData.get_contry-1].data.Currency+'('+Store_Country.data.items[exchageData.get_contry-1].data.Name+')');
		}, 1);	
	}
	
});
Ext.reg('user_input_view', app.views.userInput);