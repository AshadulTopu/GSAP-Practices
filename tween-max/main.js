$(document).ready(() => {
    $('#fullpage').fullpage({
        // scrollOverflow: true
        anchors: ['firstpage', 'secondpage', 'thirdpage'],
        menu: '#menu',
        autoScrolling: false
        // responsiveWidth: 768
    })
})


// scrollMagic: init controller
var controller = new ScrollMagic.Controller();

//Tween - section 2
var controller = new ScrollMagic.Scene({
    triggerElement: "#section2",
    // triggerHook: 0.8
})

    // animate color and top border in relation to scroll position
    .setTween('#bg img', {
        maxWidth: '1200px',
        top: '40%',
        left: '80%',
        opacity: 0.25
    }) // the tween duration can be omitted and defaults to 1

    .addTo(controller);


//Tween - section 3
var controller = new ScrollMagic.Scene({
    triggerElement: "#section3",
    // triggerHook: 0.8
    duration: 300
})

    // animate color and top border in relation to scroll position
    .setTween('#bg img', {
        top: '20%',
    })
    .addTo(controller);