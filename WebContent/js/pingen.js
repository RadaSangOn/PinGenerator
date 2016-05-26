function goHome() {
	window.location.replace(window.url_home);
}
function addSep(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
function addClass(ele,cls) {
    if (!hasClass(ele,cls)) {
    	ele.className = ele.className + ' ' + cls;
    }
}
function removeAllClasses(ele) {
	ele.className = '';
}
function isNumber(e) {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) { return true; }
    else { e.preventDefault(); return false; }	
}
function isAlpha(e) {
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) { return true; }
    else { e.preventDefault(); return false; }
}

function menuPinGenBatch() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pingen-batch.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuPinGenSpecific() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pingen-spec.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuPinGenVIP() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pingen-vip-4.html', function (res) {
		    InkElement.setHTML(container,res);
		    
			Ajax.load('SerialMapBatchNumber', function (res) {
				var results = res.split('|');
				Ink.i('batchNumberPrefix').value = results[0];
				Ink.i('batchNumber').value = results[1];
			});
			Ajax.load('PinGenVIP3SerialNumber', function (res) {
				var results = res.split('|');
	        	Ink.i('serialNumberPrefix').value = results[0];
	        	Ink.i('serialNumber').value = results[1];
			});
		});

	});
}

function menuPinCompare() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pin-compare.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuPinLoad() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pin-load.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuMapSerial() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('serial-map.html', function (res) {
		    InkElement.setHTML(container,res);
		});
		Ajax.load('SerialMapBatchNumber', function (res) {
			Ink.i('batchNumber').value = res;
		});
		Ajax.load('SerialMapPatternDropdown', function (res) {
	    	InkElement.setHTML(Ink.i('serialPattern'),res);
		});

	});
}

function menuMapSerial3() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('serial-map-3.html', function (res) {
		    InkElement.setHTML(container,res);
		    
			Ajax.load('SerialMapBatchNumber', function (res) {
				var results = res.split('|');
				Ink.i('batchNumberPrefix').value = results[0];
				Ink.i('batchNumber').value = results[1];
			});
			Ajax.load('SerialMapPatternDropdown', function (res) {
		    	InkElement.setHTML(Ink.i('serialPattern'),res);
				serialMapGetSerial();
			});
		});

	});
}

function menuPinExport() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pin-export.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuJobList() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.Net.JsonP_1'], function(Ajax,InkElement,JsonP) {
		var container = Ink.i('main-panel');
		Ajax.load('job-list.html', function (res) {
		    InkElement.setHTML(container,res);
	        var uri = window.url_home + '/JobList';
	        new Ajax(uri, {
	            method: 'GET',
	            onSuccess: function(obj) {
	                if(obj && obj.responseJSON) {
	                  	var json = obj.responseJSON;
	        			var joblist = Ink.i('joblist');
						for(var i=0, total=json.joblist.length; i < total; i++) {
							/*
							var joblistStatusColor = "joblist-processing";
							if (json.joblist[i].STATUS == 'S') {joblistStatusColor = "joblist-succeed"} 
							else if (json.joblist[i].STATUS == 'F') {joblistStatusColor = "joblist-failed"}
							var contents = '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job ID: '+json.joblist[i].JOBID;
							var contents = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job: "+json.joblist[i].JOBTYPE;
							contents += '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status: '+json.joblist[i].JOBSTATUS+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last updated: '+json.joblist[i].UPDATEDDATE;
							contents += '<br/>&nbsp;<br/>&nbsp;';
			        		InkElement.appendHTML(joblist,'<div class="joblist '+joblistStatusColor+'">'+contents+'</div>');
			        		*/
							if (json.joblist[i].STATUS == 'S') {joblistStatusColor = "success"} 
							else if (json.joblist[i].STATUS == 'F') {joblistStatusColor = "error"}
							else if (json.joblist[i].STATUS == 'P') {joblistStatusColor = "info"}
							else if (json.joblist[i].STATUS == 'I') {joblistStatusColor = "warning"}
			        		var contents = '<div class="ink-alert block '+joblistStatusColor+'">';
			        		contents += '<h4>JOB: '+json.joblist[i].JOBTYPE+'</h4><div class="push-right" style="margin-top:-2.5em;"><b>JOBID:&nbsp;</b>'+json.joblist[i].JOBID+'&nbsp;&nbsp;&nbsp;</div>';
			        	    if (json.joblist[i].STATUS == 'F') {
			        	    	contents += '<p><b>Status: </b>'+json.joblist[i].JOBSTATUS+' - '+json.joblist[i].DESC1+'</p>';
			        	    } else {
			        	    	contents += '<p><b>Status: </b>'+json.joblist[i].JOBSTATUS+'</p>';
			        	    }
			        	    contents += '<p><b>Last updated: </b>'+json.joblist[i].UPDATEDDATE+'</p>';
			        	    if (json.joblist[i].STATUS == 'S') {
			        	    	var resultLink = 'JobListResult';
			        	    	if(json.joblist[i].TYPE == 'PE'){resultLink = 'PinExportCSV';}
			        	    	else if (json.joblist[i].TYPE == 'SM') {resultLink = 'SerialMapCSV';}
			        	    	contents += '<a class="ink-button blue push-right" style="margin-top:-3em;margin-right:1em;" href="'+window.url_home + '/'+resultLink+'?jobId='+json.joblist[i].JOBID+'">Result</a>';
			        	    }
			        	    InkElement.appendHTML(joblist,contents);
			        		/**
						    var contents = '<tr>';
						    contents += '<td>'+json.joblist[i].JOBTYPE+'</td>';
						    contents += '<td class="align-center">'+json.joblist[i].JOBSTATUS+'</td>';
						    contents += '<td class="align-center">'+json.joblist[i].UPDATEDDATE+'</td>';
						    contents += '<td class="align-center"></td>';
						    contents += '</tr>';
						    //InkElement.appendHTML(jobList,contents);
						    
						    var row = table.insertRow(table.rows.length);
						    var cell1 = row.insertCell(0);
						    var cell2 = row.insertCell(1);					    
						    var cell3 = row.insertCell(2);
						    var cell4 = row.insertCell(3);
						    cell1.innerHTML = json.joblist[i].JOBTYPE;
						    cell2.innerHTML = json.joblist[i].JOBSTATUS;
						    cell3.innerHTML = json.joblist[i].UPDATEDDATE;
						    cell4.innerHTML = '';
						    
	Ink.log(contents); **/
						}
	                }
	            }, 
	            onFailure: function() {
	Ink.log("result: failed on network!");
	            }
	        });
		});

	});
}

function menuPinHistory() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('pin-history.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuManagePattern() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		crs = (function () { return; })(); modalManagePattern = (function () { return; })();
	
		Ajax.load('manage-pattern.html', function (res) {
		    InkElement.setHTML(container,res);
			
			Ajax.load('PatternTable', function (res) {
		    	InkElement.setHTML(Ink.i('tbodyPattern'),res);
			});
		});

	});
}

function menuManageCurrentMaxSerial() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		crs = (function () { return; })(); modalManageSerial = (function () { return; })();
		Ajax.load('manage-serial.html', function (res) {
		    InkElement.setHTML(container,res);
			Ajax.load('PatternSerial', function (res) {
		    	InkElement.setHTML(Ink.i('tbodySerial'),res);
			});
		});
	});
}

function menuLogMapping() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.Net.JsonP_1'], function(Ajax,InkElement,JsonP) {
		var container = Ink.i('main-panel');
		Ajax.load('log-mapping.html', function (res) {
		    InkElement.setHTML(container,res);
	        var uri = window.url_home + '/LogTableMapping';
	        new Ajax(uri, {
	            method: 'GET',
	            onSuccess: function(obj) {
	                if(obj && obj.responseJSON) {
	                  	var json = obj.responseJSON;
	        			var LogMapping = Ink.i('tbodyLogMapping');
						for(var i=0, total=json.logMapping.length; i < total; i++) {
						    var contents = '<tr>';
						    if (json.logMapping[i].STATUS != 'S') {
						    	//contents += '<td class="align-center"><i class="fa fa-download" aria-hidden="true"></i></td>';
						    	contents += '<td class="align-center"></td>';
						    } else {
						    	contents += '<td class="align-center"><a style="color:green" href="'+window.url_home+'/'+json.logMapping[i].LINK+'"><i class="fa fa-download" aria-hidden="true"></i></a></td>';
						    }
						    contents += '<td class="align-center">'+json.logMapping[i].BATCHNUMBER+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].JOBTYPE+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].DIGIT+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].AMOUNT+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].UPDATEDDATE+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].UPDATEDTIME+'</td>';
						    contents += '<td class="align-center">'+json.logMapping[i].UPDATEDBYUSERNAME+'</td>';
						    //contents += '<td class="align-left">'+json.logMapping[i].UPDATEDBYNAME+'</td>';
						    contents += '</tr>';
						    InkElement.appendHTML(LogMapping,contents);
						}
	                }
	            }, 
	            onFailure: function() {
	Ink.log("result: failed on network!");
	            }
	        });
		});

	});
}
function menuLogAudit() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		crs = (function () { return; })(); modalManageSerial = (function () { return; })();
		Ajax.load('log-audit.html', function (res) {
		    InkElement.setHTML(container,res);
			Ajax.load('LogTableAudit', function (res) {
		    	InkElement.setHTML(Ink.i('tbodyLogAudit'),res);
			});
		});
	});
}

function menuManageUsers() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		crs = (function () { return; })(); modalManagePattern = (function () { return; })();
	
		Ajax.load('manage-users.html', function (res) {
		    InkElement.setHTML(container,res);
		    
			
			Ajax.load('LoginUsersTable', function (res) {
		    	InkElement.setHTML(Ink.i('tbodyUsers'),res);
			});
		});

	});
}

function menuChangePassword() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var container = Ink.i('main-panel');
		Ajax.load('login-password.html', function (res) {
		    InkElement.setHTML(container,res);
		});
	});
}

