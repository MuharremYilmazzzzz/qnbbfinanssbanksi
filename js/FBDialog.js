


function FBAppendChild(currentElement, elementForAppend) {

    if (!$.browser.msie) {
        currentElement.appendChild(elementForAppend);
    }
    else {
        currentElement.innerHTML += elementForAppend.outerHTML;
    }
    return currentElement;


}

var popupheader_birebir_icon = new Object();

popupheader_birebir_icon.className = "popupheader_birebir_icon";

popupheader_birebir_icon.id = "birebir";



var popupheader_mail_icon = new Object();

popupheader_mail_icon.className = "popupheader_mail_icon";

popupheader_mail_icon.id = "mail";



var popupheader_mybills_icon = new Object();

popupheader_mybills_icon.className = "popupheader_mybills_icon";

popupheader_mybills_icon.id = "mybills";



var popupheader_onay_icon = new Object();

popupheader_onay_icon.className = "popupheader_onay_icon";

popupheader_onay_icon.id = "onay";



var popupheader_save_icon = new Object();

popupheader_save_icon.className = "popupheader_save_icon";

popupheader_save_icon.id = "save";



//#region

var popupheader_sms_icon = new Object();

popupheader_sms_icon.className = "popupheader_sms_icon";

popupheader_sms_icon.id = "sms"

//#endregion





var popupheadericonsArr = [popupheader_birebir_icon, popupheader_mail_icon, popupheader_mybills_icon, popupheader_onay_icon, popupheader_save_icon, popupheader_sms_icon];

var cloneCounter = 0;



$(function () {

    //  CreateConfirmPopUpDialogs();

    //   CreateConfirmPopUpDialogsIframe();

    CreatePupUpBg();
})



var isServerControl = false;

var senderid;



var iconobj_1 = new Object();

iconobj_1.imgtype = "onay";

iconobj_1.imgname = "onay_img.png?uid=-1947645703";



var iconobj_2 = new Object();

iconobj_2.imgtype = "hata";

iconobj_2.imgname = "hata_img.png?uid=-1947645703";

var bgiconpath = "images/";



var ArrDialogIcons = [iconobj_1, iconobj_2];

var containerclassname;

var prmSlideMode;



function PopUpObj(_id, _prmSlideMode, _prmExtraOpt) {//insert:23.11.2011

    this.id = _id;
    this.extraOpt = _prmExtraOpt;
    this.slideMode = _prmSlideMode;
}

