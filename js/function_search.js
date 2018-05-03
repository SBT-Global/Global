function get_region_ports(region_id)
{
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + "ajax/shipping/get_region_ports/"+region_id,
        beforeSend: function () {
            $("#snake").html('<img src="'+base_url+'images/ajaxSnake.gif" />');
            $("#snake").show()
        },
        success: function (e) {
            $("#ArrivalPort").html(e);
            $("#snake").html('');
        }
    })
}

function showMakes(location,ident)
{
	if(location=="" || location==0){
		is_lhd = -1;
		$('#HandleSelX').val(is_lhd);
		$('#Make').html("<select name='MakeSel' id='MakeSel' class='textBox' style='width:124px;' onchange='showMakes(this.value);'><option value='0'>Any</option></select>");
		$('#Model').html("<select name='ModelSel' id='ModelSel' class='textBox' style='width:124px;' onchange='showYears(this.value);'><option value='0'>Any</option></select>");
		return;
	}else{

		handle = $("#"+ident+" :selected").text();
		string = handle.split(" ");
		if (typeof string[1] == "undefined") 
			 handle = "both";
		else handle = string[1].toLowerCase();
		if (handle == "both") is_lhd = -1;
		if (handle == "lhd")  is_lhd =  1;
		if (handle == "rhd")  is_lhd =  0;

		if(handle=='both') ajax_url = 'ajax/catalog/get_car_makes/'+location;
		if(handle=='lhd')  ajax_url = 'ajax/catalog/get_car_makes/'+location+'/'+is_lhd;  //is_lhd=1;
		if(handle=='rhd')  ajax_url = 'ajax/catalog/get_car_makes/'+location+'/'+is_lhd;  //is_lhd=0;

		$.ajax({
		type:'POST',dataType:'text',
			url:base_url+ajax_url,
		beforeSend:function(){$('#snake').show();},
		success:function(msg){
			$('#Make').html(msg);
			$('#Model').html("<select name='ModelSel' id='ModelSel' class='textBox' style='width:124px;' onchange='showYears(this.value);'><option value='0'>Any</option></select>");
			$('#HandleSelX').val(is_lhd);
			$('#snake').hide();
		}});
	}
}

function showModels(e, t, n, r, yearFrom, yearTo)
{
    if (typeof e == "undefined" || e == "") e = 0;
    if (typeof t == "undefined" || t == "" || t == "Any") t = 0;
    if (typeof n == "undefined" || n == "") n = 0;
    if (e == "") {
        $("#Model").html("<select name='ModelSel' id='ModelSel' class='textBox' onchange='showYears(this.value);'></select>");
        $("#YearFrom").html("<select name='YearFromSel' id='YearFromSel' class=''><option value='0'>Any</option></select>");
        $("#YearTo").html("<select name='YearToSel' id='YearToSel' class=''><option value='0'>Any</option></select>");
        return
    }
    handle = $("#" + r + " :selected").text();
    string = handle.split(" ");
    if (typeof string[1] == "undefined") 
	     handle = "both";
    else handle = string[1].toLowerCase();
    if (handle == "both") is_lhd = -1;
    if (handle == "lhd")  is_lhd = 1;
    if (handle == "rhd")  is_lhd = 0;
    if (is_lhd == -1) ajax_url = "ajax/catalog/get_car_models/" + e + "/" + t + "/" + n;
    else ajax_url = "ajax/catalog/get_car_models/" + e + "/" + t + "/" + n + "/" + is_lhd;
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#Model").html(e);
			if(n>0) showYears(n,yearFrom,yearTo);
			$('#HandleSelX').val(is_lhd);
            $("#snake").hide()
        }
    })
}

