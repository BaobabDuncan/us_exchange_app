/*
 * TabbarView
 * 총 4개의 탭바를 가지고 있으며 현재 기본숙제 자가교정 2개의 View만 만들어진 상태이다.
 * xtype를 이용하여 나머지 화면도 구성이 가능 하다.
 * */
app.views.TabbarView = Ext.extend(Ext.TabPanel, {

	id : 'tabbarView',
	
	fullscreen : true,
	
	tabBar : {
		ui : 'dark',
		dock : 'bottom',
		layout : {
			pack : 'center'
		}
	},

	cardSwitchAnimation : false,
	
	items : [{
		title : 'How Much?',		
		cls : 'card0',
		iconCls: 'search',
		xtype : 'how_much_view',
		viewType : 0
	},{
		title : 'Input',		
		cls : 'card1',
		iconCls: 'add',	
		xtype : 'user_input_view',
		viewType : 1
	},{
		title : 'History',
		cls : 'card3',
		iconCls: 'bookmarks',
		xtype : 'history_view',
		viewType : 3
	},{
		title : 'Info',
		cls : 'card4',
		iconCls: 'info',
		xtype : 'info_view',
		viewType : 4
	}],
	
	initComponent : function() {		
		this.on('cardswitch', this.handleCardSwitch, this);
		app.views.TabbarView.superclass.initComponent.apply(this, arguments);
	},
	
	handleCardSwitch : function(container, newCard, oldCard, index, animated) {		
		console.log('tab changed ' + index);
		console.log(newCard);
		newCard.refleshTab();
		/*if(newCard.id=='history'){
			newCard.loadHistoryStore();
		}*/
		
	}
	
 });