function menuSignout() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
	    var uri = window.url_home + '/LoginSignout';
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
Ink.log("result: " + result);
					goHome();
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);goHome();
	        }
	    });
	});
}

function updateDashboard() {
	if (document.getElementById("c15")) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var json = JSON.parse(xhttp.responseText);
				if(json.result==="succeed"){
					updateDashboardContent("15",json.count15);updateDashboardContent("14",json.count14);updateDashboardContent("13",json.count13);
					updateDashboardContent("12",json.count12);updateDashboardContent("11",json.count11);updateDashboardContent("10",json.count10);
					updateDashboardContent("9",json.count9);updateDashboardContent("8",json.count8);updateDashboardContent("7",json.count7);
					updateDashboardContent("6",json.count6);updateDashboardContent("5",json.count5);updateDashboardContent("4",json.count4);
					updateDashboardContent("3",json.count3);updateDashboardContent("2",json.count2);updateDashboardContent("1",json.count1);
				}
	
			} else {
				result="failed on network!";
			}
		};
		var uri = window.url_home + '/MainDashboard';
	  	xhttp.open("GET", uri, true);
	  	xhttp.send();
	  	setTimeout(function(){updateDashboard();},30000);
  	}
}
function updateDashboardContent(digit,countDigit) {
	var content1 = '<div class="ink-alert basic success"><h2><i class="fa fa-credit-card"></i>&nbsp;&nbsp;&nbsp;XX Digit</h2><h4>countXX</h4><p>Download <a href="'+window.url_home + '/PinDownloadCSV?digit='+digit+'">here</a></p></div>';
	var content0 = '<div class="ink-alert basic info"><h2><i class="fa fa-credit-card"></i>&nbsp;&nbsp;&nbsp;XX Digit</h2><h4 style="color:white;">No PIN in stock</h4><div>&nbsp;</div></div>';
	var cDigit = "c".concat(digit);
	if (countDigit) {
		if (document.getElementById(cDigit)) document.getElementById(cDigit).innerHTML = content1.replace("countXX",countDigit).replace("XX",digit);
	} else {
		if (document.getElementById(cDigit)) document.getElementById(cDigit).innerHTML = content0.replace("XX",digit);
	}
}

function loginButtonLoginClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Carousel,FormValidator) {
	    var form = Ink.i('formLogin');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
    	    var uri = window.url_home + '/Login';
    	    new Ajax(uri, {
    	        method: 'POST',
    	        postBody: formData,
    	        onSuccess: function(obj) {
    	            if(obj && obj.responseJSON) {
    	            	var result = obj.responseJSON['result'];var name = obj.responseJSON['name'];
Ink.log("result: " + result);Ink.log("name: " + name);
    					if(result==="succeed"){
    						goHome();
    					} else {
    					    if (typeof crsLogin == "undefined") {crsLogin = new Carousel('#loginCarousel');}
    						crsLogin.nextPage();	
    					}
    	            }
    	        }, 
    	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
    	        }
    	    });
        }
	});
}
function loginButtonTryAgainClick() {
	crsLogin.previousPage();
}
function loginChangePassword() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formLoginPassword');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
            if (formData.pNow != formData.pNow2) {
				var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Please verify your new password</h4>';
				alert += '<p>Your new password is not match</p></div>';
            	InkElement.setHTML(Ink.i('loginPasswordAlert'),alert);
            } else {
                var uri = window.url_home + '/LoginChangePassword';
                new Ajax(uri, {
                    method: 'POST',
                    postBody: formData,
                    onSuccess: function(obj) {
                        if(obj && obj.responseJSON) {
                        	var result = obj.responseJSON['result'];
            				if(result==="succeed"){
                				var alert = '<div class="ink-alert block success" role="alert"><h4>Succeed</h4>';
            					alert += '<p>Password has been changed</p></div>';
            					InkElement.setHTML(Ink.i('loginPasswordAlert'),alert);
            					InkElement.setHTML(Ink.i('formLoginPassword'),'<input type="button" value="Close" class="ink-button green" onclick="goHome()">');
            				} else {
                				var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Change password failed!</h4>';
            					alert += '<p>'+result+'</p></div>';
            					InkElement.setHTML(Ink.i('loginPasswordAlert'),alert);
            				}
                        }
                    }, 
                    onFailure: function() {
        				var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Network failed!</h4>';
    					alert += '<p>Please contact your network administrator</p></div>';
    					InkElement.setHTML(Ink.i('loginPasswordAlert'),alert);
                    }
                });
            }
        }
	});
}

function pinGenBatchButtonGenerateClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formPinGenBatch');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
			InkElement.setHTML(Ink.i('pinDigitConfirm'),'Pin Digit: <b style="color:red">' + formData.pinDigit + '</b>');
			InkElement.setHTML(Ink.i('pinAmountConfirm'),'Pin Amount: <b style="color:red">' + formData.pinAmount + '</b>');
			if (typeof modalPinGenBatch == "undefined") {modalPinGenBatch = new Modal('#formPinGenBatchConfirm');}
			modalPinGenBatch.open(); 
        }
	});
}

function pinGenBatchButtonConfirmClick() {
Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
    var form = Ink.i('formPinGenBatch');
    var formData = FormSerialize.serialize(form);
    var pinAmount = formData.pinAmount;
    Ink.i('pinDigit').disabled = true;Ink.i('pinAmount').disabled = true;
    Ink.i('buttonGenerate').disabled = true;Ink.i('buttonCancel').disabled = true;
    var uri = window.url_home + '/PinGenBatch';
    new Ajax(uri, {
        method: 'POST',
        postBody: formData,
        onSuccess: function(obj) {
            if(obj && obj.responseJSON) {
            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
				if(result==="succeed"){
					var crs = new Carousel('#pinGenBatchCarousel');crs.nextPage();
					InkElement.setHTML(Ink.i('pinGenBatchJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
					var probar = new ProgressBar('#pinGenBatchProgressBar');
					setTimeout(function(){pinGenBatchUpdateProgress(probar,jobId,pinAmount);},2000);
				}
            }
        }, 
        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
        }
    });
});
}

function pinGenBatchUpdateProgress(probar,jobId,pinAmount) {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.UI.ProgressBar_1'], function(Ajax,InkElement,ProgressBar) {
	    var uri = window.url_home + '/PinCount?jobId='+jobId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var c = obj.responseJSON['count'];var status = obj.responseJSON['status'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);Ink.log("count: " + c);
					if(result==="succeed"){
						if (!probar) {probar = new ProgressBar('#pinGenBatchProgressBar');}
						var p = c/pinAmount*100;
						probar.setValue(Math.floor(p));
						if ((c < pinAmount) && (status !== 'S')) {
							setTimeout(function(){pinGenBatchUpdateProgress(probar,jobId,pinAmount);},3000);
						} else {probar.setValue(100);
							InkElement.setHTML(Ink.i('pinGenBatchProgressBarCaption'),'<div style="color:white"><i class="fa fa-cog"></i>&nbsp;&nbsp;Succeed</div>');
							InkElement.setHTML(Ink.i('pinGenBatchAction'),'Download CSV file: click <a href="'+window.url_home + '/PinExportCSV?jobId='+jobId+'">here</a>');
						}
					} else {
Ink.log("result: " + result);
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
	        }
	    });
	});
}

function pinGenSpecButtonPlusClick(rowMore) {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
		var pinCount = Number(Ink.i('pinCount').value);
		pinCountNew = pinCount + rowMore;
		for (var i = pinCount+1; i <= pinCountNew; i++) {
			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" style="width:15em;" type="text" placeholder="Specific Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"></div></div>';
			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
		}
		Ink.i('pinCount').value = pinCountNew;
	});
}
function pinGenSpecButtonAddClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1'], function(FormSerialize,InkElement,Modal) {
	    var form = Ink.i('formPinGenSpec');
        var formData = FormSerialize.serialize(form);
		//InkElement.setHTML(Ink.i('pinConfirm'),'<b style="color:red">' + formData.pin + '</b>');
        if (typeof modalPinGenSpec == "undefined") {modalPinGenSpec = new Modal('#formPinGenSpecConfirm');}
		modalPinGenSpec.open(); 
	});
}
function pinGenSpecButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
		var pinCount = Ink.i('pinCount');