// -----------------------------------------------------------------------------------------------------------------------
function showMakesSearchBox(location, handle, makeID, modelID, yearFrom, yearTo)
{ 
	is_lhd = -1;
	//handle = $('select[name="HandleSel"]').val();
	if(handle == '-1' || handle == '') is_lhd = -1;
	if(handle == '1') is_lhd = 1;
	if (handle == '0') is_lhd = 0;
	if(location == 0) {
	    ajax_url = 'ajax/catalog/get_car_makes_searchBox/' + location + '/' + is_lhd;
	} else {
	    ajax_url = 'ajax/catalog/get_car_makes_searchBox/' + location + '/' + is_lhd;
	}
	
		$.ajax({
		type:'POST',dataType:'text',
			url:base_url+ajax_url,
		//beforeSend:function(){$('#snake').show();},
		success:function(msg){
			msg = msg.replace(/MakeSel/gi, "MakeSelNew");
			msg = msg.replace(/showMakes/gi, "showMakesSearchBox");
			msg = msg.replace(/showModels/gi, "showModelsSearchBox");
			msg = msg.replace(/124px/gi, "170px");
			$('#Make').html(msg);
			$('#Model').html("<select name='ModelSelNew' id='ModelSelNew' class='textBox' style='width:170px;'><option value='0'>Any</option></select>");					
			$('#snake').hide();
			document.getElementById('MakeSelNew').value = makeID;
			
			if(parseInt(makeID) > 0) {
				showModelsSearchBox(makeID, location,'','locationSel', modelID,yearFrom,yearTo);	
			}
		}});
}


function showModelsSearchBox(e, t, n, r, modelID, yearFrom, yearTo)
{
    if (typeof e == "undefined" || e == "") e = 0;
    //if (typeof t == "undefined" || t == "" || t == "Any") t = 0;
	if (typeof t == "undefined" || t == "") t = $('#LocationSelNew').val();
    if (typeof t == "Any") t = 0;
    if (typeof n == "undefined" || n == "") n = 0;
    if (e == "") {
        $("#Model").html("<select name='ModelSelNew' id='ModelSelNew' class='textBox' style='width:170px;' onchange='showYears(this.value);'></select>");
        return
    }

    is_lhd = -1;
    //handle = $("#" + r + " :selected").text();
	handle = $('select[name="HandleSel"]').val();
	if(handle == '-1' || handle == '') is_lhd = -1;
	if(handle == '1') is_lhd = 1;
	if (handle == '0') is_lhd = 0;
	
    if (is_lhd == -1) ajax_url = "ajax/catalog/get_car_models/" + e + "/" + t + "/" + n;
    else ajax_url = "ajax/catalog/get_car_models/" + e + "/" + t + "/" + n + "/" + is_lhd;
	
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (x) {
			x = x.replace(/ModelSel/gi,"ModelSelNew");
			x = x.replace(/124px/gi, "170px");
            $("#Model").html(x);
			if(modelID>0) showYears(modelID,yearFrom,yearTo);
			$('#snake').hide();
			document.getElementById('ModelSelNew').value = modelID;	
        }
    })
}

// -----------------------------------------------------------------------------------------------------------------------

function showYears(e, f, t)
{
    if (typeof e == "undefined") e = "";
    if (typeof t == "undefined") t = 0;
    if (typeof f == "undefined") f = 0;

    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + "ajax/catalog/get_car_years/" + e + "/" + f,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#YearFromSel").empty().append(e);
        }
    })

    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + "ajax/catalog/get_car_years/" + e + "/" + t,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#YearToSel").empty().append(e);
            $("#snake").hide()
        }
    })
}

function checkValidYear()
{
    YearFromSel = $("#YearFromSel").val();
    YearToSel = $("#YearToSel").val();
    if (parseInt(YearFromSel) > parseInt(YearToSel)) {
        alert("To Year cannot be Lower than From Year");
        return false
    }
}

function change_freight(e, t, n, r, i, s) {
    customarray = Array;
    var o;
    if (e == 1) o = "¥ ";
    else o = "US$ ";

    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + "/ajax/catalog/get_freight/" + e + "/" + t + "/" + n + "/" + r + "/" + i + "/" + s,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (t) {
            customarray = t.split(",");
            var n = $("#fobpricecustomer").val();
            if (customarray[0] > 0) {
                $("#freight").html(o + number_format(customarray[0]));
                $("#freighttxt").val(customarray[0]);
                $("#totalcosttext").val(n - 0 + (customarray[0] - 0) + (customarray[1] - 0) + (customarray[2] - 0) + (customarray[3] - 0))
            } else {
                $("#freight").html(customarray[0]);
                $("#freighttxt").val(0);
                $("#totalcosttext").val(n - 0 + (customarray[1] - 0) + (customarray[2] - 0) + (customarray[3] - 0))
            }
            $("#vanning").html(o + number_format(customarray[3]));
            $("#vanningtxt").val(customarray[3]);
            $("#insurance").html(o + number_format(customarray[2]));
            $("#insurancetxt").val(customarray[2]);
            if (customarray[2] < 1 && e == 1) $("#insurancelabelYen").hide();
            else if (customarray[2] < 1 && e != 1) $("#insurancelabelUSD").hide();
            $("#inspection").html(o + number_format(customarray[1]));
            $("#inspectiontxt").val(customarray[1]);
            $("#total_cost").val(o + number_format(customarray[5]));
            $("#snake").hide()
        }
    });
    return false
}

