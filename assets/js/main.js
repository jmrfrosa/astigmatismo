let fxStrength = 10;

let windowCenter = {
    x: document.documentElement.clientWidth * 0.5,
    y: document.documentElement.clientHeight * 0.5
}

let maxMag = Math.sqrt(Math.pow(windowCenter.x, 2) + Math.pow(windowCenter.y, 2));

function setMotionBlur(xBlur, yBlur) {
    document.querySelector('#mt-blur').firstElementChild.setAttribute("stdDeviation", xBlur + "," + yBlur)
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

    let nElements = document.getElementsByClassName("parallaxed").length
    for(i = 1; i <= nElements; i++ ) {
        animateParallax(mouseVector, i);
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

function animateParallax(mouseVector, n) {
    
    anime({
        targets: '#parallax' + n,
        translateX: {
            value: n * mouseVector.x * fxStrength,
            duration: 500
        },
        translateY: {
            value: n * mouseVector.y * fxStrength,
            duration: 500
        },
        opacity: {
            value: 1 / n,
            duration: 200
        }
    });

}