Ink.log("pinCount: " + pinCount.value);
	    var pValue;var aPin = [];
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
Ink.log("i " + i);
			if (pValue.match(/\S/)) {aPin.push(pValue);Ink.log("push i " + i);}
		}
		InkElement.setHTML(Ink.i('pinInput'),'');
		pinCount.value = aPin.length;
		for (var i = 0; i < aPin.length; i++) {
			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" value="'+aPin[i]+'" style="width:15em;" type="text" placeholder="Specific Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"><i class="fa fa-cog fa-spin"></i></div>&nbsp;&nbsp;&nbsp;<div id="pinMsg'+i+'"></div></div>';
			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
			Ink.i('pin'+i).disabled = true;
		}
		var form = Ink.i('formPinGenSpec');
	    var formData = FormSerialize.serialize(form);
	    Ink.i('buttonAdd').disabled = true;Ink.i('buttonCancel').disabled = true;
	    
	    var uri = window.url_home + '/PinGenSpec?s=P';
	    new Ajax(uri, {
	        method: 'POST',
	        postBody: formData,
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
					if(result==="succeed"){
						var countSuccess = 0;
						for (var i = 0; i < aPin.length; i++) {
							var uri = window.url_home + '/PinGenSpecX?pin='+aPin[i]+'&pinId='+i+'&jobId='+jobId;
						    new Ajax(uri, {asynchronous: false,
						        method: 'GET',
						        onSuccess: function(obj) {
						            if(obj && obj.responseJSON) {
						            	var result = obj.responseJSON['result'];var pinId = obj.responseJSON['pinId'];
				Ink.log("result: " + result);Ink.log("pinId: " + pinId);
										if(result==="duplicated"){
											InkElement.setHTML(Ink.i('pinSpin'+pinId),'<i class="fa fa-times-circle" style="color:red"></i>');
											InkElement.setHTML(Ink.i('pinMsg'+pinId),'<div class="ink-label red" style="font-size:.5em;height:1.8em;margin-top:1.4em;">Duplicated PIN</div>');
										} else if(result==="succeed"){countSuccess++;Ink.log("countSuccess: " + countSuccess);
											InkElement.setHTML(Ink.i('pinSpin'+pinId),'<i class="fa fa-check-circle" style="color:green"></i>');
										} else {
											InkElement.setHTML(Ink.i('pinSpin'+pinId),'<i class="fa fa-times-circle" style="color:red"></i>');
										}
						            }
						        }, 
						        onFailure: function() {result="failed on network!"
				Ink.log("result: " + result);
						        	InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red">Network</i>');
						        }
						    });
						}
						var lastJobStatus = 'D';Ink.log("countSuccess: " + countSuccess);
						if (countSuccess > 0) {lastJobStatus = 'S';InkElement.setHTML(Ink.i('pinGenSpecJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');}Ink.log("lastJobStatus: " + lastJobStatus);
						InkElement.appendHTML(Ink.i('pinGenSpecJobId'),'<br/>Export as CSV file: click <a href="'+window.url_home + '/PinExportCSV?jobId='+jobId+'">here</a>');
						var uri = window.url_home + '/PinGenSpec?s='+lastJobStatus+'&jobid='+jobId;
					    new Ajax(uri, {
					        method: 'POST',
					        postBody: formData,
					        onSuccess: function(obj) {
					            if(obj && obj.responseJSON) {
					            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
									if(result==="succeed"){
										InkElement.setHTML(Ink.i('pinGenSpecButton'),'<div class="push-left"><button class="ink-button" onclick="goHome()">&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;</button></div>');
										InkElement.remove('pinGenSpecPlus');InkElement.remove('pinGenSpecPlus');
									}
								}
				            }, 
				            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
				            }
					    });
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
	        }
	    });
	});
}


function pinGenVIPButtonBrowseFileINClick() {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
	    var inputBrowse = Ink.i('fileINHidden');
	    inputBrowse.click();
	});
}
function pinGenVIPInputBrowseFileINChange() {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
	    var inputBrowse = Ink.i('fileINHidden');
	    var fileIN = Ink.i('fileIN');
	    var file = inputBrowse.files[0];
        if ('name' in file) {fileIN.value = file.name;}
	});
}
function pinGenVIPButtonPlusClick(rowMore) {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
		var pinCount = Number(Ink.i('pinCount').value);
		pinCountNew = pinCount + rowMore;
		for (var i = pinCount+1; i <= pinCountNew; i++) {
			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" style="width:15em;" type="text" placeholder="VIP Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"></div></div>';
			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
		}
		Ink.i('pinCount').value = pinCountNew;
	});
}
function pinGenVIPButtonCAMClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1'], function(FormSerialize,InkElement,Modal) {
		var fileIN = Ink.i('fileINHidden');
		var foundPin = false;
		var pinCount = Ink.i('pinCount');
	    var pValue;
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
			if (pValue.match(/\S/)) {foundPin = true;}
		}
        		
		if (fileIN.files.length != 0) {
			if (foundPin) {
			    //var form = Ink.i('formPinGenVIPFileIN');
		        //var formData = FormSerialize.serialize(form);
				//InkElement.setHTML(Ink.i('pinConfirm'),'<b style="color:red">' + formData.pin + '</b>');
		        if (typeof modalPinGenVIP == "undefined") {modalPinGenVIP = new Modal('#formPinGenVIPConfirm');}
				modalPinGenVIP.open();
			} else {
				var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Missing VIP PIN!</h4>';
				alert += '<p>Please enter VIP PIN</p></div>';
				InkElement.setHTML(Ink.i('pinGenVIPAlert'),alert);
			}
		} else {
			var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Missing file PIN history!</h4>';
			alert += '<p>Please browse for file PIN history to compare with VIP PINs</p></div>';
			InkElement.setHTML(Ink.i('pinGenVIPAlert'),alert);
		}
	});
}
function pinGenVIPButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
		InkElement.setHTML(Ink.i('pinGenVIPAlert'),'');
		var fileIN = Ink.i('fileINHidden');
	    var data = new FormData();
	    data.append('fileINHidden', fileIN.files[0]);
		//var probar = new ProgressBar('#pinCompareProgressBar');
		
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function(){
	        if(request.readyState == 4){
	            try {
	                var resp = JSON.parse(request.response);
	        		
	                Ink.i('fileIN').disabled = true;
	                Ink.i('buttonBrowseFileIN').disabled = true;
	                
	        		var pinCount = Ink.i('pinCount');
	        Ink.log("pinCount: " + pinCount.value);
	        	    var pValue;var aPin = [];
	        		for (var i = 1; i <= pinCount.value; i++) {
	        			pValue = Ink.i('pin'+i).value;
	        Ink.log("i " + i);
	        			if (pValue.match(/\S/)) {aPin.push(pValue);Ink.log("push i " + i);}
	        		}
	        		InkElement.setHTML(Ink.i('pinInput'),'');
	        		pinCount.value = aPin.length;
	        		for (var i = 0; i < aPin.length; i++) {
	        			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
	        			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" value="'+aPin[i]+'" style="width:15em;" type="text" placeholder="VIP Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
	        			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"><i class="fa fa-cog fa-spin"></i></div>&nbsp;&nbsp;&nbsp;<div id="pinMsg'+i+'"></div></div>';
	        			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
	        			Ink.i('pin'+i).disabled = true;
	        		}
	        		var form = Ink.i('formPinGenVIP');
	        	    var formData = FormSerialize.serialize(form);
	        	    Ink.i('buttonCAM').disabled = true;Ink.i('buttonCancel').disabled = true;
	        	    var uri = window.url_home + '/PinGenVIPX?s=P&jobid=' + resp.jobId;
	        	    new Ajax(uri, {
	        	        method: 'POST',
	        	        postBody: formData,
	        	        onSuccess: function(obj) {
	        	            if(obj && obj.responseJSON) {
	        	            	var result = obj.responseJSON['result'];
	        					if(result==="succeed"){
	        						var countSuccess = 0;
	        						for (var i = 0; i < aPin.length; i++) {
	        							var uri = window.url_home + '/PinGenVIPCompare?pin='+aPin[i]+'&fileName='+resp.fileName;
	        						    new Ajax(uri, {asynchronous: false,
	        						        method: 'GET',
	        						        onSuccess: function(obj) {
	        						            if(obj && obj.responseJSON) {
	        						            	var result = obj.responseJSON['result'];
	        				Ink.log("result: " + result + " pin: " +  obj.responseJSON['pin']);
	        										if(result==="duplicated"){
	        											InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
	        											InkElement.setHTML(Ink.i('pinMsg'+i),'<div class="ink-label red" style="font-size:.5em;height:1.8em;margin-top:1.4em;">Duplicated PIN</div>');
	        										} else if(result==="succeed"){countSuccess++;Ink.log("countSuccess: " + countSuccess);
	        											InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-check-circle" style="color:green"></i>');
	        										} else {
	        											InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
	        										}
	        						            }
	        						        }, 
	        						        onFailure: function() {result="failed on network!"
	        				Ink.log("result: " + result);
	        						        	InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red">Network</i>');
	        						        }
	        						    });
	        						}
	        						var lastJobStatus = 'D';Ink.log("countSuccess: " + countSuccess);
	        						if (countSuccess > 0) {lastJobStatus = 'S';InkElement.setHTML(Ink.i('pinGenVIPJobId'),'Job ID: <b style="color:red">' + resp.jobId + '</b>');}Ink.log("lastJobStatus: " + lastJobStatus);
	        						InkElement.appendHTML(Ink.i('pinGenVIPJobId'),'<br/>Download result as CSV file: click <a href="'+window.url_home + '/PinGenVIPDownload?fileName='+resp.fileName+'">here</a>');
	        						var uri = window.url_home + '/PinGenVIPX?s='+lastJobStatus+'&jobid='+resp.jobId;
	        					    new Ajax(uri, {
	        					        method: 'POST',
	        					        postBody: formData,
	        					        onSuccess: function(obj) {
	        					            if(obj && obj.responseJSON) {
	        					            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
	        Ink.log("result: " + result);Ink.log("jobId: " + jobId);
	        									if(result==="succeed"){
	        										InkElement.setHTML(Ink.i('pinGenVIPButton'),'<div class="push-left"><button class="ink-button" onclick="goHome()">&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;</button></div>');
	        										InkElement.remove('pinGenVIPPlus');InkElement.remove('pinGenVIPPlus');
	        									}
	        								}
	        				            }, 
	        				            onFailure: function() {result="failed on network!";
	        Ink.log("result: " + result);
	        				            }
	        					    });
	        					}
	        	            }
	        	        }, 
	        	        onFailure: function() {result="failed on network!";
	        Ink.log("result: " + result);
	        	        }
	        	    });
	                
	                
	                
	                
	                
	              
	                
	                
	                
	                
	                
	                
	                //comparePinUpdateProgress(resp.jobId,probar);
	            } catch (e){
	                var resp = {
	                    result: 'failed on network!',
	                    fileName: 'Unknown error occurred: [' + request.responseText + ']'
	                };
	            }
console.log(resp.result + ': ' + resp.fileName + ': ' + resp.jobId);
	        }
	    };

	    //request.upload.addEventListener('progress', function(e){
	    	//probar.setValue(Math.ceil(e.loaded/e.total) * 100);
	    //}, false);

	    //var crs = new Carousel('#pinCompareCarousel');crs.nextPage();
	    
	    request.open('POST', window.url_home + '/PinGenVIP');
	    request.send(data);
		


	});
}
function pinGenVIP3ButtonCAMClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1'], function(FormSerialize,InkElement,Modal) {

		var foundPin = false;
		var pinCount = Ink.i('pinCount');
	    var pValue;
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
			if (pValue.match(/\S/)) {foundPin = true;}
		}
        
		if (foundPin) {
	        if (typeof modalPinGenVIP == "undefined") {modalPinGenVIP = new Modal('#formPinGenVIPConfirm');}
			modalPinGenVIP.open();
		} else {
			var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Missing VIP PIN!</h4>';
			alert += '<p>Please enter VIP PIN</p></div>';
			InkElement.setHTML(Ink.i('pinGenVIPAlert'),alert);
		}

	});
}
function pinGenVIP3ButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
		InkElement.setHTML(Ink.i('pinGenVIPAlert'),'');

		var pinCount = Ink.i('pinCount');
