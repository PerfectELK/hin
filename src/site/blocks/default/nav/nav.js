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
var fixed = false;

window.onscroll = function(){
    var navbar = document.querySelector('.navbar-block');
    var offset_body = document.body.getBoundingClientRect().y;

    if(offset_body < -300 && !fixed){
        fixed__menu();
        fixed = true;
    }else if(offset_body > -200 && fixed){
        unfixed__menu();
        fixed = false;
    }
}

function fixed__menu(){

    document.body.classList.add('is--scroll');
    navbar = document.querySelector('.navbar-block');
    navbar.classList.add('is--scroll');

    setTimeout(function(){
        navbar.classList.add('fixed');
    },50);
    
}

function unfixed__menu(){
    navbar = document.querySelector('.navbar-block');
    navbar.classList.remove('fixed');
    setTimeout(function(){
        navbar.classList.remove('is--scroll');
        document.body.classList.remove('is--scroll');
    },300);
}

var $page = $('html, body');
$('a.menu-item__link').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 400);
    return false;
});