function number_format(e, t, n, r) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var i = !isFinite(+e) ? 0 : +e,
        s = !isFinite(+t) ? 0 : Math.abs(t),
        o = typeof r === "undefined" ? "," : r,
        u = typeof n === "undefined" ? "." : n,
        a = "",
        f = function (e, t) {
            var n = Math.pow(10, t);
            return "" + Math.round(e * n) / n
        };
    a = (s ? f(i, s) : "" + Math.round(i)).split(".");
    if (a[0].length > 3) {
        a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)
    }
    if ((a[1] || "").length < s) {
        a[1] = a[1] || "";
        a[1] += (new Array(s - a[1].length + 1)).join("0")
    }
    return a.join(u)
}

function cost_calculator(fobpricecustomer, vanningtxt, insurancetxt, inspectiontxt, freighttxt) {
    $("#totalcosttext").val(eval(fobpricecustomer + vanningtxt + insurancetxt + inspectiontxt + freighttxt))
}

function change_frieght_buy(e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
    var d = document.getElementById("shipment").value;
    var v = document.getElementById("freight_type").value;
    var m = 0;
    if (document.getElementsByName("warrenty")[0].checked) {
        m = document.getElementsByName("warrenty")[0].value
    } else if (document.getElementsByName("warrenty")[1].checked) {
        m = document.getElementsByName("warrenty")[1].value
    }
    if (v == "FOB") {
        document.getElementById("warrenty_div").style.visibility = "hidden";
        if (d == "0") {
            document.getElementById("buy").f_freight.value = e + " 0";
            document.getElementById("buy").f_vanning.value = e + " " + vanning_c.toLocaleString();
            document.getElementById("buy").f_insurance.value = e + " 0";
            document.getElementById("buy").f_inspection.value = e + " 0";
            document.getElementById("buy").f_total.value = e + " " + (t + vanning_c).toLocaleString()
        } else {
            document.getElementById("buy").f_freight.value = e + " 0";
            document.getElementById("buy").f_vanning.value = e + " 0";
            document.getElementById("buy").f_insurance.value = e + " 0";
            document.getElementById("buy").f_inspection.value = e + " 0";
            document.getElementById("buy").f_total.value = e + " " + t.toLocaleString()
        }
    } else if (v == "CIF") {
        document.getElementById("warrenty_div").style.visibility = "visible";
        if (d == "0") {
            document.getElementById("buy").f_freight.value = e + " " + n.toLocaleString();
            document.getElementById("buy").f_vanning.value = e + " 0";
            document.getElementById("buy").f_insurance.value = e + " " + parseInt(m).toLocaleString();
            document.getElementById("buy").f_inspection.value = e + " " + s.toLocaleString();
            document.getElementById("buy").f_total.value = e + " " + (t + n + parseInt(m) + s).toLocaleString()
        } else if (d == "1") {
            document.getElementById("buy").f_freight.value = e + " " + o.toLocaleString();
            document.getElementById("buy").f_vanning.value = e + " " + u.toLocaleString();
            document.getElementById("buy").f_insurance.value = e + " " + parseInt(m).toLocaleString();
            document.getElementById("buy").f_inspection.value = e + " " + f.toLocaleString();
            document.getElementById("buy").f_total.value = e + " " + (t + o + u + parseInt(m) + f).toLocaleString()
        } else if (d == "2") {
            document.getElementById("buy").f_freight.value = e + " " + l.toLocaleString();
            document.getElementById("buy").f_vanning.value = e + " " + c.toLocaleString();
            document.getElementById("buy").f_insurance.value = e + " " + parseInt(m).toLocaleString();
            document.getElementById("buy").f_inspection.value = e + " " + p.toLocaleString();
            document.getElementById("buy").f_total.value = e + " " + (t + l + c + parseInt(m) + p).toLocaleString()
        }
    }
}

function get_consignee_info(e) {
    if (e == 0) {
        $("#consignee_name").val("");
        $("#consignee_address").val("")
    } else {
        $.ajax({
            type: "POST",
            dataType: "text",
            url: base_url + "/ajax/user/get_customer_consignee/" + e,
            beforeSend: function () {
                $("#snake").show()
            },
            success: function (e) {
                customarray = e.split(",");
                $("#consignee_name").show(customarray[0]);
                $("#consignee_address").show(customarray[1]);
                $("#consignee_phone").show(customarray[2]);
                $("#snake").show()
            }
        });
        return false
    }
}

