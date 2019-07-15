
(function($){
    var cls = '.dog-item__link';
    var items = $(cls);

    items.mouseenter(function(e){
        reshape(this, e);
    });

    items.mousemove(function(e){
        reshape(this, e);
    })

    items.mouseleave(function(e){
        var item = $(this);
        item.css({transform:'rotateX(0deg) rotateY(0deg)'})
    })

    function reshape(ctx,e){
        var item = $(ctx),
            item_width = item.width(),
            item_height = item.height(),
            event_x = (e.pageX - item.offset().left),
            event_y = (e.pageY - item.offset().top);

        var r_y = (item_width / event_x).toFixed(2);
        if(item_width - event_x < item_width / 2){
            r_y = (item_width / (item_width - event_x)).toFixed(2);
            //item_width = - item_width;
        }
        var r_x = (item_height / event_y).toFixed(2);
        if(item_height - event_y < item_height / 2){
            r_x = (item_height / (item_height - event_y)).toFixed(2);
            //item_height = - item_height;
        }




        item.css({transform:`rotateX(${r_x}deg) rotateY(${r_y}deg)`});
    }

})(jQuery);