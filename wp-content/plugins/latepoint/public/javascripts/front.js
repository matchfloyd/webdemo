"use strict";

function latepoint_is_timeframe_in_periods(timeframe_start, timeframe_end, periods_arr) {
  var is_inside = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  for (var i = 0; i < periods_arr.length; i++) {
    var period_start = 0;
    var period_end = 0;
    var buffer_before = 0;
    var buffer_after = 0;
    var period_info = periods_arr[i].split(':');
    if (period_info.length == 2) {
      period_start = period_info[0];
      period_end = period_info[1];
    } else {
      buffer_before = period_info[2];
      buffer_after = period_info[3];
      period_start = parseFloat(period_info[0]) - parseFloat(buffer_before);
      period_end = parseFloat(period_info[1]) + parseFloat(buffer_after);
    }
    if (is_inside) {
      if (latepoint_is_period_inside_another(timeframe_start, timeframe_end, period_start, period_end)) {
        return true;
      }
    } else {
      if (latepoint_is_period_overlapping(timeframe_start, timeframe_end, period_start, period_end)) {
        return true;
      }
    }
  }
  ;
  return false;
}
function latepoint_is_period_overlapping(period_one_start, period_one_end, period_two_start, period_two_end) {
  // https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap/
  return period_one_start < period_two_end && period_two_start < period_one_end;
}
function latepoint_is_period_inside_another(period_one_start, period_one_end, period_two_start, period_two_end) {
  return period_one_start >= period_two_start && period_one_end <= period_two_end;
}

// Converts time in minutes to hours if possible, if minutes also exists - shows minutes too
function latepoint_minutes_to_hours_preferably(time) {
  var army_clock = latepoint_is_army_clock();
  var hours = Math.floor(time / 60);
  if (!army_clock && hours > 12) hours = hours - 12;
  var minutes = time % 60;
  if (minutes > 0) hours = hours + ':' + minutes;
  return hours;
}
function latepoint_minutes_to_hours(time) {
  var army_clock = latepoint_is_army_clock();
  var hours = Math.floor(time / 60);
  if (!army_clock && hours > 12) hours = hours - 12;
  return hours;
}
function latepoint_am_or_pm(minutes) {
  if (latepoint_is_army_clock()) return '';
  return minutes < 720 || minutes == 1440 ? 'am' : 'pm';
}
function latepoint_hours_and_minutes_to_minutes(hours_and_minutes, ampm) {
  var hours_and_minutes_arr = hours_and_minutes.split(':');
  var hours = hours_and_minutes_arr[0];
  var minutes = hours_and_minutes_arr[1];
  if (ampm == "pm" && hours < 12) hours = parseInt(hours) + 12;
  if (ampm == "am" && hours == 12) hours = 0;
  minutes = parseInt(minutes) + hours * 60;
  return minutes;
}
function latepoint_get_time_system() {
  return latepoint_helper.time_system;
}
function latepoint_is_army_clock() {
  return latepoint_get_time_system() == '24';
}
function latepoint_minutes_to_hours_and_minutes(minutes) {
  var army_clock = latepoint_is_army_clock();
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '%02d:%02d';
  var hours = Math.floor(minutes / 60);
  if (!army_clock && hours > 12) hours = hours - 12;
  if (!army_clock && hours == 0) hours = 12;
  var minutes = minutes % 60;
  return sprintf(format, hours, minutes);
}
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function latepoint_validate_form($form) {
  var errors = [];
  $form.find('select[data-os-validate], input[data-os-validate], textarea[data-os-validate]').each(function () {
    var validations = jQuery(this).data('os-validate').split(' ');
    var $input = jQuery(this);
    var label = $input.closest('.os-form-group').find('label').text();
    var field_has_errors = false;
    if (validations) {
      for (var i = 0; i < validations.length; i++) {
        switch (validations[i]) {
          case 'presence':
            if (!$input.val()) {
              errors.push({
                message: label + ' ' + wp.i18n.__('can not be blank', 'latepoint')
              });
              field_has_errors = true;
            }
            break;
          case 'phone':
            if (!window.intlTelInputGlobals.getInstance($input[0]).isValidNumber()) {
              errors.push({
                message: label + ' ' + wp.i18n.__('is invalid', 'latepoint')
              });
              field_has_errors = true;
            }
            break;
        }
      }
    }
    if (field_has_errors) {
      $input.closest('.os-form-group').addClass('os-invalid');
    } else {
      $input.closest('.os-form-group').removeClass('os-invalid');
    }
  });
  return errors;
}
function latepoint_create_form_data_from_non_form_element($elem) {
  var formData = new FormData();
  // create objecte from all input fields that are inside of the element
  var fields = $elem.find('select, input, textarea').serializeArray();
  if (fields) {
    fields.forEach(function (field) {
      return formData.append(field.name, field.value);
    });
  }
  return formData;
}
function latepoint_create_form_data_from_booking_form($booking_form) {
  var route_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var extra_params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var form_data = new FormData();
  var params = new FormData($booking_form[0]);
  if (extra_params) {
    Object.keys(extra_params).forEach(function (key) {
      params.set(key, extra_params[key]);
    });
  }

  // get values from phone number fields
  if ('intlTelInputGlobals' in window && 'intlTelInputUtils' in window) {
    $booking_form.find('input.os-mask-phone').each(function () {
      var phoneInputName = this.getAttribute('name');
      var phoneInputValue = window.intlTelInputGlobals.getInstance(this).getNumber(window.intlTelInputUtils.numberFormat.E164);
      // override value generated automatically by formdata with a formatted value of a phone field with country code
      params.set(phoneInputName, phoneInputValue);
    });
  }
  form_data.append('params', latepoint_formdata_to_url_encoded_string(params));
  form_data.append('action', latepoint_helper.route_action);
  form_data.append('route_name', route_name ? route_name : $booking_form.data('route-name'));
  form_data.append('layout', 'none');
  form_data.append('return_format', 'json');
  var file_data;
  // put file data into main form_data object, since we can't send them in "params" string
  $booking_form.find('input[type="file"]').each(function () {
    file_data = this.files; // get multiple files from input file
    var file_name = this.getAttribute("name");
    for (var i = 0; i < file_data.length; i++) {
      form_data.append(file_name + '[]', file_data[i]);
    }
  });
  return form_data;
}
function latepoint_mask_timefield($elem) {
  if (jQuery().inputmask) {
    $elem.inputmask({
      'mask': '99:99',
      'placeholder': 'HH:MM'
    });
  }
}
function latepoint_formdata_to_url_encoded_string(form_data) {
  var filtered_form_data = new FormData();
  // remove file fields from params, so we can serialize it into string,
  // !important, this will not include file fields into the form_data, so you have to include them manually, see latepoint_create_form_data_from_booking_form() that does it
  // note: we don't use form_data.remove(key) on original object because we might want to preserve it
  var _iterator = _createForOfIteratorHelper(form_data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1];
      if (value instanceof File) continue;
      if (key.slice(-2) === '[]') {
        // expecting array, append
        filtered_form_data.append(key, value);
      } else {
        filtered_form_data.set(key, value);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return new URLSearchParams(filtered_form_data).toString();
}
function latepoint_mask_percent($elem) {
  if (jQuery().inputmask) {
    $elem.inputmask({
      'alias': 'decimal',
      'radixPoint': latepoint_helper.decimal_separator,
      'digits': 4,
      'digitsOptional': false,
      'suffix': '%',
      'placeholder': '0',
      'rightAlign': false
    });
  }
}
function latepoint_mask_minutes($elem) {
  if (jQuery().inputmask) {
    $elem.inputmask({
      'removeMaskOnSubmit': true,
      'alias': 'numeric',
      'digits': 0,
      'suffix': ' minutes',
      'placeholder': '0',
      'rightAlign': false
    });
  }
}
function latepoint_mask_money($elem) {
  if (jQuery().inputmask) {
    $elem.inputmask({
      'alias': 'currency',
      'groupSeparator': latepoint_helper.thousand_separator,
      'radixPoint': latepoint_helper.decimal_separator,
      'digits': latepoint_helper.number_of_decimals,
      'digitsOptional': false,
      'prefix': latepoint_helper.currency_symbol_before ? latepoint_helper.currency_symbol_before + ' ' : '',
      'suffix': latepoint_helper.currency_symbol_after ? ' ' + latepoint_helper.currency_symbol_after : '',
      'placeholder': '0',
      'rightAlign': false
    });
  }
}
function latepoint_mask_date($elem) {
  if (jQuery().inputmask) {
    $elem.inputmask({
      'alias': 'datetime',
      'inputFormat': latepoint_helper.date_format_for_js
    });
  }
}
function latepoint_init_phone_masking_from_placeholder($input) {
  if (!latepoint_helper.mask_phone_number_fields) return;
  var format = $input.attr('placeholder');
  if (format && jQuery().inputmask) {
    $input.inputmask(format.replace(/[0-9]/g, 9));
  }
}
function latepoint_mask_phone($elem) {
  var jsElem = $elem[0];

  // First priority is to prevent duplicates (common in non-document.body contexts)
  if (jsElem && !window.intlTelInputGlobals.getInstance(jsElem)) {
    var dropdownContainer = document.body;
    var onlyCountries = JSON.parse(latepoint_helper.included_phone_countries);
    // Remedy a quirk with json_encode(EMPTY_ARRAY)
    if (onlyCountries.length === 1 && onlyCountries[0] === "") {
      onlyCountries = [];
    }
    var preferredCountries = onlyCountries.length ? [] : window.intlTelInputGlobals.defaults.preferredCountries;

    // remove country name in english and only use names in country language
    var countryData = window.intlTelInputGlobals.getCountryData();
    for (var i = 0; i < countryData.length; i++) {
      var country = countryData[i];
      country.name = country.name.replace(/ *\([^)]*\) */g, "");
    }
    var iti = window.intlTelInput(jsElem, {
      dropdownContainer: dropdownContainer,
      formatOnDisplay: true,
      nationalMode: true,
      autoPlaceholder: 'aggressive',
      initialCountry: 'auto',
      geoIpLookup: function geoIpLookup(success, failure) {
        var cookieName = 'latepoint_phone_country';
        if (latepoint_has_cookie(cookieName)) {
          success(latepoint_get_cookie(cookieName));
        } else {
          jQuery.get('https://ipinfo.io', function () {}, 'jsonp').always(function (response) {
            // Sensible default
            var countryCode = latepoint_helper.default_phone_country;
            if (response && response.country) {
              countryCode = response.country.toLowerCase();
              latepoint_set_cookie(cookieName, countryCode);
            }
            success(countryCode);
          });
        }
      },
      onlyCountries: onlyCountries,
      preferredCountries: preferredCountries,
      separateDialCode: latepoint_helper.is_enabled_show_dial_code_with_flag
    });
    iti.promise.then(function () {
      latepoint_init_phone_masking_from_placeholder($elem);
    });
    $elem.on("countrychange", function (event) {
      latepoint_init_phone_masking_from_placeholder(jQuery(this));
    });
  }
}
function latepoint_show_booking_end_time() {
  return latepoint_helper.show_booking_end_time == 'yes';
}
function latepoint_set_cookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + date.toGMTString();
}
function latepoint_get_cookie(name) {
  var cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookie ? cookie[2] : null;
}
function latepoint_has_cookie(name) {
  return latepoint_get_cookie(name) !== null;
}
function latepoint_delete_cookie(name) {
  latepoint_set_cookie(name, '', -1);
}
"use strict";

function latepoint_add_notification(message) {
  var message_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
  var wrapper = jQuery('body').find('.os-notifications');
  if (!wrapper.length) {
    jQuery('body').append('<div class="os-notifications"></div>');
    wrapper = jQuery('body').find('.os-notifications');
  }
  if (wrapper.find('.item').length > 0) wrapper.find('.item:first-child').remove();
  wrapper.append('<div class="item item-type-' + message_type + '">' + message + '<span class="os-notification-close"><i class="latepoint-icon latepoint-icon-x"></i></span></div>');
}
"use strict";