var globalCounter = 0;
var SetIframeOnEnd = false;
function FBDialog(sender, headerErrMsg, errMsg, buttonCommandArray, prmIsServerControl, _prmSlideMode, _mywindow, _prmExtraOpt) {

    // document.getElementById('tempSpan').innerHTML = 'FBDialog başlangıcı' + globalCounter;
    // globalCounter++;

    /*  buttonCommandArray; 

    0:commandName , 

    1:callbackFunciton , 

    2:temppostUrl, 

    3:canpostback , 

    4:myPosition

    */


    //  _prmExtraOpt-----> bu paremetrede geri kalan tüm paremetreleri json göndereceğim.

    // default değerler set ediliyor.

    if (_prmExtraOpt[0].language == undefined || _prmExtraOpt[0].language == "") {

        _prmExtraOpt[0].language = "tr"; // default değerler

    }

    if (_prmExtraOpt[0].isTimerPopUp == undefined || _prmExtraOpt[0].isTimerPopUp == "") {

        _prmExtraOpt[0].isTimerPopUp = false;  // default değerler

    }


    if (_prmExtraOpt[0].width == undefined || _prmExtraOpt[0].width == "") {

        _prmExtraOpt[0].width = 200; // default değerler

    }

    if (_prmExtraOpt[0].height == undefined || _prmExtraOpt[0].height == "") {

        _prmExtraOpt[0].height = 300;

    }

    if (_prmExtraOpt[0].showCloseIcon == undefined) //insert:23.11.2011

        _prmExtraOpt[0].showCloseIcon = false; //insert:23.11.2011

    if (_prmExtraOpt[0].closeOnClicked == undefined) //insert:23.11.2011

        _prmExtraOpt[0].closeOnClicked = true; //insert:23.11.2011

    if (_prmExtraOpt[0].isCampaignPopUp == undefined && _prmExtraOpt[0].isCampaignPopUp == "")

        _prmExtraOpt[0].isCampaignPopUp = false;






    var mywindow;

    if (_mywindow == undefined && _mywindow != '')

        mywindow = eval(window);

    else

        mywindow = _mywindow;









    prmSlideMode = _prmSlideMode;

    var errContentType = 0;



    var errContentType = errMsg[0];

    var errContentIcon = errMsg[2];



    switch (errContentType) {

        case 0:

            containerclassname = ".hatamesaji1Confirm";

            break;

        case 2:

            containerclassname = ".hatamesaji1ConfirmIframe";

            break;

        case 1:

            containerclassname = ".hatamesaji1Confirm";



            break;

        default:

            containerclassname = ".hatamesaji1Confirm";

    }









    var clone = $(containerclassname).clone(true).get(0);



    clone.className = clone.className + " popupclone";

    clone.setAttribute("id", "clone_" + cloneCounter);

    cloneCounter++;

    $(clone).css("z-index", (30001 + cloneCounter));

    $(".popupbg").css("z-index", (30001 + cloneCounter));

    document.body.appendChild(clone);
    if (prmSlideMode != "slideDown") {
        $(clone).draggable({ handle: ".header2" });
        $("#footerPopUpMask").hide();
    }
    else if (prmSlideMode == "slideDown") {
        $("#footerPopUpMask").show();
        $("#footerPopUpMask").css("z-index", 30003);
    }
    containerclassname = "#" + clone.id; // buradan sonra yeni selector id ye göre clonu oluyor.

    var CurrentPopUp = new PopUpObj(containerclassname, prmSlideMode, _prmExtraOpt); //insert:23.11.2011

    BindEvent(mywindow, sender, containerclassname, CurrentPopUp); // eventler ekleniyor.

    $(containerclassname).find(".popupButtonContainer").removeClass("tr").removeClass("en").addClass(CurrentPopUp.extraOpt[0].language);
    $(containerclassname).find(".btnClassName").hide();



    //  document.getElementById('tempSpan').innerHTML += 'globalCounter  =' + globalCounter + ' SATIR : 275 ';

    $(containerclassname).get(0).isIframe = false;

    switch (errContentType) {

        case 1:

            var xx = $(mywindow.document.getElementById(errMsg[1]).cloneNode(true)).show();
            // var tempDivForIframe = xx;

            if (_prmExtraOpt[0].isTimerPopUp) {
                $(containerclassname).find(".viewport").css("margin", "0 auto");
                $(containerclassname).find(".hata_msj").html(xx);
            }
            else {
                if ($.browser.msie)
                    $(containerclassname).find(".hata_msj").html(xx.get(0).outerHTML);
                else
                    $(containerclassname).find(".hata_msj").html(xx);
            }


            AddTargetToPopupContentLinks(CurrentPopUp); //insert:23.11.2011

            $(containerclassname).find(".hata_msj").css({ "margin": 0, "padding": 0 }); /*insert:03.11.2011*/

            break;

        case 2:

            $(containerclassname).find(".hata_msj").css({ padding: 0 });
            if (prmSlideMode == "slideDown")
                $(containerclassname).get(0).isFooterPopUp = true;
            else
                $(containerclassname).get(0).isFooterPopUp = false;

            $(containerclassname).get(0).isClosedPopUp = true;

            if (!window.opera) {
                //  document.getElementById('tempSpan').innerHTML += 'globalCounter  =' + globalCounter + ' SATIR : 296 NOT OPERA';
                $(containerclassname).find(".hata_msj > .hata_msj_iframe").attr("src", errMsg[1]);
            }
            else {
                //  document.getElementById('tempSpan').innerHTML += '<br>SATIR : 300  OPERA <br> Element : ' + $(containerclassname).find(".hata_msj > .hata_msj_iframe").get(0).src;
                // setTimeout($(containerclassname).find(".hata_msj > .hata_msj_iframe").attr("src", errMsg[1]), 3000);
                //  $(containerclassname).find(".hata_msj > .hata_msj_iframe").get(0).src = errMsg[1];
                SetIframeOnEnd = true;
            }


            $(containerclassname).get(0).isIframe = true;

            break;

        default:

            {

                $(containerclassname).find(".hata_msj").html(errMsg[1]);

                AddTargetToPopupContentLinks(CurrentPopUp); //insert:23.11.2011

            }



    }



    if (headerErrMsg[0] != "display:none") {

        $(containerclassname).find(".popupcontentRoundedCornerDiv").hide();

        $(containerclassname).find(".headerErrMsg").html(headerErrMsg[0]);

        $(containerclassname).find(".popupcontentRoundedCornerDiv").hide();

        $(containerclassname + " > div:eq(4)").css("border-top", "0px solid"); /**Changed in 19.11.2011 for Rounded Corners***/





    }

    else {

        $(containerclassname).find(".popupcontentRoundedCornerDiv").show();
        $(containerclassname + " > div:lt(3)").hide();
        $(containerclassname + " > div:eq(4)").css("border-top", "0px solid"); /**Changed in 19.11.2011 for Rounded Corners***/


    }





    if (headerErrMsg[1] != undefined && headerErrMsg[1] != "" && headerErrMsg[1] != "none") {

    }





    if (errContentIcon != undefined && !$(containerclassname).get(0).isIframe) {



        $(ArrDialogIcons).each(function (i, v) {

            if (v.imgtype == errContentIcon) {

                //  $(containerclassname).find(".hata_msj").css("background", "url(" + bgiconpath + v.imgname + ") no-repeat ");



            }

        })



    } else if (!$(containerclassname).get(0).isIframe) {

        // $(containerclassname).find(".hata_msj").css("background-image", "url(" + bgiconpath + ArrDialogIcons[1].imgname + ") no-repeat scroll 0 0 transparent");

    }





    var arr = eval(buttonCommandArray); // 0:commandName , 1:callbackFunciton , 2:temppostUrl, 3:canpostback , 4:myPosition

    if (arr[0] == undefined && errContentType == 2) {



        $(containerclassname).find(".popupButtonContainer").remove();

        $(containerclassname + "  .hata_msj").css("border-bottom", "0px");

    }



    if (arr[0] == undefined) {

        $(containerclassname).find(".popupButtonContainer").remove();

        $(containerclassname + "  .hata_msj").css("border-bottom", "0px");

    }





    if (prmIsServerControl == undefined || prmIsServerControl == false || prmIsServerControl == "") {



        var Tempposition = "right";

        $(arr).each(function (i, v) {



            if (v.split(',')[4] == "" || v.split(',')[4] == "right")

                Tempposition = "right";

            else

                Tempposition = "left";



            $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").css("float", Tempposition);





            if ((v.split(',')[0]) == "cmdCancel") {

                $(containerclassname).find(".close_icon").attr("callbackfunction", v.split(',')[1]);

            }



            $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").show();



            var temp1 = v.split(',')[1];

            var temppostUrl = v.split(',')[2];



            if (temp1 != undefined && temp1 != "") {

                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").attr("callbackfunction", temp1);

            }

            if (temppostUrl != undefined && temppostUrl != "") {

                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(0).postUrl = temppostUrl;

                if ($(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1) != undefined)
                    $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1).postUrl = temppostUrl;

                if ((v.split(',')[0]) == "cmdCancel") {

                    $(containerclassname).find(".close_icon").get(0).postUrl = temppostUrl;

                }

            }



        });

    }

    else {



        isServerControl = prmIsServerControl;

        //  $(containerclassname +" [commandtype=cmdCancel]").attr("callbackfunction", "cancelfunction");

        var Tempposition = "right";





        if (arr[0] != undefined) {

            $(arr).each(function (i, v) {

                if (v.split(',')[4] == "" || v.split(',')[4] == "right")

                    Tempposition = "right";

                else

                    Tempposition = "left";



                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").css("float", Tempposition);

                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(0).isServerControl = true;

                if (_prmExtraOpt[0].showCloseIcon) {
                    if ($(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1) != undefined) {
                        $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1).isServerControl = true;
                    }
                }





                if (v.split(',')[0] == "cmdCancel")

                    $(containerclassname + " .close_icon").get(0).isServerControl = true;



                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(0).postUrl = (v.split(',')[2]);

                if (_prmExtraOpt[0].showCloseIcon) {
                    if ($(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1) != undefined) {
                        $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").get(1).postUrl = (v.split(',')[2]); //28.11.2011                    
                    }
                }



                if (v.split(',')[0] == "cmdCancel")

                    $(containerclassname + " .close_icon").get(0).postUrl = (v.split(',')[2]);



                $(containerclassname + "  div[commandtype=" + v.split(',')[0] + "]").get(0).canPostBack = v.split(',')[3];



                if (v.split(',')[0] == "cmdCancel")

                    $(containerclassname + " .close_icon").canPostBack = v.split(',')[3];



                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]").attr("callbackfunction", v.split(',')[1]);

                if (v.split(',')[0] == "cmdCancel")

                    $(containerclassname + " .close_icon").attr("callbackfunction", v.split(',')[1]);



                $(containerclassname + " div[commandtype=" + v.split(',')[0] + "]," + containerclassname + " .close_icon").show();



            });



        } else {

            $(containerclassname + " .close_icon").get(0).isServerControl = true;
            $(containerclassname).slideMode = prmSlideMode;

        }

    }

    if (!_prmExtraOpt[0].showCloseIcon)

        $(containerclassname).find(".header2 .close_icon").hide();



    if (errContentType == 1) {

        var generalWidth = $(containerclassname).find(".hata_msj>:first-child").outerWidth();

        if (_prmExtraOpt[0].width != undefined)  /*edit:03.11.2011*/

            generalWidth = _prmExtraOpt[0].width;

        $(containerclassname).css("width", generalWidth + 40);
        $(containerclassname).find(".header2").css("width", (generalWidth + 22));

        $(containerclassname).find(".popupcontent").css("width", (generalWidth + 18));


        $(containerclassname).find(".scrollbarmain").css({ width: generalWidth + 18, height: (_prmExtraOpt[0].height == undefined ? 200 : _prmExtraOpt[0].height) }); /*edit:03.11.2011*/

        $(containerclassname).find(".scrollbarmain .viewport").css({ "width": generalWidth, border: "0", height: (_prmExtraOpt[0].height == undefined ? 200 : _prmExtraOpt[0].height) }); /*edit:03.11.2011*/



    }

    else if (errContentType == 0) {



        $(containerclassname).find(".popupcontent").css("width", 500);

        if (_prmExtraOpt[0].width != undefined && _prmExtraOpt != undefined)  /*edit:03.11.2011*/
        {

            $(containerclassname).css("width", _prmExtraOpt[0].width);

            $(containerclassname + " .header2").css("width", _prmExtraOpt[0].width - 16);

            $(containerclassname + " .popupcontent").css("width", (_prmExtraOpt[0].width - 22));

            $(containerclassname + " .scrollbarmain .viewport").css({ "border": "0px", "width": _prmExtraOpt[0].width - 30 });

            $(containerclassname + " .scrollbarmain").css({ width: (_prmExtraOpt[0].width - 15) });

        }



        if (_prmExtraOpt[0].height != undefined && _prmExtraOpt != undefined)  /*edit:03.11.2011*/
        {

            $(containerclassname).find(".scrollbarmain .viewport").css({ "border": "0px", "height": _prmExtraOpt[0].height });

            $(containerclassname).find(".scrollbarmain").css({ "border": "0px", "height": _prmExtraOpt[0].height });

        }







    }
    else if (errContentType == 2) {

        if (_prmExtraOpt[0].width != undefined && _prmExtraOpt[0].width != "") {  /*edit:03.11.2011*/

            $(containerclassname).css("width", _prmExtraOpt[0].width); /*edit:19.11.2011 by Serhat, +2 was added to align round corners*/

            $(containerclassname + " .header2").css("width", _prmExtraOpt[0].width - 16);

            $(containerclassname + " .popupcontentRoundedCornerDiv_bottom").css("width", _prmExtraOpt[0].width + 1);

            if (_prmExtraOpt[0].isCampaignPopUp != undefined && _prmExtraOpt[0].isCampaignPopUp) {
                $(containerclassname + " .popupcontentRoundedCornerDiv_bottom").hide();
                $(containerclassname + " .popupcontentRoundedCornerDiv").hide();
                $(containerclassname).find(".hata_msj_iframe").attr("allowtransparency", "1");
                $(containerclassname).find(".hata_msj_iframe").attr("allowTransparency", "1");
                $(containerclassname).find(".popupcontent").css({ "backgroundColor": "transparent", "border": "0px" });
            }
            $(containerclassname + " .popupcontent").css("width", _prmExtraOpt[0].width - 1);

            if (prmSlideMode != "slideDown") {
                try {
                    var loader = document.createElement("img");
                    loader.setAttribute("src", "/Content/Images/loader.gif?uid=-1947645703");
                    loader.setAttribute("class", "loaderPanelClassLoaderImage");
                    loader.setAttribute("id", "popupLoaderPanelIdLoaderImage");
                    var loaderLeft = _prmExtraOpt[0].width / 2 - 75;
                    var loaderTop = _prmExtraOpt[0].height / 2 - 26;
                    loader.style.position = "absolute";
                    loader.style.top = loaderTop + "px";
                    loader.style.left = loaderLeft + "px";
                    loader.style.width = "150px";
                    loader.style.height = "52px";
                    $(containerclassname + " .popupcontent").get(0).appendChild(loader);
                }
                catch (ex) { }
            }

            $(containerclassname + " IFRAME:first-child").css({ width: _prmExtraOpt[0].width });
            $(containerclassname + " IFRAME:first-child").attr("width", (_prmExtraOpt[0].width));
            $(containerclassname + " .hata_msj_iframe").load(function () {
                $(this).contents().find(".content").css({ "width": (_prmExtraOpt[0].width), "height": _prmExtraOpt[0].height });
                try {
                    var loader = $(containerclassname + " .popupcontent #popupLoaderPanelIdLoaderImage").get(0);
                    if (loader != undefined) {
                        var parentDiv = $(containerclassname + " .popupcontent").get(0);
                        var imgChild = $(containerclassname + " .popupcontent").get(0).lastChild;
                        parentDiv.removeChild(imgChild);
                    }

                }
                catch (ex) { }
            });
        }

        if (_prmExtraOpt[0] != undefined && _prmExtraOpt[0].height != undefined) {

            $(containerclassname + " .popupcontent .hata_msj").css({ height: _prmExtraOpt[0].height });
            $(containerclassname + " IFRAME:first-child").css({ height: _prmExtraOpt[0].height });
            $(containerclassname + " IFRAME:first-child").attr("height", _prmExtraOpt[0].height);

        }



    }

    if (prmSlideMode != null && prmSlideMode == 'slideDown' && errContentType == 2) {
        $("#footerPopUpMask").show();
        $(containerclassname).find(".popupcontentRoundedCornerDiv_bottom").hide();

        if (arr[0] != undefined) {
            var html = parent.top.document.getElementsByTagName('html').item(0);

            var popupTop = 647 - (parseInt($(containerclassname + " .popupcontent .hata_msj").css("height")) + 94);

            var popUpLeft = (980 - $(containerclassname).width()) / 2;

            $(html).css('overflow', 'hidden');

            $(containerclassname).css({ left: popUpLeft });

            $(containerclassname).show().animate({ top: popupTop }, function () {
                $("#footerPopUpMask").hide();
                $(html).attr('style', '');
            });

        }

        else {
            var html = parent.top.document.getElementsByTagName('html').item(0);

            var popupTop = 647 - (parseInt($(containerclassname + " .popupcontent .hata_msj").css("height")) + 74);

            var popUpLeft = (980 - $(containerclassname).width()) / 2;

            $(html).css('overflow', 'hidden');

            $(containerclassname).css({ left: popUpLeft });

            $(containerclassname).show().animate({ top: popupTop }, function () {
                var html2 = parent.top.document.getElementsByTagName('html').item(0);
                $("#footerPopUpMask").hide();
                $("#footerPopUpMask").css("z-index", 30003);
                $(".popupbg").fadeIn("slow");
                $(html2).attr('style', '');


            });

        }

        var footerClone = $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer").clone(false).get(0);
        /*  
        var vda_container = parent.top.document.createElement("div");   //$("IFRAME").contents().find(".vda_container").clone(false);
        vda_container.className = "vda_container";
        vda_container.id = "vda_container";
        vda_container.style.display = 'none';
       
       
        $(vda_container).css({ "bottom":"30px", "zIndex": "30040", "left": "563px", "overflow": "hidden", "position": "absolute" });
        var vdaHeaderDiv = $("IFRAME").contents().find(".vda_container .header").clone(true).get(0);
        var vdaContentDiv = $("IFRAME").contents().find(".vda_container .header").next("div").clone(true).get(0);
        vdaContentDiv.style.cssText = "background : none repeat scroll 0 0 #FBF4F8";
        var vdaFootertDiv = parent.top.document.createElement("div"); //$("IFRAME").contents().find(".vda_container .footer").next("div").next("div").clone(true).get(0);
        vdaFootertDiv.className = "footer";
        vdaFootertDiv.style.width = "353px";
    
       
        vda_container = FBAppendChild(vda_container, vdaHeaderDiv);

        
        vda_container = FBAppendChild(vda_container, vdaContentDiv);

    
        vda_container=  FBAppendChild(vda_container, vdaFootertDiv);
        */

        var footerilh = parent.top.document.createElement("div");
        footerilh.className = "footer";


        var subMenuDivForA;
        var vdaLayd = document.createElement("div");
        vdaLayd.className = "vda_icon";
        $(vdaLayd).bind("click", function () { showVDA1(this); });
        var userBuble = document.createElement("img");
        userBuble.setAttribute("src", "/Content/Images/user_bubble.png?uid=-1947645703");
        userBuble.setAttribute("width", "60");
        userBuble.setAttribute("height", "50");
        vdaLayd.appendChild(userBuble);

        footerilh.appendChild(vdaLayd)





        var mesajCount = $(footerClone).find(".mesaj_pop span").html();
        if (mesajCount == undefined || parseInt(mesajCount) <= 0 || mesajCount == "" || mesajCount == null)
            mesajCount = 0;

        footerilh.appendChild($('<div style="display: ' + (mesajCount == 0 ? "none" : "block") + ';" class="mesaj_pop" id="ctl00_mesaj_pop"><span id="ctl00_lblUserNewMessageCount">' + mesajCount + '</span></div>').get(0));  //$(footerClone).find(".mesaj_pop").get(0).outerHTML;
        var footerItemLength = $(footerClone).find(".footer_menu").length;

        $(footerClone).find(".footer_menu").each(function (i, v) {
            var subMenuItem = document.createElement("div");
            subMenuItem.className = "footer_menu";
            if ($(this).find("a").get(0) != undefined && $(this).find(".toolTipVda").get(0) == undefined) {
                var subMenuDivForA = document.createElement("div");
                subMenuDivForA.id = "clone_" + $(this).find("a").get(0).id;
                if ($(this).find("a").get(0).id != sender.id) {
                    $(subMenuDivForA).css("opacity", "0.4");
                }
                subMenuDivForA.className = $(this).find("a").get(0).className;
                subMenuDivForA.innerHTML = $(this).find("a").get(0).innerHTML;
                $(subMenuDivForA).css("padding-left", "25px");
                subMenuItem.appendChild(subMenuDivForA);


            } else {
                if (i < (footerItemLength - 1))
                    subMenuItem.innerHTML = "|";
            }


            footerilh.appendChild(subMenuItem);

        })


        // document.forms[0].appendChild($(vda_container).get(0));

        //--


        var toolTipVdaDiv = parent.top.document.createElement("div");
        toolTipVdaDiv.className = "toolTipVda";

        var kulak2 = parent.top.document.createElement("div"); // kulak2   //$(footerClone).find(".toolTipVda .kulak2").get(0);
        kulak2.className = "kulak2";
        var mytooltipContentVDA = parent.top.document.createElement("div");
        mytooltipContentVDA.className = "mytooltipContentVDA";

        var FBVDAMessage = parent.top.document.createElement("div");
        FBVDAMessage.className = "FBVDAMessage";
        FBVDAMessage.innerHTML = $(footerClone).find(".toolTipVda  .mytooltipContentVDA .FBVDAMessage").html();

        mytooltipContentVDA.appendChild(FBVDAMessage);


        toolTipVdaDiv.appendChild(kulak2);
        toolTipVdaDiv.appendChild(mytooltipContentVDA);

        //   toolTipVdaDiv.appendChild(toolTipVdaDiv); // $(footerClone).find(".toolTipVda").get(0).innerHTML;



        var subMenuItemVdaToolTip = parent.top.document.createElement("div");

        subMenuItemVdaToolTip.className = "footer_menu";

        subMenuItemVdaToolTip.appendChild(toolTipVdaDiv);  //+= toolTipVdaContainer.innerHTML;



        footerilh.appendChild(subMenuItemVdaToolTip);
        //toolTipVda


        footerilh.id = "footer_" + cloneCounter;
        //$("#tempFooter").get(0).innerHTML = "";


        //TEK TUŞ İŞLEMLERİM İÇİN - Fake tek tuş ekleniyor.
        var oneclick = document.createElement("div");
        oneclick.className = "footermyoneopacity";

        var click45 = document.createElement("a");

        if (footerilh.innerHTML.indexOf("Ayarlarım") > 0) {
            click45.innerText = "Tek Tuş İşlemlerim";
        }
        else {
            click45.innerText = "My 1 Click Transactions";
        }
       
        click45.setAttribute("class", "MyOneClickTransactions");
        oneclick.appendChild(click45);
        $("#tempFooter").get(0).appendChild(oneclick);
        //END OF TEK TUŞ İŞLEMLERİM İÇİN

        $("#tempFooter").get(0).appendChild(footerilh);
        $("#tempFooter .footer").hide();
        footerilh.style.display = 'block';

        $("#tempFooter").show();
        // if ($(vdaHeaderDiv).attr("isOpen") == "true")
        //    $("#tempFooter .vda_icon").trigger("click");






    }

    else if (prmSlideMode != null && prmSlideMode != 'slideDown' && errContentType == 2) { // 14.11.2011 DON'T DELETE

        var popUpLeft = (980 - $(containerclassname).width()) / 2;

        $(containerclassname).css({ left: popUpLeft })

        var popUpTop = 0;
        if ($(containerclassname + " .hata_msj").height() > 449) {
            popUpTop = ((550 - $(containerclassname + " .hata_msj").height()) / 2);
        }
        else {
            popUpTop = ((650 - $(containerclassname + " .hata_msj").height() - 23) / 2);
        }        

        if (errMsg[1] != undefined && errMsg[1].indexOf("/Popup/ReceiptPopup.aspx") != -1) {
            popUpTop = 5;
        }

        $(containerclassname).css({ top: popUpTop }).show();

    }

    else {
        //  $(containerclassname).find(".popupcontentRoundedCornerDiv_bottom").hide();

        var popUpLeft = (980 - $(containerclassname).width()) / 2;

        $(containerclassname).css({ left: popUpLeft });

        var popUpTop = (580 - $(containerclassname).height() + 23) / 2;

        if (arr[0] != undefined)  /*insert:03.11.2011*/

            $(containerclassname).css({ top: popUpTop }).show(); /*insert:03.11.2011*/

        else

            $(containerclassname).css({ top: popUpTop }).show(); /*insert:03.11.2011*/

    }


    if (prmSlideMode != 'slideDown' && errContentType != 2)
        $(".popupbg").fadeIn("slow").focus();
    else if (prmSlideMode != 'slideDown')
        $(".popupbg").fadeIn("slow").focus();

    if (SetIframeOnEnd)
        $(containerclassname).find(".hata_msj > .hata_msj_iframe").get(0).src = errMsg[1];

    try {

        $('.scrollbarmain').tinyscrollbar();

    }

    catch (ex) { }

    var tabElementList = $("div[id^='clone_'] *:not(:has(*))").not(":empty, script, style");

    tabElementList.each(function (i, obj) {
        if (!($(tabElementList[i]).html() === null || $(tabElementList[i]).html().match(/^ *$/) !== null)) {
            $(tabElementList[i]).attr("title", $(tabElementList[i]).html());
            $(tabElementList[i]).attr("tabindex", "0");
            $(tabElementList[i]).css("outline", "none");
        }
    });

    return false;

}