Ink.log("pinCount: " + pinCount.value);
	    var pValue;var aPin = [];
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
Ink.log("i " + i);
			if (pValue.match(/\S/)) {aPin.push(pValue);Ink.log("push i " + i);}
		}
		InkElement.setHTML(Ink.i('pinInput'),'');
		pinCount.value = aPin.length;
		for (var i = 0; i < aPin.length; i++) {
			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" value="'+aPin[i]+'" style="width:15em;" type="text" placeholder="VIP Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"><i class="fa fa-cog fa-spin"></i></div>&nbsp;&nbsp;&nbsp;<div id="pinMsg'+i+'"></div></div>';
			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
			Ink.i('pin'+i).disabled = true;
		}
		var form = Ink.i('formPinGenVIP');
	    var formData = FormSerialize.serialize(form);
		Ajax.load('PinGenVIP3?s=P&batchNumberPrefix='+formData.batchNumberPrefix+'&batchNumber='+formData.batchNumber+'&serialNumberPrefix='+formData.serialNumberPrefix+'&serialNumber='+formData.serialNumber, function (res) {
			var jobId = res;

    	    Ink.i('buttonCAM').disabled = true;Ink.i('buttonCancel').disabled = true;
    	    Ink.i('batchNumberPrefix').disabled = true;Ink.i('batchNumber').disabled = true;
    	    Ink.i('serialNumberPrefix').disabled = true;Ink.i('serialNumber').disabled = true;
    	    
			var countSuccess = 0;
			for (var i = 0; i < aPin.length; i++) {
				var uri = window.url_home + '/PinGenVIP3X?pin='+aPin[i]+'&pinId='+i+'&jobId='+jobId;
			    new Ajax(uri, {asynchronous: false,
			        method: 'GET',
			        onSuccess: function(obj) {
			            if(obj && obj.responseJSON) {
			            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result + " pin: " +  obj.responseJSON['pin']);
							if(result==="duplicated"){
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
								InkElement.setHTML(Ink.i('pinMsg'+i),'<div class="ink-label red" style="font-size:.5em;height:1.8em;margin-top:1.4em;">Duplicated PIN</div>');
							} else if(result==="succeed"){countSuccess++;Ink.log("countSuccess: " + countSuccess);
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-check-circle" style="color:green"></i>');
							} else {
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
							}
			            }
			        }, 
			        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
			        	InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red">Network</i>');
			        }
			    });
			}

			
			var uri = window.url_home + '/PinGenVIP3M?jobId='+jobId;
		    new Ajax(uri, {
		        method: 'GET',
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
						if(result==="succeed"){
							InkElement.setHTML(Ink.i('pinGenVIPJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
							InkElement.appendHTML(Ink.i('pinGenVIPJobId'),'<br/>Download result as CSV file: click <a href="'+window.url_home + '/PinGenVIP3CSV?jobId='+jobId+'">here</a>');
							InkElement.setHTML(Ink.i('pinGenVIPButton'),'<div class="push-left"><button class="ink-button" onclick="goHome()">&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;</button></div>');
							InkElement.remove('pinGenVIPPlus');InkElement.remove('pinGenVIPPlus');
						}
					}
	            }, 
	            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
	            }
		    });
			

		});
	});
}
function pinGenVIP4ButtonGAMClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1'], function(FormSerialize,InkElement,Modal) {

		var foundPin = false;
		var pinCount = Ink.i('pinCount');
	    var pValue;
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
			if (pValue.match(/\S/)) {foundPin = true;}
		}
        
		if (foundPin) {
	        if (typeof modalPinGenVIP == "undefined") {modalPinGenVIP = new Modal('#formPinGenVIPConfirm');}
			modalPinGenVIP.open();
		} else {
			var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Missing VIP PIN!</h4>';
			alert += '<p>Please enter VIP PIN</p></div>';
			InkElement.setHTML(Ink.i('pinGenVIPAlert'),alert);
		}

	});
}
function pinGenVIP4ButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
		InkElement.setHTML(Ink.i('pinGenVIPAlert'),'');

		var pinCount = Ink.i('pinCount');
Ink.log("pinCount: " + pinCount.value);
	    var pValue;var aPin = [];
		for (var i = 1; i <= pinCount.value; i++) {
			pValue = Ink.i('pin'+i).value;
Ink.log("i " + i);
			if (pValue.match(/\S/)) {aPin.push(pValue);Ink.log("push i " + i);}
		}
		InkElement.setHTML(Ink.i('pinInput'),'');
		pinCount.value = aPin.length;
		for (var i = 0; i < aPin.length; i++) {
			var pinInputHtml = '<div class="control-group column-group"><div class="control">';
			pinInputHtml += '<input id="pin'+i+'" name="pin'+i+'" value="'+aPin[i]+'" style="width:15em;" type="text" placeholder="VIP Pin" maxlength="15" onkeypress=\'return (event.charCode >= 48 && event.charCode <= 57)\'>';
			pinInputHtml += '</div><div id="pinSpin'+i+'" style="font-size:1.6em;margin-top:-.3em;margin-left:.8em"><i class="fa fa-cog fa-spin"></i></div>&nbsp;&nbsp;&nbsp;<div id="pinMsg'+i+'"></div></div>';
			InkElement.appendHTML(Ink.i('pinInput'),pinInputHtml);
			Ink.i('pin'+i).disabled = true;
		}
		var form = Ink.i('formPinGenVIP');
	    var formData = FormSerialize.serialize(form);
		Ajax.load('PinGenVIP4?s=P&batchNumberPrefix='+formData.batchNumberPrefix+'&batchNumber='+formData.batchNumber+'&serialNumberPrefix='+formData.serialNumberPrefix+'&serialNumber='+formData.serialNumber, function (res) {
			var jobId = res;

    	    Ink.i('buttonCAM').disabled = true;Ink.i('buttonCancel').disabled = true;
    	    Ink.i('batchNumberPrefix').disabled = true;Ink.i('batchNumber').disabled = true;
    	    Ink.i('serialNumberPrefix').disabled = true;Ink.i('serialNumber').disabled = true;
    	    
			var countSuccess = 0;
			for (var i = 0; i < aPin.length; i++) {
				var uri = window.url_home + '/PinGenVIP4X?pin='+aPin[i]+'&pinId='+i+'&jobId='+jobId;
			    new Ajax(uri, {asynchronous: false,
			        method: 'GET',
			        onSuccess: function(obj) {
			            if(obj && obj.responseJSON) {
			            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result + " pin: " +  obj.responseJSON['pin']);
							if(result==="duplicated"){
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
								InkElement.setHTML(Ink.i('pinMsg'+i),'<div class="ink-label red" style="font-size:.5em;height:1.8em;margin-top:1.4em;">Duplicated PIN</div>');
							} else if(result==="succeed"){countSuccess++;Ink.log("countSuccess: " + countSuccess);
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-check-circle" style="color:green"></i>');
							} else {
								InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red"></i>');
							}
			            }
			        }, 
			        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
			        	InkElement.setHTML(Ink.i('pinSpin'+i),'<i class="fa fa-times-circle" style="color:red">Network</i>');
			        }
			    });
			}

			
			var uri = window.url_home + '/PinGenVIP3M?jobId='+jobId;
		    new Ajax(uri, {
		        method: 'GET',
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
						if(result==="succeed"){
							InkElement.setHTML(Ink.i('pinGenVIPJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
							InkElement.appendHTML(Ink.i('pinGenVIPJobId'),'<br/>Download result as CSV file: click <a href="'+window.url_home + '/PinGenVIP3CSV?jobId='+jobId+'">here</a>');
							InkElement.setHTML(Ink.i('pinGenVIPButton'),'<div class="push-left"><button class="ink-button" onclick="goHome()">&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;</button></div>');
							InkElement.remove('pinGenVIPPlus');InkElement.remove('pinGenVIPPlus');
						}
					}
	            }, 
	            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
	            }
		    });
			

		});
	});
}


function comparePinButtonBrowseFileINClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var inputBrowse = Ink.i('fileINHidden');
	    inputBrowse.click();
	});
}

function comparePinInputBrowseFileINChange() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var inputBrowse = Ink.i('fileINHidden');
	    var fileIN = Ink.i('fileIN');
	    var file = inputBrowse.files[0];
        if ('name' in file) {fileIN.value = file.name;}
	    /**
	    var txt;
	    if ('files' in inputBrowse) {
	        if (inputBrowse.files.length == 0) {
	            txt = "Select one or more files.";
	        } else {
	            for (var i = 0; i < inputBrowse.files.length; i++) {
	                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
	                var file = inputBrowse.files[i];
	                if ('name' in file) {txt += "name: " + file.name + "<br>";}
	                if ('size' in file) {txt += "size: " + file.size + " bytes <br>";}
	            }
	        }
	    } 
	    else {
	        if (inputBrowse.value == "") {
	            txt += "Select one or more files.";
	        } else {
	            txt += "The files property is not supported by your browser!";
	            txt  += "<br>The path of the selected file: " + inputBrowse.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
	        }
	    }
	    alert(txt);
	    **/
        
        
        
        
        
	});
}

function comparePinButtonBrowseFilePinGenClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var inputBrowse = Ink.i('filePinGenHidden');
	    inputBrowse.click();
	});
}

function comparePinInputBrowseFilePinGenChange() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var inputBrowse = Ink.i('filePinGenHidden');
	    var filePinGen = Ink.i('filePinGen');
	    var file = inputBrowse.files[0];
        if ('name' in file) {filePinGen.value = file.name;}
	});
}

function comparePinButtonSubmitClick() {
	Ink.requireModules(['Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(InkElement,Carousel,ProgressBar) {
	    //var formComparePin = Ink.i('formComparePin');
	    //formComparePin.submit();
		var fileIN = Ink.i('fileINHidden');
	    //var filePinGen = Ink.i('filePinGenHidden');
	    
		//var fileIN = document.getElementById("fileINHidden");
	    
	    var data = new FormData();
	    data.append('fileINHidden', fileIN.files[0]);
	    //data.append('filePinGenHidden', filePinGen.files[0]);

		var probar = new ProgressBar('#pinCompareProgressBar');
		
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function(){
	        if(request.readyState == 4){
	            try {
	                var resp = JSON.parse(request.response);
	                comparePinUpdateProgress(resp.jobId,probar);
	            } catch (e){
	                var resp = {
	                    result: 'failed on network!',
	                    fileName: 'Unknown error occurred: [' + request.responseText + ']'
	                };
	            }
	            console.log(resp.result + ': ' + resp.fileName);
	        }
	    };

	    request.upload.addEventListener('progress', function(e){
	    	probar.setValue(Math.ceil(e.loaded/e.total) * 100);
	    	//if (e.loaded == e.total) {comparePinProgress(fileIN.files[0]);}
	    }, false);

	    var crs = new Carousel('#pinCompareCarousel');crs.nextPage();
	    
	    request.open('POST', window.url_home + '/PinCompare');
	    request.send(data);
	    
	});
}
function comparePinUpdateProgress(jobId,probar) {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.UI.ProgressBar_1'], function(Ajax,InkElement,ProgressBar) {
	    var uri = window.url_home + '/PinCompareCount?jobId=' + jobId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var c = obj.responseJSON['count']; //var amount = obj.responseJSON['amount'];
	Ink.log("result: " + result);
					if(result==="succeed"){
						InkElement.setHTML(Ink.i('pinCompareAction'),'Comparing..');
						InkElement.setHTML(Ink.i('pinCompareProgressBarCaption'),'<i class="fa fa-cog fa-spin"></i>&nbsp;&nbsp;Comparing...');
						probar.setValue(Math.ceil(c)); //probar.setValue(Math.ceil(c/amount*100));
						if ((c < 100) && (document.getElementById('pinCompareAction'))) {
							setTimeout(function(){comparePinUpdateProgress(jobId,probar);},3000);
						} else {
							InkElement.setHTML(Ink.i('pinCompareProgressBarCaption'),'<div style="color:white"><i class="fa fa-cog"></i>&nbsp;&nbsp;Succeed</div>');
							//InkElement.setHTML(Ink.i('pinCompareAction'),'Download duplicated PIN as CSV file: click <a href="'+window.url_home + '/PinCompare3CSV?jobId='+jobId+'">here</a>');
							InkElement.setHTML(Ink.i('pinCompareAction'),'Download duplicated PIN as CSV file: click <a href="'+window.url_home + '/PinHistDownloadCSV?status=D&jobId='+jobId+'">here</a>');
						}
					
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
	        }
	    });
	});
	
}

function loadPinButtonBrowseFileINClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var inputBrowse = Ink.i('buttonBrowseFileINHidden');
	    inputBrowse.click();
	});
}

function loadPinInputBrowseFileINChange() {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
	    var inputBrowse = Ink.i('buttonBrowseFileINHidden');
	    var fileIN = Ink.i('fileIN');
	    var file = inputBrowse.files[0];
        if ('name' in file) {fileIN.value = file.name;}
	});
}

function serialMapBrowseFileINClick() {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
	    var inputBrowse = Ink.i('fileINHidden');
	    inputBrowse.click();
	});
}
function serialMapBrowseFileINChange() {
	Ink.requireModules(['Ink.Dom.Element_1'], function(InkElement) {
	    var inputBrowse = Ink.i('fileINHidden');
	    var fileIN = Ink.i('fileIN');
	    var file = inputBrowse.files[0];
        if ('name' in file) {fileIN.value = file.name;}
	});
}
function serialMapButtonMapClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formSerialMap');
	    var pat = Ink.i('serialPattern');
	    var foundFileIN = false;
	    var inputBrowse = Ink.i('fileINHidden');
	    var file = inputBrowse.files[0];
	    if (!file) {
			var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>Missing file PIN history!</h4>';
			alert += '<p>Please browse for file PIN history to compare with VIP PINs</p></div>';
			InkElement.setHTML(Ink.i('serialMapAlert'),alert);
	    } else {
	    	InkElement.setHTML(Ink.i('serialMapAlert'),'');
	    }
        if (FormValidator.validate(form,{customFlag:[{flag:'nomore25000',msg:'Max Pin Amount: 25,000',callback:function(el){return parseInt(el.value, 10) <= 25000;}}]}) && file) {
            var formData = FormSerialize.serialize(form);
            InkElement.setHTML(Ink.i('serialMapPatternConfirm'),'Voucher Template Name: <b style="color:red">' + pat.options[pat.selectedIndex].text + '</b>');
    		InkElement.setHTML(Ink.i('serialMapPinAmountConfirm'),'Pin Amount: <b style="color:red">' + formData.pinAmount + '</b>');
    		if (typeof modalSerialMap == "undefined") {modalSerialMap = new Modal('#formSerialMapConfirm');}
    		modalSerialMap.open();
        }
	});
}
function serialMapButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
	    var formFile = Ink.i('formSerialMapFileIN');
	    var formFileData = FormSerialize.serialize(formFile);
	    
		var form = Ink.i('formSerialMap');
	    var formData = FormSerialize.serialize(form);
	    var pinAmount = formData.pinAmount;
	    var serialPattern = formData.serialPattern;
	    var batchNumber = formData.batchNumber;
	    
	    var uri = window.url_home + '/PinCountA?patternid=' + serialPattern;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var count = obj.responseJSON['count'];
Ink.log("result: " + result);Ink.log("count: " + count);
					if(result==="succeed"){
						if (count >= pinAmount) {
						    Ink.i('serialPattern').disabled = true;Ink.i('pinAmount').disabled = true;
						    Ink.i('buttonMap').disabled = true; //Ink.i('buttonCancel').disabled = true;

						    var fileIN = Ink.i('fileINHidden');
						    var data = new FormData();
						    data.append('fileINHidden', fileIN.files[0]);
						    Ink.i('buttonBrowseFileIN').disabled = true;Ink.i('fileIN').disabled = true;
						    
						    Ink.i('upBar').style.display = "inline";
							var upbar = new ProgressBar('#serialMapUploadProgressBar');
						    var request = new XMLHttpRequest();
						    request.onreadystatechange = function(){
						        if(request.readyState == 4){
						            try {
						                var resp = JSON.parse(request.response);
						            	var result = resp.result;var jobId = resp.jobId;
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
										if(result==="succeed"){
										    uri = window.url_home + '/SerialMap2?jobId=' + jobId + '&serialPattern='+serialPattern + '&pinAmount='+pinAmount + '&batchNumber=' +batchNumber;
										    new Ajax(uri, {
										        method: 'GET',
										        onSuccess: function(obj) {
										            if(obj && obj.responseJSON) {
										            	var result = obj.responseJSON['result'];
									Ink.log("result: " + result);
														if(result==="succeed"){
															var crs = new Carousel('#serialMapCarousel');crs.nextPage();
															InkElement.setHTML(Ink.i('serialMapJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
															var probar = new ProgressBar('#serialMapProgressBar');
															setTimeout(function(){serialMapUpdateProgress(probar,jobId,pinAmount);},2000);
														}
										            }
										        }, 
										        onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
										        }
										    });
										}
						            } catch (e){
						                var resp = {
						                    result: 'failed on network!',
						                    fileName: 'Unknown error occurred: [' + request.responseText + ']'
						                };
						            }
						            console.log(resp.result + ': ' + resp.fileName);
						        }
						    };

						    request.upload.addEventListener('progress', function(e){
						    	upbar.setValue(Math.ceil(e.loaded/e.total) * 100);
						    	//if (e.loaded == e.total) {comparePinProgress(fileIN.files[0]);}
						    }, false);

						    //var crs = new Carousel('#pinCompareCarousel');crs.nextPage();
						    
						    request.open('POST', window.url_home + '/SerialMap2Upload');
						    request.send(data);
						    
						} else {
							var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>PIN is not enough!</h4>';
							alert += '<p>The amount of available PIN in stock is not enough for mapping process<br/>Please generate more PIN before execute further.</p></div>';
							InkElement.setHTML(Ink.i('serialMapAlert'),alert);
						}
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
	        }
	    });
	    
	    

	});
}
function serialMapUpdateProgress(probar,jobId,pinAmount) {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.UI.ProgressBar_1'], function(Ajax,InkElement,ProgressBar) {
		var uri = window.url_home + '/SerialMap2Count?jobId='+jobId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var status = obj.responseJSON['status'];var jobType = obj.responseJSON['jobType'];
	            	var count = obj.responseJSON['count'];var amount = obj.responseJSON['amount'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
					if(result==="succeed"){
						if (!probar) {probar = new ProgressBar('#serialMapProgressBar');}
						var p = count/amount*100;
						probar.setValue(Math.floor(p));
						if (jobType == "F") {
							setTimeout(function(){serialMapUpdateProgress(probar,jobId,pinAmount);},3000);
						} else if (jobType == "M") {
							if (count < amount) {
								if (status == "F") {
									InkElement.setHTML(Ink.i('serialMapProgressBarCaption'),'<div style="color:red"><i class="fa fa-cog"></i>&nbsp;&nbsp;Failed</div>');
									InkElement.setHTML(Ink.i('serialMapAction'),'<div style="color:red">Failed</div>');
								} else {
									setTimeout(function(){serialMapUpdateProgress(probar,jobId,pinAmount);},3000);
								}
							} else {
								InkElement.setHTML(Ink.i('serialMapProgressBarCaption'),'<div style="color:white"><i class="fa fa-cog"></i>&nbsp;&nbsp;Succeed</div>');
								InkElement.setHTML(Ink.i('serialMapAction'),'Export as CSV file: click <a href="'+window.url_home + '/SerialMapCSV?jobId='+jobId+'">here</a>');
							}
						}
					} else {
Ink.log("result: " + result);
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
	        }
	    });
	});
}

