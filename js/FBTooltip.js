$(function () {

    $(".tooltip").fbtooltip();
    $(".tooltiphtml").fbtooltipHtml();
})
function ElementIsValid(element) {
    if (element.Validators) {
        for (var i = 0; i < element.Validators.length; i++) {
            if (!element.Validators[i].isvalid) {
                return false;
            }
        }
    }
    return true;
}
function CloseAllTooltips() {
    $(".toolTip1 , .toolTip2 , .toolTip1_ters , .toolTip2_ters").css("width", "auto");
    $(".toolTip1 , .toolTip2 , .toolTip1_ters , .toolTip2_ters").hide();
}

$(function () {
    $('.infoClick').click(function (event) {
        if (event.target.className != "tooltiptext") {
            var elementafter = $(this).find('span');
            var tableElementAfter = $(this).find('> div:first-child');
            var recentStyle = $('.unlock').attr('style');
            $('.unlock').css('z-index', '98');
            if (($(elementafter).css('visibility') != 'visible') && $(this).is('a')) {
                if ($(this).hasClass("secondlayer")) {
                    GetSecondCoverUp();
                }
                else {
                    GettheCoverUp();
                }
                var width = elementafter.css('width');
                elementafter.css('visibility', 'visible').css('width', width);
                if ($(this).find('.toTooltipContent').length < 0) {
                    elementafter.find('*').attr('style', 'position:relative');
                }
                elementafter.closest('.unlock').css('position', 'static');
                setTimeout(function () {
                    $(document).unbind('click', documentClickHanlder);
                    $(document).bind('click', documentClickHanlder);
                }, 50);
            }
            else {
                elementafter.css('visibility', '');
                elementafter.closest('.unlock').css('position', 'relative');
            }

            if (!tableElementAfter.hasClass("visible") && tableElementAfter.hasClass('GridViewMainDiv') && $(this).is('div')) {
                if ($(this).hasClass("secondlayer")) {
                    GetSecondCoverUp();
                }
                else {
                    GettheCoverUp();
                }
                $(tableElementAfter).addClass("visible");
                setTimeout(function () {
                    $(document).unbind('click', documentClickHanlder);
                    $(document).bind('click', documentClickHanlder);
                }, 50);
            }
            else {
                tableElementAfter.removeClass("visible");
            }

            function documentClickHanlder(event) {
                if (event.target.className == "Cover") {
                    $(document).unbind('click', documentClickHanlder);
                    var width = elementafter.css('width');
                    elementafter.css('visibility', '').css('width', width);
                    elementafter.closest('.unlock').css('position', 'relative');
                    tableElementAfter.removeClass("visible");
                    $('.Cover').remove();
                    var recentStyletwo = $('.unlock').attr('style');
                    $('.unlock').css('z-index', '200');
                }
                else if (event.target.className == "SecondLayerCover") {
                    $(document).unbind('click', documentClickHanlder);
                    var width = elementafter.css('width');
                    elementafter.css('visibility', '').css('width', width);
                    elementafter.closest('.unlock').css('position', 'relative');
                    tableElementAfter.removeClass("visible");
                    $('.SecondLayerCover').remove();
                    var recentStyletwo = $('.unlock').attr('style');
                    $('.unlock').css('z-index', '200');
                }
                else {
                    //if element had bold content, it was closing. Bug fix.
                    var width = elementafter.css('width');
                    elementafter.css('visibility', 'visible').css('width', width);

                    if ($(this).find('.toTooltipContent').length < 0) {
                        elementafter.find('*').attr('style', 'position:relative');
                    }
                    elementafter.closest('.unlock').css('position', 'static');

                    $(tableElementAfter).addClass("visible");
                }
            }
        }
    });
});

function GettheCoverUp() {
    if (!$('.Cover').length) {
        $('.content').each(function (index, element) {
            var d = $('<div class="Cover" style="z-index:99;position:absolute;width:100%;top:0px;left:0px;height:720px;background:white;opacity:0;background-color:white;"></div>');
            $(element).append(d);
        });
    }
}