function latepoint_generate_form_message_html(messages, status) {
  var message_html = '<div class="os-form-message-w status-' + status + '"><ul>';
  if (Array.isArray(messages)) {
    messages.forEach(function (message) {
      message_html += '<li>' + message + '</li>';
    });
  } else {
    message_html += '<li>' + messages + '</li>';
  }
  message_html += '</ul></div>';
  return message_html;
}
function latepoint_clear_form_messages($form) {
  $form.find('.os-form-message-w').remove();
}
function latepoint_show_data_in_lightbox(message) {
  var extra_classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  jQuery('.latepoint-lightbox-w').remove();
  var lightbox_css_classes = 'latepoint-lightbox-w latepoint-w ';
  if (extra_classes) lightbox_css_classes += extra_classes;
  jQuery('body').append('<div class="' + lightbox_css_classes + '"><div class="latepoint-lightbox-i">' + message + '<a href="#" class="latepoint-lightbox-close"><i class="latepoint-icon latepoint-icon-cross"></i></a></div><div class="latepoint-lightbox-shadow"></div></div>');
  jQuery('body').addClass('latepoint-lightbox-active');
}

// DOCUMENT READY
jQuery(function ($) {
  if ($('.latepoint').find('[data-os-action-onload]').length) {
    $('.latepoint').find('[data-os-action-onload]').each(function () {
      var $this = jQuery(this);
      $this.addClass('os-loading');
      var params = $this.data('os-params');
      var return_format = $this.data('os-return-format') ? $this.data('os-return-format') : 'json';
      var data = {
        action: 'latepoint_route_call',
        route_name: $this.data('os-action-onload'),
        params: params,
        return_format: return_format
      };
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: latepoint_helper.ajaxurl,
        data: data,
        success: function success(response) {
          $this.removeClass('os-loading');
          if (response.status === "success") {
            if ($this.data('os-output-target') == 'self') {
              $this.html(response.message);
            }
          }
        }
      });
    });
  }
  /* 
    Ajax buttons action
  */
  $('.latepoint').on('click', 'button[data-os-action], a[data-os-action], div[data-os-action], span[data-os-action], tr[data-os-action]', function (e) {
    var $this = jQuery(this);
    if ($this.data('os-prompt') && !confirm($this.data('os-prompt'))) return false;
    var params = $this.data('os-params');
    if ($this.data('os-source-of-params')) {
      var form_data = latepoint_create_form_data_from_non_form_element($($this.data('os-source-of-params')));
      params = latepoint_formdata_to_url_encoded_string(form_data);
    }
    var return_format = $this.data('os-return-format') ? $this.data('os-return-format') : 'json';
    var data = {
      action: 'latepoint_route_call',
      route_name: $this.data('os-action'),
      params: params,
      return_format: return_format
    };
    $this.addClass('os-loading');
    if ($this.data('os-output-target') == 'side-panel') {
      $('.latepoint-side-panel-w').remove();
      $('body').append('<div class="latepoint-side-panel-w os-loading"><div class="latepoint-side-panel-i"></div><div class="latepoint-side-panel-shadow"></div></div>');
    }
    $.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(response) {
        if (response.status === "success") {
          if ($this.data('os-output-target') == 'lightbox') {
            latepoint_show_data_in_lightbox(response.message, $this.data('os-lightbox-classes'));
          } else if ($this.data('os-output-target') == 'side-panel') {
            $('.latepoint-side-panel-i').html(response.message);
            setTimeout(function () {
              $('.latepoint-side-panel-w').removeClass('os-loading');
            }, 100);
          } else if ($this.data('os-success-action') == 'reload') {
            latepoint_add_notification(response.message);
            location.reload();
            return;
          } else if ($this.data('os-success-action') == 'redirect') {
            if ($this.data('os-redirect-to')) {
              latepoint_add_notification(response.message);
              window.location.replace($this.data('os-redirect-to'));
            } else {
              window.location.replace(response.message);
            }
            return;
          } else if ($this.data('os-output-target') && $($this.data('os-output-target')).length) {
            if ($this.data('os-output-target-do') == 'append') {
              $($this.data('os-output-target')).append(response.message);
            } else {
              $($this.data('os-output-target')).html(response.message);
            }
          } else {
            switch ($this.data('os-before-after')) {
              case 'before':
                $this.before(response.message);
                break;
              case 'after':
                $this.after(response.message);
                break;
              case 'replace':
                $this.replaceWith(response.message);
                break;
              case 'none':
                break;
              default:
                latepoint_add_notification(response.message);
            }
          }
          if ($this.data('os-after-call')) {
            var func_name = $this.data('os-after-call');
            var callback = false;
            if (func_name.includes('.')) {
              var func_arr = func_name.split('.');
              if (typeof window[func_arr[0]][func_arr[1]] !== 'function') {
                console.log(func_name + ' is undefined');
              }
              if ($this.data('os-pass-this') && $this.data('os-pass-response')) {
                window[func_arr[0]][func_arr[1]]($this, response);
              } else if ($this.data('os-pass-this')) {
                window[func_arr[0]][func_arr[1]]($this);
              } else if ($this.data('os-pass-response')) {
                window[func_arr[0]][func_arr[1]](response);
              } else {
                window[func_arr[0]][func_arr[1]]();
              }
            } else {
              if (typeof window[func_name] !== 'function') {
                console.log(func_name + ' is undefined');
              }
              if ($this.data('os-pass-this') && $this.data('os-pass-response')) {
                window[func_name]($this, response);
              } else if ($this.data('os-pass-this')) {
                window[func_name]($this);
              } else if ($this.data('os-pass-response')) {
                window[func_name](response);
              } else {
                window[func_name]();
              }
            }
          }
          $this.removeClass('os-loading');
        } else {
          $this.removeClass('os-loading');
          if ($this.data('os-output-target') && $($this.data('os-output-target')).length) {
            $($this.data('os-output-target')).prepend(latepoint_generate_form_message_html(response.message, 'error'));
          } else {
            alert(response.message);
          }
          if ($this.data('os-after-call-error')) {
            var func_name = $this.data('os-after-call-error');
            var callback = false;
            if (func_name.includes('.')) {
              var func_arr = func_name.split('.');
              if (typeof window[func_arr[0]][func_arr[1]] !== 'function') {
                console.log(func_name + ' is undefined');
              }
              if ($this.data('os-pass-this') && $this.data('os-pass-response')) {
                window[func_arr[0]][func_arr[1]]($this, response);
              } else if ($this.data('os-pass-this')) {
                window[func_arr[0]][func_arr[1]]($this);
              } else if ($this.data('os-pass-response')) {
                window[func_arr[0]][func_arr[1]](response);
              } else {
                window[func_arr[0]][func_arr[1]]();
              }
            } else {
              if (typeof window[func_name] !== 'function') {
                console.log(func_name + ' is undefined');
              }
              if ($this.data('os-pass-this') && $this.data('os-pass-response')) {
                window[func_name]($this, response);
              } else if ($this.data('os-pass-this')) {
                window[func_name]($this);
              } else if ($this.data('os-pass-response')) {
                window[func_name](response);
              } else {
                window[func_name]();
              }
            }
          }
        }
      }
    });
    return false;
  });
  $('.latepoint').on('click', 'form[data-os-action] button[type="submit"]', function (e) {
    $(this).addClass('os-loading');
  });

  /* 
    Form ajax submit action
  */
  $('.latepoint').on('submit', 'form[data-os-action]', function (e) {
    e.preventDefault(); // prevent native submit
    var $form = $(this);
    var form_data = new FormData($form[0]);
    if ('intlTelInputGlobals' in window && 'intlTelInputUtils' in window) {
      // Get e164 formatted number from phone fields when form is submitted
      $form.find('input.os-mask-phone').each(function () {
        var telInstance = window.intlTelInputGlobals.getInstance(this);
        if (telInstance) {
          var phoneInputName = this.getAttribute('name');
          var phoneInputValue = window.intlTelInputGlobals.getInstance(this).getNumber(window.intlTelInputUtils.numberFormat.E164);
          form_data.set(phoneInputName, phoneInputValue);
        }
      });
    }
    var data = {
      action: 'latepoint_route_call',
      route_name: $(this).data('os-action'),
      params: latepoint_formdata_to_url_encoded_string(form_data),
      return_format: 'json'
    };
    $form.find('button[type="submit"]').addClass('os-loading');
    $.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(response) {
        $form.find('button[type="submit"].os-loading').removeClass('os-loading');
        latepoint_clear_form_messages($form);
        if (response.status === "success") {
          if ($form.data('os-success-action') == 'reload') {
            latepoint_add_notification(response.message);
            location.reload();
            return;
          } else if ($form.data('os-success-action') == 'redirect') {
            if ($form.data('os-redirect-to')) {
              latepoint_add_notification(response.message);
              window.location.replace($form.data('os-redirect-to'));
            } else {
              window.location.replace(response.message);
            }
            return;
          } else if ($form.data('os-output-target') && $($form.data('os-output-target')).length) {
            $($form.data('os-output-target')).html(response.message);
          } else {
            if (response.message == 'redirect') {
              window.location.replace(response.url);
            } else {
              latepoint_add_notification(response.message);
              $form.prepend(latepoint_generate_form_message_html(response.message, 'success'));
            }
          }
          if ($form.data('os-record-id-holder') && response.record_id) {
            $form.find('[name="' + $form.data('os-record-id-holder') + '"]').val(response.record_id);
          }
          if ($form.data('os-after-call')) {
            var func_name = $form.data('os-after-call');
            if (typeof window[func_name] !== 'function') {
              console.log(func_name + ' is undefined');
            }
            if ($form.data('os-pass-response')) {
              window[func_name](response);
            } else {
              window[func_name]();
            }
          }
          $('button.os-loading').removeClass('os-loading');
        } else {
          $('button.os-loading').removeClass('os-loading');
          if ($form.data('os-show-errors-as-notification')) {
            latepoint_add_notification(response.message, 'error');
          } else {
            $form.prepend(latepoint_generate_form_message_html(response.message, 'error'));
            $([document.documentElement, document.body]).animate({
              scrollTop: $form.find(".os-form-message-w").offset().top - 30
            }, 200);
          }
        }
        if (response.form_values_to_update) {
          $.each(response.form_values_to_update, function (name, value) {
            $form.find('[name="' + name + '"]').val(value);
          });
        }
      }
    });
    return false;
  });
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*
 * Copyright (c) 2022 LatePoint LLC. All rights reserved.
 */