function serialMap3ButtonMapClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formSerialMap');
	    var pat = Ink.i('serialPattern');

        if (FormValidator.validate(form,{customFlag:[{flag:'nomore25000',msg:'Max Pin Amount: 25000',callback:function(el){return parseInt(el.value, 10) <= 25000;}}]})) {
            var formData = FormSerialize.serialize(form);
            InkElement.setHTML(Ink.i('serialMapPatternConfirm'),'Voucher Template Name: <b style="color:red">' + pat.options[pat.selectedIndex].text + '</b>');
    		InkElement.setHTML(Ink.i('serialMapPinAmountConfirm'),'Pin Amount: <b style="color:red">' + formData.pinAmount + '</b>');
    		if (typeof modalSerialMap == "undefined") {modalSerialMap = new Modal('#formSerialMapConfirm');}
    		modalSerialMap.open();
        }
	});
}
function serialMap3ButtonConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
		var form = Ink.i('formSerialMap');
	    var formData = FormSerialize.serialize(form);
        var batchNumberPrefix = formData.batchNumberPrefix;
        var batchNumber = formData.batchNumber;
	    var pinAmount = formData.pinAmount;
	    var serialPattern = formData.serialPattern;
        var serialNumberPrefix = formData.serialNumberPrefix;
        var serialNumber = formData.serialNumber;
        
Ink.log("serialNumberPrefix: " + serialNumberPrefix);Ink.log("serialNumber: " + serialNumber);
        
	    var uri = window.url_home + '/PinCountA?patternid=' + serialPattern;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var count = obj.responseJSON['count'];
Ink.log("result: " + result);Ink.log("count: " + count);
					if(result==="succeed"){
						if (count >= pinAmount) {
						    Ink.i('serialPattern').disabled = true;Ink.i('pinAmount').disabled = true;
						    Ink.i('buttonMap').disabled = true; //Ink.i('buttonCancel').disabled = true;
							
						    uri = window.url_home + '/SerialMap3?batchNumberPrefix='+batchNumberPrefix+'&serialPattern='+serialPattern + '&pinAmount='+pinAmount + '&batchNumber=' +batchNumber+'&serialNumberPrefix='+serialNumberPrefix+'&serialNumber='+serialNumber;
						    new Ajax(uri, {
						        method: 'GET',
						        onSuccess: function(obj) {
						            if(obj && obj.responseJSON) {
						            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
					Ink.log("result: " + result);
										if(result==="succeed"){
											var crs = new Carousel('#serialMapCarousel');crs.nextPage();
											InkElement.setHTML(Ink.i('serialMapJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
											var probar = new ProgressBar('#serialMapProgressBar');
											setTimeout(function(){serialMap3UpdateProgress(probar,jobId,pinAmount);},2000);
										}
						            }
						        }, 
						        onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
						        }
						    });
						} else {
							var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>PIN is not enough!</h4>';
							alert += '<p>The amount of available PIN in stock is not enough for mapping process<br/>Please generate more PIN before execute further.</p></div>';
							InkElement.setHTML(Ink.i('serialMapAlert'),alert);
						}
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
	        }
	    });
	});
}
function serialMap3UpdateProgress(probar,jobId,pinAmount) {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.UI.ProgressBar_1'], function(Ajax,InkElement,ProgressBar) {
		var uri = window.url_home + '/SerialMap3Count?jobId='+jobId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var count = obj.responseJSON['count'];
Ink.log("result: " + result);Ink.log("jobId: " + jobId);
					if(result==="succeed"){
						if (!probar) {probar = new ProgressBar('#serialMapProgressBar');}
						var p = count/pinAmount*100;
						probar.setValue(Math.floor(p));
							if (count < pinAmount) {
								setTimeout(function(){serialMap3UpdateProgress(probar,jobId,pinAmount);},3000);
							} else {
								InkElement.setHTML(Ink.i('serialMapProgressBarCaption'),'<div style="color:white"><i class="fa fa-cog"></i>&nbsp;&nbsp;Succeed</div>');
								InkElement.setHTML(Ink.i('serialMapAction'),'Export as CSV file: click <a href="'+window.url_home + '/SerialMapCSV?jobId='+jobId+'">here</a>');
							}
						
					} else {
Ink.log("result: " + result);
						InkElement.setHTML(Ink.i('serialMapProgressBarCaption'),'<div style="color:red"><i class="fa fa-cog"></i>&nbsp;&nbsp;Failed</div>');
						InkElement.setHTML(Ink.i('serialMapAction'),'<div style="color:red">Failed</div>');
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
				InkElement.setHTML(Ink.i('serialMapProgressBarCaption'),'<div style="color:red"><i class="fa fa-cog"></i>&nbsp;&nbsp;Failed</div>');
				InkElement.setHTML(Ink.i('serialMapAction'),'<div style="color:red">Failed</div>');
	        }
	    });
	});
}

function serialMapGetSerial() {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1'], function(Ajax,InkElement) {
		var sPat = Ink.i('serialPattern')
		var patternId = sPat[sPat.selectedIndex].value;
		if (patternId == '0') {patternId = 3;}
	    var uri = window.url_home + '/SerialMapPatternLastSerialNumber?patternId='+patternId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	              	var json = obj.responseJSON;
	            	var result = obj.responseJSON['result'];var CHANNELCODE = obj.responseJSON['CHANNELCODE'];var SerialNumber = obj.responseJSON['SerialNumber'];
	            	Ink.i('serialNumberPrefix').value = CHANNELCODE;
	            	Ink.i('serialNumber').value = SerialNumber;
	            }
	        }, 
	        onFailure: function() {
	Ink.log("result: failed on network!");
	        }
	    });
	});
}

function pinExportButtonExportClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formPinExport');
	    if (FormValidator.validate(form)) {
	    	var formData = FormSerialize.serialize(form);
	    	InkElement.setHTML(Ink.i('pinDigitConfirm'),'Pin Digit: <b style="color:red">' + formData.pinDigit + '</b>');
	    	InkElement.setHTML(Ink.i('pinAmountConfirm'),'Pin Amount: <b style="color:red">' + formData.pinAmount + '</b>');
	    	if (typeof modalPinExport == "undefined") {modalPinExport = new Modal('#formPinExportConfirm');}
	    	modalPinExport.open();
	    }
	});
}

function pinExportButtonConfirmClick() {
Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar) {
    var form = Ink.i('formPinExport');
    var formData = FormSerialize.serialize(form);
    var pinAmount = formData.pinAmount;
    var uri = window.url_home + '/PinCountA?digit=' + formData.pinDigit;
    new Ajax(uri, {
        method: 'GET',
        onSuccess: function(obj) {
            if(obj && obj.responseJSON) {
            	var result = obj.responseJSON['result'];var count = obj.responseJSON['count'];
Ink.log("result: " + result);Ink.log("count: " + count);
            					if(result==="succeed"){
            						if (count >= pinAmount) {
									    Ink.i('pinDigit').disabled = true;
									    Ink.i('buttonExport').disabled = true;Ink.i('buttonCancel').disabled = true;
									    var uri = window.url_home + '/PinExport';
									    new Ajax(uri, {
									        method: 'POST',
									        postBody: formData,
									        onSuccess: function(obj) {
									            if(obj && obj.responseJSON) {
									            	var result = obj.responseJSON['result'];var jobId = obj.responseJSON['jobId'];
Ink.log("result: " + result + " jobId: " + jobId);
													if(result==="succeed"){
														var crs = new Carousel('#pinExportCarousel');crs.nextPage();
														InkElement.setHTML(Ink.i('pinExportJobId'),'Job ID: <b style="color:red">' + jobId + '</b>');
														var probar = probar = new ProgressBar('#pinExportProgressBar');
														setTimeout(function(){pinExportUpdateProgress(probar,jobId,pinAmount);},2000);
													}
									            }
									        }, 
									        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
									        }
									    });
            						} else {
            							var alert = '<div class="ink-alert block" role="alert"><button class="ink-dismiss">&times;</button><h4>PIN is not enough!</h4>';
            							alert += '<p>The amount of available PIN in stock is not enough for mapping process<br/>Please generate more PIN before execute further.</p></div>';
            							InkElement.setHTML(Ink.i('pinExportAlert'),alert);
            						}
            					}
            				}
        				}, 
        				onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
        				}			    
    				});
				});
}

