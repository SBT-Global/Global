function deleteRecord(path, record_id) {
    alert("test");
console.log("This is owais comment");
	if (confirm("Delete Selected Record?")) {
		$.ajax({
			url: base_url + path,
			data: "record_id=" + record_id,
			dataType: "text",
			type: "POST",
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (msg) {
				$("#snake").hide();
				if(msg == 1) {
					alert("Record Deleted Successfully");
					window.location.href = window.location.href
				} else if(msg == 2) {
					alert("Can not be deleted as it is used for an Active Record");
				} else if(msg == 3) {
					$('#tr' + record_id).hide('slow');
				} else {
					alert("Error in Deleting Record");
				}
			}
		})
	}
	return false
}
function setSort(colName, frmName) {
    var currColName = $('#sortField').val();
    var sortOrder = $('#sortOrder').val();

    if(colName == currColName) {
        if(sortOrder == 'DESC') {
            sortOrder = 'ASC';
        } else {
            sortOrder = 'DESC';
        }
    } else {
        sortOrder = 'DESC';
    }

    $('#sortField').val(colName);
    $('#sortOrder').val(sortOrder);
    $('#' + frmName).submit();

}

function setItemPerPage(value, frmName) {
    $('#itemsPerPage').val(value);
    $('#' + frmName).submit();
}

function editRecord(path, record_id, assign_emp_id) {
	if (confirm("Assign Enquiry to Selected Employee?")) {
		$.ajax({
			url: base_url + path,
			data: "record_id=" + record_id + "&assign_emp_id=" + assign_emp_id,
			dataType: "text",
			type: "POST",
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (msg) {
				$("#snake").hide();
				if(msg == 1) {
					alert("Enquiry Assigned Successfully !!");
					window.location.href = window.location.href
				}
				else {
					alert("Error in Assigning Enquiry, Try Again !!");
				}
			}
		})
	}
	return false
}

function updateRecord(path, record_id, bid_price_buyer, sold_price, bid_remarks, bid_comment, should_we_buy) {
	$.ajax({
		url: base_url + path,
		data: "record_id=" + record_id + "&bid_price_buyer=" + bid_price_buyer + "&sold_price=" + sold_price + "&bid_remarks=" + bid_remarks + "&bid_comment=" + bid_comment + "&should_we_buy=" + should_we_buy,
		dataType: "text",
		type: "POST",
		success: function (msg) {
			if(msg == 1) {
				alert("Record Saved Successfully");
			} else {
				alert("Error, Please Try Again");
			}
		}
	})
	return false
}

function showModels(makeID) {
	var ajax_url = "home/getModels/" + makeID;
	
	$.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#ModelDiv").html(e);
            $("#snake").hide()
        }
    })	
}

function getAllVehicles(makeId, modelId, year, stockIds){
    $('#stockVehicles').html('');
    if(stockIds != ""){
        var ajax_url = 'ajax/getAllVehicles/'+ makeId + "/" + modelId + "/" + year + "/" +stockIds
    }else{
        var ajax_url = 'ajax/getAllVehicles/'+ makeId + "/" + modelId + "/" + year
    }
    if(makeId != "" && modelId != "" && year != ""){
        $.ajax({
            url: base_url +ajax_url,
            dataType: "text",
            type: "POST",
            success: function (result) {
                if(result) {
                    $('#stockVehicles').append(result)
                }else{

                }
            }
        })
    } else {
        alert("please select all the vehicle information to compare vehicle!")
    }

}
function getVehicleComparisonDetail(stockID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(stockID) {
        $.ajax({
            url: base_url + '/ajax/getVehicleComparisonDetail/'+stockID,
            dataType: "text",
            type: "POST",
            success: function (result) {
                if(result) {
                    $('#carDetail').append(result);
                    if($('.vehicleDiv').length > 2){
                        $('#AddAnotherCar').hide();
                    }else{
                        $('#AddAnotherCar').show();
                    }
                    $.fancybox.close();
                }
            }
        })
    }
}


function showVehicleModels(makeID, stockIds) {

    if(stockIds !=""){
        ajax_url = "ajax/getVehicleModels/" + makeID + "/" + stockIds;
    }else{
        var ajax_url = "ajax/getVehicleModels/" + makeID;
    }
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#ModelDiv").html(e);
            $("#snake").hide()
        }
    })
}

function showYears(fieldName,fieldID,yearFromID,yearToID) {
	var ajax_url = "home/getYears/" + fieldName + "/" + fieldID;
	
	$.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#Year").html(e);
			if(fieldName == 'model') {				
				$('#model').val(fieldID);
			}
			if(yearFromID != '') {
				$('#yearFrom').val(yearFromID);
			}
			if(yearToID != '') {
				$('#yearTo').val(yearToID);
			}
            $("#snake").hide()
        }
    })	
}

function showVehicleYears(fieldName,fieldID,stockIds) {

    if(stockIds != ""){
    var ajax_url = "ajax/getVehicleYears/" + fieldName + "/" + fieldID + "/" + stockIds;
    }else{
        var ajax_url = "ajax/getVehicleYears/" + fieldName + "/" + fieldID ;

    }
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#Year").html(e);
            if(fieldName == 'model') {
                $('#model').val(fieldID);
            }
            $("#snake").hide()
        }
    })
}
function listVehicleModels(makeID, stockIds) {

    if(stockIds !=""){
        ajax_url = "ajax/listVehicleModels/" + makeID + "/" + stockIds;
    }else{
        var ajax_url = "ajax/listVehicleModels/" + makeID;
    }
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
console.log("This is owais comment");
            if(e) {
                $("#showModelDiv").show()
                $("#ModelDiv").html(e);
            }else{
                $("#showModelDiv").hide()
            }
            $("#snake").hide()
        }
    })
}
function listVehicleYears(fieldName,fieldID,stockIds) {

    if(stockIds != ""){
        var ajax_url = "ajax/listVehicleYears/" + fieldName + "/" + fieldID + "/" + stockIds;
    }else{
        var ajax_url = "ajax/listVehicleYears/" + fieldName + "/" + fieldID ;

    }
    $.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            if(e) {
                $("#showYearDiv").show();
                $("#Year").html(e);
            }
            else{
                $("#showYearDiv").hide();
            }
            if(fieldName == 'model') {
                $('#model').val(fieldID);
            }
            $("#snake").hide()
        }
    })
}

