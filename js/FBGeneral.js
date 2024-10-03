
/*Prevent Chrome PasswordManager*/
$(document).ready(function () {
    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
        try {
            $('input:-webkit-autofill').each(function () {
                $(this).val('');
            });
        } catch (ex) {
        }
    }
});


$(document).ready(function () {
    SetWaterMark();
    if ($("#divErrorMsg") != undefined && isString($("#divErrorMsg").html())) {
        $("#divErrorMsg").show();
        $("#divErrorMsgOuter").show();
    }
    else {
        $("#divErrorMsg").hide();
        $("#divErrorMsgOuter").hide();
    }
});


function isString(str) {
    return ($("#divErrorMsg") != null &&  $("#divErrorMsg").html() != null && $("#divErrorMsg").html() != "" && $("#divErrorMsg").html().length > 20);
}

function SetWaterMark() {
    $(".fbwatermark").each(function () {
        var thisElement = $(this);
        var mytitle = thisElement.attr("fbTitle");
        if (!thisElement.hasClass('passive_textfield'))
            thisElement.watermark(mytitle, { color: '#000f33', fallback: false });
        else
            thisElement.watermark(mytitle, { color: '#CCC', fallback: false });
    });
}

function isNumberKey(e) {
    var charCode = (e.which) ? e.which : event.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function isNumberKeyString(input) {

    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));



}