function latepoint_init_form_masks() {
  if ('intlTelInput' in window && 'intlTelInputGlobals' in window) {
    jQuery('.os-mask-phone').each(function () {
      latepoint_mask_phone(jQuery(this));
    });
  }
}
function latepoint_scroll_to_top_of_booking_form($booking_form_element) {
  // if it's a form shortcode (not lightbox), scroll to top of the form
  if ($booking_form_element.parent().hasClass('latepoint-shortcode-booking-form')) {
    // $booking_form_element[0].scrollIntoView({block: 'center'}); // SHOULD NOT BE FIRST!! Also need to FIX, scroll only if TOP of the booking form is above the viewport
  }
  // if lightbox - scroll body of lightbox to top
  if ($booking_form_element.parent().hasClass('latepoint-lightbox-i')) {
    $booking_form_element.find('.latepoint-body').scrollTop(0);
  }
}
function latepoint_init_payment_method_actions($booking_form_element, payment_method) {
  var callbacks_list = [];
  var is_last_step = $booking_form_element.data('next-submit-is-last') == 'yes';
  $booking_form_element.trigger('latepoint:initPaymentMethod', [{
    payment_method: payment_method,
    callbacks_list: callbacks_list,
    is_last_step: is_last_step
  }]);
  $booking_form_element.removeClass('step-content-loaded').addClass('step-content-loading');
  try {
    var _jQuery;
    (_jQuery = jQuery).when.apply(_jQuery, _toConsumableArray(callbacks_list.map(function (callback) {
      return callback.action();
    }))).done(function () {
      $booking_form_element.removeClass('step-content-loading').addClass('step-content-loaded').find('.lp-payment-method-content[data-payment-method="' + payment_method + '"]').show();
    }).fail(function (error) {
      latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
    });
  } catch (error) {
    latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
  }
}
function latepoint_lightbox_close() {
  jQuery('body').removeClass('latepoint-lightbox-active');
  jQuery('.latepoint-lightbox-w').remove();
}
function latepoint_show_next_btn($booking_form_element) {
  $booking_form_element.find('.latepoint-next-btn').removeClass('disabled');
  $booking_form_element.removeClass('hidden-buttons');
}
function clear_step_services($booking_form_element) {
  latepoint_reload_summary($booking_form_element, 'service', '');
  clear_sub_step_attendies($booking_form_element);
}
function clear_sub_step_attendies($booking_form_element) {
  $booking_form_element.find('.latepoint_total_attendies').val(1);
  latepoint_reload_summary($booking_form_element, 'total-attendies', '');
  clear_sub_step_duration($booking_form_element);
}
function clear_sub_step_duration($booking_form_element) {
  $booking_form_element.find('.latepoint_duration').val('');
  latepoint_reload_summary($booking_form_element, 'duration', '');
}
function clear_step_service_extras($booking_form_element) {
  latepoint_reload_summary($booking_form_element, 'service-extras', '');
}
function clear_step_locations($booking_form_element) {
  latepoint_reload_summary($booking_form_element, 'location', '');
}
function clear_step_agents($booking_form_element) {
  latepoint_reload_summary($booking_form_element, 'agent', '');
}
function clear_step_datepicker($booking_form_element) {
  latepoint_reload_summary($booking_form_element, 'time', '');
  latepoint_reload_summary($booking_form_element, 'date', '');
}
function latepoint_hide_next_btn($booking_form_element) {
  $booking_form_element.find('.latepoint-next-btn').addClass('disabled');
  if ($booking_form_element.find('.latepoint-prev-btn.disabled').length) $booking_form_element.addClass('hidden-buttons');
}
function latepoint_show_prev_btn($booking_form_element) {
  $booking_form_element.find('.latepoint-prev-btn').removeClass('disabled');
  $booking_form_element.removeClass('hidden-buttons');
}
function latepoint_hide_prev_btn($booking_form_element) {
  $booking_form_element.find('.latepoint-prev-btn').addClass('disabled');
  if ($booking_form_element.find('.latepoint-next-btn.disabled').length) $booking_form_element.addClass('hidden-buttons');
}
function latepoint_show_capacity_selector($item) {
  var $booking_form_element = $item.closest('.latepoint-booking-form-element');
  var max_capacity = $item.data('max-capacity');
  var min_capacity = $item.data('min-capacity');
  $booking_form_element.find('.sta-sub-label span').text(max_capacity);
  $booking_form_element.find('.step-services-w').removeClass('selecting-service-duration');
  $booking_form_element.find('.total-attendies-selector-w').data('max-capacity', max_capacity);
  $booking_form_element.find('.total-attendies-selector-w').data('min-capacity', min_capacity);
  $item.closest('.step-services-w').addClass('selecting-total-attendies');
  var current_value = $booking_form_element.find('.total-attendies-selector-input').val();
  $booking_form_element.find('.total-attendies-selector-input').val(Math.max(Number(min_capacity), Number(current_value)));
  latepoint_show_prev_btn($booking_form_element);
  latepoint_show_next_btn($booking_form_element);
}
function latepoint_show_durations($item) {
  var $booking_form_element = $item.closest('.latepoint-booking-form-element');
  $item.closest('.step-services-w').addClass('selecting-service-duration');
  latepoint_show_prev_btn($booking_form_element);
  latepoint_hide_next_btn($booking_form_element);
}
function latepoint_apply_coupon($elem) {
  var $booking_form_element = $elem.closest('.latepoint-booking-form-element');
  var $coupon_input = $elem;
  $coupon_input.closest('.coupon-code-input-w').addClass('os-loading');
  var form_data = new FormData($booking_form_element.find('.latepoint-form')[0]);
  var data = {
    action: latepoint_helper.route_action,
    route_name: $elem.data('route'),
    params: latepoint_formdata_to_url_encoded_string(form_data),
    layout: 'none',
    return_format: 'json'
  };
  jQuery.ajax({
    type: "post",
    dataType: "json",
    url: latepoint_helper.ajaxurl,
    data: data,
    success: function success(data) {
      $coupon_input.closest('.coupon-code-input-w').removeClass('os-loading');
      if (data.status === "success") {
        $booking_form_element.find('input[name="booking[coupon_code]"]').val($coupon_input.val());
        latepoint_show_message_inside_element(data.message, $booking_form_element.find('.latepoint-body'), 'success');
        $booking_form_element.find('.step-payment-w input[name="booking[payment_method]"]').val('');
        $booking_form_element.find('input[name="booking[payment_token]"]').val('');
        $booking_form_element.find('input[name="booking[payment_portion]"]').val('');
        latepoint_reload_step($booking_form_element);
      } else {
        latepoint_show_message_inside_element(data.message, $booking_form_element.find('.latepoint-body'), 'error');
      }
    }
  });
}
function latepoint_remove_coupon($elem) {
  $elem.closest('.applied-coupon-code').fadeOut();
  var $booking_form_element = $elem.closest('.latepoint-booking-form-element');
  $booking_form_element.find('input[name="booking[coupon_code]"]').val('');
  latepoint_reload_step($booking_form_element);
}
function latepoint_reload_step($booking_form_element) {
  var step_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (step_name) {
    $booking_form_element.find('.latepoint_current_step').val(step_name);
    $booking_form_element.removeClass(function (index, className) {
      return (className.match(/(^|\s)current-step-\S+/g) || []).join(' ');
    }).addClass('current-step-' + step_name);
    if ($booking_form_element.find('.latepoint-step-content[data-step-name="' + step_name + '"]')) {
      $booking_form_element.find('.latepoint-step-content[data-step-name="' + step_name + '"]').nextAll('.latepoint-step-content').remove();
      $booking_form_element.find('.latepoint-step-content[data-step-name="' + step_name + '"]').remove();
    }
  }
  $booking_form_element.find('.latepoint_step_direction').val('specific');
  $booking_form_element.find('.latepoint-form').submit();
  return false;
}
function latepoint_get_payment_sub_step($booking_form_element, current_sub_step) {
  var prev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var offset = prev ? -1 : 1;
  var payment_sub_steps = [];
  if ($booking_form_element.find('.step-payment-w .lp-payment-times-w').length) payment_sub_steps.push('payment-times');
  if ($booking_form_element.find('.step-payment-w .lp-payment-methods-w').length) payment_sub_steps.push('payment-methods');
  if ($booking_form_element.find('.step-payment-w .lp-payment-portions-w').length) payment_sub_steps.push('payment-portions');
  var selected_payment_method = $booking_form_element.find('input[name="booking[payment_method]"]').val();
  if (selected_payment_method) payment_sub_steps.push('payment-method-content');
  var index = payment_sub_steps.indexOf(current_sub_step) + offset;
  if (index >= 0 && index < payment_sub_steps.length) {
    var sub_step = payment_sub_steps[index];
    if (sub_step == 'payment-method-content') {
      latepoint_init_payment_method_actions($booking_form_element, selected_payment_method);
      // if no content exists for payment method - do not change sub step
      if (!$booking_form_element.find('.lp-payment-method-content[data-payment-method="' + selected_payment_method + '"]').length) sub_step = current_sub_step;
    }
    return sub_step;
  } else {
    return current_sub_step;
  }
}
function latepoint_reset_password_from_booking_init() {
  jQuery('.os-step-existing-customer-login-w').hide();
  jQuery('.os-password-reset-form-holder').on('click', '.password-reset-back-to-login', function () {
    jQuery('.os-password-reset-form-holder').html('');
    jQuery('.os-step-existing-customer-login-w').show();
    return false;
  });
}
function latepoint_reload_summary($booking_form_element) {
  var field_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var $summary_holder = $booking_form_element.closest('.latepoint-with-summary');
  if (!$summary_holder.length) return;
  $booking_form_element.find('.latepoint-summary-w').addClass('os-loading');
  var $booking_form = $booking_form_element.find('.latepoint-form');
  var form_data = new FormData($booking_form[0]);
  var data = {
    action: latepoint_helper.route_action,
    route_name: latepoint_helper.reload_booking_summary_route,
    params: latepoint_formdata_to_url_encoded_string(form_data),
    layout: 'none',
    return_format: 'json'
  };
  jQuery.ajax({
    type: "post",
    dataType: "json",
    url: latepoint_helper.ajaxurl,
    data: data,
    success: function success(data) {
      if (data.status === "success") {
        $booking_form_element.find('.os-summary-contents').html(data.message);
        $booking_form_element.find('.latepoint-summary-w').removeClass('os-loading');
        $summary_holder.addClass('latepoint-summary-is-open');
      }
    }
  });
  return;
}
function latepoint_password_changed_show_login(response) {
  jQuery('.os-step-existing-customer-login-w').show();
  jQuery('.os-password-reset-form-holder').html('');
  latepoint_show_message_inside_element(response.message, jQuery('.os-step-existing-customer-login-w'), 'success');
}
function latepoint_hide_message_inside_element() {
  var $elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jQuery('.latepoint-body');
  if ($elem.length && $elem.find('.latepoint-message').length) {
    $elem.find('.latepoint-message').remove();
  }
}
function latepoint_show_message_inside_element(message) {
  var $elem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jQuery('.latepoint-body');
  var message_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'error';
  if ($elem.length) {
    if ($elem.find('.latepoint-message').length) {
      $elem.find('.latepoint-message').removeClass('latepoint-message-success').removeClass('latepoint-message-error').addClass('latepoint-message-' + message_type + '').html(message).show();
    } else {
      $elem.prepend('<div class="latepoint-message latepoint-message-' + message_type + '">' + message + '</div>');
    }
  }
}
function latepoint_add_action(callbacks_list, action) {
  var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  callbacks_list.push({
    priority: priority,
    action: action
  });
  callbacks_list.sort(function (a, b) {
    return a.priority - b.priority;
  });
  return callbacks_list;
}
function latepoint_init_step(step_name, $booking_form_element) {
  latepoint_init_step_selectable_items();
  latepoint_init_step_category_items(step_name);
  switch (step_name) {
    case 'datepicker':
      latepoint_init_step_datepicker();
      break;
    case 'contact':
      latepoint_init_step_contact();
      break;
    case 'agents':
      latepoint_init_step_agents();
      break;
    case 'locations':
      latepoint_init_step_locations();
      break;
    case 'services':
      latepoint_init_step_services();
      break;
    case 'payment':
      latepoint_init_step_payment($booking_form_element);
      break;
    case 'verify':
      latepoint_init_step_verify($booking_form_element);
      break;
    case 'confirmation':
      latepoint_init_step_confirmation();
      break;
  }
  $booking_form_element.trigger("latepoint:initStep", [{
    step_name: step_name
  }]);
  $booking_form_element.trigger("latepoint:initStep:" + step_name);
  latepoint_scroll_to_top_of_booking_form($booking_form_element);
}
function day_timeslots($day) {
  var $booking_form_element = $day.closest('.latepoint-booking-form-element');
  $day.addClass('selected');
  var service_duration = $day.data('service-duration');
  var interval = $day.data('interval');
  var work_start_minutes = $day.data('work-start-time');
  var work_end_minutes = $day.data('work-end-time');
  var total_work_minutes = $day.data('total-work-minutes');
  var bookable_minutes = [];
  var available_capacities_of_bookable_minute = [];
  if ($day.attr('data-bookable-minutes')) {
    if ($day.data('bookable-minutes').toString().indexOf(':') > -1) {
      // has capacity information embedded into bookable minutes string
      var bookable_minutes_with_capacity = $day.data('bookable-minutes').toString().split(',');
      for (var i = 0; i < bookable_minutes_with_capacity.length; i++) {
        bookable_minutes.push(parseInt(bookable_minutes_with_capacity[i].split(':')[0]));
        available_capacities_of_bookable_minute.push(parseInt(bookable_minutes_with_capacity[i].split(':')[1]));
      }
    } else {
      bookable_minutes = $day.data('bookable-minutes').toString().split(',').map(Number);
    }
  }
  var work_minutes = $day.data('work-minutes').toString().split(',').map(Number);
  var $timeslots = $booking_form_element.find('.timeslots');
  $timeslots.html('');
  if (total_work_minutes > 0 && bookable_minutes.length && work_minutes.length) {
    var prev_minutes = false;
    work_minutes.forEach(function (current_minutes) {
      var ampm = latepoint_am_or_pm(current_minutes);
      var timeslot_class = 'dp-timepicker-trigger';
      var timeslot_available_capacity = 0;
      if (latepoint_helper.time_pick_style == 'timeline') {
        timeslot_class += ' dp-timeslot';
      } else {
        timeslot_class += ' dp-timebox';
      }
      if (prev_minutes !== false && current_minutes - prev_minutes > service_duration) {
        // show interval that is off between two work periods
        var off_label = latepoint_minutes_to_hours_and_minutes(prev_minutes + service_duration) + ' ' + latepoint_am_or_pm(prev_minutes + service_duration) + ' - ' + latepoint_minutes_to_hours_and_minutes(current_minutes) + ' ' + latepoint_am_or_pm(current_minutes);
        var off_width = (current_minutes - prev_minutes - service_duration) / total_work_minutes * 100;
        $timeslots.append('<div class="' + timeslot_class + ' is-off" style="max-width:' + off_width + '%; width:' + off_width + '%"><span class="dp-label">' + off_label + '</span></div>');
      }
      if (!bookable_minutes.includes(current_minutes)) {
        timeslot_class += ' is-booked';
      } else {
        if (available_capacities_of_bookable_minute.length) timeslot_available_capacity = available_capacities_of_bookable_minute[bookable_minutes.indexOf(current_minutes)];
      }
      var tick_html = '';
      var capacity_label = '';
      var capacity_label_html = '';
      var capacity_internal_label_html = '';
      if (current_minutes % 60 == 0 || interval >= 60) {
        timeslot_class += ' with-tick';
        tick_html = '<span class="dp-tick"><strong>' + latepoint_minutes_to_hours_preferably(current_minutes) + '</strong>' + ' ' + ampm + '</span>';
      }
      var timeslot_label = latepoint_minutes_to_hours_and_minutes(current_minutes) + ' ' + ampm;
      if (latepoint_show_booking_end_time()) {
        var end_minutes = current_minutes + service_duration;
        if (end_minutes > 1440) end_minutes = end_minutes - 1440;
        var end_minutes_ampm = latepoint_am_or_pm(end_minutes);
        timeslot_label += ' - <span class="dp-label-end-time">' + latepoint_minutes_to_hours_and_minutes(end_minutes) + ' ' + end_minutes_ampm + '</span>';
      }
      if (timeslot_available_capacity) {
        var spaces_message = timeslot_available_capacity > 1 ? latepoint_helper.many_spaces_message : latepoint_helper.single_space_message;
        capacity_label = timeslot_available_capacity + ' ' + spaces_message;
        capacity_label_html = '<span class="dp-capacity">' + capacity_label + '</span>';
        capacity_internal_label_html = '<span class="dp-label-capacity">' + capacity_label + '</span>';
      }
      timeslot_label = timeslot_label.trim();
      $timeslots.removeClass('slots-not-available').append('<div class="' + timeslot_class + '" data-minutes="' + current_minutes + '"><span class="dp-label">' + capacity_internal_label_html + '<span class="dp-label-time">' + timeslot_label + '</span>' + '</span>' + tick_html + capacity_label_html + '</div>');
      prev_minutes = current_minutes;
    });
  } else {
    // No working hours this day
    $timeslots.addClass('slots-not-available').append('<div class="not-working-message">' + latepoint_helper.msg_not_available + "</div>");
  }
  jQuery('.times-header-label span').text($day.data('nice-date'));
  $booking_form_element.find('.time-selector-w').slideDown(200, function () {
    var $scrollable_wrapper = $booking_form_element.find('.latepoint-body');
    $scrollable_wrapper.stop().animate({
      scrollTop: $scrollable_wrapper[0].scrollHeight
    }, 200);
  });
}
function latepoint_init_timeslots() {
  jQuery('.dp-timepicker-trigger').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    if (jQuery(this).hasClass('is-booked') || jQuery(this).hasClass('is-off')) {
      // Show error message that you cant select a booked period
    } else {
      if (jQuery(this).hasClass('selected')) {
        jQuery(this).removeClass('selected');
        jQuery(this).find('.dp-success-label').remove();
        $booking_form_element.find('.latepoint_start_time').val('');
        latepoint_hide_next_btn($booking_form_element);
        latepoint_reload_summary($booking_form_element, 'time', '');
      } else {
        $booking_form_element.find('.dp-timepicker-trigger.selected').removeClass('selected').find('.dp-success-label').remove();
        var selected_timeslot_time = jQuery(this).find('.dp-label-time').html();
        jQuery(this).addClass('selected').find('.dp-label').prepend('<span class="dp-success-label">' + $booking_form_element.find('.latepoint-form').data('selected-label') + '</span>');
        var minutes = parseInt(jQuery(this).data('minutes'));
        var timeshift_minutes = parseInt($booking_form_element.find('.latepoint_timeshift_minutes').val());
        // we substract timeshift minutes because its timeshift minutes that the business is running in, in opposite of what we do when we generate a calendar for a client
        if (timeshift_minutes) minutes = minutes - timeshift_minutes;
        var start_date = new Date($booking_form_element.find('.os-day.selected').data('date'));
        if (minutes < 0) {
          // business minutes are in previous day
          minutes = 24 * 60 + minutes;
          // move start date back 1 day
          start_date.setDate(start_date.getDate() - 1);
        } else if (minutes >= 24 * 60) {
          // business minutes are in next day
          minutes = minutes - 24 * 60;
          start_date.setDate(start_date.getDate() + 1);
        }
        $booking_form_element.find('.latepoint_start_date').val(start_date.toISOString().split('T')[0]);
        $booking_form_element.find('.latepoint_start_time').val(minutes);
        latepoint_show_next_btn($booking_form_element);
        latepoint_reload_summary($booking_form_element, 'time', selected_timeslot_time);
      }
    }
    return false;
  });
}
function latepoint_init_monthly_calendar_navigation() {
  jQuery('.os-month-next-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var next_month_route_name = jQuery(this).data('route');
    if ($booking_form_element.find('.os-monthly-calendar-days-w.active + .os-monthly-calendar-days-w').length) {
      $booking_form_element.find('.os-monthly-calendar-days-w.active').removeClass('active').next('.os-monthly-calendar-days-w').addClass('active');
      latepoint_calendar_set_month_label($booking_form_element);
    } else {
      // TODO add condition to check maximum number months to call into the future
      if (true) {
        var $btn = jQuery(this);
        $btn.addClass('os-loading');
        var $calendar_element = $booking_form_element.find('.os-monthly-calendar-days-w').last();
        var calendar_year = $calendar_element.data('calendar-year');
        var calendar_month = $calendar_element.data('calendar-month');
        if (calendar_month == 12) {
          calendar_year = calendar_year + 1;
          calendar_month = 1;
        } else {
          calendar_month = calendar_month + 1;
        }
        var form_data = new FormData($booking_form_element.find('.latepoint-form')[0]);
        form_data.set('target_date_string', "".concat(calendar_year, "-").concat(calendar_month, "-1"));
        var params = latepoint_formdata_to_url_encoded_string(form_data);
        var data = {
          action: latepoint_helper.route_action,
          route_name: next_month_route_name,
          params: params,
          layout: 'none',
          return_format: 'json'
        };
        jQuery.ajax({
          type: "post",
          dataType: "json",
          url: latepoint_helper.ajaxurl,
          data: data,
          success: function success(data) {
            $btn.removeClass('os-loading');
            if (data.status === "success") {
              $booking_form_element.find('.os-months').append(data.message);
              $booking_form_element.find('.os-monthly-calendar-days-w.active').removeClass('active').next('.os-monthly-calendar-days-w').addClass('active');
              latepoint_calendar_set_month_label($booking_form_element);
            } else {
              // console.log(data.message);
            }
          }
        });
      }
    }
    latepoint_calendar_show_or_hide_prev_next_buttons($booking_form_element);
    return false;
  });
  jQuery('.os-month-prev-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    if ($booking_form_element.find('.os-monthly-calendar-days-w.active').prev('.os-monthly-calendar-days-w').length) {
      $booking_form_element.find('.os-monthly-calendar-days-w.active').removeClass('active').prev('.os-monthly-calendar-days-w').addClass('active');
      latepoint_calendar_set_month_label($booking_form_element);
    }
    latepoint_calendar_show_or_hide_prev_next_buttons($booking_form_element);
    return false;
  });
}
function latepoint_calendar_set_month_label($booking_form_element) {
  $booking_form_element.find('.os-current-month-label .current-year').text($booking_form_element.find('.os-monthly-calendar-days-w.active').data('calendar-year'));
  $booking_form_element.find('.os-current-month-label .current-month').text($booking_form_element.find('.os-monthly-calendar-days-w.active').data('calendar-month-label'));
}
function latepoint_calendar_show_or_hide_prev_next_buttons($booking_form_element) {
  $booking_form_element.find('.os-current-month-label .current-year').text($booking_form_element.find('.os-monthly-calendar-days-w.active .os-monthly-calendar-days').data('calendar-year'));
  $booking_form_element.find('.os-current-month-label .current-month').text($booking_form_element.find('.os-monthly-calendar-days-w.active .os-monthly-calendar-days').data('calendar-month-label'));
  if ($booking_form_element.find('.os-monthly-calendar-days-w.active').prev('.os-monthly-calendar-days-w').length) {
    $booking_form_element.find('.os-month-prev-btn').removeClass('disabled');
  } else {
    $booking_form_element.find('.os-month-prev-btn').addClass('disabled');
  }
}
function latepoint_format_minutes_to_time(minutes, service_duration) {
  var ampm = latepoint_am_or_pm(minutes);
  var formatted_time = latepoint_minutes_to_hours_and_minutes(minutes) + ' ' + ampm;
  if (latepoint_show_booking_end_time()) {
    var end_minutes = minutes + service_duration;
    var end_minutes_ampm = latepoint_am_or_pm(end_minutes);
    formatted_time += ' - ' + latepoint_minutes_to_hours_and_minutes(end_minutes) + ' ' + end_minutes_ampm;
  }
  formatted_time = formatted_time.trim();
  return formatted_time;
}
function latepoint_init_step_datepicker() {
  latepoint_init_timeslots();
  latepoint_init_monthly_calendar_navigation();
  jQuery('.os-months').on('click', '.os-day', function () {
    if (jQuery(this).hasClass('os-day-passed')) return false;
    if (jQuery(this).hasClass('os-not-in-allowed-period')) return false;
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    if (jQuery(this).closest('.os-monthly-calendar-days-w').hasClass('hide-if-single-slot')) {
      // HIDE TIMESLOT IF ONLY ONE TIMEPOINT
      if (jQuery(this).hasClass('os-not-available')) {
        // clicked on a day that has no available timeslots
        // do nothing
      } else {
        $booking_form_element.find('.os-day.selected').removeClass('selected');
        jQuery(this).addClass('selected');
        // set date
        $booking_form_element.find('.latepoint_start_date').val(jQuery(this).data('date'));
        latepoint_reload_summary($booking_form_element, 'date', jQuery(this).data('nice-date'));
        if (jQuery(this).hasClass('os-one-slot-only')) {
          // clicked on a day that has only one slot available
          var bookable_minutes = jQuery(this).data('bookable-minutes').toString().split(':')[0];
          var selected_timeslot_time = latepoint_format_minutes_to_time(Number(bookable_minutes), Number(jQuery(this).data('service-duration')));
          $booking_form_element.find('.latepoint_start_time').val(jQuery(this).data('bookable-minutes'));
          latepoint_show_next_btn($booking_form_element);
          latepoint_reload_summary($booking_form_element, 'time', selected_timeslot_time);
          $booking_form_element.find('.time-selector-w').slideUp(200);
        } else {
          // regular day with more than 1 timeslots available
          // build timeslots
          day_timeslots(jQuery(this));
          // initialize timeslots events
          latepoint_init_timeslots();
          // clear time and hide next btn
          $booking_form_element.find('.latepoint_start_time').val('');
          latepoint_hide_next_btn($booking_form_element);
        }
      }
    } else {
      // SHOW TIMESLOTS EVEN IF ONLY ONE TIMEPOINT
      $booking_form_element.find('.latepoint_start_date').val(jQuery(this).data('date'));
      latepoint_reload_summary($booking_form_element, 'date', jQuery(this).data('nice-date'));
      $booking_form_element.find('.os-day.selected').removeClass('selected');
      jQuery(this).addClass('selected');

      // build timeslots
      day_timeslots(jQuery(this));
      // initialize timeslots events
      latepoint_init_timeslots();
      // clear time and hide next btn
      latepoint_reload_summary($booking_form_element, 'time', '');
      $booking_form_element.find('.latepoint_start_time').val('');
      latepoint_hide_next_btn($booking_form_element);
    }
    return false;
  });
}
function latepoint_init_step_verify() {
  var $booking_form_element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (!$booking_form_element) return;
  $booking_form_element.closest('.latepoint-summary-is-open').removeClass('latepoint-summary-is-open');
}
function latepoint_init_step_payment() {
  var $booking_form_element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if ($booking_form_element.find('.step-payment-w').data('full-amount') > 0) {
    latepoint_reload_summary($booking_form_element, 'price', latepoint_format_price(($booking_form_element.find('.step-payment-w').data('full-amount') * 100 / 100).toFixed(latepoint_helper.number_of_decimals)));
  }
  if ($booking_form_element && $booking_form_element.find('.step-payment-w').data('default-portion') == 'deposit') {
    $booking_form_element.find('input[name="booking[payment_portion]"]').val('deposit');
  }

  // activate payment method content if method and portion are set and no selection is needed
  var selected_payment_method = $booking_form_element.find('input[name="booking[payment_method]"]').val();
  if (selected_payment_method && !jQuery('.lp-payment-times-w').length && !jQuery('.lp-payment-methods-w').length && !jQuery('.lp-payment-portions-w').length) {
    latepoint_init_payment_method_actions($booking_form_element, selected_payment_method);
  }
  jQuery('.latepoint-booking-form-element .coupon-code-input-submit').on('click', function (e) {
    latepoint_apply_coupon(jQuery(this).closest('.coupon-code-input-w').find('.coupon-code-input'));
    return false;
  });
  jQuery('.latepoint-booking-form-element .coupon-code-clear').on('click', function (e) {
    latepoint_remove_coupon(jQuery(this));
    return false;
  });
  jQuery('.latepoint-booking-form-element input.coupon-code-input').on('keyup', function (e) {
    if (e.which === 13) {
      latepoint_apply_coupon(jQuery(this));
      return false;
    }
  });
  jQuery('.latepoint-booking-form-element .coupon-code-trigger-w a').on('click', function (e) {
    jQuery(this).closest('.payment-total-info').addClass('entering-coupon').find('.coupon-code-input').focus();
    return false;
  });

  // Pay later button click
  jQuery('.latepoint-booking-form-element .lp-payment-trigger-later').on('click', function (e) {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    $booking_form_element.find('input[name="booking[payment_method]"]').val(jQuery(this).data('method'));
    $booking_form_element.find('input[name="booking[payment_portion]"]').val('');
    $booking_form_element.find('.latepoint-form').submit();
  });

  // Selecting Payment Time
  jQuery('.latepoint-booking-form-element .lp-payment-trigger-payment-time-selector').on('click', function (e) {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var $payment_step = $booking_form_element.find('.step-payment-w');
    latepoint_hide_next_btn($booking_form_element);
    latepoint_show_prev_btn($booking_form_element);
    $payment_step.attr('data-sub-step', latepoint_get_payment_sub_step($booking_form_element, $payment_step.attr('data-sub-step')));
    return false;
  });

  // Selecting Payment Method
  jQuery('.latepoint-booking-form-element .lp-payment-trigger-payment-method-selector').on('click', function (e) {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var selected_payment_method = jQuery(this).data('method');
    $booking_form_element.find('input[name="booking[payment_method]"]').val(selected_payment_method);
    var $payment_step = $booking_form_element.find('.step-payment-w');
    latepoint_hide_next_btn($booking_form_element);
    latepoint_show_prev_btn($booking_form_element);
    $payment_step.attr('data-sub-step', latepoint_get_payment_sub_step($booking_form_element, $payment_step.attr('data-sub-step')));
  });
  jQuery('.latepoint-booking-form-element .lp-payment-trigger-payment-portion-selector').on('click', function (e) {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var portion = jQuery(this).data('portion');
    $booking_form_element.find('input[name="booking[payment_portion]"]').val(portion);
    if (portion == 'deposit') {
      $booking_form_element.find('.payment-total-info').addClass('paying-deposit');
    } else {
      $booking_form_element.find('.payment-total-info').removeClass('paying-deposit');
    }
    var $payment_step = $booking_form_element.find('.step-payment-w');
    latepoint_hide_next_btn($booking_form_element);
    latepoint_show_prev_btn($booking_form_element);
    $payment_step.attr('data-sub-step', latepoint_get_payment_sub_step($booking_form_element, $payment_step.attr('data-sub-step')));
  });
}
function latepoint_init_step_category_items(step_name) {
  jQuery('.latepoint-step-content[data-step-name="' + step_name + '"] .os-item-category-info').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    latepoint_show_prev_btn($booking_form_element);
    jQuery(this).closest('.latepoint-step-content').addClass('selecting-item-category');
    var $category_wrapper = jQuery(this).closest('.os-item-category-w');
    var $main_parent = jQuery(this).closest('.os-item-categories-main-parent');
    if ($category_wrapper.hasClass('selected')) {
      $category_wrapper.removeClass('selected');
      if ($category_wrapper.parent().closest('.os-item-category-w').length) {
        $category_wrapper.parent().closest('.os-item-category-w').addClass('selected');
      } else {
        $main_parent.removeClass('show-selected-only');
      }
    } else {
      $main_parent.find('.os-item-category-w.selected').removeClass('selected');
      $main_parent.addClass('show-selected-only');
      $category_wrapper.addClass('selected');
    }
    return false;
  });
}
function latepoint_init_step_selectable_items() {
  jQuery('.os-selectable-items .os-selectable-item').off('click', latepoint_selectable_item_clicked);
  jQuery('.os-selectable-items .os-selectable-item').on('click', latepoint_selectable_item_clicked);
  jQuery('.os-selectable-items .os-selectable-item .item-quantity-selector-input').off('keyup', latepoint_selectable_item_quantity_keyup);
  jQuery('.os-selectable-items .os-selectable-item .item-quantity-selector-input').on('keyup', latepoint_selectable_item_quantity_keyup);
}
function latepoint_update_quantity_for_selectable_items($item) {
  var ids = $item.closest('.os-selectable-items').find('.os-selectable-item.selected').map(function () {
    if (jQuery(this).hasClass('has-quantity')) {
      return jQuery(this).data('item-id') + ':' + jQuery(this).find('input.item-quantity-selector-input').val();
    } else {
      return jQuery(this).data('item-id');
    }
  }).get();
  $item.closest('.latepoint-booking-form-element').find($item.data('id-holder')).val(ids);
}
function latepoint_selectable_item_quantity_keyup(event) {
  var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
  var $item = jQuery(this).closest('.os-selectable-item');
  var new_value = jQuery(this).val();
  if (new_value && new_value.match(/^\d+$/)) {
    var max_quantity = $item.data('max-quantity');
    if (max_quantity && new_value > max_quantity) new_value = max_quantity;
  } else {
    new_value = 0;
  }
  jQuery(this).val(new_value);
  if ($item.hasClass('selected') && new_value > 0 || !$item.hasClass('selected') && new_value == 0) {
    latepoint_update_quantity_for_selectable_items($item);
    latepoint_reload_summary($booking_form_element);
    return false;
  } else {
    $item.trigger('click');
  }
}
function latepoint_selectable_item_clicked(event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
  if (jQuery(this).hasClass('has-quantity')) {
    if (jQuery(event.target).hasClass('item-quantity-selector')) {
      var current_value = parseInt(jQuery(this).find('input.item-quantity-selector-input').val());
      var new_value = jQuery(event.target).data('sign') == 'minus' ? current_value - 1 : current_value + 1;
      var max_quantity = jQuery(this).data('max-quantity');
      if (new_value < 0) new_value = 0;
      if (max_quantity && new_value > max_quantity) new_value = max_quantity;
      jQuery(this).find('input.item-quantity-selector-input').val(new_value);
      if (jQuery(this).hasClass('selected') && new_value > 0 || !jQuery(this).hasClass('selected') && new_value == 0) {
        latepoint_update_quantity_for_selectable_items(jQuery(this));
        latepoint_reload_summary($booking_form_element);
        return false;
      }
    }
    if (jQuery(event.target).hasClass('item-quantity-selector-input')) {
      latepoint_update_quantity_for_selectable_items(jQuery(this));
      latepoint_reload_summary($booking_form_element);
      return false;
    }
  }
  var summary_value = '';
  if (jQuery(this).hasClass('os-allow-multiselect')) {
    if (jQuery(this).hasClass('selected')) {
      jQuery(this).removeClass('selected');
      if (jQuery(this).hasClass('has-quantity')) jQuery(this).find('input.item-quantity-selector-input').val(0);
    } else {
      jQuery(this).addClass('selected');
      if (jQuery(this).hasClass('has-quantity') && !(jQuery(this).find('input.item-quantity-selector-input').val() > 0)) {
        jQuery(this).find('input.item-quantity-selector-input').val(1);
      }
    }
    latepoint_update_quantity_for_selectable_items(jQuery(this));
    summary_value = String(jQuery(this).closest('.os-selectable-items').find('.os-selectable-item.selected').map(function () {
      return ' ' + jQuery(this).data('summary-value');
    }).get()).trim();
    latepoint_show_next_btn($booking_form_element);
  } else {
    if (!jQuery(this).hasClass('os-duration-item')) jQuery(this).closest('.os-item-categories-main-parent').find('.os-selectable-item.selected').removeClass('selected');
    jQuery(this).closest('.os-selectable-items').find('.os-selectable-item.selected').removeClass('selected');
    jQuery(this).addClass('selected');
    $booking_form_element.find(jQuery(this).data('id-holder')).val(jQuery(this).data('item-id'));
    summary_value = jQuery(this).data('summary-value');
    if (jQuery(this).data('os-call-func')) {
      window[jQuery(this).data('os-call-func')](jQuery(this));
    }
    if (jQuery(this).data('activate-sub-step')) {
      window[jQuery(this).data('activate-sub-step')](jQuery(this));
    } else {
      latepoint_trigger_next_btn($booking_form_element);
    }
  }
  latepoint_reload_summary($booking_form_element, jQuery(this).data('summary-field-name'), summary_value);
}
function latepoint_format_price(price) {
  // replace default decimal separator dot with comma if it's in settings
  if (latepoint_helper.decimal_separator == ',') price = String(price).replace('.', ',');
  return latepoint_helper.currency_symbol_before + String(price) + latepoint_helper.currency_symbol_after;
}
function latepoint_init_step_services() {
  jQuery('.total-attendies-selector-input').on('change', function () {
    var max_capacity = jQuery(this).closest('.total-attendies-selector-w').data('max-capacity');
    var min_capacity = jQuery(this).closest('.total-attendies-selector-w').data('min-capacity');
    var new_value = jQuery(this).val();
    new_value = Math.min(Number(max_capacity), Number(new_value));
    new_value = Math.max(Number(min_capacity), Number(new_value));
    jQuery(this).val(new_value);
    var new_value_formatted = new_value + ' ' + (new_value > 1 ? jQuery(this).data('summary-plural') : jQuery(this).data('summary-singular'));
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    latepoint_reload_summary($booking_form_element, 'total-attendies', new_value_formatted);
  });
  jQuery('.total-attendies-selector').on('click', function () {
    var add_value = jQuery(this).hasClass('total-attendies-selector-plus') ? 1 : -1;
    var max_capacity = jQuery(this).closest('.total-attendies-selector-w').data('max-capacity');
    var min_capacity = jQuery(this).closest('.total-attendies-selector-w').data('min-capacity');
    var current_value = jQuery(this).closest('.total-attendies-selector-w').find('input.total-attendies-selector-input').val();
    var new_value = Number(current_value) > 0 ? Math.max(Number(current_value) + add_value, 1) : 1;
    new_value = Math.min(Number(max_capacity), new_value);
    new_value = Math.max(Number(min_capacity), new_value);
    jQuery(this).closest('.total-attendies-selector-w').find('input').val(new_value).trigger('change');
    return false;
  });
}
function latepoint_trigger_next_btn($booking_form_element) {
  $booking_form_element.find('.latepoint_step_direction').val('next');
  $booking_form_element.find('.latepoint-form').submit();
}
function latepoint_init_step_locations() {}
function latepoint_init_step_agents() {
  jQuery('.os-items .os-item-details-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var agent_id = jQuery(this).data('agent-id');
    $booking_form_element.find('.os-agent-bio-popup.active').removeClass('active');
    $booking_form_element.find('#osAgentBioPopup' + agent_id).addClass('active');
    return false;
  });
  jQuery('.os-agent-bio-close').on('click', function () {
    jQuery(this).closest('.os-agent-bio-popup').removeClass('active');
    return false;
  });
}
function latepoint_init_booking_summary_lightbox() {
  jQuery('.customer-dashboard-booking-summary-lightbox').on('click', '.qr-show-trigger', function () {
    jQuery(this).closest('.latepoint-lightbox-i').find('.qr-code-on-confirmation').addClass('show-vevent-qr-code');
    return false;
  });
}
function latepoint_init_step_confirmation() {
  jQuery('.latepoint-booking-form-element').on('click', '.set-customer-password-btn', function () {
    var $btn = jQuery(this);
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    $btn.addClass('os-loading');
    var params = {
      account_nonse: jQuery('input[name="account_nonse"]').val(),
      password: jQuery('input[name="customer[password]"]').val(),
      password_confirmation: jQuery('input[name="customer[password_confirmation]"]').val()
    };
    var data = {
      action: latepoint_helper.route_action,
      route_name: jQuery(this).data('btn-action'),
      params: jQuery.param(params),
      layout: 'none',
      return_format: 'json'
    };
    jQuery.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        $btn.removeClass('os-loading');
        if (data.status === "success") {
          $booking_form_element.find('.step-confirmation-set-password').html('').hide();
          $booking_form_element.find('.confirmation-cabinet-info').show();
        } else {
          latepoint_show_message_inside_element(data.message, $booking_form_element.find('.step-confirmation-set-password'), 'error');
        }
      }
    });
    return false;
  });
  jQuery('.latepoint-booking-form-element').on('click', '.qr-show-trigger', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    $booking_form_element.find('.qr-code-on-confirmation').addClass('show-vevent-qr-code');
    return false;
  });
  jQuery('.latepoint-booking-form-element').on('click', '.show-set-password-fields', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    $booking_form_element.find('.step-confirmation-set-password').show();
    $booking_form_element.find('#customer_password').focus();
    jQuery(this).closest('.info-box').hide();
    return false;
  });
}
function latepoint_init_customer_dashboard() {
  latepoint_init_form_masks();
  jQuery('.latepoint-customer-timezone-selector-w select').on('change', function (e) {
    var $select_box = jQuery(this);
    $select_box.closest('.latepoint-customer-timezone-selector-w').addClass('os-loading');
    var data = {
      action: latepoint_helper.route_action,
      route_name: jQuery(this).closest('.latepoint-customer-timezone-selector-w').data('route-name'),
      params: {
        timezone_name: jQuery(this).val()
      },
      layout: 'none',
      return_format: 'json'
    };
    jQuery.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        $select_box.closest('.latepoint-customer-timezone-selector-w').removeClass('os-loading');
        if (data.status === "success") {
          location.reload();
        } else {}
      }
    });
  });
}
function latepoint_init_customer_dashboard_login() {
  if (jQuery('.latepoint-login-form-w #facebook-signin-btn').length && jQuery('.latepoint-login-form-w').length) {
    jQuery('.latepoint-login-form-w #facebook-signin-btn').on('click', function () {
      var $login_form_wrapper = jQuery(this).closest('.latepoint-login-form-w');
      FB.login(function (response) {
        if (response.status === 'connected' && response.authResponse) {
          var params = {
            token: response.authResponse.accessToken
          };
          var data = {
            action: latepoint_helper.route_action,
            route_name: $login_form_wrapper.find('#facebook-signin-btn').data('login-action'),
            params: jQuery.param(params),
            layout: 'none',
            return_format: 'json'
          };
          latepoint_step_content_change_start($login_form_wrapper);
          jQuery.ajax({
            type: "post",
            dataType: "json",
            url: latepoint_helper.ajaxurl,
            data: data,
            success: function success(data) {
              if (data.status === "success") {
                location.reload();
              } else {
                latepoint_show_message_inside_element(data.message, $login_form_wrapper);
                latepoint_step_content_change_end(false, $login_form_wrapper);
              }
            }
          });
        } else {}
      }, {
        scope: 'public_profile,email'
      });
    });
  }
  if (jQuery('.latepoint-login-form-w #google-signin-btn').length && jQuery('.latepoint-login-form-w').length && typeof google !== 'undefined') {
    // INIT GOOGLE LOGIN
    var googleUser = {};
    var $login_form_wrappers = jQuery('.latepoint-login-form-w');
    $login_form_wrappers.each(function () {
      var $login_form_wrapper = jQuery(this);
      google.accounts.id.initialize({
        client_id: latepoint_helper.social_login_google_client_id,
        callback: latepoint_process_google_login
      });
      google.accounts.id.renderButton($login_form_wrapper.find('#google-signin-btn')[0], {
        theme: "outline",
        size: "medium"
      } // customization attributes
      );
    });
  }
}