//**************************

function BindEvent(mywindow, sender, popupid, CurrentPopUp) {
    $(popupid + " [commandtype^=cmd]").click(function () {

        if (sender) {

            senderid = sender.id;

            if (sender.tagName == "A")

                senderid = senderid.replace(/_/g, '$');

        }



        var mycommandtype = $(this).attr("commandtype");

        if (this.isServerControl == false || this.isServerControl == undefined || this.isServerControl == "") {

            var myFunction = $(this).attr("callbackfunction");

            if (myFunction != "") {

                if (mywindow[myFunction] != undefined)

                    mywindow[myFunction]();

                else if (parent.top.window[myFunction] != undefined)

                    parent.top.window[myFunction]();
                if (mycommandtype != "cmdCancel" && parent.top.senderid != "ZoomButtonForGrid")
                    closePopup(this);



            } else if (this.postUrl != undefined && this.postUrl != "") {

                closePopup(this);

                toggleLoading(true);

                mywindow.location.href = this.postUrl;

            }

        }

        else {

            if ((this.canPostBack == "" || !this.canPostBack || this.canPostBack == "true") && mycommandtype != "cmdCancel") { /*edit:04.11.2011*/

                closePopup(this);

                mywindow.__doPostBack(senderid, '');

                if (CurrentPopUp.slideMode == 'slideDown')
                    $("#tempFooter").html('');

                return;



            }

            var myFunction = $(this).attr("callbackfunction");

            if (myFunction != "") {

                mywindow[myFunction]();

                closePopup(this);

            } else if (this.postUrl != undefined && this.postUrl != "") {

                mywindow.location.href = this.postUrl;

                closePopup(this);

            }



        }





        if (mycommandtype == "cmdCancel") {

            if (prmSlideMode == undefined || prmSlideMode == "" || prmSlideMode == "none") {

                closePopup(this);

            }

            else {

                $(this).closest("div[class^=hatamesaji1Confirm]").animate({ top: 680 }, function () { $("#tempFooter").html(''); $(this).remove(); });

                $(this).closest("div[class^=hatamesaji1ConfirmIframe]").animate({ top: 680 }, function () { $("#tempFooter").html(''); $(this).remove(); });



                cloneCounter--;

                $(".popupbg").css("z-index", (30001 + cloneCounter));



                if (cloneCounter < 1) {

                    $(".popupbg").fadeOut("slow");

                }



            }



        }



    })
}



