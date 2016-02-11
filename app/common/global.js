var MAX_STORE = 50
var MAX_INPUT_NUMBER = 10000000000

function getMoney(money){
	console.log(money);
	return 'test';
}
function getExchageData(){
	var exchangeStore = Ext.getStore('myExchangeStore');		
	exchangeStore.load();
	if (!exchangeStore.first()) {		
		exchangeStore.getProxy().clear();
		var exchangeVO = Ext.ModelMgr.create({	
			'id' : '1',
			'buy_money' :'1200',
			'buy_contry' : '13',
			'get_money' : '1',
			'get_contry' : '1'				
		}, 'app.models.ExchangeVO');		
		exchangeStore.add(exchangeVO);
		exchangeStore.sync();		
	}
	return exchangeStore.first().data;
}

function saveExchagteData(aData){
	var exchangeStore = Ext.getStore('myExchangeStore');	
	exchangeStore.add(aData);		
	exchangeStore.save();
	exchangeStore.sync();
	return;
}

function isInteger(s)
{
    return Math.ceil(s) == Math.floor(s);
}



function checkforPrice(value) {

	if (isNaN(parseFloat(value))) return false;
	else return true;
}

function getHowMuch(when_buy,get_money,purchase_money){	
	var howMuch = ((when_buy * purchase_money) / get_money);
	return Math.round(howMuch*100)/100;
}

function GetHTMLContent($strTag , $content)
{
	$qur =sprintf("/\<%s[^>]*\>(.+?)\<\/%s\>/is", $strTag,$strTag);
	preg_match($qur,  $content , $match);
	return $match[1];
}

function getToDayDate(){
	var today = new Date();	
	var s = leadingZeros(today.getFullYear(), 4) + '-' +
		leadingZeros(today.getMonth() + 1, 2) + '-' +
		leadingZeros(today.getDate(), 2);
	return s;
}

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}