function manage_favorites(e, t, n) {
    if (n == 1) url = base_url + "/ajax/user/add_favourite/" + e + "/" + t;
    else url = base_url + "/ajax/user/delete_favourite/" + e + "/" + t;
    $.ajax({
        type: "POST",
        dataType: "text",
        url: url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            if (n == 1) {
                $("#af" + t).hide();
                $("#rf" + t).show()
            } else {
                $("#af" + t).show();
                $("#rf" + t).hide()
            }
            $("#snake").hide()
        }
    });
    return false
}

function reseting(e) {
    for (i = 0; i < $("#" + e).length; i++) {
        if (document.getElementById(e).elements[i].value != "") {
            document.getElementById(e).elements[i].value = ""
        }
        if ($("#" + e)[0].val) {
            $("#" + e)[0].val("")
        }
    }
    $("#" + e).submit()
}

function get_country_charges(e, t, n, r, i) {
    $.ajax({
        url: "/ajax/catalog/get_country_charges/",
        data: "customer_currency_id=" + e + "&origin_country_id=" + t + "&target_country_id=" + n + "&m3=" + r + "&ship_type=" + i,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#snake").show()
        },
        success: function(e) {
            $("#snake").hide();
            var t = e.split("_");
            if (t[4] == 1) {
                $("#btn_inspection_no").attr("disabled", true);
                $("#btn_inspection_yes").attr("checked", true);
                $("#div_inspection").css("color", "#565656")
            } else {
                $("#btn_inspection_no").attr("disabled", false);
                $("#btn_inspection_yes").attr("checked", false);
                $("#div_inspection").css("color", "#000000");
            }
        }
    })
}

function fill() {
    var e = document.getElementById("country")[document.getElementById("country").selectedIndex].innerHTML;
    var t = document.getElementById("port")[document.getElementById("port").selectedIndex].innerHTML;
    var n = document.getElementById("city")[document.getElementById("city").selectedIndex].innerHTML;
    var r = document.getElementById("notify_country")[document.getElementById("notify_country").selectedIndex].innerHTML;
    var i = document.getElementById("notify_city")[document.getElementById("notify_city").selectedIndex].innerHTML;
    document.getElementById("country_name").value = e;
    document.getElementById("port_name").value = t;
    document.getElementById("city_name").value = n;
    document.getElementById("notify_country_name").value = r;
    document.getElementById("notify_city_name").value = i
}

function changeHiddenInput(e, t) {
    return false;
    var n = document.getElementById("Country_Id")[document.getElementById("Country_Id").selectedIndex].text;
    var r = document.getElementById("Arrival_Port_Id")[document.getElementById("Arrival_Port_Id").selectedIndex].text;
    var i = document.getElementById("City_Id")[document.getElementById("City_Id").selectedIndex].text;
    var s = document.getElementById("Notify_Country_Id")[document.getElementById("Notify_Country_Id").selectedIndex].text;
    var o = document.getElementById("Notify_City_Id")[document.getElementById("Notify_City_Id").selectedIndex].text;
    document.getElementById("country_name").value = n;
    document.getElementById("port_name").value = r;
    document.getElementById("city_name").value = i;
    document.getElementById("notify_country_name").value = s;
    document.getElementById("notify_city_name").value = o
}

function changeHiddenInputProfile(e, t) {
    return false;
    var n = document.getElementById("Country_Id")[document.getElementById("Country_Id").selectedIndex].text;
    var r = document.getElementById("Arrival_Port_Id")[document.getElementById("Arrival_Port_Id").selectedIndex].text;
    var i = document.getElementById("City_Id")[document.getElementById("City_Id").selectedIndex].text;
    var s = document.getElementById("Notify_Country_Id")[document.getElementById("Notify_Country_Id").selectedIndex].text;
    var o = document.getElementById("Notify_City_Id")[document.getElementById("Notify_City_Id").selectedIndex].text;
    document.getElementById("country_name").value = n;
    document.getElementById("port_name").value = r;
    document.getElementById("city_name").value = i;
    document.getElementById("notify_country_name").value = s;
    document.getElementById("notify_city_name").value = o
}

