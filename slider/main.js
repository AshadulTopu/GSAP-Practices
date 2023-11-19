let cols = 3
const main = document.getElementById('main')
let parts = []

let images = [
    "./images/01.jpg",
    "./images/02.jpg",
    "./images/03.jpg",
    "./images/04.jpg",
]

let current = 0
let playing = false

for (let i in images) {
    new Image().src = images[i]
}

// create elements and append to main container
for (let i = 0; i < cols; i++) {
    let part = document.createElement('div')
    part.classList.add('part')
    let el = document.createElement('div')
    el.classList.add('section')
    let img = document.createElement('img')
    img.src = images[current]
    el.appendChild(img)
    part.style.setProperty('--x', -100 / cols * i + 'vw')
    part.appendChild(el)
    main.appendChild(part)
    parts.push(part)
}

// event listeners
// cursor pointer events and circle events
function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

const cursor = document.createElement('div')
cursor.classList.add('cursor')
const cursorFill = document.createElement('div')
cursorFill.classList.add('cursor-fill')

let cursorX = 0
let cursorY = 0
let pageX = 0
let pageY = 0
let size = 8
let sizeFill = 36
let followSpeed = 0.16

document.body.appendChild(cursor)
document.body.appendChild(cursorFill)

if ('ontouchstart' in window) {
    cursor.style.display = 'none'
    cursorFill.style.display = 'none'
}
cursor.style.setProperty('--size', size + 'px')
cursorFill.style.setProperty('--size', sizeFill + 'px')

window.addEventListener('mousemove', e => {
    pageX = e.clientX
    pageY = e.clientY
    cursor.style.left = e.clientX - size / 2 + 'px'
    cursor.style.top = e.clientY - size / 2 + 'px'
})

function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed)
    cursorY = lerp(cursorY, pageY, followSpeed)
    cursorFill.style.left = cursorX - sizeFill / 2 + 'px'
    cursorFill.style.top = cursorY - sizeFill / 2 + 'px'
    requestAnimationFrame(loop)
}
loop()

//rollover up and down and mouse wheel events
let animOptions = {
    duration: 2.3,
    ease: Power4.easeInOut
}

function go(dir) { // dir = direction
    if (!playing) {
        playing = true;
        if (current + dir < 0) {
            current = images.length - 1 // set to last img
        } else if (current + dir >= images.length) {
            current = 0 // set to first img
        } else {
            current += dir
        }
        function up(part, next) {
            part.appendChild(next)
            gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(() => {
                part.children[0].remove()
                gsap.to(part, { duration: 0, y: 0 })
            })
        }
        function down(part, prev) {
            part.prepend(prev)
            gsap.to(part, { duration: 0, y: -window.innerHeight })
            gsap.to(part, { ...animOptions, y: 0 }).then(() => {
                part.children[1].remove()
                playing = false
            })
        }
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            let next = document.createElement('div')
            next.classList.add('section')
            let img = document.createElement('img')
            img.src = images[current]
            next.appendChild(img)
            if ((i - Math.max(0, dir)) % 2) {
                up(part, next)
            } else {
                down(part, next)
            }
        }
    }
}

// press up and down arrow keys
document.addEventListener("keydown", function (event) {
    if (event.key === ("ArrowUp" || "ArrowRight")) {
        go(1)
    } else if (event.key === ("ArrowDown" || "ArrowLeft")) {
        go(-1)
    }
});

// press mouse wheel
document.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
        go(-1); // Call the go function with a negative value to go down
    } else {
        go(1); // Call the go function with a positive value to go up
    }
});

// next and prev buttons
document.getElementById("next").addEventListener("click", function () {
    go(1);
});

document.getElementById("prev").addEventListener("click", function () {
    go(-1);
});

// cursor invent target touch
let startY
let endY
let clicked = false

function mouseDown(e) {
    clicked = true
    startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}

function mouseUp(e) {
    endY = e.clientY || endY
    if (clicked && startY && Math.abs(endY - startY) > 40) {
        go(!Math.min(0, startY - endY) ? 1 : -1)
        clicked = false
        startY = null
        endY = null
    }
}

window.addEventListener('mousedown', mouseDown, false)
window.addEventListener('touchstart', mouseDown, false)
window.addEventListener('touchmove', function (e) {
    if (clicked) {
        endY = e.touches[0].clientY || e.targetTouches[0].clientY
    }
}, false)
window.addEventListener('touchend', mouseUp, false)
window.addEventListener('mouseup', mouseUp, false)