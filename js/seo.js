function manage_activation(link_id) {
    alert(link_id);
}

function manage_activation(link_id) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            s = xmlhttp.responseText;
            customarray = s.split(",");
            document.getElementById("ajaxLoader1").style.display = 'none';

            if (customarray[3] != '')
            {
                document.getElementById("ed_" + link_id).src = customarray[3];
            }
        }
        else if (xmlhttp.readyState < 4) {
            document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp.open("POST", "/ajax/seo/manage_link_activation/" + link_id , true);
    xmlhttp.send();
}

function manage_child_activation(link_relation_id) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            s = xmlhttp.responseText;
            customarray = s.split(",");
            document.getElementById("ajaxLoader1").style.display = 'none';

            if (customarray[3] != '') {
                document.getElementById("ed_c_" + link_relation_id).src = customarray[3];
            }
        }
        else if (xmlhttp.readyState < 4) {
            document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp.open("POST", "/ajax/seo/manage_child_activation/" + link_relation_id, true);
    xmlhttp.send();
}

function manage_child_activation_level_2(link_relation_id) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            s = xmlhttp.responseText;
            customarray = s.split(",");
            document.getElementById("ajaxLoader1").style.display = 'none';

            if (customarray[3] != '') {
                document.getElementById("ed_c_" + link_relation_id).src = '../' +customarray[3];
            }
        }
        else if (xmlhttp.readyState < 4) {
            document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp.open("POST", "/ajax/seo/manage_child_activation/" + link_relation_id, true);
    xmlhttp.send();
}

function get_child_links(link_id) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("ajaxLoader1").style.display = 'none';
            document.getElementById("target_links").innerHTML = xmlhttp.responseText;
        }
        else if (xmlhttp.readyState < 4) {
        document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp.open("POST", "/ajax/seo/get_child_links/" + link_id, true);
    xmlhttp.send();
}

function get_description_section(link) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp2 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            document.getElementById("ajaxLoader1").style.display = 'none';
            document.getElementById("target_description").innerHTML = xmlhttp2.responseText;
        }
        else if (xmlhttp2.readyState < 4) {
        document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp2.open("POST", "/ajax/seo/get_description_section/" + link, true);
    xmlhttp2.send();
}

function manage_description_activation(desc_id) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            s = xmlhttp.responseText;
            customarray = s.split(",");
            document.getElementById("ajaxLoader1").style.display = 'none';

            if (customarray[3] != '') {
                document.getElementById("ed_desc_" + desc_id).src = '../' +customarray[3];
            }
        }
        else if (xmlhttp.readyState < 4) {
            document.getElementById("ajaxLoader1").style.display = 'block';
        }
    }
    xmlhttp.open("POST", "/ajax/seo/manage_description_activation/" + desc_id, true);
    xmlhttp.send();
}

function addTableRow(tableID) {

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "hidden";
    element1.id = "link_relation_id[]";
    element1.name = "link_relation_id[]";
    element1.value = "0";
    cell1.appendChild(element1);
    
    var element2 = document.createElement("input");
    element2.type = "text";
    element2.id = "target_link[]";
    element2.name = "target_link[]";
    element2.className = "searchMenu_350";
    cell1.appendChild(element2);

    var cell2 = row.insertCell(1);
    var element3 = document.createElement("input");
    element3.type = "text";
    element3.id = "link_label[]";
    element3.name = "link_label[]";
    element3.className = "searchMenu";
    cell2.appendChild(element3);

    var cell3 = row.insertCell(2);
    cell3.innerHTML += '<a href="javascript:void" onclick="deleteCurrentTableRow(this)"><img src="../../img/delete.png"></a>';
    cell3.setAttribute("align", "center");
}

function deleteCurrentTableRow(obj) {
        var delRow = obj.parentNode.parentNode;
        var tbl = delRow.parentNode.parentNode;
        var rIndex = delRow.sectionRowIndex;
        var rowArray = new Array(delRow);
        deleteRows(rowArray);
}

function deleteRows(rowObjArray) {
    for (var i = 0; i < rowObjArray.length; i++) {
        var rIndex = rowObjArray[i].sectionRowIndex;
        rowObjArray[i].parentNode.deleteRow(rIndex);
    }
}