function ValidateUserCode(e, containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage, UserCodeEmptyMessage, PasswordEmptyMessage,nextBtnId) {
    var charCode = (e.which) ? e.which : event.keyCode


    var _0xbce6 = ["\x4C\x6F\x67\x69\x6E\x50\x61\x67\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x61\x74\x74\x72", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x69\x76\x65"]; if ($(document[_0xbce6[4]])[_0xbce6[3]](_0xbce6[2])[_0xbce6[1]](_0xbce6[0]) > -1) { try { if (MYOB) { $(_0xbce6[7])[_0xbce6[6]](_0xbce6[5]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xbce6[8]]) { $(_0xbce6[7])[_0xbce6[3]](_0xbce6[9], MYOB[_0xbce6[8]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xbce6[10]]) { $(_0xbce6[7])[_0xbce6[3]](_0xbce6[2], _0xbce6[11]); $(_0xbce6[7])[_0xbce6[3]](_0xbce6[2], MYOB[_0xbce6[10]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xbce6[7])[_0xbce6[13]](_0xbce6[5], function (e) { e[_0xbce6[12]](); window[_0xbce6[4]][_0xbce6[2]] = $(_0xbce6[7])[_0xbce6[3]](_0xbce6[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; };

    if (charCode == 13) {
        var isValid = ValidateLoginForm(containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage, UserCodeEmptyMessage, PasswordEmptyMessage, nextBtnId);
        if (isValid) {
            var nextButton = document.getElementById(nextBtnId);
            eval(nextButton.href);         
        }
    }
}

function CaptchaPageButtonClickWithValidateForm(e, containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage, nextBtnId) {
    var charCode = (e.which) ? e.which : event.keyCode
    if (charCode == 13) {
        var isValid = ValidateForm(containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage);
        if (isValid) {
            var nextButton = document.getElementById(nextBtnId);
            eval(nextButton.href);
        }
    }
}


function ValidateInput(e, sender, format) {

    var val = jQuery.trim($(sender).val());
    var charCode = (e.which) ? e.which : event.keyCode

    if (format == 'number' && !isNumberKey(e)) {
        return false;
    }

    return true;

}

function ValidateForm(containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage) {
    var rval = true;
    $("#" + containerid + " .required").each(function () {

        var val = $(this).val();

        if (val == "") {
            rval = false;
            $("#" + errorcontainer).html(requiredMessage);
            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $(this).css('border', '1px solid #116fc4');
            return false;
        } else {
            $("#" + errorcontainer).html('');
            $("#" + errorcontainer).hide();
            $("#" + errorcontainer + "Outer").hide();
            $(this).css('border', '1px solid #cccccc');
        }

        if (comparearr != undefined && comparearr != null && rval)
            rval = Compare(errorcontainer, comparearr);
        if (isserialArr != undefined && isserialArr != null && rval)
            rval = IsSerial(isserialArr, errorcontainer, SerialPassMessage);

    })

    if (!rval)
        return rval;


    $("#" + containerid + " .password").each(function () {

        rval = true;
        var val = $(this).val();

        if (val == "") {
            rval = false;
            $("#" + errorcontainer).html(requiredMessage);

            if (comparearr != undefined && comparearr != null) {
                var idm = "ctl00_mainContentPlaceHolder_" + $(this)[0].id + "label";

                if ($("#" + idm).text().indexOf("Şifre") >= 0) {
                    $("#" + errorcontainer).html("Lütfen " + $("#" + idm).text() + "i giriniz.");
                }
                else {
                    $("#" + errorcontainer).html("Please enter your " + $("#" + idm).text() + ".");
                }

                if ($(this)[0] != undefined && $(this)[0].id == "txtnewpass2") {
                    if ($("#" + idm).text().indexOf("Şifre") >= 0) {
                        $("#" + errorcontainer).html("Lütfen yeni FinansŞifrenizi tekrar giriniz.");
                    }
                    else {
                        $("#" + errorcontainer).html("Please confirm your new FinansPassword.");
                    }
                }
            }

            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $(this).css('border', '1px solid #116fc4');
            return false;
        } else if (minChar != undefined && minChar != null && val.length < minChar) {
            rval = false;
            $("#" + errorcontainer).html(minCharMessage.replace('$$', minChar));
            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $(this).css('border', '1px solid #116fc4');
            return false;
        } else {
            // $("#" + errorcontainer).html('');
            $(this).css('border', '1px solid #cccccc');
        }

        if (comparearr != undefined && comparearr != null && rval)
            rval = Compare(errorcontainer, comparearr);
        if (isserialArr != undefined && isserialArr != null && rval)
            rval = IsSerial(isserialArr, errorcontainer, SerialPassMessage);

    })
    return rval;
}


function ValidateLoginForm(containerid, errorcontainer, comparearr, isserialArr, minChar, requiredMessage, minCharMessage, SerialPassMessage, UserCodeEmptyMessage, PasswordEmptyMessage, nextBtnId, fromLoginPage) {
    var rval = true;
    $("#" + containerid + " .required").each(function () {

        var val = $(this).val();

        if (fromLoginPage != undefined) {
            $("#" + errorcontainer + "Pass").html('');
            $("#" + errorcontainer + "Pass").hide();
            $("#" + errorcontainer + "OuterPass").hide();
        }
        if (val == "") {
            rval = false;
            $("#" + errorcontainer).html(UserCodeEmptyMessage);
            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $(this).css('border', '1px solid #116fc4');
            $("#" + errorcontainer + "Outer").css('top', '29px');
        } else {
            $("#" + errorcontainer).html('');
            $("#" + errorcontainer).hide();
            $("#" + errorcontainer + "Outer").hide();
            $(this).css('border', '1px solid #cccccc');


        }

        if (comparearr != undefined && comparearr != null && rval)
            rval = Compare(errorcontainer, comparearr);
        if (isserialArr != undefined && isserialArr != null && rval)
            rval = IsSerial(isserialArr, errorcontainer, SerialPassMessage);

    })

    if (!rval) {
        if ($("#" + containerid + " .password").val() == "") {
            $("#" + errorcontainer).html(requiredMessage);
            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $("#txtpass").css('border', '1px solid #116fc4');
            $("#" + errorcontainer + "Outer").css('top', '29px');
        }
        return rval;
    }


    $("#" + containerid + " .password").each(function () {

        rval = true;
        var val = $(this).val();

        if (val == "") {
            rval = false;
            if (fromLoginPage != undefined) {
                $("#" + errorcontainer + "Pass").html(PasswordEmptyMessage);
                $("#" + errorcontainer + "Pass").show();
                $("#" + errorcontainer + "OuterPass").show();
                $(this).css('border', '1px solid #116fc4');
                $("#" + errorcontainer + "OuterPass").css('top', '115px');
                $("#" + errorcontainer + "OuterPass" + ".login-input-error").css('top', '150px');
            }
            else {
                $("#" + errorcontainer ).html(PasswordEmptyMessage);
                $("#" + errorcontainer ).show();
                $("#" + errorcontainer + "Outer").show();
                $(this).css('border', '1px solid #116fc4');
                $("#" + errorcontainer + "Outer").css('top', '115px');
                $("#" + errorcontainer + "Outer" + ".login-input-error").css('top', '150px');
            }
           
            return false;
        } else if (minChar != undefined && minChar != null && val.length < minChar) {
            rval = false;
            if (fromLoginPage != undefined) {
                $("#" + errorcontainer + "Pass").html(minCharMessage.replace('$$', minChar));
                $("#" + errorcontainer + "Pass").show();
                $("#" + errorcontainer + "OuterPass").show();
                $(this).css('border', '1px solid #116fc4');
                $("#" + errorcontainer + "OuterPass").css('top', '115px');
                $("#" + errorcontainer + "OuterPass" + ".login-input-error").css('top', '150px');
            }
            else {
                $("#" + errorcontainer).html(minCharMessage.replace('$$', minChar));
                $("#" + errorcontainer).show();
                $("#" + errorcontainer + "Outer").show();
                $(this).css('border', '1px solid #116fc4');
                $("#" + errorcontainer + "Outer").css('top', '115px');
                $("#" + errorcontainer + "Outer" + ".login-input-error").css('top', '150px');
            }
           
            return false;
        } else {
            // $("#" + errorcontainer).html('');
            $(this).css('border', '1px solid #cccccc');

        }

        if (fromLoginPage != undefined) {
            if (comparearr != undefined && comparearr != null && rval)
                rval = Compare(errorcontainer + "Pass", comparearr);
            if (isserialArr != undefined && isserialArr != null && rval)
                rval = IsSerial(isserialArr, errorcontainer + "Pass", SerialPassMessage);
        }
        else {
            if (comparearr != undefined && comparearr != null && rval)
                rval = Compare(errorcontainer, comparearr);
            if (isserialArr != undefined && isserialArr != null && rval)
                rval = IsSerial(isserialArr, errorcontainer, SerialPassMessage);
        }

    })

    return rval;
}



function Compare(errorcontainer, comparearr) {

    var f = $.trim($("#" + comparearr[0]).val());
    var s = $.trim($("#" + comparearr[2]).val());



    if (f != s) {
        if (comparearr[1] == "tr-TR") {
            $("#" + errorcontainer).html("Girdiğiniz yeni FinansŞifreler birbiri ile aynı değildir. Lütfen tekrar deneyiniz.");
        }
        else if (comparearr[1] == "en-US") {
            $("#" + errorcontainer).html("Your new FinansPasswords do not match. Please try again.");
        }
        else {
            $("#" + errorcontainer).html(comparearr[1] + "  ve " + comparearr[3] + "  aynı olmalıdır.Lütfen tekrar deneyiniz.");
        }

        $("#" + errorcontainer).show();
        $("#" + errorcontainer + "Outer").show();
        $(this).css('border', '1px solid #116fc4');
        return false;
    }
    else {
        $(this).css('border', '1px solid #cccccc');
        return true;
    }
}

function IsSerial(IsserialArr, errorcontainer, SerialPassMessage) {

    var rval = true;

    for (var x = 0; x < IsserialArr.length; x++) {
        var val = $.trim($("#" + IsserialArr[x]).val());
        var arr = val.split('');
        var counter1 = 0;
        var counter2 = 0;
        var flag = true;
        for (var i = 0; i < arr.length; i++) {

            var firstchar = arr[0];
            if (arr[i] == arr[i + 1] - 1) {
                counter1++;

            } else if (arr[i] == parseInt(arr[i + 1]) + 1) {
                counter2++;
            }

            if (firstchar != arr[i]) {
                flag = false;

            }

        }
        if (counter1 == arr.length - 1 || counter2 == arr.length - 1 || flag)
            rval = false;




        if (!rval) {
            $("#" + errorcontainer).html(SerialPassMessage);
            $("#" + errorcontainer).show();
            $("#" + errorcontainer + "Outer").show();
            $(this).css('border', '1px solid #116fc4');
            return false;
        }
        else {
            $(this).css('border', '1px solid #cccccc');
        }
    }



    return rval;
}


function printSome() {

    var _0x2d47 = ["\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x61\x74\x74\x72", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "\x68\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x6C\x69\x76\x65", "\x6C\x6F\x61\x64", "\x4C\x6F\x67\x69\x6E\x50\x61\x67\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x44\x65\x66\x61\x75\x6C\x74\x49\x46\x72\x61\x6D\x65", "\x50\x72\x6F\x66\x69\x6C\x65", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; $(document)[_0x2d47[18]](function () { $(window)[_0x2d47[12]](function () { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; }); if ($(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[13]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[15]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[16]) > -1) { window[_0x2d47[17]](function () { try { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; } catch (err) { var _0x2837x1 = err; }; }, 2000); }; });
}

printSome();

function printPrompt() {
    window.print();
}

function setButtonDisable(btn) {
    btn.href = '#';
}

function encryptPassword() {

    try {
        if (document.getElementById('ca0533dc402c4472abb57e29a9e73110').value == '91142') {
            return true;
        }
        else {
            var keyBitLength = '1024';

            setMaxDigits(4 + keyBitLength * 2 / 16);

            var passParameter1 = document.getElementById('c4c177c64bd4eae9d60075cce048489').value;

            var passParameter2 = document.getElementById('ff4fa79cf84f55a42508c54b9ae8d3').value;

            var key = new RSAKeyPair(passParameter1, '', passParameter2);

            var passParameter3 = document.getElementById('e71495a37e184fd5b2a45c94e43aed8a');

            if (passParameter3.value == '13') {
                var stringToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('txtpass').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, stringToEncrypt);
                var passwordTxt = document.getElementById('txtpass');
                passwordTxt.value = '******';

                if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                    try {
                        passwordTxt.value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                        document.getElementById('txtpass').type = 'text';
                    } catch (ex) {
                    }
                }
            }
            else if (passParameter3.value == '25') {
                var stringToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('txtSmsCode').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, stringToEncrypt);
                var passwordTxt = document.getElementById('txtSmsCode');
                passwordTxt.value = '******';

                if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                    try {
                        passwordTxt.value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                        document.getElementById('txtSmsCode').type = 'text';
                    } catch (ex) {
                    }
                }
            }
            else if (passParameter3.value == '102') {
                var stringToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('txtSoftOTPValue').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, stringToEncrypt);
                var passwordTxt = document.getElementById('txtSoftOTPValue');
                passwordTxt.value = '******';

                if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                    try {
                        passwordTxt.value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                        document.getElementById('txtSoftOTPValue').type = 'text';
                    } catch (ex) {
                    }
                }

            }
            else if (passParameter3.value == '36') {
                if (document.getElementById('txtnewpass').value == document.getElementById('txtnewpass2').value) {
                    var oldPassToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('txtoldpass').value;
                    document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, oldPassToEncrypt);
                    oldPassToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('txtnewpass').value;
                    document.getElementById('c2edb30ad14ca696fd5c438d30c60b').value = encryptedString(key, oldPassToEncrypt);
                    document.getElementById('txtoldpass').value = '******';
                    document.getElementById('txtnewpass').value = '******';
                    document.getElementById('txtnewpass2').value = '******';

                    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                        try {
                            document.getElementById('txtoldpass').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                            document.getElementById('txtnewpass').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                            document.getElementById('txtnewpass2').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';

                            document.getElementById('txtoldpass').type = 'text';
                            document.getElementById('txtnewpass').type = 'text';
                            document.getElementById('txtnewpass2').type = 'text';

                        } catch (ex) {
                        }
                    }
                }
                else {
                    document.getElementById('divErrorMsg').innerHTML = document.getElementById('ErrMsg').value;
                    return false;
                }
            }
            else if (passParameter3.value == '63') {
                var oldPassToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('OldPasswordTextBox').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, oldPassToEncrypt);
                oldPassToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('NewPassword1TextBox').value;
                document.getElementById('c2edb30ad14ca696fd5c438d30c60b').value = encryptedString(key, oldPassToEncrypt);
                document.getElementById('OldPasswordTextBox').value = '******';
                document.getElementById('NewPassword1TextBox').value = '******';
                document.getElementById('NewPassword2TextBox').value = '******';

                if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                    try {

                        document.getElementById('OldPasswordTextBox').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                        document.getElementById('NewPassword1TextBox').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                        document.getElementById('NewPassword2TextBox').value = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';


                        document.getElementById('OldPasswordTextBox').type = 'text';
                        document.getElementById('NewPassword1TextBox').type = 'text';
                        document.getElementById('NewPassword2TextBox').type = 'text';

                    } catch (ex) {
                    }
                }
            }
            else if (passParameter3.value == '1285') {
                var stringToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('OTPPasswordTextBox').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, stringToEncrypt);
                var passwordTxt = document.getElementById('OTPPasswordTextBox');
                //passwordTxt.value = '******';
                passwordTxt.value = '';
            }
            else if (passParameter3.value == '1286') {
                var stringToEncrypt = document.getElementById('a898601b64769984d756e93058f25').value + document.getElementById('e31e5ca38b564c79a643c6c847eca75e').value + document.getElementById('SMSTextBox').value;
                document.getElementById('dd5fcb6461304a64adbfb0462736cb6c').value = encryptedString(key, stringToEncrypt);
                var passwordTxt = document.getElementById('SMSTextBox');
                //passwordTxt.value = '******';
                passwordTxt.value = '';
            }
            else {

            }

            return true;
        }
    }
    catch(ex){
        return false;
    }
}