function get_customer_name($wrapper) {
  var customer_name = '';
  var first_name = $wrapper.find('input[name="customer[first_name]"]').val();
  var last_name = $wrapper.find('input[name="customer[last_name]"]').val();
  if (first_name) customer_name += first_name;
  if (last_name) customer_name += ' ' + last_name;
  return customer_name.trim();
}
function latepoint_init_step_contact() {
  latepoint_init_facebook_login();
  latepoint_init_google_login();
  latepoint_init_form_masks();
  jQuery('.step-contact-w').each(function () {
    latepoint_reload_summary(jQuery(this).closest('.latepoint-booking-form-element'), 'customer', get_customer_name(jQuery(this)));
  });
  jQuery('.step-contact-w').on('keyup', 'input[name="customer[first_name]"], input[name="customer[last_name]"]', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    latepoint_reload_summary($booking_form_element, 'customer', get_customer_name($booking_form_element));
  });
  jQuery('.step-contact-w').on('keyup', '.os-form-control.required', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    if (latepoint_validate_fields($booking_form_element.find('.step-contact-w .os-form-control.required'))) {} else {}
  });

  // Init Logout button
  jQuery('.step-customer-logout-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var data = {
      action: latepoint_helper.route_action,
      route_name: jQuery(this).data('btn-action'),
      layout: 'none',
      return_format: 'json'
    };
    latepoint_step_content_change_start($booking_form_element);
    jQuery.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        latepoint_reload_step($booking_form_element);
      }
    });
    return false;
  });

  // Init Login Existing Customer Button
  jQuery('.step-login-existing-customer-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    var params = {
      email: $booking_form_element.find('.os-step-existing-customer-login-w input[name="customer_login[email]"]').val(),
      password: $booking_form_element.find('.os-step-existing-customer-login-w input[name="customer_login[password]"]').val()
    };
    var data = {
      action: latepoint_helper.route_action,
      route_name: jQuery(this).data('btn-action'),
      params: jQuery.param(params),
      layout: 'none',
      return_format: 'json'
    };
    latepoint_step_content_change_start($booking_form_element);
    jQuery.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        if (data.status === "success") {
          latepoint_reload_step($booking_form_element);
        } else {
          latepoint_show_message_inside_element(data.message, $booking_form_element.find('.os-step-existing-customer-login-w'));
          latepoint_step_content_change_end(false, $booking_form_element);
        }
      }
    });
    return false;
  });
}
function latepoint_step_content_change_start($booking_form_element) {
  $booking_form_element.removeClass('step-content-loaded').addClass('step-content-loading');
}