function pinExportUpdateProgress(probar,jobId,pinAmount) {
	Ink.requireModules(['Ink.Net.Ajax_1','Ink.Dom.Element_1','Ink.UI.ProgressBar_1'], function(Ajax,InkElement,ProgressBar) {
	    var uri = window.url_home + '/PinCount?jobId='+jobId;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];var c = obj.responseJSON['count'];var status = obj.responseJSON['status'];var desc1 = obj.responseJSON['desc1'];
Ink.log("result: " + result + " jobId: " + jobId + " count: " + c + " status: " + status);
					if(result==="succeed"){
						if (!probar) {probar = new ProgressBar('#pinExportProgressBar');}
						var p = c/pinAmount*100;
						probar.setValue(Math.floor(p));
						if (c < pinAmount) {
							if (status == "F") {
								InkElement.setHTML(Ink.i('pinExportProgressBarCaption'),'<div style="color:red"><i class="fa fa-cog"></i>&nbsp;&nbsp;Failed</div>');
								InkElement.setHTML(Ink.i('pinExportAction'),'<div style="color:red">Failed - '+desc1+'</div>');
							} else {
								setTimeout(function(){pinExportUpdateProgress(probar,jobId,pinAmount);},3000);
							}
						} else {
							InkElement.setHTML(Ink.i('pinExportProgressBarCaption'),'<div style="color:white"><i class="fa fa-cog"></i>&nbsp;&nbsp;Succeed</div>');
							InkElement.setHTML(Ink.i('pinExportAction'),'Export as CSV file: click <a href="'+window.url_home + '/PinExportCSV?jobId='+jobId+'">here</a>');
						}
					} else {
Ink.log("result: " + result);
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
	        }
	    });
	});
}

function pinHistoryButtonSearchClick() {
	
}

function manageUsersButtonPlusClick() {
	Ink.requireModules(['Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.Dom.Event_1','Ink.UI.FormValidator_1'], function(InkElement,Carousel,InkEvent,FormValidator) {
		if (typeof crs == "undefined") {crs = new Carousel('#manageUsersCarousel');}
		crs.nextPage();

		InkElement.setHTML(Ink.i('confirmMode'),'add');
		InkElement.setHTML(Ink.i('ManageUsersConfirmMSG'),'Do you really want to add new pattern?');
		Ink.i('buttonConfirm').className += " green";
		InkElement.setHTML(Ink.i('buttonConfirm'),'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		
		Ink.i('buttonUpdate').value = "   Add new   ";
		InkElement.setHTML(Ink.i('manageUsersEditHead'),'Add new user');
		
		InkEvent.off(Ink.i('buttonUpdate'), 'click', manageUsersEditSaveClick);
		InkEvent.on(Ink.i('buttonUpdate'), 'click', manageUsersAddClick);
		
		addClass(Ink.i('passwordControl'),'required');addClass(Ink.i('password'),'ink-fv-required');
		
		Ink.i('name').value = '.';
		Ink.i('userName').value = '.';
		Ink.i('password').value = '.';
		FormValidator.validate(Ink.i('formManageUsers'));
		Ink.i('name').value = '';
		Ink.i('userName').value = '';
		Ink.i('password').value = '';
	});
}
function manageUsersAddClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formManageUsers');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
            
			InkElement.setHTML(Ink.i('ManageUsersConfirmName'),'Name: <b style="color:red">' + formData.name + '</b>');
			InkElement.setHTML(Ink.i('ManageUsersConfirmUsername'),'Username: <b style="color:red">' + formData.userName + '</b>');

			if (typeof modalManageUsers == "undefined") {modalManageUsers = new Modal('#formManageUsersConfirm');}
			modalManageUsers.open(); 
        }
	});
}
function manageUsersEditClick(userID) {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.Dom.Event_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Carousel,InkEvent,FormValidator) {
		if (typeof crs == "undefined") {crs = new Carousel('#manageUsersCarousel');}
		crs.nextPage();
		
		InkElement.setHTML(Ink.i('confirmMode'),'edit');
		InkElement.setHTML(Ink.i('confirmUserId'),userID);
		Ink.i('buttonConfirm').className += " green";
		InkElement.setHTML(Ink.i('buttonConfirm'),'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		InkElement.setHTML(Ink.i('ManageUsersConfirmMSG'),'Do you really want to save user?');
		
		Ink.i('buttonUpdate').value = '      Save      ';
		InkElement.setHTML(Ink.i('manageUsersEditHead'),'Edit users');
		
		InkEvent.off(Ink.i('buttonUpdate'), 'click', manageUsersAddClick);
		InkEvent.on(Ink.i('buttonUpdate'), 'click', manageUsersEditSaveClick);
		
		removeClass(Ink.i('passwordControl'),'required');removeClass(Ink.i('password'),'ink-fv-required');
		
		Ink.i('name').value = '.';
		Ink.i('userName').value = '.';
		Ink.i('password').value = '.';
		FormValidator.validate(Ink.i('formManageUsers'));
		Ink.i('name').value = '';
		Ink.i('userName').value = '';
		Ink.i('password').value = '';
		
		var uri = window.url_home + '/LoginUserGetById?userID='+userID;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var USERID = obj.responseJSON['USERID'];
	            	var NAME = obj.responseJSON['NAME'];
	            	var USERNAME = obj.responseJSON['USERNAME'];
					if(result==="succeed"){
						Ink.i('userId').value = USERID;
						Ink.i('name').value = NAME;
						Ink.i('userName').value = USERNAME;
					}
				}
            }, 
            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
            }
	    });
	});
}
function manageUsersEditSaveClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(FormSerialize,InkElement,Modal,FormValidator) {
		var form = Ink.i('formManageUsers');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);

			InkElement.setHTML(Ink.i('ManageUsersConfirmName'),'Name: <b style="color:red">' + formData.name + '</b>');
			InkElement.setHTML(Ink.i('ManageUsersConfirmUsername'),'Username: <b style="color:red">' + formData.userName + '</b>');

			modalManageUsers = new Modal('#formManageUsersConfirm');
			modalManageUsers.open();
        }
	});
}
function manageUsersDeleteClick(userID) {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1','Ink.Dom.Event_1','Ink.UI.Modal_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar,InkEvent,Modal) {
		var uri = window.url_home + '/LoginUserGetById?userID='+userID;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var USERID = obj.responseJSON['USERID'];
	            	var NAME = obj.responseJSON['NAME'];
	            	var USERNAME = obj.responseJSON['USERNAME'];          	
					if(result==="succeed"){
						InkElement.setHTML(Ink.i('ManageUsersConfirmName'),'Name: <b style="color:red">' + NAME + '</b>');
						InkElement.setHTML(Ink.i('ManageUsersConfirmUsername'),'Username: <b style="color:red">' + USERNAME + '</b>');

						InkElement.setHTML(Ink.i('confirmMode'),'delete');
						InkElement.setHTML(Ink.i('confirmUserId'),userID);
						Ink.i('buttonConfirm').className += " red";
						InkElement.setHTML(Ink.i('buttonConfirm'),'&nbsp;&nbsp;&nbsp;Delete&nbsp;&nbsp;&nbsp;');
						InkElement.setHTML(Ink.i('ManageUsersConfirmMSG'),"Do you really want to <b style='color:red'>DELETE</b>?");

						modalManageUsers = new Modal('#formManageUsersConfirm');
						modalManageUsers.open();
					}
				}
            }, 
            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
            }
	    });
	});
}
function manageUsersGoBack() {
	Ink.requireModules(['Ink.UI.Carousel_1'], function(Carousel) {
		if (typeof crs == "undefined") {crs = new Carousel('#manageUsersCarousel');}
		crs.setPage(1);crs.previousPage();
	});
}
function manageUsersConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
		var confirmMode = Ink.i('confirmMode').innerHTML;
		var uri = '';
		if (confirmMode != 'delete') {
			var form = Ink.i('formManageUsers');
	        var formData = FormSerialize.serialize(form);
	        if (confirmMode != 'edit') {
	        	uri = window.url_home + '/LoginUsersAdd';
	        } else {
	        	uri = window.url_home + '/LoginUsersUpdate';
	        }
		    new Ajax(uri, {
		        method: 'POST',
		        postBody: formData,
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result);
						if(result==="succeed"){
							menuManageUsers();
						}
		            }
		        }, 
		        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
		        }
		    });
		} else {
			uri = window.url_home + '/LoginUsersDelete?userId=' + InkElement.textContent('confirmUserId');
		    new Ajax(uri, {
		        method: 'GET',
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result);
						if(result==="succeed"){
							menuManageUsers();
						}
		            }
		        }, 
		        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
		        }
		    });
		}
	});
}

function managePatternButtonPlusClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.Dom.Event_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Carousel,InkEvent,FormValidator) {
		if (typeof crs == "undefined") {crs = new Carousel('#managePatternCarousel');}
		crs.nextPage();

		InkElement.setHTML(Ink.i('confirmMode'),'add');
		Ink.i('buttonConfirm').className += " green";
		Ink.i('buttonConfirm').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		Ink.i('ManagePatternConfirmMSG').innerHTML = "Do you really want to add new pattern?";
		
		Ink.i('buttonUpdate').value = "   Add new   ";
		InkEvent.on(Ink.i('buttonUpdate'), 'click', managePatternEditAddClick);
		InkElement.setHTML(Ink.i('managePatternEditHead'),'Add new pattern');
		
		Ink.i('channelName').value = '1';
		Ink.i('channelCode').value = '1';
		Ink.i('channelDigit').value = '1';
		Ink.i('pinDigit').value = '1';
		FormValidator.validate(Ink.i('formManagePattern'));
		Ink.i('channelName').value = '';
		Ink.i('channelCode').value = '';
		Ink.i('channelDigit').value = '';
		Ink.i('pinDigit').value = '';
	});
}

