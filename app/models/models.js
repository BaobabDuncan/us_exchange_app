app.models.HistoryVO = Ext.regModel('app.models.HistoryVO',{
        idProperty : 'id',
        fields : [{
                name : 'id',
                type : 'integer'
        },{
                name : 'title'
        },{
                name : 'regdate'
        }]
});

Ext.regStore('myHistoryStore', {
        model : 'app.models.HistoryVO', 
        sorters : [ {
                property : 'id',
                direction : 'DESC'
        } ],
        proxy : {
                type : 'localstorage',
                id : 'myHistory-localstore'
        }
        //autoLoad:true,
        //autoSave: true
});
Ext.data.ProxyMgr.registerType("pxyHistory", Ext.extend(Ext.data.Proxy, 
{       
        create : function(operation, callback, scope) {

        },

        read : function(operation, callback, scope) 
        {
                console.log("pxyHistory read");
                
                var preCallback = callback;
                var me = this;
                var store = Ext.getStore('stoHistory');
                var records = new Array();                      
                var newRecords = new Array();   
                var exchangeStore = Ext.getStore('myHistoryStore');     
                var iStoreCount = store.getCount();
                exchangeStore.load();
                /*
                if (iStoreCount>0) {                    
                        console.log('load More');
                        
                }       
                if(iStoreCount){
                        store.each(function(obj) {                                                      
                                newRecords.push(obj);
                        });
                }
                var length =  store.pageSize+iStoreCount;
                console.log(length); 
                if(length>exchangeStore.getCount()){
                        length = exchangeStore.getCount();
                }
                console.log(iStoreCount);
                console.log(length);*/
                length = exchangeStore.getCount();
                for (var index=0; index<length; index++)
                {
                        //console.log('index = '+index);
                        records.push(exchangeStore.data.items[index]);
                        /*if(iStoreCount){
                                newRecords.push(exchangeStore.data.items[index]);
                        }
                        else{
                                records.push(exchangeStore.data.items[index]);
                        }*/
                        
                }
                /*if(iStoreCount){
                        console.log(newRecords);
                        records = newRecords;
                        delete newRecords;
                }*/
                operation.setCompleted();
                operation.setSuccessful();
                store.data.clear();
                store.sync();
                operation.records = records;    
                
                preCallback.call(scope || me, operation);
                
        },
        
        update : function(operation, callback, scope) {
                
        },
        destroy : function(operation, callback, scope) {
                
        }       
}));
app.stores.historyStore = new Ext.data.Store({
        id:'stoHistory',
        model : 'app.models.HistoryVO',
        pageSize:5,
        autoload:false, 
        proxy : {
                type : 'pxyHistory',
                id:'pxyHistoryStorage'
        }
        
});




app.models.ExchangeVO = Ext.regModel('app.models.ExchangeVO', {
        idProperty : 'id',
        fields : [{
                        name : 'id',
                        type : 'integer'
                },{
                        name : 'buy_money',
                        type : 'float'
                },{
                        name : 'buy_contry'
                },{
                        name : 'get_money',
                        type : 'float'
                },{
                        name : 'get_contry'
                }
        ]
});

Ext.regStore('myExchangeStore', {
        model : 'app.models.ExchangeVO',        
        sorters : [ {
                property : 'id',
                direction : 'DESC'
        } ],
        proxy : {
                type : 'localstorage',
                id : 'myExchange-localstore'
        },
        autoLoad:true,
        autoSave: true
});


Ext.regModel('M_Country',{
        fields : ['Key','Name','Currency']
});

var Store_Country = new Ext.data.JsonStore({
        model : 'M_Country',
        data : [
                {Key : '1', Name : 'America', Currency : 'USD'},
                {Key : '2', Name : 'Britain', Currency : 'GBP'},
                {Key : '3', Name : 'Canada', Currency : 'CAD'},
                {Key : '4', Name : 'Swiss', Currency : 'CHF'},
                {Key : '5', Name : 'Hong Kong', Currency : 'HKD'},
                {Key : '6', Name : 'Sweden', Currency : 'SEK'},
                {Key : '7', Name : 'Australia', Currency : 'AUD'},
                {Key : '8', Name : 'Denmark', Currency : 'DKK'},
                {Key : '9', Name : 'Norway', Currency : 'NOK'},
                {Key : '10', Name : 'Saudi Arabia', Currency : 'SAR'},
                {Key : '11', Name : 'Kuwait', Currency : 'KWD'},
                {Key : '12', Name : 'Bahrain', Currency : 'BHD'},
                {Key : '13', Name : 'Korea', Currency : 'WON'},
                {Key : '14', Name : 'Japan', Currency : 'JPY'},
                {Key : '15', Name : 'Thailand', Currency : 'THB'},
                {Key : '16', Name : 'Singapore', Currency : 'SGD'},
                {Key : '17', Name : 'India', Currency : 'INR'},
                {Key : '18', Name : 'Malaysia', Currency : 'MYR'},
                {Key : '19', Name : 'Indonesia', Currency : 'IDR'},
                {Key : '20', Name : 'China', Currency : 'CNY'},
                {Key : '21', Name : 'Zealand', Currency : 'NZD'},
                {Key : '22', Name : 'European Union', Currency : 'EUR'},
        ]
});


selectCurrencyData = [
        {value : '1',text : 'USD(America)'},
        {value : '2',text : 'GBP(Britain)'},
        {value : '3',text : 'CAD(Canada)'},
        {value : '4',text : 'CHF(Swiss)'},
        {value : '5',text : 'HKD(Hong Kong)'},
        {value : '6',text : 'SEK(Sweden)'},
        {value : '7',text : 'AUD(Australia)'},
        {value : '8',text : 'DKK(Denmark)'},
        {value : '9',text : 'NOK(Norway)'},
        {value : '10',text : 'SAR(Saudi Arabia)'},
        {value : '11',text : 'KWD(Kuwait)'},
        {value : '12',text : 'BHD(Bahrain)'},
        {value : '13',text : 'WON(Korea)'},
        {value : '14',text : 'JPY(Japan)'},
        {value : '15',text : 'THB(Thailand)'},
        {value : '16',text : 'SGD(Singapore)'},
        {value : '17',text : 'INR(India)'},
        {value : '18',text : 'MYR(Malaysia)'},
        {value : '19',text : 'IDR(Indonesia)'},
        {value : '20',text : 'CNY(China)'},
        {value : '21',text : 'NZD(Zealand)'},
        {value : '22',text : 'EUR(European Union)'}
];