function get_port(e, t) {
    reg_source = $("#reg_source").val();
    $.ajax({
        url: "/ajax/catalog/get_ports/",
        data: "country=" + e + "&port_id=" + t + "&reg_source=" + reg_source,
        dataType: "text",
        type: "POST",
        beforeSend: function () {},
        success: function (e) {
            $("#snake").hide();
            $("#div_port").html(e)
        }
    })
}

function get_city(e, t, n, r) {
    $.ajax({
        url: "/ajax/catalog/get_cities/",
        data: "country_id=" + e + "&city_id=" + t + "&city_select_id=" + n + "&city_div_id=" + r,
        dataType: "text",
        type: "POST",
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#snake").hide();
            $("#" + r).html(e)
        }
    })
}

function get_country_name(e, t) {
    $.ajax({
        url: "/ajax/catalog/get_country_name",
        data: "country_id=" + e,
        dataType: "text",
        type: "POST",
        beforeSend: function () {},
        success: function (e) {
            return e
        }
    })
}

function copy_values(e) {
    if ($("#message").html() == "Consignee Phone detail already exists. Kindly enter different Phone Number!" || $("#message").html() == "Kindly input different Consignee Phone Number.") {
        $("#message").html("Kindly input different Consignee Phone Number.");
        $("#chk_same").attr("checked", false);
        return false
    } else if ($("#message").html() != "Consignee Phone detail already exists. Kindly enter different Phone Number!" || $("#message").html() != "Kindly input different Consignee Phone Number.") {
        if ($("#chk_same").is(":checked")) {
            $("#consignee_name").attr("readonly", true);
            $("#consignee_address").attr("readonly", true);
            $("#consignee_phone").attr("readonly", true);
            $("#consignee_shipper").attr("readonly", true);
            $("#notify_name").val($("#consignee_name").val());
            $("#notify_name").attr("readonly", true);
            $("#notify_address").val($("#consignee_address").val());
            $("#notify_address").attr("readonly", true);
            $("#notify_phone").val($("#consignee_phone").val());
            $("#notify_phone").attr("readonly", true);
            $("#Notify_Country_Id").val($("#Country_Id").val());
            get_city($("#Country_Id").val(), $("#City_Id").val(), "Notify_City_Id", "div_notify_city");
            $("#notify_state").val($("#consignee_state").val());
            $("#notify_state").attr("readonly", true);
            $("#notify_shipper").val($("#consignee_shipper").val());
            $("#notify_shipper").attr("readonly", true)
        } else {
            $("#consignee_name").attr("readonly", false);
            $("#consignee_address").attr("readonly", false);
            $("#consignee_phone").attr("readonly", false);
            $("#consignee_shipper").attr("readonly", false);
            $("#notify_name").val("");
            $("#notify_name").attr("readonly", false);
            $("#notify_address").val("");
            $("#notify_address").attr("readonly", false);
            $("#notify_phone").val("");
            $("#notify_phone").attr("readonly", false);
            $("#Notify_City_Id").attr("readonly", false);
            $("#notify_state").val("");
            $("#notify_state").attr("readonly", false);
            $("#notify_shipper").val("");
            $("#notify_shipper").attr("readonly", false)
        }
    }
}

function set_value(e) {
    if ($("#" + e).is(":checked")) {
        $("#" + e).val("1")
    } else {
        $("#" + e).val("0")
    }
}

function delete_consignee(e, t) {
    if ($("#update_chk_default_" + e).attr("checked")) {
        alert("This is your permanent consignee, you cannot delete your permanent consignee!");
        return false
    } else {
        if (confirm("Are you sure you want to delete Consignee?")) {
            $.ajax({
                url: "/ajax/catalog/consignee_delete/",
                data: "customer_consignee_id=" + e,
                dataType: "text",
                type: "POST",
                beforeSend: function () {
                    $("#message").val("");
                    $("#snake").css("text-align", "left");
                    $("#snake").show()
                },
                success: function (e) {
                    $("#" + t).hide();
                    $("#snake").css("text-align", "left");
                    $("#snake").hide();
                    $("#message").hide();
                    $("#message1").show();
                    $("#message1").html("Consignee detail has been deleted successfully.")
                }
            })
        }
        return false
    }
}

function edit_consignee(e, t, a, b, c, d, f, g, h, i) {
    $("#row_" + e).hide("fast");
    $("#" + t).show("fast");
    get_city(a, b, c, d);
    get_city(f, g, h, i);
    $("#edit_consignee_" + e).hide();
    $("#delete_consignee_" + e).hide()
}

