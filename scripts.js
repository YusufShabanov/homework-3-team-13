
const canvas = document.getElementById("art-canvas");
const context = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let numShapes = Math.floor(Math.random() * 50) + 30; //random number of shapes
let rotationStep = Math.PI / (Math.random() * 40 + 20); //random rotation step
let lineLength = Math.random() * 150 + 150; //random line length

let isAnimating = true; //track of runnning
let animationId; 

//function to draw complex patterns
function drawPattern() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    let angle = 0;

         for (let i = 0; i < numShapes; i++) {
            context.beginPath();
            context.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`; //random vibrant colors
            context.lineWidth = 1.5;

            //draw a rotating line pattern
            const steps = 50; 
                for (let j = 0; j < steps; j++) {
                    const x1 = centerX + Math.cos(angle + (j * Math.PI) / steps) * (lineLength - j * 2);
                    const y1 = centerY + Math.sin(angle + (j * Math.PI) / steps) * (lineLength - j * 2);
                    context.lineTo(x1, y1);
                }

            context.closePath();
            context.stroke();

            //rotate for the next shape
            angle += rotationStep;
        }

    context.restore();
}

//animation loop
function animate() {
    if (isAnimating) {
        rotationStep += 0.01; //slight rotation update for animation
        drawPattern(); //redraw the pattern
        animationId = requestAnimationFrame(animate); //continue the animation
        }
    }

//pause/play logic
const pauseBtn = document.getElementById("pause-btn");
const playBtn = document.getElementById("play-btn");

pauseBtn.addEventListener("click", () => {
    isAnimating = false;
    cancelAnimationFrame(animationId); //stop animation
    pauseBtn.disabled = true;
    playBtn.disabled = false;
    });

playBtn.addEventListener("click", () => {
    isAnimating = true;
    animate(); //resume animation
    playBtn.disabled = true;
    pauseBtn.disabled = false;
});

//start animation
animate();

function onContinueClicked(){
    let username = document.getElementById("username").value;
    document.getElementById("welcomeText").innerText = username + ", Welcome to Our Website Project!"
    document.getElementById("usernameInputDiv").remove()
    document.getElementById("everything").style.visibility = "visible";
    sessionStorage.setItem("username", username)
    sessionStorage.setItem("hasInputUsername", true)//This is stored so username input is only ever shown once
}

function onIndexPageLoaded(){
    if(sessionStorage.getItem("username")){
        let username = sessionStorage.getItem("username")
        document.getElementById("welcomeText").innerText = username + ", Welcome to Our Website Project!"
        document.getElementById("usernameInputDiv").remove()
        document.getElementById("everything").style.visibility = "visible";
    }
}