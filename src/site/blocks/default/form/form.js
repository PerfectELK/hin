$(document).ready(function () {
    $('.form__validation').validationEngine('attach', {promptPosition: "topLeft", scroll: !1});
    $(".form__validation").on('submit', function (event) {
        event.preventDefault()
    }).on('jqv.form.result', function (event, errorFound) {
        event.preventDefault();
        if (!errorFound) {
            new pelk__form_send(this)
        }
    });
});

var pelk__form_send = function(form){
    NProgress.start();
    try {
        if(new form__middleware($(form))){

            var inputs = $(form).find('input, select, textarea, div[data-type="input"]').not(not_q_list);
            var values = get__value_from_form(inputs);
            add_custom_value(values, $(form), 'action', 'f[action]');
            // new api_request(values, function (response) {
            //     console.log(response);
            //     
            //     new response__handler(response, form)
            // }) На проде должно работать
            clearInputs(form);
            NProgress.done();
            openModal('.success-modal');
        }
    } catch (e) {
        console.log(e);
    }
}

var not_q_list = '.ql-header';

var response__handler = function(response, form){
    var _f = $(form);
    var action = response.action;
    for( var i = 0; i < action.length; i++){
        var item = action[i];
        for (var key in item){
            var val = item[key];
            var f = key;
            window[f](_f, response, item)
        }
    }

}

function show_message(form, response , item){
    if(typeof response.data == 'string'){
        form.validationEngine('showPrompt',response.data, 'pass')
    }else{
        form.validationEngine('showPrompt',response.data.message, 'pass')
    }
}

function redirect(form, response , item){
    window.location.href = item.redirect;
}

function show_error(form, response , item){
    if(typeof response.data == 'string'){
        form.validationEngine('showPrompt',response.data, 'error')
    }else{
        form.validationEngine('showPrompt',response.data.message, 'error')
    }
}

function clearInputs(form){
    var inputs = $(form).find('input, select, textarea, div[data-type="input"]').not(not_q_list);
    inputs.each(function(index, item){
        var input = $(item);
        input.val('');
    });
}

function callback_f(form, response , item){
    for(key in item){
        var f_arr = item[key].split('_');
        var _f = f_arr[0];
        var _type = f_arr[1];
        window[_f](_type,response);
    }
}



function getFile(_type, data){
    var elem = $(document.createElement('a'));
    elem.attr('href', data.data.data.getFile.data);
    elem.attr('download','');
    elem[0].click();
}

function replaceInput(_type, data){
    var input = $(data.data.data.replaceInput.input);
    input.val(data.data.data.replaceInput.data);
}

var form__middleware = function(form){
    if(form.data('middleware')){
        var func__name = form.data('middleware');
        var f = window[func__name](form);
        return f;
    }else{
        return true;
    }
}



function get__value_from_form(inputs){
    var fd = new FormData;
    for(var i = 0; i < inputs.length; i++){
        var input = $(inputs.get(i));
        var type = input.attr('type');
        var tag = input.prop('tagName').toLowerCase();
        if(tag === 'input'){
            var f_name = 'get_' + type;
            var j = window[f_name](input);
        }else{
            var f_name = 'get_' + tag;
            var j = window[f_name](input);
        }
        if(j){
            fd.append(j.name, j.value);
        }
    }
    var files = inputs.filter('input[type=file]');

    if(files.length){
        get__files(fd, files)
    }
    return fd;
}

function add_custom_value(fd,selector,value,name){
    var val = selector.attr(value);
    fd.append(name,val);
}

function get_checkbox(input){
    return {name : input.attr('name'), value : input.prop('checked')};
}

function get_div(input) {
    console.log(input.attr('name'));
    return {name : input.attr('name'), value : input.find('.ql-editor').html()};
}

function get_text(input){
    return {name: input.attr('name'), value : input.val()};
}

function get_email(input){
    return {name: input.attr('name'), value : input.val()};
}

function get_password(input){
    return {name: input.attr('name'), value : input.val()};
}
function get_hidden(input){
    return {name: input.attr('name'), value : input.val()};
}

function get_textarea(input){
    return {name: input.attr('name'), value : input.val()};
}

function get_select(input){
    return {name: input.attr('name'), value : input.val()};
}

function get_file(){
    return false;
}

function get__files(fd,files){
    for(var i = 0; i <files.length; i++){
        var file = $(files[i]);
        for (var k = 0; ; k++) {
            if (file.prop('files')[k]) {
                fd.append('file[' + i + '][' + k + ']', file.prop('files')[k]);
            } else {
                break;
            }
        }
    }
}


var api_request = function (data, cb , url='/api/') {

    var ctrl = this;
    console.log(data.get('action'));
    $.ajax({
        url: url,
        type: 'POST',
        processData: false,
        contentType: false,
        data: data,
        success: function (resp) {
            cb(resp);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn(textStatus);
        }
    });

    return ctrl;

}