function edit_cancel(e, t) {
    $("#row_" + e).show("fast");
    $("#" + t).hide("fast");
    $("#show_get_city").hide();
    $("#edit_consignee_" + e).show();
    $("#delete_consignee_" + e).show()
}

function update_consignee(e) {
    var t = "";
    for (i = 0; i < document.forms["form_" + e].elements.length; i++) {
        t += "&" + document.forms["form_" + e].elements[i].name + "=" + document.forms["form_" + e].elements[i].value
    }
    var n;
    var r;
    var s;
    var o;
    var u;
    var a;
    n = $("#Update_City_Id_" + e).val();
    r = $("#Update_Notify_City_Id_" + e).val();
    s = $("#Update_Country_Id_" + e + " option:selected").text();
    o = $("#Update_City_Id_" + e + " option:selected").text();
    u = $("#Update_Notify_Country_Id_" + e + " option:selected").text();
    a = $("#Update_Notify_City_Id_" + e + " option:selected").text();
    $.ajax({
        url: "/ajax/catalog/consignee_update/",
        data: "customer_consignee_id=" + e + t + "&update_country_name=" + s + "&update_city_name=" + o + "&update_notify_country_name=" + u + "&update_notify_city_name=" + a + "&update_city_id=" + n + "&update_notify_city_id=" + r,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#message").val("");
            $("#snake").css("text-align", "right");
            $("#snake").show()
        },
        success: function(e) {
            $("#snake").css("text-align", "left");
            $("#snake").hide();
            $("#message").hide();
            $("#message1").hide();
            //$("#message1").html("Consignee has been successfully updated");
            alert("Consignee has been updated successfully.");
            window.location.href = window.location.href
        }
    })
}

function update_copy_values(e) {
    if ($("#update_chk_same_" + e).is(":checked")) {
        $("#update_notify_name_" + e).val($("#update_consignee_name_" + e).val());
        $("#update_notify_address_" + e).val($("#update_consignee_address_" + e).val());
        $("#update_notify_phone_" + e).val($("#update_consignee_phone_" + e).val());
        $("#Update_Notify_Country_Id_" + e).val($("#Update_Country_Id_" + e).val());
        get_city($("#Update_Country_Id_" + e).val(), $("#Update_City_Id_" + e).val(), "Update_Notify_City_Id_" + e, "td_Update_Notify_City_Id_" + e);
        $("#Update_Notify_City_Id_" + e).val($("#Update_City_Id_" + e).val());
        $("#update_notify_shipper_" + e).val($("#update_consignee_shipper_" + e).val());
    }
}

function update_copy_values_notify(e) {
    if ($("#update_chk_same_" + e).is(":checked")) {
        $("#update_consignee_name_" + e).val($("#update_notify_name_" + e).val());
        $("#update_consignee_address_" + e).val($("#update_notify_address_" + e).val());
        $("#update_consignee_phone_" + e).val($("#update_notify_phone_" + e).val());
        $("#update_consignee_shipper_" + e).val($("#update_notify_shipper_" + e).val()); 
    } 
}

function get_country_port(e, t) {
    $.ajax({
        url: "/ajax/catalog/get_country_ports/",
        data: "country=" + e + "&port_id=" + t,
        dataType: "text",
        type: "POST",
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#snake").hide();
            $("#div_port").html(e)
        }
    })
}

function purchase_get_country_charges(e, t, n, r, i, s) {
    $.ajax({
        url: "/ajax/catalog/get_country_charges/",
        data: "customer_currency_id=" + e + "&origin_country_id=" + t + "&target_country_id=" + n + "&m3=" + r + "&ship_type=" + i,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#snake").show()
        },
        success: function(e) {
            $("#snake").hide();
            var t = e.split("_");
            if (t[4] == 1) {
                $("#chk_inspection").attr("checked", "checked");
                $("#chk_inspection").attr("disabled", true)
            } else {
                $("#chk_inspection").attr("disabled", false);
            }
            if (t[5] == 1) {
                $("#chk_freight").attr("checked", "checked");
                $("#chk_freight").attr("disabled", true)
            } else {
                $("#chk_freight").attr("disabled", false)
            }
            if (s == "freight") {
                $("#txt_freight").val(t[0]);
                calculate_Price()
            }
            if (s == "chk_insurance") {
                $("#txt_insurance").val(t[1]);
                calculate_Price()
            }
            if (s == "chk_inspection") {
                if (n == 8) {
                    $("#txt_inspection").val(t[2] * 2);
                    calculate_Price()
                }
                else {
                    $("#txt_inspection").val(t[2]);
                    calculate_Price()
                }
            }
            if (s == "ship_type") {
                $("#txt_freight").val(t[0]);
                $("#txt_vanning").val(t[3]);
                calculate_Price()
            }
            if (s == "country_change") {
                $("#txt_freight").val(t[0]);
                $("#txt_insurance").val(t[1]);
                if (n == 8) { $("#txt_inspection").val(t[2] * 2); }
                else
                { $("#txt_inspection").val(t[2]); }
                $("#txt_vanning").val(t[3]);
                $("#shipment option[value='0']").attr("selected", "selected");
                $("#chk_insurance").attr("checked", "checked");
                calculate_Price()
            }
        }
    })
}