function setSort(colName, frmName) {	
	var currColName = $('#sortField').val();
	var sortOrder = $('#sortOrder').val();
	
	if(colName == currColName) {
		if(sortOrder == 'DESC') {
			sortOrder = 'ASC';
		} else {
			sortOrder = 'DESC';
		}
	} else {
		sortOrder = 'DESC';
	}
	
	$('#sortField').val(colName);
	$('#sortOrder').val(sortOrder);
	$('#' + frmName).submit();
}

function setItemPerPage(value, frmName) {
	$('#itemsPerPage').val(value);
	$('#' + frmName).submit();
}

function getCountryFreight(countryID,fobDollar,fobPound, stockStatusId, stockVatStatus) {
	var ajax_url = "stock/getCountryFreight/" + countryID + "/" + fobDollar + "/" + fobPound + "/" + stockStatusId + "/" + stockVatStatus;
	
	$.ajax({
        type: "POST",
        dataType: "text",
        url: base_url + ajax_url,
        beforeSend: function () {
            $("#snake").show()
        },
        success: function (e) {
            $("#CountryFreight").html(e);
            $("#snake").hide()
        }
    })	
}

function actionChkAll(strChkID, strChkIdentifier) {
	if($('.' + strChkIdentifier + ':checked').length == $('.' + strChkIdentifier + '').length) {
		$('#' + strChkID).prop('checked', true);
	} else {
		$('#' + strChkID).prop('checked', false);
	}
}

function getCountryPort(countryID) {

	if(countryID > 0) {
		var ajax_url = "stock/getCountryPort/" + countryID;
		
		$.ajax({
			type: "POST",
			dataType: "text",
			url: base_url + ajax_url,
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (e) {
				$("#destinationportDiv").html(e);
				$("#snake").hide()
			}
		})
	}
}

function assignBalance(assignBalanceFrom, assignBalanceTo, balanceAmount, balanceAssignedAmount) {

	if(assignBalanceTo > 0) {
		var ajax_url = "/backend/assignBalance/" + assignBalanceFrom + "/" + assignBalanceTo + "/" + balanceAmount + "/" + balanceAssignedAmount;
		
		$.ajax({
			type: "POST",
			dataType: "text",
			url: base_url + ajax_url,
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (e) {
				$("#snake").hide()
				alert(e);
				window.location.href = window.location.href
			}
		})
	} else {
		alert('Input correct record number to assign balance!');
	}
}

function assignRecord(remittanceID, recordAmount, arrRecordID, arrRemittanceAmount) {
	
	var sumRemittanceAmount = 0;

	for (var i = 0; i < arrRecordID.length; i++) {
		var xyz = arrRemittanceAmount[i];
		var sumRemittanceAmount = +sumRemittanceAmount + +xyz.value;
	}	

	if(sumRemittanceAmount <= recordAmount)
	{
		for (var i = 0; i < arrRecordID.length; i++) {
			var abc	= arrRecordID[i];
			var recordID = abc.value;	
			
			var xyz = arrRemittanceAmount[i];
			var remittanceAmount = xyz.value;
			
			if(sumRemittanceAmount == recordAmount) {
				var remittanceBalanceRemained = 0;
			} else {
				var remittanceBalanceRemained = 1;
			}
			
			var ajax_url = "/backend/assignRecord/" + remittanceID + "/" + recordID + "/" + remittanceAmount + "/" + remittanceBalanceRemained;
	
			$.ajax({
				type: "POST",
				dataType: "text",
				url: base_url + ajax_url,
				beforeSend: function () {
					$("#snake").show()
				},
				success: function (e) {
					$("#snake").hide()
					alert(e);
					window.location.href = window.location.href
				}
			})
		}	
		
	} else {
		alert("Entered amount to assign to sales record exceeded remittance amount, Input correct amount !!");
	}
}

function updateRemittanceInfo(recordID, remittanceInfo) {

	if(remittanceInfo != '') {
		var ajax_url = "/backend/assignRecord/" + recordID + "/" + remittanceInfo;
		
		$.ajax({
			type: "POST",
			dataType: "text",
			url: base_url + ajax_url,
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (e) {
				$("#snake").hide()
				alert(e);
				window.location.href = window.location.href
			}
		})
	} else {
		alert('Input Remittance Information!');
	}
}

function cancelDeal(recordID)
{
	if(recordID > 0) {
		var ajax_url = "/backend/cancelDeal/" + recordID;
		
		$.ajax({
			type: "POST",
			dataType: "text",
			url: base_url + ajax_url,
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (e) {
				$("#snake").hide()
				alert(e);
				window.location.href = window.location.href
			}
		})
	} else {
		alert('Input correct record number to cancel deal!');
	}
}