// TODO
function latepoint_step_content_change_end(new_content, $booking_form_element) {
  if (new_content) $booking_form_element.find('.latepoint-body .latepoint-step-content').replaceWith(new_content);
  $booking_form_element.removeClass('step-content-loading').addClass('step-content-mid-loading');
  setTimeout(function () {
    $booking_form_element.removeClass('step-content-mid-loading').addClass('step-content-loaded');
  }, 50);
}
function latepoint_init_facebook_login() {
  if (!jQuery('#facebook-signin-btn').length || !jQuery('.latepoint-booking-form-element').length) return;
  jQuery('#facebook-signin-btn').on('click', function () {
    var $booking_form_element = jQuery(this).closest('.latepoint-booking-form-element');
    FB.login(function (response) {
      if (response.status === 'connected' && response.authResponse) {
        var params = {
          token: response.authResponse.accessToken
        };
        var data = {
          action: latepoint_helper.route_action,
          route_name: $booking_form_element.find('#facebook-signin-btn').data('login-action'),
          params: jQuery.param(params),
          layout: 'none',
          return_format: 'json'
        };
        latepoint_step_content_change_start($booking_form_element);
        jQuery.ajax({
          type: "post",
          dataType: "json",
          url: latepoint_helper.ajaxurl,
          data: data,
          success: function success(data) {
            if (data.status === "success") {
              latepoint_reload_step($booking_form_element);
            } else {
              latepoint_show_message_inside_element(data.message, $booking_form_element.find('.os-step-existing-customer-login-w '));
              latepoint_step_content_change_end(false, $booking_form_element);
            }
          }
        });
      } else {}
    }, {
      scope: 'public_profile,email'
    });
  });
}
function latepoint_process_google_login(response) {
  var $booking_form_element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var params = {
    token: response.credential
  };
  var data = {
    action: latepoint_helper.route_action,
    route_name: latepoint_helper.social_login_google_route,
    params: jQuery.param(params),
    layout: 'none',
    return_format: 'json'
  };
  if ($booking_form_element) latepoint_step_content_change_start($booking_form_element);
  jQuery.ajax({
    type: "post",
    dataType: "json",
    url: latepoint_helper.ajaxurl,
    data: data,
    success: function success(data) {
      if (data.status === "success") {
        if ($booking_form_element) {
          latepoint_reload_step($booking_form_element);
        } else {
          location.reload();
        }
      } else {
        latepoint_show_message_inside_element(data.message, $booking_form_element.find('.os-step-existing-customer-login-w '));
        latepoint_step_content_change_end(false, $booking_form_element);
      }
    }
  });
}
function latepoint_init_google_login() {
  if (!jQuery('#google-signin-btn').length || !jQuery('.latepoint-booking-form-element').length || typeof google === 'undefined') return;
  var googleUser = {};
  var $booking_form_elements = jQuery('.latepoint-booking-form-element');
  $booking_form_elements.each(function () {
    var $booking_form_element = jQuery(this);
    google.accounts.id.initialize({
      client_id: latepoint_helper.social_login_google_client_id,
      callback: function callback(response) {
        return latepoint_process_google_login(response, $booking_form_element);
      }
    });
    google.accounts.id.renderButton($booking_form_element.find('#google-signin-btn')[0], {
      theme: "outline",
      size: "medium"
    } // customization attributes
    );
  });
}

