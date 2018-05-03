function showDealerMakes(location)
{if(location==null)location=0;if(location=="")
{document.getElementById("Make").innerHTML="<select name='MakeSel' class='searchMenu search_menus_select' id='MakeSel' onchange='showDealerMakes(this.value);'><option value='0'>Any</option></select>";document.getElementById("Model").innerHTML="<select name='ModelSel' class='searchMenu search_menus_select' id='ModelSel' onchange='showDealerYears(this.value);'><option value='0'>Any</option></select>";return;}
if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{document.getElementById("snake").style.display='none';document.getElementById("Make").innerHTML=xmlhttp.responseText;document.getElementById("Model").innerHTML="<select name='ModelSel' class='searchMenu search_menus_select' id='ModelSel' onchange='showDealerYears(this.value);'><option value='0'>Any</option></select>";}
else if(xmlhttp.readyState<4)
{document.getElementById("snake").style.display='block';}}
xmlhttp.open("POST","/ajax/dealer/get_dealer_car_makes/"+location,true);xmlhttp.send();}
function showDealerModels(str,selected)
{if(selected==null)selected=0;if(str=="")
{document.getElementById("Model").innerHTML="<select name='ModelSel' class='searchMenu search_menus_select' id='ModelSel' onchange='showDealerYears(this.value);'></select>";document.getElementById("YearFrom").innerHTML="<select name='YearFromSel' class='' id='YearFromSel'><option value='0'>Any</option></select>";document.getElementById("YearTo").innerHTML="<select name='YearToSel' class='' id='YearToSel'><option value='0'>Any</option></select>";return;}
if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{document.getElementById("snake").style.display='none';document.getElementById("Model").innerHTML=xmlhttp.responseText;}
else if(xmlhttp.readyState<4)
{document.getElementById("snake").style.display='block';}}
xmlhttp.open("POST","/ajax/dealer/get_dealer_car_models/"+str+"/"+selected,true);xmlhttp.send();}
function showDealerYears(str,selected)
{var yrFrom;var yrTo;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{document.getElementById("snake").style.display='none';yrFrom="<select name='YearFromSel' class='' id='YearFromSel' >"+xmlhttp.responseText+"</select>";yrTo="<select name='YearToSel' class='' id='YearToSel' >"+xmlhttp.responseText+"</select>";document.getElementById("YearFrom").innerHTML=yrFrom;document.getElementById("YearTo").innerHTML=yrTo;}
else if(xmlhttp.readyState<4)
{}}
xmlhttp.open("POST","/ajax/dealer/get_dealer_car_years/"+str+"/"+selected,true);xmlhttp.send();}
function change_freight(currency,ship_type,origin_country,target_country,m3,fob)
{customarray=Array;var currency_symbol;if(currency==1)
currency_symbol="&yen; ";else
currency_symbol="US$ ";if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){s=xmlhttp.responseText;customarray=s.split(",");var fobpricecustomer;document.getElementById("snake").style.display='none';fobpricecustomer=document.getElementById('fobpricecustomer').value;if(customarray[0]>0){document.getElementById("freight").innerHTML=currency_symbol+number_format(customarray[0]);document.getElementById("freighttxt").value=customarray[0];document.getElementById("totalcosttext").value=(fobpricecustomer-0)+(customarray[0]-0)+(customarray[1]-0)+(customarray[2]-0)+(customarray[3]-0);}
else{document.getElementById("freight").innerHTML=customarray[0];document.getElementById("freighttxt").value=0.00;document.getElementById("totalcosttext").value=(fobpricecustomer-0)+(customarray[1]-0)+(customarray[2]-0)+(customarray[3]-0);}
document.getElementById("vanning").innerHTML=currency_symbol+number_format(customarray[3]);document.getElementById("vanningtxt").value=customarray[3];document.getElementById("insurance").innerHTML=currency_symbol+number_format(customarray[2]);document.getElementById("insurancetxt").value=customarray[2];if(customarray[2]<1&&currency==1)
document.getElementById("insurancelabelYen").style.display="none";else if(customarray[2]<1&&currency!=1)
document.getElementById("insurancelabelUSD").style.display="none";document.getElementById("inspection").innerHTML=currency_symbol+number_format(customarray[1]);document.getElementById("inspectiontxt").value=customarray[1];document.getElementById("total_cost").innerHTML=currency_symbol+number_format(customarray[5]);}
else if(xmlhttp.readyState<4){document.getElementById("snake").style.display='block';}}
xmlhttp.open("POST","/ajax/dealer/get_freight/"+currency+"/"+ship_type+"/"+origin_country+"/"+target_country+"/"+m3+"/"+fob,true);xmlhttp.send();}
function number_format(number,decimals,dec_point,thousands_sep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+Math.round(n*k)/k;};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep);}
if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0');}
return s.join(dec);}
function cost_calculator(fobpricecustomer,vanningtxt,insurancetxt,inspectiontxt,freighttxt)
{document.getElementById("totalcosttext").value=eval(fobpricecustomer+vanningtxt+insurancetxt+inspectiontxt+freighttxt);}
function change_frieght_buy(currency,fob,freight_r,vanning_r,insurance_r,inspection_r,freight_c20,vanning_c20,insurance_c20,inspection_c20,freight_c40,vanning_c40,insurance_c40,inspection_c40){var ship_type=document.getElementById('shipment').value;var freight_type=document.getElementById('freight_type').value;var insurance=0;if(document.getElementsByName("warrenty")[0].checked){insurance=document.getElementsByName("warrenty")[0].value;}
else if(document.getElementsByName("warrenty")[1].checked){insurance=document.getElementsByName("warrenty")[1].value;}
if(freight_type=="FOB"){document.getElementById("warrenty_div").style.visibility="hidden";if(ship_type=="0"){document.getElementById("buy").f_freight.value=currency+' 0';document.getElementById("buy").f_vanning.value=currency+' '+vanning_c.toLocaleString();document.getElementById("buy").f_insurance.value=currency+' 0';document.getElementById("buy").f_inspection.value=currency+' 0';document.getElementById("buy").f_total.value=currency+' '+(fob+vanning_c).toLocaleString();}
else{document.getElementById("buy").f_freight.value=currency+' 0';document.getElementById("buy").f_vanning.value=currency+' 0';document.getElementById("buy").f_insurance.value=currency+' 0';document.getElementById("buy").f_inspection.value=currency+' 0';document.getElementById("buy").f_total.value=currency+' '+fob.toLocaleString();}}
else if(freight_type=="CIF"){document.getElementById("warrenty_div").style.visibility="visible";if(ship_type=="0"){document.getElementById("buy").f_freight.value=currency+' '+freight_r.toLocaleString();document.getElementById("buy").f_vanning.value=currency+' 0';document.getElementById("buy").f_insurance.value=currency+' '+parseInt(insurance).toLocaleString();document.getElementById("buy").f_inspection.value=currency+' '+inspection_r.toLocaleString();document.getElementById("buy").f_total.value=currency+' '+(fob+freight_r+parseInt(insurance)+inspection_r).toLocaleString();}
else if(ship_type=="1"){document.getElementById("buy").f_freight.value=currency+' '+freight_c20.toLocaleString();document.getElementById("buy").f_vanning.value=currency+' '+vanning_c20.toLocaleString();document.getElementById("buy").f_insurance.value=currency+' '+parseInt(insurance).toLocaleString();document.getElementById("buy").f_inspection.value=currency+' '+inspection_c20.toLocaleString();document.getElementById("buy").f_total.value=currency+' '+(fob+freight_c20+vanning_c20+parseInt(insurance)+inspection_c20).toLocaleString();}
else if(ship_type=="2"){document.getElementById("buy").f_freight.value=currency+' '+freight_c40.toLocaleString();document.getElementById("buy").f_vanning.value=currency+' '+vanning_c40.toLocaleString();document.getElementById("buy").f_insurance.value=currency+' '+parseInt(insurance).toLocaleString();document.getElementById("buy").f_inspection.value=currency+' '+inspection_c40.toLocaleString();document.getElementById("buy").f_total.value=currency+' '+(fob+freight_c40+vanning_c40+parseInt(insurance)+inspection_c40).toLocaleString();}}}
function get_consignee_info(consignee_id)
{if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
if(consignee_id==0){document.getElementById("consignee_name").value="";document.getElementById("consignee_address").value="";}else{xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){s=xmlhttp.responseText;customarray=s.split(",");document.getElementById("consignee_name").value=customarray[0];document.getElementById("consignee_address").value=customarray[1];document.getElementById("consignee_phone").value=customarray[2];}
else if(xmlhttp.readyState<4){document.getElementById("snake").style.display='block';}}
xmlhttp.open("POST","/ajax/user/get_customer_consignee/"+consignee_id,true);xmlhttp.send();}}
function manage_favorites(customer_id,stock_id,mode){if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){document.getElementById("snake"+stock_id).style.display='none';if(mode==1){document.getElementById("af"+stock_id).style.display='none';document.getElementById("rf"+stock_id).style.display='block';}
else{document.getElementById("af"+stock_id).style.display='block';document.getElementById("rf"+stock_id).style.display='none';}}
else if(xmlhttp.readyState<4){document.getElementById("snake"+stock_id).style.display='block';}}
if(mode==1){xmlhttp.open("POST","/ajax/user/add_favourite/"+customer_id+"/"+stock_id,true);}
else{xmlhttp.open("POST","/ajax/user/delete_favourite/"+customer_id+"/"+stock_id,true);}
xmlhttp.send();}
function reseting(str){for(i=0;i<document.getElementById(str).length;i++)
{if(document.getElementById(str).elements[i].value!=""){document.getElementById(str).elements[i].value="";}}
document.getElementById(str).submit();}