function revertRemittance(remittanceID, recordID, remittanceNumber, balanceRemittanceAmount, remittanceAssignID, totalPayment)
{
	if(recordID > 0) {
		var ajax_url = "/backend/revertRemittance/" + remittanceID + "/" + recordID + "/" + remittanceNumber + "/" + balanceRemittanceAmount + "/" + remittanceAssignID + "/" + totalPayment;
		
		$.ajax({
			type: "POST",
			dataType: "text",
			url: base_url + ajax_url,
			beforeSend: function () {
				$("#snake").show()
			},
			success: function (e) {
				$("#snake").hide()
				alert(e);
				window.location.href = window.location.href
			}
		})
	} else {
		alert('Input correct remittance id to revert remittance!');
	}
}

function getCookie(cname) {
console.log("This is owais comment");
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

$( document ).ready(function() {
	$('form').submit(function() {
		
		var btnClicked = $("input[type=submit][clicked=true]");		
		var btnVal = btnClicked.val();
		
	  	btnClicked.css('background-color', '#B8BEC0');
	  	btnClicked.val('Processing ....');
	  	btnClicked.prop('disabled',true);
		
		setTimeout(function(){
	  		btnClicked.css('background-color', '');
	  		btnClicked.val(btnVal);
			btnClicked.prop('disabled', false);
		}, 5000);
		
	});
	
	$("form input[type=submit]").click(function() {
		$("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
		$(this).attr("clicked", "true");
	});

});

function populateLocation(elmID, locID, locType) {

    var strPath = window.location.pathname;
    strPath = 'ajax';

    $('#tdlocation').html("");
    if(locID) {
        $.ajax({
            url: base_url + "/" + strPath + "/populateLocations/" + elmID + "/" + locID + "/" + locType,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                if(locType == 2) {
                    $('#Country').remove();
                }
                $('#City').remove();
                $('#' + elmID).append(msg);
            }
        })
    } else {
        $('#City').remove();
    }
}

function populateLocationWithCity(elmID, locID, locType, citySelect) {

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(locID) {
        $.ajax({
            url: base_url + "/" + strPath + "/populateLocations/" + elmID + "/" + locID + "/" + locType,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                if(locType == 2) {
                    $('#Country').remove();
                }
                $('#City').remove();
                $('#' + elmID).append(msg);
                if(parseInt(citySelect) > 0) {
                    $('#City').val(citySelect);
                }
            }
        })
    } else {
        $('#City').remove();
    }
}

function getCountryCode(countryID) {
    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(countryID) {
        $.ajax({
            url: base_url + '/ajax/getCountryCode/',
            data: "country_id=" + countryID,
            dataType: "text",
            type: "POST",
            success: function (result) {
                if(result) {
                    $('#countryCode').html(result)
                }
            }
        })
    } else {
        $('#countryCode').remove();
    }
}

function getCustomerDetailsForInvoice(invoiceID, customerID, invoiceType){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(customerID) {
        $('#customerInvoiceDetails').html("");
        $.ajax({
            url: base_url + '/ajax/getCustomerDetailsForInvoice/'+invoiceID + "/" + customerID,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('#customerInvoiceDetails').html(result)
                }
            }
        })
    } else {
        $('#customerInvoiceDetails').html('')
    }
}

function getCustomerDetailsForAuctionInvoice(invoiceID, customerID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(customerID) {
        $('#customerInvoiceDetails').html("");
        $.ajax({
            url: base_url + '/ajax/getCustomerDetailsForAuctionInvoice/'+invoiceID + "/" + customerID,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('#customerInvoiceDetails').html(result)
                }
            }
        })
    } else {
        $('#customerInvoiceDetails').html('')
    }
}

