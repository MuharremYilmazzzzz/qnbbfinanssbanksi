/*
* jQuery Watermark plugin
* Version 1.2.1 (7-DEC-2010)
* @requires jQuery v1.3 or later
*
* Examples at: http://mario.ec/static/jq-watermark/
* Copyright (c) 2010 Mario Estrada
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
*/

(function ($) {
    var old_ie = $.browser.msie && $.browser.version < 8;
    var hard_left = 4;
    $.watermarker = function () { };
    $.extend($.watermarker, {
        defaults: {
            color: '#999',
            left: 0,
            top: 0,
            fallback: false,
            animDuration: 300,
            minOpacity: 0.6
        },
        setDefaults: function (settings) {
            $.extend($.watermarker.defaults, settings);
        },
        checkVal: function (val, label, event_blur) {
            if (val.length == 0)
                $(label).show();
            else
                $(label).hide();

            return val.length > 0;
        },
        html5_support: function () {
            var i = document.createElement('input');
            return 'placeholder' in i;
        }
    });

    $.fn.watermark = function (text, options) {
        var options, elems;
        options = $.extend($.watermarker.defaults, options);
        elems = this.filter('textarea, input:not(:checkbox,:radio,:file,:submit,:reset)');
        var currentTxt = this;
        if (options.fallback && $.watermarker.html5_support())
            return this;

        elems.each(function () {
            var $elem, attr_name, label_text, watermark_container, watermark_label;
            var e_margin_left, e_margin_top, pos, e_top = 0, height, line_height;


            $elem = $(this);

            if ($elem.attr('data-jq-watermark') == 'processed')
                return;

            attr_name = $elem.attr('placeholder') != undefined && $elem.attr('placeholder') != '' ? 'placeholder' : 'title';
            label_text = text === undefined || text === '' ? $(this).attr(attr_name) : text;
            watermark_container = $('<span class="watermark_container"></span>');
            watermark_label = $('<span class="watermark">' + label_text + '</span>');

            // If used, remove the placeholder attribute to prevent conflicts
            if (attr_name == 'placeholder')
                $elem.removeAttr('placeholder');

            watermark_container.css({
                display: 'inline-block',
                position: 'relative'
            });

            $elem.wrap(watermark_container).attr('data-jq-watermark', 'processed');
            if (this.nodeName.toLowerCase() == 'textarea') {
                e_height = $elem.css('line-height');
                e_height = e_height === 'normal' ? parseInt($elem.css('font-size')) : e_height;
                e_top = ($elem.css('padding-top') != 'auto' ? parseInt($elem.css('padding-top')) : 0);
            } else {
                e_height = $elem.outerHeight();
                if (e_height <= 0) {
                    e_height = ($elem.css('padding-top') != 'auto' ? parseInt($elem.css('padding-top')) : 0);
                    e_height += ($elem.css('padding-bottom') != 'auto' ? parseInt($elem.css('padding-bottom')) : 0);
                    e_height += ($elem.css('height') != 'auto' ? parseInt($elem.css('height')) : 0);
                }
            }


            if ($elem.css('margin-top') != 'auto' && $elem.css('margin-top') != undefined) {

                if ($elem.attr('watermarkTop') != undefined && $elem.attr('watermarkTop') != "0") {
                    e_top += parseInt($elem.attr('watermarkTop'));
                }
                else
                    e_top += 0;
            } else {
                if ($.browser.msie && $elem.attr('watermarkTop') != undefined && $elem.attr('watermarkTop') != "0") {
                    e_top += 3;
                }
                else
                    e_top += 0;
            }

            if ($elem.css('margin-left') != 'auto' && $elem.css('margin-left') != undefined) {
                e_margin_left = parseInt($elem.css('margin-left'));
            } else {
                e_margin_left = 0;
            }

            if ($elem.css('padding-left') != 'auto' && $elem.css('padding-left') != undefined) {
                e_margin_left += parseInt($elem.css('padding-left'));
            }

            var elementFontFamily = $elem.get(0).style.fontFamily;
            var elementFontSize = $elem.get(0).style.fontSize;

            watermark_label.css({
                position: 'absolute',
                display: 'block',
                fontFamily: elementFontFamily,
                fontSize: elementFontSize,
                color: options.color,
                left: hard_left + options.left + e_margin_left,
                top: options.top + e_top,
                height: e_height,
                lineHeight: e_height + 'px',
                textAlign: 'left',
                pointerEvents: 'none'
            }).data('jq_watermark_element', $elem);

            $.watermarker.checkVal($elem.val(), watermark_label);

            watermark_label.click(function () {
                $($(this).data('jq_watermark_element')).trigger('click').trigger('focus');
            }
      );

            $elem.before(watermark_label)
			.bind('focus.jq_watermark', function () {
			    //  $(watermark_label).hide();
			    //			    if (!$.watermarker.checkVal($(this).val(), watermark_label)) {
			    //			        $(watermark_label).hide();
			    //			    }
			})
			.bind('blur.jq_watermark change.jq_watermark', function () {
			    if (!$.watermarker.checkVal($(this).val(), watermark_label)) {
			        $(watermark_label).show();
			    }
			})
			.bind('keydown.jq_watermark, paste.jq_watermark', function (e) {
			    $(watermark_label).hide();
			})
			.bind('keyup.jq_watermark', function (e) {
			    // $(watermark_label).hide();
			    $.watermarker.checkVal($(this).val(), watermark_label);
			});
        });

        return this;
    };

    $('.jq_watermark').watermark();
})(jQuery);