function managePatternDeleteClick(PATTERNID) {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1','Ink.Dom.Event_1','Ink.UI.Modal_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar,InkEvent,Modal) {
		var uri = window.url_home + '/PatternGetById?patternId='+PATTERNID;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var PATTERNID= obj.responseJSON['PATTERNID'];
	            	var CHANNEL = obj.responseJSON['CHANNEL'];
	            	var CHANNELCODE = obj.responseJSON['CHANNELCODE'];
	            	var DIGIT = obj.responseJSON['DIGIT'];
	            	var PINDIGIT = obj.responseJSON['PINDIGIT'];            	
Ink.log("result: " + result);Ink.log("CHANNEL: " + CHANNEL);
					if(result==="succeed"){
						InkElement.setHTML(Ink.i('ManagePatternConfirmChannel'),'Channel: <b style="color:red">' + CHANNEL + '</b>');
						InkElement.setHTML(Ink.i('ManagePatternConfirmChannelCode'),'Channel code: <b style="color:red">' + CHANNELCODE + '</b>,   Channel digit: <b style="color:red">' + DIGIT + '</b>');
						InkElement.setHTML(Ink.i('ManagePatternConfirmPinDigit'),'Pin digit: <b style="color:red">' + PINDIGIT + '</b>');
						InkElement.setHTML(Ink.i('confirmMode'),'delete');
						InkElement.setHTML(Ink.i('confirmPatternId'),PATTERNID);
						Ink.i('buttonConfirm').className += " red";
						Ink.i('buttonConfirm').innerHTML = "&nbsp;&nbsp;&nbsp;Delete&nbsp;&nbsp;&nbsp;";
						Ink.i('ManagePatternConfirmMSG').innerHTML = "Do you really want to <b style='color:red'>DELETE</b>?";
						if (typeof modalManagePattern == "undefined") {modalManagePattern = new Modal('#formManagePatternConfirm');}
						modalManagePattern.open(); 
					}
				}
            }, 
            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
            }
	    });
	});
}

function managePatternEditClick(PATTERNID) {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1','Ink.Dom.Event_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar,InkEvent,FormValidator) {
		if (typeof crs == "undefined") {crs = new Carousel('#managePatternCarousel');}
		crs.nextPage();
		
		InkElement.setHTML(Ink.i('confirmMode'),'edit');
		InkElement.setHTML(Ink.i('confirmPatternId'),PATTERNID);
		Ink.i('buttonConfirm').className += " green";
		Ink.i('buttonConfirm').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		Ink.i('ManagePatternConfirmMSG').innerHTML = "Do you really want to save pattern?";
		
		Ink.i('buttonUpdate').value = '      Save      ';
		InkEvent.on(Ink.i('buttonUpdate'), 'click', managePatternEditSaveClick);
		InkElement.setHTML(Ink.i('managePatternEditHead'),'Edit pattern');
		
		Ink.i('channelName').value = '1';
		Ink.i('channelCode').value = '1';
		Ink.i('channelDigit').value = '1';
		Ink.i('pinDigit').value = '1';
		FormValidator.validate(Ink.i('formManagePattern'));
		Ink.i('channelName').value = '';
		Ink.i('channelCode').value = '';
		Ink.i('channelDigit').value = '';
		Ink.i('pinDigit').value = '';
		
		var uri = window.url_home + '/PatternGetById?patternId='+PATTERNID;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var PATTERNID= obj.responseJSON['PATTERNID'];
	            	var CHANNEL = obj.responseJSON['CHANNEL'];
	            	var CHANNELCODE = obj.responseJSON['CHANNELCODE'];
	            	var DIGIT = obj.responseJSON['DIGIT'];
	            	var PINDIGIT = obj.responseJSON['PINDIGIT'];            	
Ink.log("result: " + result);Ink.log("CHANNEL: " + CHANNEL);
					if(result==="succeed"){
						Ink.i('patternId').value = PATTERNID;
						Ink.i('channelName').value = CHANNEL;
						Ink.i('channelCode').value = CHANNELCODE;
						Ink.i('channelDigit').value = DIGIT;
						Ink.i('pinDigit').value = PINDIGIT;
					}
				}
            }, 
            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
            }
	    });
	});
}

function managePatternEditAddClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formManagePattern');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
            
			InkElement.setHTML(Ink.i('ManagePatternConfirmChannel'),'Channel: <b style="color:red">' + formData.channelName + '</b>');
			InkElement.setHTML(Ink.i('ManagePatternConfirmChannelCode'),'Channel code: <b style="color:red">' + formData.channelCode + '</b>,   Channel digit: <b style="color:red">' + formData.channelDigit + '</b>');
			InkElement.setHTML(Ink.i('ManagePatternConfirmPinDigit'),'Pin digit: <b style="color:red">' + formData.pinDigit + '</b>');

			modalManagePattern = new Modal('#formManagePatternConfirm');
			modalManagePattern.open(); 
        }
	});
}

function managePatternEditSaveClick() {
	Ink.requireModules(['Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(FormSerialize,InkElement,Modal,FormValidator) {
	    var form = Ink.i('formManagePattern');
        if (FormValidator.validate(form)) {
            var formData = FormSerialize.serialize(form);
            
			InkElement.setHTML(Ink.i('ManagePatternConfirmChannel'),'Channel: <b style="color:red">' + formData.channelName + '</b>');
			InkElement.setHTML(Ink.i('ManagePatternConfirmChannelCode'),'Channel code: <b style="color:red">' + formData.channelCode + '</b>,   Channel digit: <b style="color:red">' + formData.channelDigit + '</b>');
			InkElement.setHTML(Ink.i('ManagePatternConfirmPinDigit'),'Pin digit: <b style="color:red">' + formData.pinDigit + '</b>');

			modalManagePattern = new Modal('#formManagePatternConfirm');
			modalManagePattern.open(); 
        }
	});
}

function managePatternConfirmClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
		var confirmMode = Ink.i('confirmMode').innerHTML;
		var uri = '';
		if (confirmMode != 'delete') {
			var form = Ink.i('formManagePattern');
	        var formData = FormSerialize.serialize(form);
	        Ink.i('channelName').disabled = true;
	        if (confirmMode != 'edit') {
	        	uri = window.url_home + '/PatternAdd';
	        } else {
	        	uri = window.url_home + '/PatternUpdate';
	        }
		    new Ajax(uri, {
		        method: 'POST',
		        postBody: formData,
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result);
						if(result==="succeed"){
							menuManagePattern();
						}
		            }
		        }, 
		        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
		        }
		    });
		} else {
			uri = window.url_home + '/PatternDelete?patternId=' + InkElement.textContent('confirmPatternId');
		    new Ajax(uri, {
		        method: 'GET',
		        onSuccess: function(obj) {
		            if(obj && obj.responseJSON) {
		            	var result = obj.responseJSON['result'];
	Ink.log("result: " + result);
						if(result==="succeed"){
							menuManagePattern();
						}
		            }
		        }, 
		        onFailure: function() {result="failed on network!"
	Ink.log("result: " + result);
		        }
		    });
		}
	});
}

function managePatternEditGoBack() {
	Ink.requireModules(['Ink.UI.Carousel_1'], function(Carousel) {
		if (typeof crs == "undefined") {crs = new Carousel('#managePatternCarousel');}
		crs.setPage(1);crs.previousPage();
	});
}

function manageSerialEditClick(PATTERNID) {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Carousel_1','Ink.UI.ProgressBar_1','Ink.Dom.Event_1'], function(Ajax,FormSerialize,InkElement,Carousel,ProgressBar,InkEvent) {
		if (typeof crs == "undefined") {crs = new Carousel('#manageSerialCarousel');}
		crs.nextPage();
		
		InkElement.setHTML(Ink.i('confirmMode'),'edit');
		InkElement.setHTML(Ink.i('confirmPatternId'),PATTERNID);
		Ink.i('buttonConfirm').className += " green";
		Ink.i('buttonConfirm').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		Ink.i('ManagePatternConfirmMSG').innerHTML = "Do you really want to save pattern?";
		
		Ink.i('buttonUpdate').value = '      Save      ';
		InkEvent.on(Ink.i('buttonUpdate'), 'click', managePatternEditSaveClick);
		InkElement.setHTML(Ink.i('managePatternEditHead'),'Edit pattern');
		var uri = window.url_home + '/PatternGetById?patternId='+PATTERNID;
	    new Ajax(uri, {
	        method: 'GET',
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
	            	var PATTERNID= obj.responseJSON['PATTERNID'];
	            	var CHANNEL = obj.responseJSON['CHANNEL'];
	            	var CHANNELCODE = obj.responseJSON['CHANNELCODE'];
	            	var DIGIT = obj.responseJSON['DIGIT'];
	            	var PINDIGIT = obj.responseJSON['PINDIGIT'];
	            	var serial = obj.responseJSON['SERIALFORMAT'];
					if(result==="succeed"){
						Ink.i('patternId').value = PATTERNID;
						InkElement.setHTML(Ink.i('channelName'),CHANNEL);
						InkElement.setHTML(Ink.i('channelCode'),CHANNELCODE);
						Ink.i('serial').value = serial;
						
						Ink.i('serial').setAttribute('maxLength',DIGIT-CHANNELCODE.length);
					}
				}
            }, 
            onFailure: function() {result="failed on network!";
Ink.log("result: " + result);
            }
	    });
	});
}
function manageSerialEditSaveClick() {
	Ink.requireModules(['Ink.Net.Ajax_1', 'Ink.Dom.FormSerialize_1','Ink.Dom.Element_1','Ink.UI.Modal_1','Ink.UI.FormValidator_1'], function(Ajax,FormSerialize,InkElement,Modal,FormValidator) {
		var form = Ink.i('formManageSerial');
        var formData = FormSerialize.serialize(form);
        
		var uri = window.url_home + '/PatternUpdateSerial';
	    new Ajax(uri, {
	        method: 'POST',
	        postBody: formData,
	        onSuccess: function(obj) {
	            if(obj && obj.responseJSON) {
	            	var result = obj.responseJSON['result'];
Ink.log("result: " + result);
					if(result==="succeed"){
						menuManageCurrentMaxSerial();
					}
	            }
	        }, 
	        onFailure: function() {result="failed on network!"
Ink.log("result: " + result);
	        }
	    });

	});
}
function manageSerialEditGoBack() {
	Ink.requireModules(['Ink.UI.Carousel_1'], function(Carousel) {
		if (typeof crs == "undefined") {crs = new Carousel('#manageSerialCarousel');}
		crs.setPage(1);crs.previousPage();
	});
}