function getInvoiceStockDetail(stockID, dataId, payment, invoiceIssueDate, customerCode) {

    var strPath = window.location.pathname;
    strPath = 'ajax';
    $(".stockDetail[data-id=" + dataId + "]").find(".stockImage").removeAttr("src");
    $(".stockDetail[data-id=" + dataId + "]").find('.make').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.modelColor').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.chassisNo').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.fuelType').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.firstReg').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.fob').text('')
    $(".stockDetail[data-id=" + dataId + "]").find('.totalAmount').text('');
    $(".stockDetail[data-id=" + dataId + "]").find('.remainingBalance').text('');
    $(".stockDetail[data-id=" + dataId + "]").find('.receivedAmount').text('');
    $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').val('');
    $(".stockDetail[data-id=" + dataId + "]").find('.inspection').val('');
    $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').val('');
    $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').prop('disabled', false);
    $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').prop('disabled', false);
    //$('.isFreight').prop('checked', false)
    //$('.isInspection').prop('checked', false)
    $('.isFreight').prop('disabled', false)
    $('.isInspection').prop('disabled', false)
    $(".grandTotal").text('');

    if(stockID) {

        $.ajax({
            url: base_url + '/ajax/getInvoiceStockDetail/'+stockID,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if (result) {
                    var stockArray = JSON.parse(result);

                    if (stockArray) {
                        remainingAmount = "";

                        var colorName = stockArray['color_name']
                        var firstReg = stockArray['reg_month'] + " " + stockArray['reg_year']
                        var freightValue = $(".stockDetail[data-id=" + dataId + "]").find('.freight').val()
                        var inspectionValue = $(".stockDetail[data-id=" + dataId + "]").find('.inspection').val()
                        var discountValue = $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').val()
                        var otherChargesValue = $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').val()

                        if (freightValue == "" || freightValue == undefined) {freightValue = 0}
                        if (inspectionValue == "" || inspectionValue == undefined) {inspectionValue = 0}
                        if (discountValue == "" || discountValue == undefined) {discountValue = 0}
                        if (otherChargesValue == "" || otherChargesValue == undefined) {otherChargesValue = 0}

                        $(".stockDetail[data-id=" + dataId + "]").find(".stockImage").attr("src", base_url + "/stock_images/" + stockID + "/f.jpg");
                        $(".stockDetail[data-id=" + dataId + "]").find('.make').text(ucfirst(stockArray['make_name'].toLowerCase() + " "+ ucfirst(stockArray['stock_name'].toLowerCase())))
                        $(".stockDetail[data-id=" + dataId + "]").find('.modelColor').text(ucfirst(colorName.toLowerCase()))
                        $(".stockDetail[data-id=" + dataId + "]").find('.chassis_no').text(stockArray['stock_chassis_number'])
                        $(".stockDetail[data-id=" + dataId + "]").find('.fuelType').text(stockArray['fuel_type_name'])
                        $(".stockDetail[data-id=" + dataId + "]").find('.firstReg').text(firstReg)
                        //$(".stockDetail[data-id=" + dataId + "]").find('.fob').text(parseInt(stockArray['stock_fob_price']))
                        //$(".stockDetail[data-id=" + dataId + "]").find('.fob').val(parseInt(stockArray['stock_fob_price']))
                        if (stockArray['total_amount_received']) {
                            $(".stockDetail[data-id=" + dataId + "]").find('.receivedAmount').text(parseInt(stockArray['total_amount_received']))
                        }
                        if (stockArray['invoice_stock_details']) {
                            if (parseInt(stockArray['invoice_stock_details']['remaining_amount']) > 0) {
                                remainingAmount = parseInt(stockArray['invoice_stock_details']['remaining_amount'])
                                $('.isFreight').prop('disabled', 'disabled');
                                $('.isInspection').prop('disabled', 'disabled');
                                $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').prop('disabled', 'disabled');
                                $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').prop('disabled', 'disabled');
                                $(".stockDetail[data-id=" + dataId + "]").find('.freight').val(stockArray['invoice_stock_details']['freight']);
                                $(".stockDetail[data-id=" + dataId + "]").find('.inspection').val(stockArray['invoice_stock_details']['inspection']);
                                $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').val(stockArray['invoice_stock_details']['discount']);
                                $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').val(stockArray['invoice_stock_details']['other_charges']);

                                if(stockArray['invoice_stock_details']['freight'] > 0){
                                    $('.isFreight').prop('checked', true)
                                }
                                if(stockArray['invoice_stock_details']['inspection'] > 0){
                                    $('.isInspection').prop('checked', true)
                                }
                                //$(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').attr('disabled', true);
                                //$(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').attr('disabled', true);
                                $(".stockDetail[data-id=" + dataId + "]").find('.remainingBalance').text(remainingAmount)
                                //$(".stockDetail[data-id=" + dataId + "]").find('.totalAmount').text(parseInt(stockArray['invoice_stock_details']['total_amount']))


                            } else {
                                if(stockArray['invoice_stock_details']['customerCode'] == customerCode.toUpperCase()) {
                                    if (stockArray['invoice_stock_details']['freight'] > 0) {
                                        $('.isFreight').prop('checked', true)
                                        $('.isFreight').prop('disabled', 'disabled')
                                        $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').val(stockArray['invoice_stock_details']['discount']);
                                        $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').val(stockArray['invoice_stock_details']['other_charges']);
                                        $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').prop('disabled', 'disabled');
                                        $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').prop('disabled', 'disabled');
                                    }
                                    if (stockArray['invoice_stock_details']['inspection'] > 0) {
                                        $('.isInspection').prop('checked', true)
                                        $('.isInspection').prop('disabled', 'disabled')
                                        $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').val(stockArray['invoice_stock_details']['discount']);
                                        $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').val(stockArray['invoice_stock_details']['other_charges']);
                                        $(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').prop('disabled', 'disabled');
                                        $(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').prop('disabled', 'disabled');
                                    }
                                }
                                //$(".stockDetail[data-id=" + dataId + "]").find('.freight').attr('disabled', false);
                                //$(".stockDetail[data-id=" + dataId + "]").find('.inspection').attr('disabled', false);
                                //$(".stockDetail[data-id=" + dataId + "]").find('.stockDiscount').attr('disabled', false);
                                //$(".stockDetail[data-id=" + dataId + "]").find('.otherCharges').attr('disabled', false);
                                //$(".stockDetail[data-id=" + dataId + "]").find('.totalAmount').text(parseInt(parseInt(stockArray['stock_fob_price']) + parseInt(freightValue) + parseInt(inspectionValue) + parseInt(otherChargesValue)) - parseInt(discountValue))
                            }
                        } else {

                            //$(".stockDetail[data-id=" + dataId + "]").find('.totalAmount').text(parseInt(parseInt(stockArray['stock_fob_price']) + parseInt(freightValue) + parseInt(inspectionValue) + parseInt(otherChargesValue)) - parseInt(discountValue))
                        }
                        if(stockArray['issueDate'] && !stockArray['invoice_stock_details']['customerCode']){
                            invoiceIssueDate = stockArray['issueDate'];
                        }

                        //setPartialPayment($(".stockDetail[data-id=" + dataId + "]").find('.paymentTerm').val(), dataId);
                        getCountryPortFreight($('#accountDetails').val(),$('#shipVia').val(), $('#Country').val(), $('#portOfDischarge').val(), stockArray['body_type_id'],stockArray['stock_fob_price'], dataId, invoiceIssueDate );
                    }

                    var grandTotal;
                    $(".paymentTermAmount").each(function () {
                        var value;
                        if (grandTotal == "" || grandTotal == undefined) {
                            grandTotal = 0;
                        }
                        if ($(this).text().trim() == "" || $(this).text().trim() == undefined) {
                            value = 0;
                        } else {
                            value = $(this).text().trim()
                        }
                        grandTotal = parseInt(value) + parseInt(grandTotal);
                    });

                    $(".grandTotal").text(grandTotal);

                }
            }
        });
    }
}