function my_implode_js(e, t) {
    var n = "";
    for (var r = 0; r < t.length; r++) {
        n += t[r];
        if (r != t.length - 1) {
            n += e
        }
    }
    return n
}

function change_value(e, t, n, r, i, s) {
    n = $("#Country_Id").val();
    if (s == "freight") {
        if ($("#chk_freight").is(":checked")) {
            purchase_get_country_charges(e, t, n, r, i, s)
        } else {
            $("#txt_freight").val("0.00");
            calculate_Price()
        }
    }
    if (s == "chk_insurance") {
        if ($("#chk_insurance").is(":checked")) {
            purchase_get_country_charges(e, t, n, r, i, s)
        } else {
            $("#txt_insurance").val("0.00");
            calculate_Price()
        }
    } else if (s == "chk_inspection") {
        if ($("#chk_inspection").is(":checked")) {
            purchase_get_country_charges(e, t, n, r, i, s)
        } else {
            $("#txt_inspection").val("0.00");
            calculate_Price()
        }
    } else if (s == "ship_type") {
        purchase_get_country_charges(e, t, n, r, i, s)
    } else if (s == "country_change") {
        purchase_get_country_charges(e, t, n, r, i, s)
    }
}

function calculate_Price() {
    $("#total").val(parseInt($("#fob").val() - $("#usedPoints").val()) + parseFloat($("#txt_freight").val()) + parseFloat($("#txt_insurance").val()) + parseFloat($("#txt_vanning").val()) + parseFloat($("#txt_inspection").val()))
}

function get_consignee(e) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (e == 0) {
        document.getElementById("consignee_name").value = "";
        document.getElementById("consignee_address").value = "";
        document.getElementById("consignee_phone").value = ""
    } else {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s = xmlhttp.responseText;
                customarray = s.split("_");
                document.getElementById("consignee_name").value = customarray[0];
                document.getElementById("consignee_address").value = customarray[1];
                document.getElementById("consignee_phone").value = customarray[2];
                document.getElementById("snake").style.display = "none"
            } else if (xmlhttp.readyState < 4) {
                document.getElementById("snake").style.display = "block"
            }
        };
        xmlhttp.open("POST", "/ajax/catalog/get_customer_consignee/" + e, true);
        xmlhttp.send()
    }
}

function negotiation_get_country_charges(e, t, n, r, i) {
    $.ajax({
        url: "/ajax/catalog/get_country_charges/",
        data: "customer_currency_id=" + e + "&origin_country_id=" + t + "&target_country_id=" + n + "&m3=" + r + "&ship_type=" + i,
        dataType: "text",
        type: "POST",
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#snake").hide();
            var t = e.split("_");
            if (category == "freight") {
                $("#txt_freight").val(t[0]);
                calculate_Price()
            }
            if (category == "chk_insurance") {
                $("#txt_insurance").val(t[1]);
                calculate_Price()
            }
            if (category == "chk_inspection") {
                $("#txt_inspection").val(t[2]);
                calculate_Price()
            }
            if (category == "ship_type") {
                $("#txt_freight").val(t[0]);
                $("#txt_vanning").val(t[3]);
                calculate_Price()
            }
            if (category == "country_change") {
                $("#txt_freight").val(t[0]);
                $("#txt_insurance").val(t[1]);
                $("#txt_inspection").val(t[2]);
                $("#txt_vanning").val(t[3]);
                $("#shipment option[value='0']").attr("selected", "selected");
                $("#chk_insurance").attr("checked", "checked");
                $("#chk_inspection").attr("checked", "checked");
                calculate_Price()
            }
        }
    })
}

