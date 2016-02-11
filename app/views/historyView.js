/**
 * 
 */


app.views.history = Ext.extend(Ext.Panel, {
	id : 'history',
	fullscreen : true,
	layout : 'card',	
	exchageData : getExchageData(),
	
	initComponent : function() {
		console.log("===history initComponent===");			
		
		this.historyList = new Ext.List({	
			id : 'historyList',
			allowDeselect: false,
		    
		    activeCls: 'history-item-active',
		    itemTpl : new Ext.XTemplate('<div class="history-item">{title:this.moneyComma}',		    
			'<div class="action delete x-button">Delete</div></div>',
			'<div class="date">{regdate}</div>',
			{
		    	moneyComma : function(value){
		    		
		    		var historyTitleArray = value.split(' ');		    		
		    		var historyMoney = historyTitleArray[0];
		    				
		    		historyMoney = historyMoney.split('.')[0];
		    		
		    		
		    		var historyCurrency = historyTitleArray[1];
		    		
		    		str = ""+historyMoney+""; 
					var retValue = ""; 
					for(i=0; i<str.length; i++){ 
					    if(i > 0 && (i%3)==0) { 
					        retValue = str.charAt(str.length - i -1) + "," + retValue; 
					    } else { 
					        retValue = str.charAt(str.length - i -1) + retValue; 
					    } 
					} 
					return retValue+' '+historyCurrency; 
		    		
		    	}
			}),
			//<div class="action delete x-button">Delete</div>
			store : Ext.getStore('stoHistory'),
			/*plugins : [ {
				ptype : 'listpaging',
				autoPaging : false
			}],*/
			listeners: {
                scope: this,
                itemtap: this.onItemtapAction,
                itemswipe: this.onItemSwipe
            }
			
		});
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			dockedItems : [ {
				xtype : 'toolbar',
				title : 'History'		
			}],
			items : [this.historyList]
		});
		this.items = [this.mainPanel];
		
		this.mainPanel.on('afterrender', this.loadMainPanel, this);
		app.views.history.superclass.initComponent.apply(this, arguments);		
	},
	loadMainPanel : function(){
		console.log("loadMainPanel");		
		var me = this;
		me.refleshTab();
		
		
	},
	refleshTab : function(){
		//Ext.getCmp('historyList').scroller.scrollTo({ y : 0 }, true);	
		var me = this;
		
		var store = Ext.getStore('stoHistory');
		store.removeAll();		
		store.currentPage = 1;		
		store.proxy.extraParams={};		
		
		store.load({
			callback: function(operation) {		
				setTimeout(function() {							
					Ext.getCmp('historyList').scroller.scrollTo({ y : 0 }, true);			
				}, 1);	
									
		    }
		});
	},
	onItemtapAction: function(list, index, item, e) {
		console.log("onItemtapAction");
		var me = this;
		if (e.getTarget('.history-item-active div.delete')) {
			console.log('click delete');
            var store    = list.store,
                selModel = list.getSelectionModel(),
                instance = store.getAt(index),
                selected = selModel.isSelected(instance),
                nearest  = store.getAt(index + 1) || store.getAt(index - 1);
            
            if (selected && nearest) {
                selModel.select(nearest);
            }
            store.removeAt(index);
            store.sync();
            var localStore = Ext.getStore('myHistoryStore');
            localStore.removeAt(index);
            localStore.sync(index);
            /*
            //if the item we are removing is currently selected, select the nearest item instead
            if (selected && nearest) {
                selModel.select(nearest);
            }
            
            store.removeAt(index);
            store.sync();
            
            //there were no other searches left so tell the user about that
            if (!nearest) {
                Ext.redirect('searches/first');
            }*/
        } else {
            me.deactivateAll();            
            
        }
    },
    deactivateAll: function() {
        console.log(Ext.select('div.history-item', this.el.dom));
        console.log(Ext.getCmp('historyList').activeCls);
    	Ext.select('div.history-item', this.el.dom).removeCls(Ext.getCmp('historyList').activeCls);
    },
	onItemSwipe: function(list, index, item, e) {
		console.log("onItemSwipe");
		
		var me = this;
		var el = Ext.get(item), activeCls = list.activeCls, hasClass = el.hasCls(activeCls);
		console.log(hasClass);
		me.deactivateAll();
		if (hasClass) {
            el.removeCls(activeCls);
        } else {
            el.addCls(activeCls);
        }
		
    }
});
Ext.reg('history_view', app.views.history);