function saveCustomerInvoice(invoiceID, customerCode,invoiceNum, arrStock, shipVia, country, accountManager, portOfLoading, portOfDischarge, arrFreight, arrInspection, arrDiscount, arrOther, arrTotalAmount, arrPaymentTerm, arrTotalPaymentTermAmount, grandTotal, invoiceIssueDate, invoiceDueDate, accDetails, consigneeName, consigneeAddress, consigneePhone, paymentTerm , isFreight, isInspection){

    if (confirm("Are you sure you want to save this invoice?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveCustomerInvoice',
            data: "invoiceID=" + invoiceID + "&customerCode=" + customerCode + "&invoiceNum=" + invoiceNum + "&arrStock=" + arrStock + "&shipVia=" + shipVia + "&country=" + country + "&accountManager=" + accountManager + "&portOfLoading=" + portOfLoading + "&portOfDischarge=" + portOfDischarge + "&arrFreight=" + arrFreight + "&arrInspection=" + arrInspection + "&arrDiscount=" + arrDiscount + "&arrOther=" + arrOther + "&arrTotalAmount=" + arrTotalAmount +  "&arrPaymentTerm=" + arrPaymentTerm + "&arrTotalPaymentTermAmount=" + arrTotalPaymentTermAmount + "&grandTotal=" + grandTotal + "&invoiceIssueDate=" + invoiceIssueDate + "&invoiceDueDate=" + invoiceDueDate + "&accDetails=" + accDetails + "&consigneeName=" + consigneeName + "&consigneeAddress=" + consigneeAddress + "&consigneePhone=" + consigneePhone + "&paymentTerm=" + paymentTerm + "&isFreight=" + isFreight + "&isInspection=" + isInspection,
            dataType: "text",
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Invoice Saved Successfully");
                        window.location.href = base_url + "/backend/save_invoice/"+msg
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}

function saveCustomerInvoiceManual(invoiceID, customerCode, arrStock, shipVia, country, accountManager, portOfLoading, portOfDischarge, arrManufacture, arrModelColor, arrChassisNo, arrFuelType, arrFirstReg, arrFob, arrFreight, arrInspection, arrDiscount, arrTotalAmount, grandTotal, invoiceDueDate, accDetails, consigneeName, consigneeAddress, consigneePhone ){
console.log("This is owais comment");
    if (confirm("Are you sure you want to save this invoice?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveCustomerInvoice',
            data: "invoiceID=" + invoiceID + "&customerCode=" + customerCode + "&arrStock=" + arrStock + "&shipVia=" + shipVia + "&country=" + country + "&accountManager=" + accountManager + "&portOfLoading=" + portOfLoading + "&portOfDischarge=" + portOfDischarge + "&arrFreight=" + arrFreight + "&arrInspection=" + arrInspection + "&arrDiscount=" + arrDiscount + "&arrTotalAmount=" + arrTotalAmount + "&grandTotal=" + grandTotal + "&invoiceDueDate=" + invoiceDueDate + "&accDetails=" + accDetails + "&consigneeName=" + consigneeName + "&consigneeAddress=" + consigneeAddress + "&consigneePhone=" + consigneePhone,
            dataType: "text",
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Invoice Saved Successfully");
                        window.location.href = base_url + "/backend/save_invoice/"+msg
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}

function updateCustomerAssigned( customerID, assignTo){
    if (confirm("Are you sure you want to assign customer?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateCustomerAssigned/' + customerID + "/" + assignTo,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                setTimeout(function () {
                if (msg == "") {
                    overlay.style.display = 'none';

                    alert("Customer assigned successfully");
                    window.location.href = window.location.href
                    }
                }, 200);
            }
        })
    }
}

function bulkCustomerAssigned(customerIDs, assignTo){

    if (confirm("Are you sure you want to assign customers in bulk?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/bulkCustomerAssigned',
            data: "customerIDs=" + customerIDs + "&assignTo=" + assignTo,
            dataType: "text",
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    if (msg == "") {
                        overlay.style.display = 'none';

                        alert("Customer assigned successfully");
                        window.location.href = window.location.href
                    }
                }, 200);
            }
        })
    }

}

function saveCustomerRemittance(invoiceID, invoiceNum, remittanceAmount, arrStock, arrAllocateAmount, arrTotalAmount, arrPaymentTerm, arrTotalPaymentTermAmount, grandTotal, invoiceIssueDate, invoiceDueDate, accDetails, consigneeName, consigneeAddress, consigneePhone, paymentTerm ){

    if (confirm("Are you sure you want to save this invoice?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveCustomerInvoice',
            data: "invoiceID=" + invoiceID + "&customerCode=" + customerCode + "&invoiceNum=" + invoiceNum + "&arrStock=" + arrStock + "&shipVia=" + shipVia + "&country=" + country + "&accountManager=" + accountManager + "&portOfLoading=" + portOfLoading + "&portOfDischarge=" + portOfDischarge + "&arrFreight=" + arrFreight + "&arrInspection=" + arrInspection + "&arrDiscount=" + arrDiscount + "&arrOther=" + arrOther + "&arrTotalAmount=" + arrTotalAmount +  "&arrPaymentTerm=" + arrPaymentTerm + "&arrTotalPaymentTermAmount=" + arrTotalPaymentTermAmount + "&grandTotal=" + grandTotal + "&invoiceIssueDate=" + invoiceIssueDate + "&invoiceDueDate=" + invoiceDueDate + "&accDetails=" + accDetails + "&consigneeName=" + consigneeName + "&consigneeAddress=" + consigneeAddress + "&consigneePhone=" + consigneePhone + "&paymentTerm=" + paymentTerm,
            dataType: "text",
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Invoice Saved Successfully");
                        window.location.href = base_url + "/backend/save_invoice/"+msg
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}

function ucfirst(str) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}

function getCountryPorts( countryID){
    $.ajax({
        url: base_url + '/ajax/getCountryPorts/' + countryID,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                $('#showCountryPorts').show()
                $('#showBodyType').show()
                $('.allCountryPorts').html(result)
            }else{
                $('#showCountryPorts').hide()
                $('#showBodyType').hide()
                $('.allCountryPorts').html("")
            }
        }
    })
}