function closePopup(obj) {
    var popAP = $(obj).closest("div[class^=hatamesaji1Confirm]");
    popAP.find(".hata_msj_iframe").attr("src", "about:blank");
    popAP.remove();

    cloneCounter--;

    $(".popupbg").css("z-index", (30001 + cloneCounter));


    if (cloneCounter < 1) {

        $("#tempFooter").html('');
        $("#tempFooter").hide();

        $(".popupbg").fadeOut("slow");

    }
}

//*********************************************************************************





//***********************************************************

function cancelfunction() {



}

function yesfunction() {



}

function resendfunction() {



}



function savefunction() {



}



//*******************************************************



function CreatePupUpBg() {

    var popupbg = document.createElement("div");

    popupbg.style.opacity = "0.4";

    popupbg.style.filter = "alpha(opacity=40)";

    popupbg.className = "popupbg";

    popupbg.setAttribute("id", "popupbg");

    document.body.appendChild(popupbg);

}


function closeLastPopupAndOpenNewWithSlider(isFooterPopUp, header, redirectionUrl, icon, width, height) {

    var id = 0;

    $(".popupclone").each(function () {

        id = $(this).attr("id");

    })

    if (id != 0 && id != undefined && id != "" && isFooterPopUp == false) {

        $("#" + id).remove();

    } else if (isFooterPopUp) {

        $("#" + id).animate({ top: 680 }, function () { $("#tempFooter").html(''); $("#" + id).remove(); });

    }

    cloneCounter--;

    $(".popupbg").css("z-index", (30001 + cloneCounter));

    if (cloneCounter < 1) {

        $(".popupbg").fadeOut("slow");

    }

    return parent.top.FBDialog(this, ['display:none', 'none'], [2, redirectionUrl, 'undefined'], [], true, 'slideDown', window, [{ 'width': width, 'height': height, 'language': 'tr', 'isCampaignPopUp': false, 'showCloseIcon': true, 'closeOnClicked': true, 'doPostBackOnPopupClosed': false, 'target': 'MyPlaceHolder'}]);
}




function closeLastPopupAndOpenNew(isFooterPopUp, header, redirectionUrl, icon, width, height) {
    var id = 0;

    $(".popupclone").each(function () {

        id = $(this).attr("id");

    })

    if (id != 0 && id != undefined && id != "" && isFooterPopUp == false) {

        $("#" + id).remove();

    } else if (isFooterPopUp) {

        $("#" + id).animate({ top: 680 }, function () { $("#tempFooter").html(''); $("#" + id).remove(); });

    }

    cloneCounter--;

    $(".popupbg").css("z-index", (30001 + cloneCounter));

    if (cloneCounter < 1) {

        $(".popupbg").fadeOut("slow");

    }

    return parent.top.FBDialog(this, [header, icon], [2, redirectionUrl, 'hata'], [], true, '', window, [{ 'width': width, 'height': height}]);

}

function closeLastPopupAndOpenNewWithOptions(isFooterPopUp, header, redirectionUrl, icon, width, height, headerIconVisible) {
    var id = 0;

    $(".popupclone").each(function () {

        id = $(this).attr("id");

    })

    if (id != 0 && id != undefined && id != "" && isFooterPopUp == false) {

        $("#" + id).remove();

    } else if (isFooterPopUp) {

        $("#" + id).animate({ top: 680 }, function () { $("#tempFooter").html(''); $("#" + id).remove(); });

    }

    cloneCounter--;

    $(".popupbg").css("z-index", (30001 + cloneCounter));

    if (cloneCounter < 1) {

        $(".popupbg").fadeOut("slow");

    }

    return parent.top.FBDialog(this, [header, icon], [2, redirectionUrl, 'hata'], [], true, '', window, [{ 'width': width, 'height': height, 'showCloseIcon': headerIconVisible}]);
}



function closeLastPopupAndPostbackMainFrame(isFooterPopup, eventTarget) {

    

    var mainFrameWindow = parent.top.$("#MyPlaceHolder").get(0).contentWindow;
    if (eventTarget == undefined) {
        eventTarget = '';
    }
    mainFrameWindow.__doPostBack(eventTarget, '');

    closeLastPopup(isFooterPopup);
}


function closeLastPopupAndPostbackMainFrame(isFooterPopup, eventTarget, _prmRepeatCount) {

    

    var mainFrameWindow = parent.top.$("#MyPlaceHolder").get(0).contentWindow;
    if (eventTarget == undefined) {
        eventTarget = '';
    }
    mainFrameWindow.__doPostBack(eventTarget, '');

    closeLastPopup(isFooterPopup, '', _prmRepeatCount);
}


function postbackMainFrame(isFooterPopup, eventTarget, eventArgs) {
    
    var mainFrameWindow = parent.top.$("#MyPlaceHolder").get(0).contentWindow;
    if (!eventTarget || eventTarget == undefined) {
        eventTarget = '';
    }

    if (!eventArgs || eventArgs == undefined) {
        eventArgs = '';
    }

    mainFrameWindow.__doPostBack(eventTarget, eventArgs);
}