function latepoint_change_step_desc($booking_form_element, step_name) {
  $booking_form_element.removeClass('step-changed').addClass('step-changing');
  setTimeout(function () {
    // Progress bar
    var $step_progress = $booking_form_element.find('.latepoint-progress li[data-step-name="' + step_name + '"]');
    $step_progress.addClass('active').addClass('complete').prevAll().addClass('complete').removeClass('active');
    $step_progress.nextAll().removeClass('complete').removeClass('active');
    // Side panel
    var side_panel_desc = $booking_form_element.find('.latepoint-step-desc-library[data-step-name="' + step_name + '"]').html();
    $booking_form_element.find('.latepoint-step-desc').html(side_panel_desc);

    // Top header
    var top_header_desc = $booking_form_element.find('.os-heading-text-library[data-step-name="' + step_name + '"]').html();
    $booking_form_element.find('.os-heading-text').html(top_header_desc);
    setTimeout(function () {
      $booking_form_element.removeClass('step-changing').addClass('step-changed');
    }, 50);
  }, 500);
}
function latepoint_progress_prev($booking_form_element, step_name) {
  var $step_progress = $booking_form_element.find('.latepoint-progress li[data-step-name="' + step_name + '"]');
  $step_progress.addClass('active').addClass('complete').prevAll().addClass('complete').removeClass('active');
  $step_progress.nextAll().removeClass('complete').removeClass('active');
}
function latepoint_progress_next($booking_form_element, step_name) {
  var $step_progress = $booking_form_element.find('.latepoint-progress li[data-step-name="' + step_name + '"]');
  $step_progress.addClass('active').addClass('complete').prevAll().addClass('complete').removeClass('active');
  $step_progress.nextAll().removeClass('complete').removeClass('active');
}
function latepoint_next_step_description($booking_form_element, step_name) {
  $booking_form_element.removeClass('step-changed').addClass('step-changing');
  setTimeout(function () {
    $booking_form_element.find('.latepoint-step-desc').html($booking_form_element.find('.latepoint-step-desc-library.active').removeClass('active').next('.latepoint-step-desc-library').addClass('active').html());
    $booking_form_element.find('.os-heading-text').html($booking_form_element.find('.os-heading-text-library.active').removeClass('active').next('.os-heading-text-library').addClass('active').html());
    setTimeout(function () {
      $booking_form_element.removeClass('step-changing').addClass('step-changed');
    }, 50);
  }, 500);
}
function latepoint_prev_step_description($booking_form_element, step_name) {
  $booking_form_element.removeClass('step-changed').addClass('step-changing');
  setTimeout(function () {
    $booking_form_element.find('.latepoint-step-desc').html($booking_form_element.find('.latepoint-step-desc-library.active').removeClass('active').prev('.latepoint-step-desc-library').addClass('active').html());
    $booking_form_element.find('.os-heading-text').html($booking_form_element.find('.os-heading-text-library.active').removeClass('active').prev('.os-heading-text-library').addClass('active').html());
    setTimeout(function () {
      $booking_form_element.removeClass('step-changing').addClass('step-changed');
    }, 50);
  }, 500);
}
function latepoint_validate_fields($fields) {
  var is_valid = true;
  $fields.each(function (index) {
    if (jQuery(this).val() == '') {
      is_valid = false;
      return false;
    }
  });
  return is_valid;
}
function latepoint_submit_booking_form($booking_form) {
  var $booking_form_element = $booking_form.closest('.latepoint-booking-form-element');
  $booking_form_element.removeClass('step-content-loaded').addClass('step-content-loading');
  jQuery.ajax({
    type: "post",
    dataType: "json",
    processData: false,
    contentType: false,
    url: latepoint_helper.ajaxurl,
    data: latepoint_create_form_data_from_booking_form($booking_form),
    success: function success(data) {
      if (data.status === "success") {
        latepoint_hide_message_inside_element($booking_form_element.find('.latepoint-body'));
        if ($booking_form_element.data('flash-error')) {
          latepoint_show_message_inside_element($booking_form_element.data('flash-error'), $booking_form_element.find('.latepoint-body'));
          $booking_form_element.data('flash-error', '');
        }
        $booking_form_element.find('.latepoint_current_step').val(data.step_name);
        $booking_form_element.removeClass(function (index, className) {
          return (className.match(/(^|\s)current-step-\S+/g) || []).join(' ');
        }).addClass('current-step-' + data.step_name);
        setTimeout(function () {
          $booking_form_element.removeClass('step-content-loading').addClass('step-content-mid-loading');
          $booking_form_element.find('.latepoint-body').find('.latepoint-step-content').addClass('is-hidden');
          if ($booking_form_element.find('.latepoint-step-content[data-step-name="' + data.step_name + '"]')) {
            $booking_form_element.find('.latepoint-step-content[data-step-name="' + data.step_name + '"]').remove();
          }
          $booking_form_element.find('.latepoint-body').append(data.message);
          latepoint_init_step(data.step_name, $booking_form_element);
          setTimeout(function () {
            $booking_form_element.removeClass('step-content-mid-loading').addClass('step-content-loaded');
            $booking_form_element.find('.latepoint-next-btn, .latepoint-prev-btn').removeClass('os-loading');
          }, 50);
        }, 500);
        if (data.is_pre_last_step) {
          $booking_form_element.data('next-submit-is-last', 'yes');
          $booking_form_element.find('.latepoint-next-btn span').text($booking_form_element.find('.latepoint-next-btn').data('pre-last-step-label'));
        } else {
          $booking_form_element.data('next-submit-is-last', 'no');
          $booking_form_element.find('.latepoint-next-btn span').text($booking_form_element.find('.latepoint-next-btn').data('label'));
        }
        if (data.is_last_step) {
          $booking_form_element.addClass('hidden-buttons').find('.latepoint-footer').remove();
          $booking_form_element.find('.latepoint-progress').css('opacity', 0);
          $booking_form_element.closest('.latepoint-summary-is-open').removeClass('latepoint-summary-is-open');
          $booking_form_element.addClass('is-final-step');
        } else {
          if (data.show_next_btn === true) {
            latepoint_show_next_btn($booking_form_element);
          } else {
            latepoint_hide_next_btn($booking_form_element);
          }
          if (data.show_prev_btn === true) {
            latepoint_show_prev_btn($booking_form_element);
          } else {
            latepoint_hide_prev_btn($booking_form_element);
          }
        }
        latepoint_change_step_desc($booking_form_element, data.step_name);
      } else {
        $booking_form_element.removeClass('step-content-loading').addClass('step-content-loaded');
        $booking_form_element.find('.latepoint-next-btn, .latepoint-prev-btn').removeClass('os-loading');
        if (data.send_to_step && $booking_form_element.find('.latepoint-step-content[data-step-name="' + data.send_to_step + '"]').length) {
          $booking_form_element.data('flash-error', data.message);
          latepoint_reload_step($booking_form_element, data.send_to_step);
        } else {
          latepoint_show_message_inside_element(data.message, $booking_form_element.find('.latepoint-body'));
          latepoint_show_prev_btn($booking_form_element);
        }
      }
      $booking_form.find('.latepoint_step_direction').val('next');
    }
  });
}
function latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element) {
  if (error.send_to_step && $booking_form_element.find('.latepoint-step-content[data-step-name="' + error.send_to_step + '"]').length) {
    latepoint_reload_step($booking_form_element, error.send_to_step);
    $booking_form_element.data('flash-error', error.message);
  } else {
    latepoint_show_message_inside_element(error.message, $booking_form_element.find('.latepoint-body'), 'error');
    if ($booking_form_element.hasClass('step-content-loading')) $booking_form_element.removeClass('step-content-loading').addClass('step-content-loaded');
    $booking_form_element.find('.latepoint-next-btn').removeClass('os-loading');

    // if previous step exists - show prev button
    if ($booking_form_element.find('.latepoint-step-content:last-child').prev('.latepoint-step-content').length) latepoint_show_prev_btn($booking_form_element);
    latepoint_scroll_to_top_of_booking_form($booking_form_element);
  }
}
function latepoint_init_booking_form($booking_form_element) {
  $booking_form_element.find('.latepoint-form').on('submit', function (e) {
    e.preventDefault();
    var $booking_form = jQuery(this);
    latepoint_hide_prev_btn($booking_form_element);
    var current_step = $booking_form_element.find('.latepoint_current_step').val();
    var callbacks_list = [];
    $booking_form_element.trigger('latepoint:submitBookingForm', [{
      current_step: current_step,
      callbacks_list: callbacks_list,
      is_final_submit: $booking_form_element.data('next-submit-is-last') == 'yes',
      direction: $booking_form_element.find('.latepoint_step_direction').val()
    }]);
    try {
      var _jQuery2;
      (_jQuery2 = jQuery).when.apply(_jQuery2, _toConsumableArray(callbacks_list.map(function (callback) {
        return callback.action();
      }))).done(function () {
        latepoint_submit_booking_form($booking_form);
      }).fail(function (error) {
        latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
      });
    } catch (error) {
      latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
    }
  });
  $booking_form_element.find('.latepoint-lightbox-summary-trigger').on('click', function () {
    var $wrapper = jQuery(this).closest('.latepoint-w');
    $wrapper.toggleClass('show-summary-on-mobile');
    return false;
  });
  $booking_form_element.find('.latepoint-lightbox-close').on('click', function () {
    var params = new URLSearchParams(location.search);
    if (params.has('latepoint_booking_intent_key')) {
      params.delete('latepoint_booking_intent_key');
      history.replaceState(null, '', '?' + params + location.hash);
    }
    jQuery('body').removeClass('latepoint-lightbox-active');
    jQuery('.latepoint-lightbox-w').remove();
    return false;
  });
  $booking_form_element.find('.latepoint-timezone-selector-w select').on('change', function (e) {
    var $select_box = jQuery(this);
    $select_box.closest('.latepoint-timezone-selector-w').addClass('os-loading');
    var data = {
      action: latepoint_helper.route_action,
      route_name: jQuery(this).closest('.latepoint-timezone-selector-w').data('route-name'),
      params: {
        timezone_name: jQuery(this).val()
      },
      layout: 'none',
      return_format: 'json'
    };
    $booking_form_element.removeClass('step-content-loaded').addClass('step-content-loading');
    jQuery.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        $select_box.closest('.latepoint-timezone-selector-w').removeClass('os-loading');
        $booking_form_element.removeClass('step-content-loading');
        if (data.status === "success") {
          // reload datepicker if its the step
          if ($select_box.closest('.latepoint-booking-form-element').hasClass('current-step-datepicker')) {
            latepoint_reload_step($select_box.closest('.latepoint-booking-form-element'));
          }
        } else {}
      }
    });
  });
  if (!latepoint_helper.is_timezone_selected) {
    var tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tzid) {
      if (tzid != $booking_form_element.find('.latepoint-timezone-selector-w select').val()) $booking_form_element.find('.latepoint-timezone-selector-w select').val(tzid).change();
    }
  }
  $booking_form_element.on('click', '.lp-option', function () {
    jQuery(this).closest('.lp-options').find('.lp-option.selected').removeClass('selected');
    jQuery(this).addClass('selected');
  });

  // Next Step button Click
  $booking_form_element.find('.latepoint-next-btn').on('click', function (e) {
    if (jQuery(this).hasClass('disabled') || jQuery(this).hasClass('os-loading')) return false;
    var $next_btn = jQuery(this);
    $next_btn.addClass('os-loading');
    var $booking_form = jQuery(this).closest('.latepoint-form');
    var current_step = $booking_form_element.find('.latepoint_current_step').val();
    $booking_form.find('.latepoint_step_direction').val('next');
    var callbacks_list = [];
    $booking_form_element.trigger('latepoint:nextStepClicked', [{
      current_step: current_step,
      callbacks_list: callbacks_list
    }]);
    latepoint_hide_prev_btn($booking_form_element);
    try {
      var _jQuery3;
      (_jQuery3 = jQuery).when.apply(_jQuery3, _toConsumableArray(callbacks_list.map(function (callback) {
        return callback.action();
      }))).done(function () {
        $booking_form.submit();
      }).fail(function (error) {
        latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
      });
    } catch (error) {
      latepoint_show_error_and_stop_loading_booking_form(error, $booking_form_element);
    }
    return false;
  });

  // Previous Step button Click
  $booking_form_element.find('.latepoint-prev-btn').on('click', function (e) {
    if (jQuery(this).hasClass('disabled') || jQuery(this).hasClass('os-loading')) return false;
    var $booking_form = jQuery(this).closest('.latepoint-form');
    var current_step = $booking_form_element.find('.latepoint_current_step').val();
    var $current_step = $booking_form_element.find('.latepoint-step-content[data-step-name="' + current_step + '"]');
    if (current_step == 'locations') {}
    if (current_step == 'agents') {}
    if (current_step == 'payment') {
      var $payment_step = $booking_form_element.find('.step-payment-w');
      if ($payment_step.length) {
        $payment_step.find('.lp-option.selected').removeClass('selected');
        var new_sub_step = latepoint_get_payment_sub_step($booking_form_element, $payment_step.attr('data-sub-step'), true);
        // hide all payment method content blocks
        if (new_sub_step != $payment_step.attr('data-sub-step')) {
          $payment_step.find('.lp-payment-method-content').hide();
          $payment_step.attr('data-sub-step', new_sub_step);
          latepoint_hide_next_btn($booking_form_element);
          return false;
        }
      }
    }
    if (current_step == 'services') {
      var $services_step = $booking_form_element.find('.step-services-w');
      if ($services_step.hasClass('selecting-service-duration')) {
        $services_step.removeClass('selecting-service-duration');
        $services_step.find('.os-services > .os-item.selected').removeClass('selected');
        clear_sub_step_duration($booking_form_element);
        if ($booking_form_element.find('.latepoint-step-content').length <= 1 && !$services_step.hasClass('selecting-item-category')) {
          latepoint_hide_prev_btn($booking_form_element);
        }
        latepoint_reload_summary($booking_form_element);
        return false;
      }
      if ($services_step.hasClass('selecting-total-attendies')) {
        $services_step.removeClass('selecting-total-attendies');
        if ($services_step.find('.os-services > .os-item.selected').hasClass('has-multiple-durations')) {
          // multiple durations
          $services_step.find('.os-services > .os-item.selected .os-service-durations .os-selectable-item.selected').removeClass('selected');
          $services_step.addClass('selecting-service-duration');
          latepoint_hide_next_btn($booking_form_element);
        } else {
          $services_step.find('.os-services > .os-item.selected').removeClass('selected');
        }
        clear_sub_step_attendies($booking_form_element);
        if ($booking_form_element.find('.latepoint-step-content').length <= 1 && !$services_step.hasClass('selecting-item-category')) {
          latepoint_hide_prev_btn($booking_form_element);
        }
        latepoint_reload_summary($booking_form_element);
        return false;
      }
    }

    // handle categories
    if ($current_step.hasClass('selecting-item-category')) {
      if ($current_step.find('.os-item-category-w .os-item-category-w.selected').length) {
        $current_step.find('.os-item-category-w .os-item-category-w.selected').parents('.os-item-category-w').addClass('selected').find('.os-item-category-w.selected').removeClass('selected');
      } else {
        $current_step.removeClass('selecting-item-category').find('.os-item-category-w.selected').removeClass('selected');
        $current_step.removeClass('selecting-item-category').find('.os-item-categories-holder.show-selected-only').removeClass('show-selected-only');
      }
      if ($booking_form_element.find('.latepoint-step-content').length <= 1 && !$current_step.hasClass('selecting-item-category')) {
        latepoint_hide_prev_btn($booking_form_element);
      }
      latepoint_reload_summary($booking_form_element);
      return false;
    }
    var $current_active_step = $booking_form_element.find('.latepoint-step-content:last-child');
    if ($current_active_step.data('clear-action')) {
      window[$current_active_step.data('clear-action')]($booking_form_element);
    }
    var $back_btn = jQuery(this);
    $back_btn.addClass('os-loading');
    $booking_form_element.removeClass('step-content-loaded').addClass('step-content-loading');
    var $new_current_step = $booking_form_element.find('.latepoint-step-content.is-hidden').last();
    var new_current_step_name = $new_current_step.data('step-name');
    latepoint_change_step_desc($booking_form_element, new_current_step_name);
    setTimeout(function () {
      $new_current_step.removeClass('is-hidden');
      $current_active_step.remove();
      $booking_form_element.find('.latepoint_current_step').val(new_current_step_name);
      $booking_form_element.removeClass(function (index, className) {
        return (className.match(/(^|\s)current-step-\S+/g) || []).join(' ');
      }).addClass('current-step-' + new_current_step_name);
      $booking_form_element.find('.latepoint-next-btn span').text($booking_form_element.find('.latepoint-next-btn').data('label'));
      $booking_form_element.data('next-submit-is-last', 'no');
      latepoint_show_next_btn($booking_form_element);
      $back_btn.removeClass('os-loading');
      if ($booking_form_element.find('.latepoint-step-content').length <= 1) {
        if ($new_current_step.hasClass('selecting-item-category')) {}
        if (new_current_step_name == 'services') {
          var $services_step = $booking_form_element.find('.step-services-w');
          if ($services_step.hasClass('selecting-service-duration') || $services_step.hasClass('selecting-total-attendies') || $services_step.hasClass('selecting-item-category')) {
            if ($services_step.find('.os-services > .os-item.selected').hasClass('is-preselected')) {
              // if service is preselected check if there are both multiple durations and quantity selector and only then show prev button
              if ($services_step.hasClass('selecting-total-attendies') && $services_step.find('.os-services > .os-item.selected').hasClass('has-multiple-durations')) {
                // if selecting attendies and there are multiple durations - show prev button
                latepoint_show_prev_btn($booking_form_element);
              } else {
                latepoint_hide_prev_btn($booking_form_element);
              }
            } else {
              latepoint_show_prev_btn($booking_form_element);
            }
          } else {
            latepoint_hide_prev_btn($booking_form_element);
          }
        } else {
          if (!$new_current_step.hasClass('selecting-item-category')) {
            latepoint_hide_prev_btn($booking_form_element);
          }
        }
      }
      $booking_form_element.removeClass('step-content-loading').addClass('step-content-mid-loading');
      setTimeout(function () {
        $booking_form_element.removeClass('step-content-mid-loading').addClass('step-content-loaded');
        latepoint_hide_message_inside_element($booking_form_element.find('.latepoint-body'));
        latepoint_reload_summary($booking_form_element);
      }, 150);
    }, 700);
    return false;
  });
}
function latepoint_init_booking_form_by_trigger($trigger) {
  var route = latepoint_helper.booking_button_route;
  var params = {};
  var restrictions = {};
  if ($trigger.data('show-service-categories')) restrictions.show_service_categories = $trigger.data('show-service-categories');
  if ($trigger.data('show-locations')) restrictions.show_locations = $trigger.data('show-locations');
  if ($trigger.data('show-services')) restrictions.show_services = $trigger.data('show-services');
  if ($trigger.data('show-agents')) restrictions.show_agents = $trigger.data('show-agents');
  if ($trigger.data('selected-location')) restrictions.selected_location = $trigger.data('selected-location');
  if ($trigger.data('selected-agent')) restrictions.selected_agent = $trigger.data('selected-agent');
  if ($trigger.data('selected-service')) restrictions.selected_service = $trigger.data('selected-service');
  if ($trigger.data('selected-duration')) restrictions.selected_duration = $trigger.data('selected-duration');
  if ($trigger.data('selected-total-attendees')) restrictions.selected_total_attendies = $trigger.data('selected-total-attendees');
  if ($trigger.data('selected-service-category')) restrictions.selected_service_category = $trigger.data('selected-service-category');
  if ($trigger.data('selected-start-date')) restrictions.selected_start_date = $trigger.data('selected-start-date');
  if ($trigger.data('selected-start-time')) restrictions.selected_start_time = $trigger.data('selected-start-time');
  if ($trigger.data('calendar-start-date')) restrictions.calendar_start_date = $trigger.data('calendar-start-date');
  if ($trigger.data('source-id')) restrictions.source_id = $trigger.data('source-id');
  if (jQuery.isEmptyObject(restrictions) == false) params.restrictions = restrictions;
  var data = {
    action: latepoint_helper.route_action,
    route_name: route,
    params: params,
    layout: 'none',
    return_format: 'json'
  };
  $trigger.addClass('os-loading');
  jQuery.ajax({
    type: "post",
    dataType: "json",
    url: latepoint_helper.ajaxurl,
    data: data,
    success: function success(data) {
      if (data.status === "success") {
        var lightbox_class = 'booking-form-in-lightbox';
        if ($trigger.data('hide-summary') != 'yes') lightbox_class += ' latepoint-with-summary';
        if ($trigger.data('hide-side-panel') == 'yes') lightbox_class += ' latepoint-hide-side-panel';
        latepoint_show_data_in_lightbox(data.message, lightbox_class);
        var $booking_form_element = jQuery('.latepoint-lightbox-w .latepoint-booking-form-element');
        latepoint_init_booking_form($booking_form_element);
        latepoint_init_step(data.step, $booking_form_element);
        jQuery('body').addClass('latepoint-lightbox-active');
        $trigger.removeClass('os-loading');
      } else {
        $trigger.removeClass('os-loading');
        // console.log(data.message);
      }
    }
  });
}
"use strict";