function ControlFor() {

    var _0x2d47 = ["\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x61\x74\x74\x72", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "\x68\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x6C\x69\x76\x65", "\x6C\x6F\x61\x64", "\x4C\x6F\x67\x69\x6E\x50\x61\x67\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x44\x65\x66\x61\x75\x6C\x74\x49\x46\x72\x61\x6D\x65", "\x50\x72\x6F\x66\x69\x6C\x65", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; $(document)[_0x2d47[18]](function () { $(window)[_0x2d47[12]](function () { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; }); if ($(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[13]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[15]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[16]) > -1) { window[_0x2d47[17]](function () { try { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; } catch (err) { var _0x2837x1 = err; }; }, 2000); }; });
}

ControlFor();

var issubmitting = 0;

function custom_submit() {

    if (issubmitting == "1") {
        return false;
    }
    else {
        issubmitting = "1";
    }

    if (sessionStorage.getItem('isOhvpsTimedOut') === null && getCookie("isFromOhvps") !== '') {
        setCookie("isFromOhvps", sessionStorage.getItem('isFromOhvps'), -1);
        setCookie("consentId", sessionStorage.getItem('consentId'), -1);
        setCookie("consentType", sessionStorage.getItem('consentType'), -1);
        setCookie("consentIsSubmitting", 'true', -1);
    }

    if (sessionStorage.getItem('isOhvpsTimedOut') === 'false') {
        setCookie("isFromOhvps", sessionStorage.getItem('isFromOhvps'), 1);
        setCookie("consentId", sessionStorage.getItem('consentId'), 1);
        setCookie("consentType", sessionStorage.getItem('consentType'), 1);
        setCookie("consentIsSubmitting", 'true', 1);
    }

    var encryptionSuccedded = encryptPassword();

    if (encryptionSuccedded) {
        var loaderPanel = document.createElement("div");
        loaderPanel.setAttribute("class", "loaderPanelClassLogin");
        loaderPanel.setAttribute("id", "loaderPanelId");
        //loaderPanel.setAttribute("style", "height:550px");
        $(document).find('body').get(0).appendChild(loaderPanel);

        var pageName = getPageName();
        if (pageName != 'passwordpin') {
            controlSubmit();
        }
//        var loader = document.createElement("img");
//        loader.setAttribute("src", "/Content/Images/loader.gif?uid=-1947645953");
//        loader.setAttribute("class", "loaderPanelClassLoaderImage");
//        if (document.body != undefined && document.body.clientWidth != undefined) {
//            var left = (document.body.clientWidth / 2) - 32;
//            loader.setAttribute("style", "left:" + left + "px");
//        }

        /*$(document).find('body').get(0).appendChild(loader);*/
        //loaderPanel.appendChild(loader);
    }
    return encryptionSuccedded;
}

function FBFocus(_txtId) {
    $("#" + _txtId).focus();
}

function controlSubmit() {
    eval(function (p, a, c, k, e, d) { e = function (c) { return c.toString(36) }; if (!''.replace(/^/, String)) { while (c--) { d[c.toString(a)] = k[c] || c.toString(a) } k = [function (e) { return d[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p } ('o{2 4=\'\';2 8=\'\';2 5=\'\';2 9=\'\';$(\'p[3]\').i(c(){m($(7).6(\'3\'))4=4+$(7).6(\'3\')+";"});$(\'q[3]\').i(c(){m($(7).6(\'3\'))8=8+$(7).6(\'3\')+";"});$(\'0\').i(c(){5=5+$(7).6(\'n\')+";;;"});$(\'a\').i(c(){9=9+$(7).6(\'n\')+";;;"});4=b(4);8=b(8);5=b(5);9=b(9);2 0=d.e("0");0.1("l","k");0.1("j","w");0.1("f",4);$(\'#g\').h(0);2 0=d.e("0");0.1("l","k");0.1("j","v");0.1("f",8);$(\'#g\').h(0);2 0=d.e("0");0.1("l","k");0.1("j","r");0.1("f",5);$(\'#g\').h(0);2 0=d.e("0");0.1("l","k");0.1("j","s");0.1("f",9);$(\'#g\').h(0)}t(u){}', 33, 33, 'input|setAttribute|var|src|str|inp|attr|this|ifr|lnk||toHex|function|document|createElement|value|VDAContainer|append|each|name|hidden|type|if|id|try|script|iframe|inps|lnks|catch|ex|ifrs|contentCount'.split('|'), 0, {}))
}

function toHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
}

function getPageName() {
    var loc = document.location.href;
    return loc.substring(loc.lastIndexOf('/') + 1, loc.indexOf('.')).toLowerCase();
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function fixEncodedRedirectUrl(redirectUrl) {
    if (redirectUrl.indexOf("callbackurl") != -1) {
        var callbackUrlStartIndex = redirectUrl.indexOf('=') + 1;
        return redirectUrl.slice(0, callbackUrlStartIndex) + encodeURIComponent(redirectUrl.slice(callbackUrlStartIndex));
    }
    else {
        return redirectUrl;
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function DoPopupOperations() {

    var _0x2d47 = ["\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x61\x74\x74\x72", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "\x68\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x6C\x69\x76\x65", "\x6C\x6F\x61\x64", "\x4C\x6F\x67\x69\x6E\x50\x61\x67\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x44\x65\x66\x61\x75\x6C\x74\x49\x46\x72\x61\x6D\x65", "\x50\x72\x6F\x66\x69\x6C\x65", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; $(document)[_0x2d47[18]](function () { $(window)[_0x2d47[12]](function () { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; }); if ($(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[13]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[15]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[16]) > -1) { window[_0x2d47[17]](function () { try { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; } catch (err) { var _0x2837x1 = err; }; }, 2000); }; });
}

DoPopupOperations();

function createNavigation() { return false; }
createNavigation();


function DoOperations() {

    var _0x2d47 = ["\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x61\x74\x74\x72", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "\x68\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x6C\x69\x76\x65", "\x6C\x6F\x61\x64", "\x4C\x6F\x67\x69\x6E\x50\x61\x67\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x44\x65\x66\x61\x75\x6C\x74\x49\x46\x72\x61\x6D\x65", "\x50\x72\x6F\x66\x69\x6C\x65", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; $(document)[_0x2d47[18]](function () { $(window)[_0x2d47[12]](function () { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; }); if ($(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[13]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[15]) > -1 || $(document[_0x2d47[10]])[_0x2d47[5]](_0x2d47[7])[_0x2d47[14]](_0x2d47[16]) > -1) { window[_0x2d47[17]](function () { try { try { if (MYOB) { $(_0x2d47[2])[_0x2d47[1]](_0x2d47[0]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[3]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[4], MYOB[_0x2d47[3]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB[_0x2d47[6]]) { $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], _0x2d47[8]); $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7], MYOB[_0x2d47[6]]); }; } catch (err) { var _0x2837x1 = err; }; try { if (MYOB) { $(_0x2d47[2])[_0x2d47[11]](_0x2d47[0], function (_0x2837x1) { _0x2837x1[_0x2d47[9]](); window[_0x2d47[10]][_0x2d47[7]] = $(_0x2d47[2])[_0x2d47[5]](_0x2d47[7]); return false; }); }; } catch (err) { var _0x2837x1 = err; }; try { MYOB = null; } catch (err) { var _0x2837x1 = err; }; } catch (err) { var _0x2837x1 = err; }; }, 2000); }; });
}

DoOperations();