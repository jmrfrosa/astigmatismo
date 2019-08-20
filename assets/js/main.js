let fxStrength = 4;
let parallaxNum = 4;

let parallaxTarget = document.getElementById("parallax-target");

for(let i=0; i<parallaxNum; i++) {
    let newParallax = parallaxTarget.cloneNode(true);
    newParallax.removeAttribute("id");
    newParallax.setAttribute("class", newParallax.classList + " pos-abs");
    newParallax.style.top    = 0;
    newParallax.style.left   = "8px";
    parallaxTarget.append(newParallax);
}

let windowCenter = {
    x: document.documentElement.clientWidth * 0.5,
    y: document.documentElement.clientHeight * 0.5
}

let maxMag = Math.sqrt(Math.pow(windowCenter.x, 2) + Math.pow(windowCenter.y, 2));

function setMotionBlur(xBlur, yBlur) {
    document.querySelector('#mt-blur')
    .firstElementChild.setAttribute("stdDeviation", xBlur + "," + yBlur)
}

document.onmousemove = handleMovement;

function handleMovement(event) {
    let mousePos = {
        x: event.pageX,
        y: event.pageY
    }

    let distFromCenter = {
        x: windowCenter.x - mousePos.x,
        y: windowCenter.y - mousePos.y
    }

    let magFromCenter = Math.sqrt(Math.pow(distFromCenter.x, 2) + Math.pow(distFromCenter.y, 2));
    let vectorAngle   = Math.atan2(distFromCenter.y, distFromCenter.x);
    let vectorMag     = magFromCenter / maxMag;

    let mouseVector = {
        x: vectorMag * Math.cos(vectorAngle),
        y: vectorMag * Math.sin(vectorAngle),
        distances: distFromCenter,
        position: mousePos,
        magnitude: vectorMag
    }

    handleAnimation(mouseVector);

}

function handleAnimation(mouseVector) {

    let elements = document.getElementsByClassName("parallaxed");

    let i = 0;
    for(element of elements) {
        animateParallax(mouseVector, element, i);
        i++;
    }

    anime({
        targets: ['.main-cover'],
        translateX: {
            value: mouseVector.x * fxStrength,
            duration: 0
        },
        translateY: {
            value: mouseVector.y * fxStrength,
            duration: 0
        }
    });

    setMotionBlur(mouseVector.magnitude * fxStrength, mouseVector.magnitude * fxStrength);

}

function animateParallax(mouseVector, e, iteratorPos) {

    anime({
        targets: e,
        translateX: {
            value: iteratorPos * mouseVector.x * fxStrength,
            duration: 500
        },
        translateY: {
            value: iteratorPos * mouseVector.y * fxStrength,
            duration: 500
        }
    });

}