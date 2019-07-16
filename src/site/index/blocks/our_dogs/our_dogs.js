
(function($){
    var cls = '.rotate__inner';
    var clsInner = '.rotate__item';
    var items = $(cls);

    items.mouseenter(function(e){
        var ctx = $(this).find(clsInner).get(0);
        reshape(this, ctx, e);
    });

    items.mousemove(function(e){
        var ctx = $(this).find(clsInner).get(0);
        reshape(this, ctx, e);
    })

    items.mouseleave(function(e){
        var item = $(this).find(clsInner);
        item.css({transform:'rotateX(0deg) rotateY(0deg)'})
    })

    function reshape(target, ctx, e){
        var _t = $(target);
        var item = $(ctx),
            item_width = _t.innerWidth(),
            item_height = _t.innerHeight(),
            event_x = (e.pageX - _t.offset().left),
            event_y = (e.pageY - _t.offset().top),
            stop_deg = 15;

        if(event_x > item_width) event_x = item_width;
        if(event_y > item_height) event_y = item_height;

        if(event_x < 0) event_x = 1;
        if(event_y < 0) event_y = 1;

        var r_y = (item_width / event_x * 2).toFixed(2);
        if(r_y > stop_deg){ r_y = stop_deg}
        if(item_width - event_x < item_width / 2){
            r_y = - (item_width / (item_width - event_x) * 2).toFixed(2);
            if(r_y < -stop_deg){r_y = - stop_deg}

        }
        var r_x = (item_height / event_y * 2).toFixed(2);
        if(r_x > stop_deg){ r_x = stop_deg}
        if(item_height - event_y < item_height / 2){
            r_x = - (item_height / (item_height - event_y) * 2).toFixed(2);
            if(r_x < - stop_deg){r_x = - stop_deg}
        }

        item.css({transform:`rotateX(${r_x}deg) rotateY(${r_y}deg)`});
    }

})(jQuery);