gsap.registerPlugin(ScrollTrigger)

gsap.to(".square", {
    x: 700,
    duration: 3,
    scrollTrigger: {
        trigger: ".square",
        start: "top 80%",
        end: "center 20%",
        scrub: 1,
        pin: true,
        markers: true,
        toggleActions: "restart reverse play reset",
        // toggleActions: "play pause resume reverse reset restart complete none",
        //                  onEnter, onLeave, onEnterBack, onLeaveBack
        toggleClass: "topu"
    }
})