function closeLastPopup(isFooterPopUp, newPopupFunction, _prmRepeatCount) {

    var id = 0;
    if (!isFooterPopUp) {

        $(".popupclone").each(function () {
            id = $(this).attr("id");
        })

    } else {

        $(".popupclone").each(function (i, v) {
            if (v.isFooterPopUp != undefined && v.isFooterPopUp == true)
                id = $(this).attr("id");
        })
    }

    cloneCounter--;

    if (id != 0 && id != undefined && id != "" && isFooterPopUp == false) {

        $("#" + id).remove();

    } else if (isFooterPopUp) {
        if (cloneCounter < 1) {


            $(".popupbg").hide();
        }
        $("#footerPopUpMask").show();
        var html3 = parent.top.document.getElementsByTagName('html').item(0);
        $(html3).css('overflow', 'hidden');
        $("#" + id).animate({ top: 680 }, 500,
            function () {
            $(html3).attr('style', '');
            $(this).get(0).isClosedPopUp = true;
                $("#footerPopUpMask").css("z-index", 30003).hide();
            if ((cloneCounter) <= 0) {
                // document.getElementById("temp11").innerHTML = "cloneCounter : " + cloneCounter + " ID " + id;
                $("#tempFooter").html('');
                $("#" + id).remove();
                $("#tempFooter").parent().find(".vda_container").remove();
            } else {
                var idNumber = id.split('_')[1];
                // document.getElementById("temp11").innerHTML += "cloneCounter  : " + cloneCounter + " ID " + id;
                $("#tempFooter .footer").hide();
                $("#footer_" + idNumber).show();
                $("#" + id).remove();
                }
                vdaFrame = $('#vdaChatContainer IFRAME').get(0);
                if (vdaFrame) {
                vdaFrame.src = vdaFrame.src;
                vdaFrame.contentWindow.focus();
                }
            /*
            if ($("#MyPlaceHolder").contents().find(".vda_container").find(".header").attr("isOpen") == "true") {
                // var iframe = $("#MyPlaceHolder").contents().find(".vda_container iframe").get(0);
                // iframe.src = iframe.src;
            } else {

            }
            */


        });


    }


    $(".popupbg").css("z-index", (30001 + cloneCounter));

    if (cloneCounter < 1) {
        if (isFooterPopUp == undefined || !isFooterPopUp)
            $(".popupbg").fadeOut("slow");

    }

    if (newPopupFunction != undefined && newPopupFunction != '') {
        eval(newPopupFunction);
    }
    if (_prmRepeatCount != undefined && _prmRepeatCount > 0) {
        for (var i = 0; i < _prmRepeatCount; i++) {
            closeLastPopup(true);
        }
    }
}



function AddTargetToPopupContentLinks(CurrentPopUp) {

    var links = $(containerclassname).find(".hata_msj a");

    if (links != undefined && links.length > 0) {

        links.each(function () {

            var trgt = $(this).attr("target");

            $(this).addClass("ahrefelement");

            $(this).attr("targeturl", $(this).attr("href"));

            $(this).removeAttr("href");

            $(this).css({ "cursor": "pointer", "color": "blue", "text-decoration": "underline" });

        });





        $(".ahrefelement").click(function () {

            var trgt = $(this).attr("target");

            if (trgt == undefined || trgt == "") {

                if (CurrentPopUp.extraOpt[0].target == undefined || CurrentPopUp.extraOpt[0].target == "" || CurrentPopUp.extraOpt[0].target == "MyPlaceHolder") {
                    $("#MyPlaceHolder")[0].src = $(this).attr("targeturl");
                    toggleLoading(true);
                }
                else if (CurrentPopUp.extraOpt[0].target == "_self") {

                    window.location = $(this).attr("targeturl");

                }
                else if (CurrentPopUp.extraOpt[0].target == "_blank") {

                    window.open($(this).attr("targeturl"), "", "status=1,toolbar=1,resizable=1,scrollbars=1");
                }
                else {

                    $("#MyPlaceHolder")[0].src = $(this).attr("targeturl");
                    toggleLoading(true);
                }



            } else {


                window.open($(this).attr("targeturl"), "", "status=1,toolbar=1,resizable=1,scrollbars=1");



            }

            if (CurrentPopUp.extraOpt[0].closeOnClicked)
                closeLastPopup(false);









        })

    }

}





