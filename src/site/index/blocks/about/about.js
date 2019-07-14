
$(document).on('click','.open-btn',function(){
   var open_cls = $(this).data('open');
   if(open_cls){
       $('.' + open_cls).toggleClass('hidden');
   }
});