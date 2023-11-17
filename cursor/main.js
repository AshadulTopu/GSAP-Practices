const cursor = document.querySelector(".cursor");
const cursorScale = document.querySelectorAll(".cursor-scale");

let mouseX = 0;
let mouseY = 0;


gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: () => {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
})

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

cursorScale.forEach(el => {
    el.addEventListener("mousemove", () => {
        if (el.classList.contains('growUp')) {
            cursor.classList.add("big-cursor");
        } else if (el.classList.contains('growDown')) {
            cursor.classList.add("small-cursor");
        }
    })
    el.addEventListener("mouseleave", () => {
        if (el.classList.contains('growUp')) {
            cursor.classList.remove("big-cursor");
        } else if (el.classList.contains('growDown')) {
            cursor.classList.remove("small-cursor");
        }
    })
})