function show_fields(category) 
{
    if (category == "payment_paypal_desc") {
        $("#payment_paypal_desc").show();
        $("#payment_cc_desc").hide();
        $("#payment_deposit_desc").hide();
        $("#deposit_remaining_amount_success").hide();
        $("#deposit_remaining_amount_failure").hide();
    }
    else if (category == "payment_deposit_desc") {
        $("#payment_deposit_desc").show();
        $("#payment_paypal_desc").hide();
        $("#payment_cc_desc").hide();
        $("#deposit_remaining_amount_success").hide();
        $("#deposit_remaining_amount_failure").hide();
    }
    else if (category == "payment_cc_desc") {
        $("#payment_cc_desc").show();
        $("#payment_paypal_desc").hide();
        $("#payment_deposit_desc").hide();
        $("#deposit_remaining_amount_success").hide();
        $("#deposit_remaining_amount_failure").hide();
    }
    else {
        $("#payment_paypal_desc").hide();
        $("#payment_cc_desc").hide();
        $("#payment_deposit_desc").hide();
        $("#deposit_remaining_amount_success").hide();
        $("#deposit_remaining_amount_failure").hide();
    }

}

function chkCheck(e, t, n) { var r = false; if (!document.forms[e]) return; for (i = 0; i < document.forms[e].elements.length; i++) { if (document.forms[e].elements[i].type == "checkbox") { if (document.forms[e].elements[i].checked == n) { r = true } } } if (!r) { alert("Please select at least one make") } else { return true } return false }

function checkEmAll(e, t) { CheckValue = document.getElementById(e).checked; if (!document.forms[t]) return; for (i = 0; i < document.forms[t].elements.length; i++) { if (document.forms[t].elements[i].type == "checkbox") { if (document.forms[t].elements[i].checked != CheckValue) { document.forms[t].elements[i].checked = CheckValue } } } return false }

function get_country_inspection_company(country_id, inspection_company_id) {
    $.ajax({
        url: "/ajax/catalog/get_country_inspection_company/",
        data: "country_id=" + country_id + "&inspection_company_id=" + inspection_company_id,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#snake").show();
        },
        success: function(msg) {
            $("#snake").hide();
            var a = msg.split("&");
            $("#div_inspection_company").html(a[0]);
            
            if (a[1] != null) {
                $("#div_inspection_company2").show();
                $("#div_inspection_company2").html(a[1]);
            }
            else {
                $("#div_inspection_company2").hide();
            }

        }
    })
}

function delete_page(page_id) 
{
    if (confirm("Are you sure you want to delete this Page?")) {
        $.ajax({
            url: "/ajax/seo/page_delete/",
            data: "page_id=" + page_id,
            dataType: "text",
            type: "POST",
            beforeSend: function() {
                $("#snake").show()
            },
            success: function(msg) {
                $("#snake").hide();
                window.location.href = window.location.href
            }
        })
    }
    return false
}

function edit_page(page_id,page_url) {

    $.ajax({
        url: "/ajax/seo/page_select/",
        data: "page_id=" + page_id + "&page_url=" + page_url,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#snake").show();
        },
        success: function(msg) {
            $("#snake").hide();
            var t = msg.split("+");
            $("#page_id").val(t[0]);
            $("#page_url").val(t[1]);
            $("#page_title").val(t[2]);
            $("#browser_title").val(t[3]);
            tinyMCE.activeEditor.setContent(t[4]);
            $("#file_name").show();
            $("#file_name").val(t[5]);
            $("#image_link_url").val(t[6]);
            $("#preferred_stock").val(t[7]);
            $("#preferred_sort").val(t[8]);
        }
    })

}

function get_country_criteria(country_id)
{
    var abc;

    $.ajax({
        url: "/ajax/emailtemplate/get_country_criteria",
        data: "country_id=" + country_id,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            //$("#snake").show()
        },
        success: function(msg) {
            get_country_stock(msg);
        }
    })

}

function get_country_stock(msg) {
    $.ajax({
        url: "/ajax/emailtemplate/get_country_stock",
        data: "msg=" + msg,
        dataType: "text",
        type: "POST",
        beforeSend: function() {
            $("#snake").html('<img src="' + base_url + 'images/snake.gif" />');
            $("#snake").show();
        },
        success: function(msg) {
            $("#snake").html('');
            $("#snake").hide();
            $("#Stock_Ids").val(msg);
        }
    })
}