function getRegionCountries(regionID){
    if(regionID) {
        $('#defaultCountries').hide()
        $.ajax({
            url: base_url + '/ajax/getRegionCountries/' + regionID,
            dataType: "text",
            type: "POST",
            success: function (result) {
                if (result != "") {
console.log("This is owais comment");
                    $('.showRegionCountries').show()
                    $('.showRegionCountryPorts').hide()
                    $('.regionCountries').html(result)
                } else {
                    $('.showRegionCountries').hide()
                    $('.showRegionCountryPorts').hide()
                    $('.regionCountries').html("")

                }
            }
        })
    }else{
        $('#defaultCountries').show()
        $('.showRegionCountries').hide()
    }
}

function getRegionCountryPorts(countryID){
    if(countryID) {
        $('#defaultPorts').hide()
        $.ajax({
            url: base_url + '/ajax/getRegionCountryPorts/' + countryID,
            dataType: "text",
            type: "POST",
            success: function (result) {
                if (result != "") {

                    $('.showRegionCountryPorts').show()
                    $('.showCountryPorts').show()
                    $('.regionCountryPorts').html(result)
                } else {

                    $('.regionCountryPorts').html("")
                    $('.showRegionCountryPorts').hide()
                    $('.showCountryPorts').hide()
                }
            }
        })
    }else{
        $('#defaultPorts').show()
        $('.showRegionCountryPorts').hide()
    }
}

function saveFreightHistory(){
    var baseCurrency = "GBP";
    $.ajax({
        url: 'https://api.fixer.io/latest?' + baseCurrency,
        dataType: "text",
        type: "POST",
        success: function (result) {
            var myJSON = JSON.stringify(result);
        }
    })
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function populateCountryDetails(countryID){

    $.ajax({
        url: base_url + '/ajax/populateCountryDetails/' + countryID,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                $('.showCountryDetails').html(result)
            }
        }
    })
}