/*
 * Copyright (c) 2022 LatePoint LLC. All rights reserved.
 */
// @codekit-prepend "bin/time.js"
// @codekit-prepend "bin/shared.js"
// @codekit-prepend "bin/notifications.js";
// @codekit-prepend "bin/actions.js"
// @codekit-prepend "bin/front/main.js"

// DOCUMENT READY
jQuery(document).ready(function ($) {
  latepoint_init_customer_dashboard_login();
  latepoint_init_customer_dashboard();
  jQuery('body').on('latepoint:nextStepClicked', '.latepoint-booking-form-element', function (e, data) {
    latepoint_add_action(data.callbacks_list, function () {
      var deferred = jQuery.Deferred();
      var $booking_form = jQuery(e.currentTarget).find('.latepoint-form');
      var errors = latepoint_validate_form($booking_form);
      if (errors.length) {
        var error_messages = errors.map(function (error) {
          return error.message;
        }).join(', ');
        deferred.reject();
        throw new Error(error_messages);
      } else {
        deferred.resolve();
      }
      return deferred;
    }, 1);
  });
  if (latepoint_helper.start_from_booking_intent_key) {
    var data = {
      action: latepoint_helper.route_action,
      route_name: latepoint_helper.start_from_booking_intent_route,
      params: {
        booking_intent_key: latepoint_helper.start_from_booking_intent_key
      },
      layout: 'none',
      return_format: 'json'
    };
    $.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        if (data.status === "success") {
          var lightbox_class = '';
          latepoint_show_data_in_lightbox(data.message, data.lightbox_class);
          var $booking_form_element = jQuery('.latepoint-lightbox-w .latepoint-booking-form-element');
          latepoint_init_booking_form($booking_form_element);
          $booking_form_element.find('.latepoint-step-content').addClass('is-hidden').last().removeClass('is-hidden');
          if ($booking_form_element.find('.latepoint-step-content').length > 1) latepoint_show_prev_btn($booking_form_element);
          var $booking_form_element = jQuery('.latepoint-lightbox-w .latepoint-booking-form-element');
          $booking_form_element.find('.latepoint-step-content').each(function () {
            latepoint_init_step($(this).data('step-name'), $booking_form_element);
          });
          $('body').addClass('latepoint-lightbox-active');
        } else {
          // console.log(data.message);
        }
      }
    });
  }
  if (jQuery('.latepoint-booking-form-element').length) {
    jQuery('.latepoint-booking-form-element').each(function () {
      latepoint_init_booking_form(jQuery(this));
      latepoint_init_step(jQuery(this).find('.latepoint_current_step').val(), jQuery(this));
    });
  }
  jQuery('body').on('click', '.latepoint-lightbox-close', function () {
    latepoint_lightbox_close();
    return false;
  });
  jQuery('.latepoint-request-booking-cancellation').on('click', function () {
    if (!confirm(latepoint_helper.cancel_booking_prompt)) return false;
    var $this = jQuery(this);
    var $booking_box = $this.closest('.customer-booking');
    var route = jQuery(this).data('route');
    var params = {
      id: $booking_box.data('id')
    };
    var data = {
      action: latepoint_helper.route_action,
      route_name: route,
      params: params,
      layout: 'none',
      return_format: 'json'
    };
    $this.addClass('os-loading');
    $.ajax({
      type: "post",
      dataType: "json",
      url: latepoint_helper.ajaxurl,
      data: data,
      success: function success(data) {
        if (data.status === "success") {
          location.reload();
          $this.remove();
        } else {
          $this.removeClass('os-loading');
        }
      }
    });
    return false;
  });
  jQuery('body').on('click', '.os-step-tabs .os-step-tab', function () {
    jQuery(this).closest('.os-step-tabs').find('.os-step-tab').removeClass('active');
    jQuery(this).addClass('active');
    var target = jQuery(this).data('target');
    jQuery(this).closest('.os-step-tabs-w').find('.os-step-tab-content').hide();
    jQuery(target).show();
  });
  jQuery('body').on('keyup', '.os-form-group .os-form-control', function () {
    if (jQuery(this).val()) {
      jQuery(this).closest('.os-form-group').addClass('has-value');
    } else {
      jQuery(this).closest('.os-form-group').removeClass('has-value');
    }
  });
  jQuery('.latepoint-tab-triggers').on('click', '.latepoint-tab-trigger', function () {
    var $tabs_wrapper = jQuery(this).closest('.latepoint-tabs-w');
    $tabs_wrapper.find('.latepoint-tab-trigger.active').removeClass('active');
    $tabs_wrapper.find('.latepoint-tab-content').removeClass('active');
    jQuery(this).addClass('active');
    $tabs_wrapper.find('.latepoint-tab-content' + jQuery(this).data('tab-target')).addClass('active');
    return false;
  });

  // Main Button to trigger lightbox opening
  jQuery('body').on('click', '.latepoint-book-button, .os_trigger_booking', function () {
    latepoint_init_booking_form_by_trigger(jQuery(this));
    return false;
  });
});

//# sourceMappingURL=front.js.map
