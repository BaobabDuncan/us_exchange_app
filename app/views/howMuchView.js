/**
 * 
 */


app.views.howMuch = Ext.extend(Ext.Panel, {
	id : 'howMuch',
	fullscreen : true,
	layout : 'card',	
	yourContryMoney : null,
	exchageData : getExchageData(),
	
	initComponent : function() {
		console.log("===howMuch initComponent===");	
		var me = this;
		var nowCurrency = Store_Country.data.items[me.exchageData.get_contry-1].data.Currency;
		var nowCountry = Store_Country.data.items[me.exchageData.get_contry-1].data.Name;
		this.userInputPanel = new Ext.Panel({
			id : 'userInputPanel',
			items:[
			   {
				   xtype: 'fieldset',
				   style: {	                    
	                    margin: '10px'
	               },
				   title: nowCurrency,
				   instructions: 'How Much is it in '+nowCountry+'?',
				   items:[
				          {
							xtype: 'numberfield',
							id : 'money_text',
							name : 'Money',		
							maxLength : 4,
							useClearIcon: true,
							listeners: {	                    
								keyup: function (number, e) {	
									console.log(number.getValue().length);
									if(number.getValue()>MAX_INPUT_NUMBER){
										Ext.Msg.alert('Alert','The '+MAX_INPUT_NUMBER+' is the maximun number',function(){
											number.setValue('');
											me.removeInput();
										}).doComponentLayout();	
										
									}
									else{
										var yourContryMoney = getHowMuch(me.exchageData.buy_money,me.exchageData.get_money,number.getValue());
	                        			if(yourContryMoney){
	                        				me.writeThisMoney(number.getValue(),yourContryMoney);
	      
	                        			}
	                        			else{	                        				
	                        				number.setValue('');
	                        				me.removeInput();
	                        			}	 
									}
    		                    }               		
							}
						}
				   ]
			   }
				
			]
		});
		
		this.resultPanel = new Ext.Panel({
			id : 'resultPanel',
			style: {	                    
                margin: '10px',
                marginTop: '50px'
            },
			html : '<div id="result"></div>',
			listeners : {				
				el : {
					'click': {fn:this.handleResultPanelEvent,scope:this,delegate:''}
				}
			}
		});
		
		this.mainPanel = new Ext.Panel({
			
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'How Much'		
			}],
			items : [this.userInputPanel,this.resultPanel]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.views.howMuch.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function(){
		console.log("loadMainPanel");		
		var me = this;
		/*setTimeout(function() {					
			document.getElementById("money_text").getElementsByTagName('input')[0].setAttribute('maxlength','5');
			
		},1);*/
		me.refleshTab();
		//console.log(Store_Country.data.items[0].data.Currency);		
		//console.log(getHowMuch(1000,38.92,200));
	},
	refleshTab : function(){
		var me = this;
		me.exchageData = getExchageData();
		var otherCurrency = Store_Country.data.items[me.exchageData.get_contry-1].data.Currency;
		var otherCountry = Store_Country.data.items[me.exchageData.get_contry-1].data.Name;
		//console.log(Ext.getCmp('userInputPanel').items.items[0]);
		Ext.getCmp('userInputPanel').items.items[0].setTitle(otherCurrency);
		Ext.getCmp('userInputPanel').items.items[0].setInstructions('How Much is it in '+otherCountry+'?');
		me.removeInput();
	},
	removeInput : function(){
		console.log("removeInput");
		Ext.getCmp('money_text').setValue();
		//console.log(Ext.get('resultPanel'));
		//Ext.get('resultPanel').dom.innerHTML = 'test'
		setTimeout(function() {							
			document.getElementById('result').innerHTML = "";
		}, 1);	
		
	},
	writeThisMoney : function(otherContryMoney,yourContryMoney){
		var me = this;
		var otherCurrency = Store_Country.data.items[me.exchageData.get_contry-1].data.Currency;
		var otherCountry = Store_Country.data.items[me.exchageData.get_contry-1].data.Name;
		var yourCurrency = Store_Country.data.items[me.exchageData.buy_contry-1].data.Currency;
		var yourCountry = Store_Country.data.items[me.exchageData.buy_contry-1].data.Name;
		
		me.yourContryMoney = yourContryMoney;
		var resuestHtml = '<div id="result_view"><div>'+otherCountry+' at <span class="other">'+otherContryMoney+' '+otherCurrency+'</span>';
		resuestHtml += '<br>in the '+yourCountry+' is <span class="your">'+yourContryMoney+' '+yourCurrency+'</span>';
		resuestHtml += '</div><div class="btn_div"><button class="history_btn">저장</button></div></div>';
		document.getElementById('result').innerHTML = resuestHtml;
		
	},
	
	handleResultPanelEvent : function(e,index) {		
		var me = this;
		if (e.getTarget('button.history_btn')) {
			var historyStore = Ext.getStore('myHistoryStore');			
			if (historyStore.getCount()>= MAX_STORE){
				Ext.Msg.alert('Alert','The '+MAX_STORE+' is the maximun storage<br>Should be deleted your history',function(){
					
				}).doComponentLayout();		
				return false;
			}			
			var yourCurrency = Store_Country.data.items[me.exchageData.buy_contry-1].data.Currency;		
			historyStore.create({title: me.yourContryMoney+' '+yourCurrency,regdate :getToDayDate()});
			me.removeInput();
		}
	}
	
});
Ext.reg('how_much_view', app.views.howMuch);