function saveBuyingSourceDetails(arrFinal, bsdID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveBuyingSourceDetails',
            data: {bsdArray: arrFinal, bsdID: bsdID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Buying Source Detail already exist!");
                        } else if (msg == "Success") {
                            alert("Buying Source Detail added successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function updateBuyingSourceDetails(arrFinal, bsdID, concernPersonID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateBuyingSourceDetails',
            data: {bsdArray: arrFinal, bsdID: bsdID, concernPersonID: concernPersonID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Buying Source Detail already exist!");
                        } else if (msg == "Success") {
                            alert("Buying Source Detail updated successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function saveInspectionConcernPerson(arrFinal, insID){
    if (confirm("Are you sure you want to save record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveInspectionConcernPerson',
            data: {insArray: arrFinal, insID: insID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        }else if (msg == "Success") {
                            alert("Inspection Company Details save successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function updateInspectionConcernPerson(arrFinal, insID, concernPersonID){
    if (confirm("Are you sure you want to save record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateInspectionConcernPerson',
            data: {insArray: arrFinal, insID: insID, concernPersonID: concernPersonID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "Success") {
                            alert("Inspection Company Details updated successfully!");
                            window.location.href = window.location.href
                        }
console.log("This is owais comment");
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function saveInsuranceConcernPerson(arrFinal, insuranceID){
    if (confirm("Are you sure you want to save record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveInsuranceConcernPerson',
            data: {insArray: arrFinal, insID: insuranceID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        }else if (msg == "Success") {
                            alert("Insurance Company Details save successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function updateInsuranceConcernPerson(arrFinal, insuranceID, concernPersonID){
    if (confirm("Are you sure you want to save record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateInsuranceConcernPerson',
            data: {insArray: arrFinal, insID: insuranceID, concernPersonID: concernPersonID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "Success") {
                            alert("Insurance Company Details updated successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function isValidPhone(inputtxt)
{
    var phoneno = /[0-9-()]*[1-9][0-9-()]*/
    if((inputtxt.match(phoneno)) || inputtxt == "")
    {
        return true;
    }
    else
    {
        alert("Phone number is not valid!");
        return false;
    }
}

function isValidEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email) && email != "") {
        alert('Please provide a valid email address');
        return false;
    }else{
        return true;
    }
}

function updateYardConcernPerson(arrFinal, yardID, concernPersonID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateYardConcernPerson',
            data: {yardArray: arrFinal, yardID: yardID, concernPersonID: concernPersonID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Yard Details already exist!");
                        } else if (msg == "Success") {
                            alert("Yard Details updated successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function saveYardConcernPerson(arrFinal, yardID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveYardConcernPerson',
            data: {yardArray: arrFinal, yardID: yardID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Yard Details already exist!");
                        } else if (msg == "Success") {
                            alert("Yard Details added successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function getShippingVessels(shippingCompanyID){
    $('.vesselDetails').html('')
    $.ajax({
        url: base_url + '/ajax/getShippingVessels/' + shippingCompanyID,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                $('.showVesselDetails').show();
                $('.vesselDetails').html(result)
            }else{
                $('.showVesselDetails').hide();
            }
        }
    })
}

function updateShippingConcernPerson(arrFinal, shippingCompanyID, concernPersonID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/updateShippingConcernPerson',
            data: {shippingCompanyArray: arrFinal, shippingCompanyID: shippingCompanyID, concernPersonID: concernPersonID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Shipping Company Detail already exist!");
                        } else if (msg == "Success") {
                            alert("Shipping Company updated successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function saveShippingConcernPerson(arrFinal, shippingCompanyID){
    if (confirm("Are you sure you want to update record?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveShippingConcernPerson',
            data: {shippingCompanyArray: arrFinal, shippingCompanyID: shippingCompanyID},
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if (msg == "0") {
                            alert("Concern person already exist!");
                        } else if (msg == "1") {
                            alert("Shipping Company Detail already exist!");
                        } else if (msg == "Success") {
                            alert("Shipping Company Detail added successfully!");
                            window.location.href = window.location.href
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
}

function getBuyingSourceDetail(buyingSourceID){
    $('.buyingSourceDetails').html('')
    $.ajax({
        url: base_url + '/ajax/getBuyingSourceDetail/' + buyingSourceID,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                $('.showBuyingSourceDetails').show();
                $('.buyingSourceDetails').html(result)
            }else{
                $('.showBuyingSourceDetails').hide();
            }
        }
    })
}

function getCountryPortFreight(currency, shipmentTypeID, countryID, countryPortID, bodyTypeID, FOBPrice, dataID, invoiceIssueDate){
    //$(".stockDetail[data-id=" + dataID + "]").find('.freight').val('')
    //$(".stockDetail[data-id=" + dataID + "]").find('.inspection').val('')
    $.ajax({
        url: base_url + '/ajax/getCountryPortFreight/' + currency + '/' + shipmentTypeID + '/' +countryID + '/' + countryPortID + '/' + bodyTypeID + '/' + FOBPrice + '/' + invoiceIssueDate,
        dataType: "text",
        type: "POST",
        success: function (result) {
            var arrCost = JSON.parse(result);
            if(arrCost) {

                freght = $(".stockDetail[data-id=" + dataID + "]").find('.freight').val()
                insp = $(".stockDetail[data-id=" + dataID + "]").find('.inspection').val()
                $(".stockDetail[data-id=" + dataID + "]").find('.fob').text(arrCost['FOBPrice'])
                if ($('input.isFreight').is(':checked')) {
                    $(".stockDetail[data-id=" + dataID + "]").find('.freight').val(arrCost['freightCost'])
                }else{
                    $('.freight').val(0)
                }
                if ($('input.isInspection').is(':checked')) {
                    $(".stockDetail[data-id=" + dataID + "]").find('.inspection').val(arrCost['inspectionCost'])
                }else{
                    $('.inspection').val(0)
                }

                //$(".stockDetail[data-id=" + dataID + "]").find('.freight').trigger('change');
                receivedAmount = $(".stockDetail[data-id=" + dataID + "]").find('.receivedAmount').text();

                if(receivedAmount == "" || receivedAmount == "0" ){

                    freight = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.freight').val())
                    inspection = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.inspection').val())
                    charges = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.otherCharges').val())
                    discount = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.stockDiscount').val())
                    if(!charges){charges = 0}
                    if(!discount){discount = 0}

                    $(".stockDetail[data-id=" + dataID + "]").find('.totalAmount').text((parseInt(arrCost['FOBPrice']) + freight + inspection + charges) - discount )
                    setPartialPayment($(".stockDetail[data-id=" + dataID + "]").find('.paymentTerm').val(), dataID)
                    //$(".stockDetail[data-id=" + dataID + "]").find('.remainingBalance').text($(".stockDetail[data-id=" + dataID + "]").find('.totalAmount').text())
                }else{

                    freight = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.freight').val())
                    inspection = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.inspection').val())
                    charges = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.otherCharges').val())
                    discount = parseInt($(".stockDetail[data-id=" + dataID + "]").find('.stockDiscount').val())
                    if(!charges){charges = 0}
                    if(!discount){discount = 0}

                    $(".stockDetail[data-id=" + dataID + "]").find('.totalAmount').text((parseInt(arrCost['FOBPrice']) + freight + inspection + charges) - discount )
                    //$(".stockDetail[data-id=" + dataID + "]").find('.remainingBalance').text(parseInt($(".stockDetail[data-id=" + dataID + "]").find('.totalAmount').text()) - parseInt($(".stockDetail[data-id=" + dataID + "]").find('.receivedAmount').text()))
                }

            }
            else {
                $(".stockDetail[data-id=" + dataID + "]").find('.freight').val('')
                $(".stockDetail[data-id=" + dataID + "]").find('.inspection').val('')
            }
        }
    })
}


function getCustomerRemittances(customerRemittanceID, invoiceID){
    $('.customerRemittanceDetail').html('')
    $.ajax({
            url: base_url + '/ajax/getCustomerRemittances/' + customerRemittanceID + "/" + invoiceID,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                if(result == "-1"){
                    alert("Invoice does not exist in the selected remittance!");
                    $('.customerRemittanceDetail').hide();
                    $('#remittanceAmount').val('');
                }else {
                    $('.customerRemittanceDetail').show();
                    $('.customerRemittanceDetail').html(result)
                }
            }else{
                $('.customerRemittanceDetail').hide();
            }
        }
    })
}

function getStockChargesDetail(stockID, isEdit){
    $('.stockChargesTypeDetail').html('')
    $.ajax({
        url: base_url + '/ajax/getStockChargesDetail/' + stockID + "/" +isEdit,
        dataType: "text",
        type: "POST",
        success: function (result) {
            if(result != "") {
                $('.stockChargesTypeDetail').show();
                $('.stockChargesTypeDetail').html(result)
            }else{
                $('.stockChargesTypeDetail').hide();
            }
        }
    })
}

function getCustomerAuctionInvoices(customerID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(customerID) {
        $('.auctionInvoices').html("");
        $.ajax({
            url: base_url + '/ajax/getCustomerAuctionInvoices/'+ customerID ,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('.auctionInvoices').html(result)
                }
            }
        })
    } else {
        $('.auctionInvoices').html('')
    }
}

function getAuctionInvoiceAmount(auctionInvoiceNo){
    $('.auctionInvoice').on('keyup blur change', function() {
        console.log("Dd");

    })
    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(customerID) {
        $('.auctionInvoiceAmount').html("");
        $.ajax({
            url: base_url + '/ajax/getAuctionInvoiceAmount/'+ auctionInvoiceNo ,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('.auctionInvoiceAmount').html(result)
                }
            }
        })
    } else {
        $('.auctionInvoiceAmount').html('')
    }
}

function saveCustomerAuctionInvoice(auctionStockInvoiceID, auctionInvoiceID, customerCode,invoiceNum, arrStock, shipVia, country, accountManager, portOfLoading, portOfDischarge, arrFreight, arrInspection, arrDiscount, arrOther, arrTotalAmount, arrPaymentTerm, arrTotalPaymentTermAmount, grandTotal, invoiceIssueDate, invoiceDueDate, accDetails, consigneeName, consigneeAddress, consigneePhone, paymentTerm ){

    if (confirm("Are you sure you want to save this invoice?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';
        $.ajax({
            url: base_url + '/ajax/saveCustomerAuctionInvoice',
            data: "invoiceID=" + auctionStockInvoiceID + "&auctionInvoiceID=" + auctionInvoiceID + "&customerCode=" + customerCode + "&invoiceNum=" + invoiceNum + "&arrStock=" + arrStock + "&shipVia=" + shipVia + "&country=" + country + "&accountManager=" + accountManager + "&portOfLoading=" + portOfLoading + "&portOfDischarge=" + portOfDischarge + "&arrFreight=" + arrFreight + "&arrInspection=" + arrInspection + "&arrDiscount=" + arrDiscount + "&arrOther=" + arrOther + "&arrTotalAmount=" + arrTotalAmount +  "&arrPaymentTerm=" + arrPaymentTerm + "&arrTotalPaymentTermAmount=" + arrTotalPaymentTermAmount + "&grandTotal=" + grandTotal + "&invoiceIssueDate=" + invoiceIssueDate + "&invoiceDueDate=" + invoiceDueDate + "&accDetails=" + accDetails + "&consigneeName=" + consigneeName + "&consigneeAddress=" + consigneeAddress + "&consigneePhone=" + consigneePhone + "&paymentTerm=" + paymentTerm,
            dataType: "text",
            type: "POST",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Invoice Saved Successfully");
                        window.location.href = base_url + "/backend/save_invoice/"+msg
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}

function getRemittanceType(remittanceTypeID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(remittanceTypeID) {
        $('.remittanceTypeInvoices').html("");
        $.ajax({
            url: base_url + '/ajax/getRemittanceType/'+ remittanceTypeID ,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('.remittanceTypeInvoices').html(result)
                }
            }
        })
    } else {
        $('.remittanceTypeInvoices').html('')
    }
}

function cancelCustomerInvoice(invoiceID){
    if (confirm("Are you sure you want to cancel this invoice?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';

        $.ajax({
            url: base_url + '/ajax/cancelCustomerInvoice/'+ invoiceID,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        if(msg == "-1"){
                            alert("Remittance already Allocated for this invoice, cannot be deleted!")
                        }else{
                        alert("Invoice Cancelled Successfully");
                        window.location.href = base_url + "/backend/list_invoice/"+msg
                        }
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false

}

function getScorecardSPWeightage(weightageID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(weightageID) {
        $('.weightageDetails').html("");
        $.ajax({
            url: base_url + '/ajax/getScorecardSPWeightage/'+ weightageID ,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('.weightageDetails').html(result)
                }
            }
        })
    } else {
        $('.weightageDetails').html('')
    }
}


function getScorecardSMWeightage(weightageID){

    var strPath = window.location.pathname;
    strPath = 'ajax';
    if(weightageID) {
        $('.weightageDetails').html("");
        $.ajax({
            url: base_url + '/ajax/getScorecardSMWeightage/'+ weightageID ,
            dataType: "text",
            type: "GET",
            success: function (result) {
                if(result) {
                    $('.weightageDetails').html(result)
                }
            }
        })
    } else {
        $('.weightageDetails').html('')
    }
}

function cancelCustomerRemittance(remittanceID){
    if (confirm("Are you sure you want to cancel this allocated remittance?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';

        $.ajax({
            url: base_url + '/ajax/cancelCustomerRemittance/'+ remittanceID,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Remittance Cancelled Successfully");
                        window.location.href = base_url + "/backend/list_remittance"
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}

function freeCustomerAssigned(customerID){
    if (confirm("Are you sure you want to Free this customer?")) {
        var overlay = document.getElementById('successOverlay');
        overlay.style.display = 'block';

        $.ajax({
            url: base_url + '/ajax/freeCustomerAssigned/'+ customerID,
            dataType: "text",
            type: "GET",
            success: function (msg) {
                setTimeout(function () {
                    overlay.style.display = 'none';
                    if (msg != "") {
                        alert("Customer is set to Free Successfully");
                        window.location.href = base_url + "/backend/customers"
                    } else {
                        alert("Error, Please Try Again");
                    }
                }, 200);
            }
        })
    }
    return false
}