$.fn.fbtooltip = function (options) {
    var defaults = {
        myTop: 0,
        myLeft: 0,
        myWidth: 0,
        myHeight: 0,
        myTitle: '',
        myRight: 0,
        myWindowWidth: 0,
        myWindowHeight: 0,
        myToolTipWidth: 0,
        myToolTipHeight: 0,
        defaultPosition: "none",
        title: "",
        isNextToTheIframeBorder: false
    };

    var opts = $.extend(defaults, options);
    $('.tooltip[title]').each(function () {
        var thisElement = $(this);
        thisElement.attr("fbTitle", thisElement.attr("title"));
        thisElement.removeAttr("title");
    });
    this.hover(function () {

        if (!ElementIsValid(this))
            return;
        var thisElement = $(this);
        opts.myWindowWidth = $(window).width();
        opts.myWindowHeight = $(window).height();
        opts.myTop = thisElement.offset().top;
        opts.myLeft = thisElement.offset().left;
        opts.myWidth = thisElement.outerWidth();
        opts.myHeight = thisElement.outerHeight();

        opts.isNextToTheIframeBorder = (thisElement.attr("isNextToTheIframeBorder") == undefined ? false : true);
        //opts.myTitle = $(this).next("div.tooltipcontent").html();
        if (thisElement.attr("fbTitle") != undefined) {
            title = thisElement.attr("fbTitle");
        } else if (thisElement.attr("title") != undefined) {
            title = thisElement.attr("title");
        }

        opts.myTitle = title != "" ? title : opts.myTitle;
        opts.defaultPosition = (thisElement.attr("defaultposition") == undefined ? "none" : thisElement.attr("defaultposition"));

        $(".toolTip2 , .toolTip1").css("left", "0");

        $(".toolTip2 .mytooltipContent , .toolTip2_ters .mytooltipContent").html(opts.myTitle);
        $(".toolTip1 .mytooltipContent , .toolTip1_ters .mytooltipContent").html(opts.myTitle);
        $("#tooltipFirstPlaceHolder").html(opts.myTitle);

        opts.myToolTipWidth = $(".toolTip2").outerWidth();
        if (opts.isNextToTheIframeBorder != undefined && opts.isNextToTheIframeBorder == true)
            opts.myWidth -= 13;
        else
            opts.myWidth -= 35;

        opts.myToolTipHeight = $(".toolTip2").outerHeight();

        // parent.top.document.getElementById("temp11").innerHTML = "<br />   opts.defaultPosition :  " + opts.defaultPosition + " <br /> tooltipFirstPlaceHolder : " + $("#tooltipFirstPlaceHolder").outerWidth() + " <br />";        
        $(".toolTip2 , .toolTip1").attr("mywidth", opts.myToolTipWidth);

        if (opts.myWindowHeight >= (opts.myTop + opts.myHeight + opts.myToolTipHeight + 28)) {

            if (opts.defaultPosition == "none") {

                if ((opts.myLeft + opts.myWidth + opts.myToolTipWidth - 45) > opts.myWindowWidth) {
                    if ((opts.myToolTipWidth - 45) >= opts.myLeft) {
                        $(".toolTip2 , .toolTip1").width(opts.myLeft);
                        opts.myToolTipWidth = $(".toolTip1").outerWidth();
                    }
                    $(".toolTip1").show();
                    $(".toolTip1 div.kulak").css({ left: (opts.myToolTipWidth - 45) });

                    $(".toolTip1").offset({ top: (opts.myTop + opts.myHeight + 24), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 40)) });

                }
                else {
                    $(".toolTip2").show();
                    $(".toolTip2").offset({ top: (opts.myTop + opts.myHeight + 24), left: (opts.myLeft + (opts.myWidth)) });
                }
            }
            else if (opts.defaultPosition == "left") {

                if ((opts.myToolTipWidth - 45) >= opts.myLeft) {
                    $(".toolTip2 , .toolTip1").width(opts.myLeft);
                    opts.myToolTipWidth = $(".toolTip1").outerWidth();
                }
                $(".toolTip1").show();
                $(".toolTip1 div.kulak").css({ left: (opts.myToolTipWidth - 45) });
                $(".toolTip1").offset({ top: (opts.myTop + opts.myHeight + 24), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 40)) });
            } else {
                $(".toolTip2").show();
                $(".toolTip2").offset({ top: (opts.myTop + opts.myHeight + 24), left: (opts.myLeft + (opts.myWidth - 10)) });
            }
        }
        else {

            if (opts.myToolTipWidth < (opts.myLeft + opts.myWidth)) {
                $(".toolTip1_ters").show();

                $(".toolTip1_ters").offset({ top: (opts.myTop - opts.myToolTipHeight - 23), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 10)) });

            } else {
                $(".toolTip2_ters").show();

                $(".toolTip2_ters").offset({ top: (opts.myTop - opts.myToolTipHeight - 23), left: (opts.myLeft + (opts.myWidth - 10)) });
            }

        }

    }, function () {
        CloseAllTooltips();
    })
}