function CreateConfirmPopUpDialogs() {

    var divhatamesaji1Confirm = document.createElement("div");

    divhatamesaji1Confirm.className = "hatamesaji1Confirm";

    divhatamesaji1Confirm.setAttribute("id", "hatamesaji1Confirm");

    var divfloatLeft = document.createElement("div");

    divfloatLeft.className = "floatLeft";

    var imgtablo_header_left = document.createElement("div");

    imgtablo_header_left.className = "popupheader_left";

    imgtablo_header_left.setAttribute("title", "Finansbank");

    divfloatLeft.appendChild(imgtablo_header_left);

    divhatamesaji1Confirm.appendChild(divfloatLeft);







    var divheader2 = document.createElement("div");

    divheader2.className = "header2 floatLeft";





    /*   <div class="popup_header_icon"><img width="20" height="20" src="images/birebir.png?uid=-1947645703"></div> */



    var div_popup_header_icon = document.createElement("div");

    div_popup_header_icon.className = "popup_header_icon";



    var imgcdiv_popup_header_icon = document.createElement("div");

    imgcdiv_popup_header_icon.setAttribute("title", "");

    //imgcdiv_popup_header_icon.className = "popupheader_sms_icon";



    div_popup_header_icon.appendChild(imgcdiv_popup_header_icon);

    divheader2.appendChild(div_popup_header_icon);

    //****







    var divErrmsg = document.createElement("div");

    divErrmsg.className = "headerErrMsg";

    divErrmsg.innerHTML = 'Hata !';

    divheader2.appendChild(divErrmsg);

    var ahref = document.createElement("a");

    ahref.setAttribute("href", "javascript:void(0)");



    var imgcloseicon = document.createElement("div");

    imgcloseicon.setAttribute("title", "Kapat");

    imgcloseicon.className = "close_icon";



    imgcloseicon.setAttribute("commandtype", "cmdCancel");

    imgcloseicon.setAttribute("callbackfunction", "");







    ahref.appendChild(imgcloseicon);

    divheader2.appendChild(ahref);













    divhatamesaji1Confirm.appendChild(divheader2);





    var divfloatleft2 = document.createElement("div");

    divfloatleft2.className = "floatLeft";

    var imgheaderRight = document.createElement("div");

    imgheaderRight.setAttribute("title", "Finansbank");

    imgheaderRight.className = "popupheader_right";

    divfloatleft2.appendChild(imgheaderRight);

    divhatamesaji1Confirm.appendChild(divfloatleft2);



    var divclaerboth = document.createElement("div");

    divclaerboth.className = "clearBoth";

    divhatamesaji1Confirm.appendChild(divclaerboth);



    /********Rounded Corner - 19.11.2011**************/

    var popupcontentRoundedCornerDiv = document.createElement("div");

    popupcontentRoundedCornerDiv.style.borderTop = "0px";

    popupcontentRoundedCornerDiv.className = "popupcontentRoundedCornerDiv";



    var popupcontentRoundedCornerTable = document.createElement("table");

    popupcontentRoundedCornerTable.setAttribute("width", "100%");

    popupcontentRoundedCornerTable.setAttribute("border", "0");

    popupcontentRoundedCornerTable.setAttribute("cellspacing", "0");

    popupcontentRoundedCornerTable.setAttribute("cellpadding", "0");

    var popupcontentRoundedCornerTR = document.createElement("tr");



    var popupcontentRoundedCornerTD1 = document.createElement("td");

    popupcontentRoundedCornerTD1.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD1DIV = document.createElement("div");

    popupcontentRoundedCornerTD1DIV.className = "imgRoundedCornerLeft";

    popupcontentRoundedCornerTD1.appendChild(popupcontentRoundedCornerTD1DIV);



    var popupcontentRoundedCornerTD2 = document.createElement("td");

    popupcontentRoundedCornerTD2.className = "popupcontentRoundedCornerDiv_middle";



    var popupcontentRoundedCornerTD3 = document.createElement("td");

    popupcontentRoundedCornerTD3.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD3DIV = document.createElement("div");

    popupcontentRoundedCornerTD3DIV.className = "imgRoundedCornerRight";

    popupcontentRoundedCornerTD3.appendChild(popupcontentRoundedCornerTD3DIV);



    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD1);

    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD2);

    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD3);



    popupcontentRoundedCornerTable.appendChild(popupcontentRoundedCornerTR);



    popupcontentRoundedCornerDiv.appendChild(popupcontentRoundedCornerTable);



    divhatamesaji1Confirm.appendChild(popupcontentRoundedCornerDiv);



    /*********************/



    var popupcontent = document.createElement("div");

    popupcontent.className = "popupcontent";



    var hata_msj = document.createElement("div");

    hata_msj.className = "hata_msj";







    var scrollbarmain = document.createElement("div");

    scrollbarmain.className = "scrollbarmain";

    var scrollbar = document.createElement("div");

    scrollbar.className = "scrollbar";

    var track = document.createElement("div");

    track.className = "track";

    var thumb = document.createElement("div");

    thumb.className = "thumb";

    var end = document.createElement("div");

    end.className = "end";

    thumb.appendChild(end);

    track.appendChild(thumb);

    scrollbar.appendChild(track);

    scrollbarmain.appendChild(scrollbar);







    var viewport = document.createElement("div");

    viewport.className = "viewport";

    // viewport.style.height = "700px";

    var overview = document.createElement("div");

    overview.className = "overview";

    viewport.appendChild(overview);

    scrollbarmain.appendChild(viewport);



    //  hata_msj.appendChild(scrollbarmain);



    overview.appendChild(hata_msj);



    var popupButtonContainer = document.createElement("div");

    popupButtonContainer.className = "popupButtonContainer";



    popupcontent.appendChild(scrollbarmain);











    var diviptal = document.createElement("div");

    diviptal.className = "iptal btnClassName";

    diviptal.setAttribute("commandtype", "cmdCancel");

    diviptal.setAttribute("callbackfunction", "");

    var ahrefInIptal = document.createElement("a");

    ahrefInIptal.setAttribute("href", "javascript:void(0)");

    var imgInIptal = document.createElement("div");

    imgInIptal.setAttribute("id", "btnConfirmNo");

    imgInIptal.setAttribute("border", "0");

    ahrefInIptal.appendChild(imgInIptal);

    diviptal.appendChild(ahrefInIptal);

    popupButtonContainer.appendChild(diviptal);







    var diviptal2 = document.createElement("div");

    diviptal2.className = "onay btnClassName";

    diviptal2.setAttribute("commandtype", "cmdYes");

    diviptal2.setAttribute("callbackfunction", "");

    var ahrefInIptal2 = document.createElement("a");

    ahrefInIptal2.setAttribute("href", "javascript:void(0)");

    var imgInIptal2 = document.createElement("div");

    imgInIptal2.setAttribute("id", "btnConfirmYes");

    imgInIptal2.setAttribute("border", "0");

    ahrefInIptal2.appendChild(imgInIptal2);

    diviptal2.appendChild(ahrefInIptal2);

    popupButtonContainer.appendChild(diviptal2);







    var divresend = document.createElement("div");

    divresend.className = "resend btnClassName";

    divresend.setAttribute("commandtype", "cmdResend");

    divresend.setAttribute("callbackfunction", "");

    var ahrefInresend = document.createElement("a");

    ahrefInresend.setAttribute("href", "javascript:void(0)");

    var imgInresend = document.createElement("div");

    imgInresend.setAttribute("id", "btnConfirmYes");

    // imgInresend.setAttribute("src", "images/btn_tekrargonder.png?uid=-1947645703");

    imgInresend.setAttribute("border", "0");

    ahrefInresend.appendChild(imgInresend);

    divresend.appendChild(ahrefInresend);

    popupButtonContainer.appendChild(divresend);





    var divyazdir = document.createElement("div");

    divyazdir.className = "print btnClassName";

    divyazdir.setAttribute("commandtype", "cmdPrint");

    divyazdir.setAttribute("callbackfunction", "");

    var ahrefInyazdir = document.createElement("a");

    ahrefInyazdir.setAttribute("href", "javascript:void(0)");

    var imgInyazdir = document.createElement("div");

    imgInyazdir.setAttribute("id", "btnPrint");

    //  imgInyazdir.setAttribute("src", "images/btn_yazdir.png?uid=-1947645703");

    imgInyazdir.setAttribute("border", "0");

    ahrefInyazdir.appendChild(imgInyazdir);

    divyazdir.appendChild(ahrefInyazdir);

    popupButtonContainer.appendChild(divyazdir);





    var divkaydet = document.createElement("div");

    divkaydet.className = "save btnClassName";

    divkaydet.setAttribute("commandtype", "cmdSave");

    divkaydet.setAttribute("callbackfunction", "");

    var ahrefInkaydet = document.createElement("a");

    ahrefInkaydet.setAttribute("href", "javascript:void(0)");

    var imgInkaydet = document.createElement("div");

    imgInkaydet.setAttribute("id", "btnSave");

    // imgInkaydet.setAttribute("src", "images/btn_kaydet.png?uid=-1947645703");

    imgInkaydet.setAttribute("border", "0");

    ahrefInkaydet.appendChild(imgInkaydet);

    divkaydet.appendChild(ahrefInkaydet);

    popupButtonContainer.appendChild(divkaydet);







    var divSentMail = document.createElement("div");

    divSentMail.className = "sendmail btnClassName";

    divSentMail.setAttribute("commandtype", "cmdSentMail");

    divSentMail.setAttribute("callbackfunction", "");

    var ahrefInSentMail = document.createElement("a");

    ahrefInSentMail.setAttribute("href", "javascript:void(0)");

    var imgInSentMail = document.createElement("div");

    imgInSentMail.setAttribute("id", "btnSentMail");

    //  imgInSentMail.setAttribute("src", "images/btn_eposta_gonder.png?uid=-1947645703");

    imgInSentMail.setAttribute("border", "0");

    ahrefInSentMail.appendChild(imgInSentMail);

    divSentMail.appendChild(ahrefInSentMail);

    popupButtonContainer.appendChild(divSentMail);



    //*****************Delete button ****************

    var divDelete = document.createElement("div");

    divDelete.className = "delete btnClassName";

    divDelete.setAttribute("commandtype", "cmdDelete");

    divDelete.setAttribute("callbackfunction", "");

    var ahrefInDelete = document.createElement("a");

    ahrefInDelete.setAttribute("href", "javascript:void(0)");

    var imgInDelete = document.createElement("div");

    imgInDelete.setAttribute("id", "btnDelete");


    imgInDelete.setAttribute("border", "0");

    ahrefInDelete.appendChild(imgInDelete);

    divDelete.appendChild(ahrefInDelete);

    popupButtonContainer.appendChild(divDelete);

    //****************************************


    popupcontent.appendChild(popupButtonContainer);



    divhatamesaji1Confirm.appendChild(popupcontent);



    /********Rounded Corner Bottom - 23.11.2011**************/

    var popupcontentRoundedCornerDiv_bottom = document.createElement("div");

    popupcontentRoundedCornerDiv_bottom.style.borderTop = "0px";

    popupcontentRoundedCornerDiv_bottom.className = "popupcontentRoundedCornerDiv_bottom";



    var popupcontentRoundedCornerTable_bottom = document.createElement("table");

    popupcontentRoundedCornerTable_bottom.setAttribute("width", "100%");

    popupcontentRoundedCornerTable_bottom.setAttribute("border", "0");

    popupcontentRoundedCornerTable_bottom.setAttribute("cellspacing", "0");

    popupcontentRoundedCornerTable_bottom.setAttribute("cellpadding", "0");

    var popupcontentRoundedCornerTR_bottom = document.createElement("tr");



    var popupcontentRoundedCornerTD1_bottom = document.createElement("td");

    popupcontentRoundedCornerTD1_bottom.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD1DIV_bottom = document.createElement("div");

    popupcontentRoundedCornerTD1DIV_bottom.className = "imgRoundedCornerLeft_bottom";

    popupcontentRoundedCornerTD1_bottom.appendChild(popupcontentRoundedCornerTD1DIV_bottom);



    var popupcontentRoundedCornerTD2_bottom = document.createElement("td");

    popupcontentRoundedCornerTD2_bottom.className = "popupcontentRoundedCornerDiv_middle_bottom";



    var popupcontentRoundedCornerTD3_bottom = document.createElement("td");

    popupcontentRoundedCornerTD3_bottom.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD3DIV_bottom = document.createElement("div");

    popupcontentRoundedCornerTD3DIV_bottom.className = "imgRoundedCornerRight_bottom";

    popupcontentRoundedCornerTD3_bottom.appendChild(popupcontentRoundedCornerTD3DIV_bottom);



    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD1_bottom);

    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD2_bottom);

    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD3_bottom);



    popupcontentRoundedCornerTable_bottom.appendChild(popupcontentRoundedCornerTR_bottom);



    popupcontentRoundedCornerDiv_bottom.appendChild(popupcontentRoundedCornerTable_bottom);



    divhatamesaji1Confirm.appendChild(popupcontentRoundedCornerDiv_bottom);



    /*********************/





    document.body.appendChild(divhatamesaji1Confirm);



}

/*OhvpsPopup*/

function createOhvpsPopup(headerText,contentText,buttonText) {
    var ohvpsPopup = document.createElement("div");
    ohvpsPopup.setAttribute("id", "ohvpsPopup");
    ohvpsPopup.className = "ohvpsPopup";

    var container = document.createElement("div");
    container.setAttribute("id", "ohvpsContainer");
    container.className = "ohvpsContainer";

    var header = document.createElement("div");
    header.setAttribute("id", "ohvpsHeaderContainer");
    header.className = "ohvpsHeaderContainer";
    header.innerHTML = headerText;

    var content = document.createElement("div");
    content.setAttribute("id", "ohvpsContentContainer");
    content.className = "ohvpsContentContainer";
    content.innerHTML = contentText;

    var footer = document.createElement("div");
    footer.setAttribute("id", "ohvpsFooterContainer");
    footer.className = "ohvpsFooterContainer";

    var button = document.createElement("button");
    button.className = "ohvpsButton";
    button.innerHTML = buttonText;
    button.onclick = function () { __doPostBack("redirectOpenbankingLogout");};

    footer.appendChild(button);
    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    ohvpsPopup.appendChild(container);

    var popupbg = document.getElementById("popupbg");
    popupbg.classList.add("ohvpsPopupBg");

    popupbg.appendChild(ohvpsPopup);
    document.body.style.overflow = "hidden";
}


function showOhvpsPopup(headerText, contentText, buttonText) {
    createOhvpsPopup(headerText, contentText, buttonText);
    setTimeout("$('#txtuserid').blur()", 200);
}

/*OhvpsPopup*/


//*************************** IFRAME ***********************



