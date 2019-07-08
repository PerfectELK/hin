var wrapperMenu = document.querySelector('.wrapper-menu');
var menu = document.querySelector('.menu-item-block');


wrapperMenu.addEventListener('click', function(){
    toggleMenu();
});

function toggleMenu(){
    wrapperMenu.classList.toggle('open');
    if(menu.classList.contains('is--open')){
        menu.classList.toggle('is--open');
        setTimeout(function(){
            menu.classList.toggle('is--dn');
        },600);
    }else{
        menu.classList.toggle('is--dn');
        setTimeout(function(){
            menu.classList.toggle('is--open');
        },200);
    }
}