$.fn.fbtooltipHtml = function (options) {
    var defaults = {
        myTop: 0,
        myLeft: 0,
        myWidth: 0,
        myHeight: 0,
        myTitle: '',
        myRight: 0,
        myWindowWidth: 0,
        myWindowHeight: 0,
        myToolTipWidth: 0,
        myToolTipHeight: 0,
        defaultPosition: "none"
    };

    var opts = $.extend(defaults, options);

    this.hover(function () {

        opts.myWindowWidth = $(window).width();
        opts.myWindowHeight = $(window).height();
        opts.myTop = $(this).offset().top;
        opts.myLeft = $(this).offset().left;
        opts.myWidth = $(this).outerWidth();
        opts.myHeight = $(this).outerHeight();
        opts.myTitle = $(this).next("div.tooltipcontent").html();
        opts.defaultPosition = ($(this).attr("defaultposition") == undefined ? "none" : $(this).attr("defaultposition"));

        $(".toolTip2 , .toolTip1").css("left", "0");

        $(".toolTip2 .mytooltipContent , .toolTip2_ters .mytooltipContent").html($(this).next("div.tooltipcontent").html());
        $(".toolTip1 .mytooltipContent , .toolTip1_ters .mytooltipContent").html($(this).next("div.tooltipcontent").html());
        $("#tooltipFirstPlaceHolder").html($(this).next("div.tooltipcontent").html());

        opts.myToolTipWidth = $(".toolTip2").outerWidth();
        opts.myToolTipHeight = $(".toolTip2").outerHeight();
        // parent.top.document.getElementById("temp11").innerHTML = "<br />   opts.defaultPosition :  " + opts.defaultPosition + " <br /> tooltipFirstPlaceHolder : " + $("#tooltipFirstPlaceHolder").outerWidth() + " <br />";        
        $(".toolTip2 , .toolTip1").attr("mywidth", opts.myToolTipWidth);

        if (opts.myWindowHeight >= (opts.myTop + opts.myHeight + opts.myToolTipHeight + 28)) {

            if (opts.defaultPosition == "none") {

                if ((opts.myLeft + opts.myWidth + opts.myToolTipWidth - 45) > opts.myWindowWidth) {
                    if ((opts.myToolTipWidth - 45) >= opts.myLeft) {
                        $(".toolTip2 , .toolTip1").width(opts.myLeft);
                        opts.myToolTipWidth = $(".toolTip1").outerWidth();
                    }
                    $(".toolTip1").show();
                    $(".toolTip1 div.kulak").css({ left: (opts.myToolTipWidth - 45) });
                    $(".toolTip1").offset({ top: (opts.myTop + opts.myHeight + 24), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 10)) });

                }
                else {
                    $(".toolTip2").show();
                    $(".toolTip2").offset({ top: (opts.myTop + opts.myHeight + 24), left: (opts.myLeft + (opts.myWidth - 35)) });
                }
            }
            else if (opts.defaultPosition == "left") {

                if ((opts.myToolTipWidth - 45) >= opts.myLeft) {
                    //   $(".toolTip2 , .toolTip1").width(opts.myLeft);
                    opts.myToolTipWidth = $(".toolTip1").outerWidth();
                }
                $(".toolTip1").show();

                if ((opts.myToolTipWidth - 45) <= opts.myLeft) {
                    $(".toolTip1 div.kulak").css({ left: (opts.myToolTipWidth - 45) });
                    $(".toolTip1").offset({ top: (opts.myTop + opts.myHeight + 24), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 10)) });
                } else {
                    $(".toolTip1 div.kulak").css({ left: (opts.myLeft - 20) });
                    $(".toolTip1").offset({ top: (opts.myTop + opts.myHeight + 24), left: 0 });
                }
            } else {
                $(".toolTip2").show();
                $(".toolTip2").offset({ top: (opts.myTop + opts.myHeight + 24), left: (opts.myLeft + (opts.myWidth - 35)) });
            }
        }
        else {

            if (opts.myToolTipWidth < (opts.myLeft + opts.myWidth)) {
                $(".toolTip1_ters").show();

                $(".toolTip1_ters").offset({ top: (opts.myTop - opts.myToolTipHeight - 23), left: ((opts.myLeft + opts.myWidth) - (opts.myToolTipWidth - 21)) });

            } else {
                $(".toolTip2_ters").show();

                $(".toolTip2_ters").offset({ top: (opts.myTop - opts.myToolTipHeight - 23), left: (opts.myLeft + (opts.myWidth - 21)) });
            }

        }

    }, function () {
        CloseAllTooltips();
    })
}
               