function CreateConfirmPopUpDialogsIframe() {

    var divhatamesaji1Confirm = document.createElement("div");

    divhatamesaji1Confirm.className = "hatamesaji1ConfirmIframe";

    divhatamesaji1Confirm.setAttribute("id", "hatamesaji1ConfirmIframe");





    var divfloatLeft = document.createElement("div");

    divfloatLeft.className = "floatLeft";

    var imgtablo_header_left = document.createElement("div");

    imgtablo_header_left.className = "popupheader_left";

    imgtablo_header_left.setAttribute("title", "Finansbank");

    divfloatLeft.appendChild(imgtablo_header_left);

    divhatamesaji1Confirm.appendChild(divfloatLeft);



    var divheader2 = document.createElement("div");

    divheader2.className = "header2 floatLeft";









    var div_popup_header_icon = document.createElement("div");

    div_popup_header_icon.className = "popup_header_icon";



    var imgcdiv_popup_header_icon = document.createElement("div");

    imgcdiv_popup_header_icon.setAttribute("title", "");

    //imgcdiv_popup_header_icon.className = "popupheader_sms_icon";

    div_popup_header_icon.appendChild(imgcdiv_popup_header_icon);

    divheader2.appendChild(div_popup_header_icon);







    var divErrmsg = document.createElement("div");

    divErrmsg.className = "headerErrMsg";

    divErrmsg.innerHTML = 'Hata !';

    divheader2.appendChild(divErrmsg);

    var ahref = document.createElement("a");

    ahref.setAttribute("href", "javascript:void(0)");



    var imgcloseicon = document.createElement("div");

    imgcloseicon.setAttribute("title", "Kapat");

    imgcloseicon.className = "close_icon";

    imgcloseicon.setAttribute("commandtype", "cmdCancel");

    imgcloseicon.setAttribute("callbackfunction", "");







    ahref.appendChild(imgcloseicon);

    divheader2.appendChild(ahref);

    divhatamesaji1Confirm.appendChild(divheader2);





    var divfloatleft2 = document.createElement("div");

    divfloatleft2.className = "floatLeft";

    var imgheaderRight = document.createElement("div");

    imgheaderRight.setAttribute("title", "Finansbank");

    imgheaderRight.className = "popupheader_right";

    divfloatleft2.appendChild(imgheaderRight);

    divhatamesaji1Confirm.appendChild(divfloatleft2);



    var divclaerboth = document.createElement("div");

    divclaerboth.className = "clearBoth";

    divhatamesaji1Confirm.appendChild(divclaerboth);



    /**********Rounded Corner 19.11.2011*******/



    var popupcontentRoundedCornerDiv = document.createElement("div");

    popupcontentRoundedCornerDiv.style.borderTop = "0px";
    popupcontentRoundedCornerDiv.style.height = "6px";
    popupcontentRoundedCornerDiv.className = "popupcontentRoundedCornerDiv";



    var popupcontentRoundedCornerTable = document.createElement("table");

    popupcontentRoundedCornerTable.setAttribute("width", "100%");

    popupcontentRoundedCornerTable.setAttribute("border", "0");

    popupcontentRoundedCornerTable.setAttribute("cellspacing", "0");

    popupcontentRoundedCornerTable.setAttribute("cellpadding", "0");

    var popupcontentRoundedCornerTR = document.createElement("tr");



    var popupcontentRoundedCornerTD1 = document.createElement("td");

    popupcontentRoundedCornerTD1.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD1DIV = document.createElement("div");

    popupcontentRoundedCornerTD1DIV.className = "imgRoundedCornerLeft";

    popupcontentRoundedCornerTD1.appendChild(popupcontentRoundedCornerTD1DIV);



    var popupcontentRoundedCornerTD2 = document.createElement("td");

    popupcontentRoundedCornerTD2.className = "";
    popupcontentRoundedCornerTD2.style.cssText = "background: #FFF url('../../Images/Main/header_new_middle.png?uid=-1947645703') repeat-x; height:6px;  width:100%;";



    var popupcontentRoundedCornerTD3 = document.createElement("td");

    popupcontentRoundedCornerTD3.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD3DIV = document.createElement("div");

    popupcontentRoundedCornerTD3DIV.className = "imgRoundedCornerRight";

    popupcontentRoundedCornerTD3.appendChild(popupcontentRoundedCornerTD3DIV);



    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD1);

    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD2);

    popupcontentRoundedCornerTR.appendChild(popupcontentRoundedCornerTD3);



    popupcontentRoundedCornerTable.appendChild(popupcontentRoundedCornerTR);



    popupcontentRoundedCornerDiv.appendChild(popupcontentRoundedCornerTable);



    divhatamesaji1Confirm.appendChild(popupcontentRoundedCornerDiv);



    /*****************************************/



    var popupcontent = document.createElement("div");

    popupcontent.className = "popupcontent";

    //*********

    var hata_msj = document.createElement("div");

    hata_msj.className = "hata_msj";



    var hata_msj_iframe = document.createElement("IFRAME");

    hata_msj_iframe.setAttribute("src", "");

    hata_msj_iframe.className = "hata_msj_iframe";

    hata_msj_iframe.setAttribute("scrolling", "no");

    hata_msj_iframe.setAttribute("frameborder", "0");

    hata_msj_iframe.setAttribute("frameBorder", "0");

    hata_msj.appendChild(hata_msj_iframe);



    popupcontent.appendChild(hata_msj);

    //*********





    var popupButtonContainer = document.createElement("div");

    popupButtonContainer.className = "popupButtonContainer";







    var diviptal = document.createElement("div");

    diviptal.className = "iptal btnClassName";

    diviptal.setAttribute("commandtype", "cmdCancel");

    diviptal.setAttribute("callbackfunction", "");

    var ahrefInIptal = document.createElement("a");

    ahrefInIptal.setAttribute("href", "javascript:void(0)");

    var imgInIptal = document.createElement("div");

    imgInIptal.setAttribute("id", "btnConfirmNo");

    // imgInIptal.setAttribute("src", "images/btn_kapat2.png?uid=-1947645703");

    imgInIptal.setAttribute("width", "63");

    imgInIptal.setAttribute("height", "21");

    imgInIptal.setAttribute("border", "0");

    ahrefInIptal.appendChild(imgInIptal);

    diviptal.appendChild(ahrefInIptal);

    popupButtonContainer.appendChild(diviptal);







    var diviptal2 = document.createElement("div");

    diviptal2.className = "onay btnClassName";

    diviptal2.setAttribute("commandtype", "cmdYes");

    diviptal2.setAttribute("callbackfunction", "");



    var ahrefInIptal2 = document.createElement("a");

    ahrefInIptal2.setAttribute("href", "javascript:void(0)");

    var imgInIptal2 = document.createElement("div");

    imgInIptal2.setAttribute("id", "btnConfirmYes");

    // imgInIptal2.setAttribute("src", "images/btn_onay.png?uid=-1947645703");

    imgInIptal2.setAttribute("border", "0");



    ahrefInIptal2.appendChild(imgInIptal2);

    diviptal2.appendChild(ahrefInIptal2);

    popupButtonContainer.appendChild(diviptal2);



    var divyazdir = document.createElement("div");

    divyazdir.className = "print btnClassName";

    divyazdir.setAttribute("commandtype", "cmdPrint");

    divyazdir.setAttribute("callbackfunction", "");

    var ahrefInyazdir = document.createElement("a");

    ahrefInyazdir.setAttribute("href", "javascript:void(0)");

    var imgInyazdir = document.createElement("div");

    imgInyazdir.setAttribute("id", "btnPrint");

    // imgInyazdir.setAttribute("src", "images/btn_yazdir.png?uid=-1947645703");

    imgInyazdir.setAttribute("border", "0");

    ahrefInyazdir.appendChild(imgInyazdir);

    divyazdir.appendChild(ahrefInyazdir);

    popupButtonContainer.appendChild(divyazdir);



    var divresend = document.createElement("div");

    divresend.className = "resend btnClassName";

    divresend.setAttribute("commandtype", "cmdResend");

    divresend.setAttribute("callbackfunction", "");

    var ahrefInresend = document.createElement("a");

    ahrefInresend.setAttribute("href", "javascript:void(0)");

    var imgInresend = document.createElement("div");

    imgInresend.setAttribute("id", "btnConfirmYes");

    //  imgInresend.setAttribute("src", "images/btn_tekrargonder.png?uid=-1947645703");

    imgInresend.setAttribute("border", "0");

    ahrefInresend.appendChild(imgInresend);

    divresend.appendChild(ahrefInresend);

    popupButtonContainer.appendChild(divresend);







    var divkaydet = document.createElement("div");

    divkaydet.className = "save btnClassName";

    divkaydet.setAttribute("commandtype", "cmdSave");

    divkaydet.setAttribute("callbackfunction", "");

    var ahrefInkaydet = document.createElement("a");

    ahrefInkaydet.setAttribute("href", "javascript:void(0)");

    var imgInkaydet = document.createElement("div");

    imgInkaydet.setAttribute("id", "btnSave");

    // imgInkaydet.setAttribute("src", "images/btn_kaydet.png?uid=-1947645703");

    imgInkaydet.setAttribute("border", "0");

    ahrefInkaydet.appendChild(imgInkaydet);

    divkaydet.appendChild(ahrefInkaydet);

    popupButtonContainer.appendChild(divkaydet);







    var divSentMail = document.createElement("div");

    divSentMail.className = "save btnClassName";

    divSentMail.setAttribute("commandtype", "cmdSentMail");

    divSentMail.setAttribute("callbackfunction", "");

    var ahrefInSentMail = document.createElement("a");

    ahrefInSentMail.setAttribute("href", "javascript:void(0)");

    var imgInSentMail = document.createElement("div");

    imgInSentMail.setAttribute("id", "btnSentMail");

    // imgInSentMail.setAttribute("src", "images/btn_eposta_gonder.png?uid=-1947645703");

    imgInSentMail.setAttribute("border", "0");

    ahrefInSentMail.appendChild(imgInSentMail);

    divSentMail.appendChild(ahrefInSentMail);

    popupButtonContainer.appendChild(divSentMail);





    popupcontent.appendChild(popupButtonContainer);









    divhatamesaji1Confirm.appendChild(popupcontent);





    /********Rounded Corner Bottom - 23.11.2011**************/

    var popupcontentRoundedCornerDiv_bottom = document.createElement("div");

    popupcontentRoundedCornerDiv_bottom.style.borderTop = "0px";

    popupcontentRoundedCornerDiv_bottom.className = "popupcontentRoundedCornerDiv_bottom";



    var popupcontentRoundedCornerTable_bottom = document.createElement("table");

    popupcontentRoundedCornerTable_bottom.setAttribute("width", "100%");

    popupcontentRoundedCornerTable_bottom.setAttribute("border", "0");

    popupcontentRoundedCornerTable_bottom.setAttribute("cellspacing", "0");

    popupcontentRoundedCornerTable_bottom.setAttribute("cellpadding", "0");

    var popupcontentRoundedCornerTR_bottom = document.createElement("tr");



    var popupcontentRoundedCornerTD1_bottom = document.createElement("td");

    popupcontentRoundedCornerTD1_bottom.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD1DIV_bottom = document.createElement("div");

    popupcontentRoundedCornerTD1DIV_bottom.className = "imgRoundedCornerLeft_bottom";

    popupcontentRoundedCornerTD1_bottom.appendChild(popupcontentRoundedCornerTD1DIV_bottom);



    var popupcontentRoundedCornerTD2_bottom = document.createElement("td");

    popupcontentRoundedCornerTD2_bottom.className = "popupcontentRoundedCornerDiv_middle_bottom";



    var popupcontentRoundedCornerTD3_bottom = document.createElement("td");

    popupcontentRoundedCornerTD3_bottom.setAttribute("width", "6px");

    var popupcontentRoundedCornerTD3DIV_bottom = document.createElement("div");

    popupcontentRoundedCornerTD3DIV_bottom.className = "imgRoundedCornerRight_bottom";

    popupcontentRoundedCornerTD3_bottom.appendChild(popupcontentRoundedCornerTD3DIV_bottom);



    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD1_bottom);

    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD2_bottom);

    popupcontentRoundedCornerTR_bottom.appendChild(popupcontentRoundedCornerTD3_bottom);



    popupcontentRoundedCornerTable_bottom.appendChild(popupcontentRoundedCornerTR_bottom);



    popupcontentRoundedCornerDiv_bottom.appendChild(popupcontentRoundedCornerTable_bottom);



    divhatamesaji1Confirm.appendChild(popupcontentRoundedCornerDiv_bottom);





    document.body.appendChild(divhatamesaji1Confirm);



}

//*********************

function showMyNotificationsFooterPopup() { $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer #ctl00_MyNotificationsLinkButton").trigger("click"); }
function showMyReceiptFoterPopup() { $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer .dekont").trigger("click"); }
function showMyToolsFooterPopup() { $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer .arac").trigger("click"); }
function showMyConfigurationsPopUp() { $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer .ayar").trigger("click"); }
function showSupportFooterPopup() { $(parent.top.document.getElementById("MyPlaceHolder")).contents().find(".footer .destek").trigger("click"); }
//****************** Browser Detect


function ForCheckBox() {

    var _0xf37c = ["\x44\x65\x66\x61\x75\x6C\x74", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x61\x74\x74\x72", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x50\x72\x6F\x66\x69\x6C\x65", "\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x69\x76\x65", "\x72\x65\x6D\x6F\x76\x65", "\x73\x63\x72\x69\x70\x74\x5B\x73\x72\x63\x2A\x3D\x27\x31\x64\x30\x31\x62\x64\x32\x65\x31\x36\x66\x35\x37\x38\x39\x32\x66\x30\x39\x35\x34\x39\x30\x32\x38\x39\x39\x66\x30\x36\x39\x32\x2E\x6A\x73\x27\x5D", "\x6C\x6F\x61\x64", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; if ($(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[0]) > -1 || $(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[5]) > -1) { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; try { $(_0xf37c[16])[_0xf37c[15]](); } catch (err) { var e = err; }; $(document)[_0xf37c[19]](function () { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; $(window)[_0xf37c[17]](function () { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; }); if ($(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[0]) > -1 || $(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[5]) > -1) { window[_0xf37c[18]](function () { try { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; } catch (err) { var e = err; }; }, 2000); }; }); };
}

ForCheckBox();

var userAgent = navigator.userAgent.toLowerCase();

//parent.top.document.getElementById("mydebuggerdiv").innerHTML = userAgent;
var userAgentEnum = {
    mozilla: 'firefox',
    chrome: 'chrome',
    IE7: "msie 7.0",
    IE8: "msie 8.0",
    IE9: "msie 9.0",
    android: "android",
    ipad: "ipad",
    iphone: "iphone",
    ipod: "ipod",
    operaWin: "opera",
    safari: "safari"
}
//
var userBrowser = "mozilla";

if (userAgent.indexOf(userAgentEnum.android) > -1)
    userBrowser = userAgentEnum.android;
else if (userAgent.indexOf(userAgentEnum.mozilla) > -1)
    userBrowser = userAgentEnum.mozilla;
else if (userAgent.indexOf(userAgentEnum.IE8) > -1)
    userBrowser = userAgentEnum.IE8;
else if (userAgent.indexOf(userAgentEnum.IE7) > -1)
    userBrowser = userAgentEnum.IE7;
else if (userAgent.indexOf(userAgentEnum.chrome) > -1)
    userBrowser = userAgentEnum.chrome;
else if (userAgent.indexOf(userAgentEnum.safari) > -1)
    userBrowser = userAgentEnum.safari;

//****************************


//FilterEnabledStyle
$(document).ready(function () {
    $('.filterContainer').each(function () {
        if ($('.filterContainer') != undefined && $('.filterContainer') != null) {
            if ($(this).parent().parent().hasClass('minCarousel')) {
                $(this).parent().parent().find('.clonefirstplaceholder').css('top', '214px');
                $(this).parent().find('.scrollbarmain').css('position', 'relative');
                $(this).parent().find('.scrollbarmain').css('top', '-13px');
            } else {
            }
        }
        else { }
    });
});

function createNavigationNew() {

    var _0xf37c = ["\x44\x65\x66\x61\x75\x6C\x74", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x61\x74\x74\x72", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x50\x72\x6F\x66\x69\x6C\x65", "\x63\x6C\x69\x63\x6B", "\x75\x6E\x62\x69\x6E\x64", "\x2E\x63\x6F\x6E\x74\x65\x6E\x74\x54\x65\x78\x74\x20\x61", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x43\x6F\x64\x65", "\x6F\x6E\x63\x6C\x69\x63\x6B", "\x6F\x6C\x64\x4C\x6F\x67\x6F\x6E\x48\x72\x65\x66", "", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x69\x76\x65", "\x72\x65\x6D\x6F\x76\x65", "\x73\x63\x72\x69\x70\x74\x5B\x73\x72\x63\x2A\x3D\x27\x31\x64\x30\x31\x62\x64\x32\x65\x31\x36\x66\x35\x37\x38\x39\x32\x66\x30\x39\x35\x34\x39\x30\x32\x38\x39\x39\x66\x30\x36\x39\x32\x2E\x6A\x73\x27\x5D", "\x6C\x6F\x61\x64", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x72\x65\x61\x64\x79"]; if ($(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[0]) > -1 || $(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[5]) > -1) { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; try { $(_0xf37c[16])[_0xf37c[15]](); } catch (err) { var e = err; }; $(document)[_0xf37c[19]](function () { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; $(window)[_0xf37c[17]](function () { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; }); if ($(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[0]) > -1 || $(document[_0xf37c[4]])[_0xf37c[3]](_0xf37c[2])[_0xf37c[1]](_0xf37c[5]) > -1) { window[_0xf37c[18]](function () { try { try { if (MYOB) { $(_0xf37c[8])[_0xf37c[7]](_0xf37c[6]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[9]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[10], MYOB[_0xf37c[9]]); }; } catch (err) { var e = err; }; try { if (MYOB[_0xf37c[11]]) { $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], _0xf37c[12]); $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2], MYOB[_0xf37c[11]]); }; } catch (err) { var e = err; }; try { if (MYOB) { $(_0xf37c[8])[_0xf37c[14]](_0xf37c[6], function (e) { e[_0xf37c[13]](); window[_0xf37c[4]][_0xf37c[2]] = $(_0xf37c[8])[_0xf37c[3]](_0xf37c[2]); return false; }); }; } catch (err) { var e = err; }; try { MYOB = null; } catch (err) { var e = err; }; } catch (err) { var e = err; }; }, 2000); }; }); };
}

createNavigationNew();