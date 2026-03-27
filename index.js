// HOMEWORK
//
//
// let registeredUsers = ["admin", "administrator", "Anna", "Lucifer", "Gabriel", "Thomas", "Marry"]

//if the entered userName is inside the array, write prompt Welcome "name"
//else write "you are not registered"

//POCETNA ZAMISAO OD KOJE JE MALO STA OSTALO :D -  korisnik kada pomera misa ostavlja stope za sobom. Na sredini ekrana (ceo ekran na mob) je lavirint koji vodi ka jednom cilju:
//button za login. Kada se klikne na njega, otvara se login card za popunjavanje. Kada korisnik sve popuni i klikne enter, ako je uneo userName koji postoji u arrayu iz js-a onda izlazi prompt Welcome taj i taj, u suprotnom you are not registered or your typing skills are questionable
// u JS-u eventlistener mora da aktivira stope svaki put kad user pomeri cursor. Zapravo to moze da se odradi u CSS-u, da stope budu trail, a JS iskoristiti za starting position na lavirintu, gde user klikne (addEventListener ("click")) i onda drag misem po lavirintu, tek kad dodje do cilja bottom postaje clickable. Pre toga je greyed out.
//Moze da se napravi i fora sa "follow the white rabbit" iz Matrixa. Kao u filmu, prvo crni ekran i kuca se slovo po slovo, i cuje se zvuk pri kucanju kao na starim pisacim masinama, follow the white rabbit. Rabbit se pomera po ekranu, kad se klikne na njega otvara se screen sa lavirintom (koristiti opacity: 0 u opacity: 1 i visibility: hidden u visible) A zeca pomerati ili sa @frames u css-u ili u JS-u. Click na zeca odraditi u JS-u.
//Ili da white rabbit bude u gomili zeceva razlicitih boja slicnih beloj, skriven (kao puzzle) i kad ga user pronadje klikne na njega.
//muzika: typing sound kad izlaze slova follow the... what's up doc? dusko dugousko kad se pojavi zec, a za labyrinth nesto sa I'm lost, find your way home... What's my name Rihanna kad krene da se kuca username, kad se zavrsi kucanje passworda: really? that's your password? ili tako neka fora


//VARIABLES DECLARED OUTSIDE OF FUNCTIONS
const text = "Follow the white rabbit.";
const WhiteRabbit = document.getElementById("followTheWhiteRabbit");
const typingSound = new Audio("assets/audio/mechanical-keyboard-typing.mp3");
const MatrixSound = new Audio("assets/audio/matrix.mp3");
typingSound.loop = true; //it will continue as long the letters are being typed
let isResetting = false; //flag to make sure alert resets until next collision



//AUDIO WILL START ON MOUSE CLICK
let audioUnlocked = false; //starting value that will change on mouse click
document.addEventListener("click", () => {
    audioUnlocked = true;
    typeText();},
{once: true});


//FUNCTION FOR TYPING INTRO LETTERS WITH SOUND
function typeText(){
    let index = 0;
    const speed = 100;

    WhiteRabbit.textContent = "";


    if(audioUnlocked){
        typingSound.currentTime = 0;
        typingSound.play().catch(() => {}); //catch() handles the rejected promise if a browser goes bananas

        MatrixSound.currentTime = 0;
        MatrixSound.play().catch(() => {});
}

function typingLetters (){
    if (index < text.length){
        WhiteRabbit.textContent += text[index];
        index++; //letter will go one at a time
        setTimeout(typingLetters, speed);
    }
    else {
        typingSound.pause();
        typingSound.currentTime = 0;
        setTimeout(startRabbitChaseScene, 1450);

    }
}

    setTimeout(typingLetters, 450);



//FUNCTION FOR CHASING THE RABBIT
function startRabbitChaseScene(){
    const rabbit = document.getElementById("rabbit");
    rabbit.style.opacity = "1";
}

const rabbit = document.getElementById("rabbit");
let escapes = 0;

rabbit.classList.add("hop");
setTimeout(() => {
    rabbit.classList.remove("hop");
}, 250);



document.addEventListener("mousemove", (e) => {
    const rabbitX = rabbit.offsetLeft;
    const rabbitY = rabbit.offsetTop;

    const mouseX = e.clientX;
    const mouseY = e.clientY;


    const distanceX = Math.abs(mouseX - rabbitX);
    const distanceY = Math.abs(mouseY - rabbitY);

    if (distanceX < 200 && distanceY < 200){

        let moveX = (Math.random() * 100) - 50; //-50 to +50
        let moveY = (Math.random() * 100) - 50;

        moveX += (Math.random() - 0.5) * 30;
        moveY += (Math.random() - 0.5) * 30;

        //move horizontally
        if (mouseX > rabbitX){
            moveX -= 70;
        }
        else{
            moveX += 70;
        }

        //move vertically
        if (mouseY > rabbitY){
            moveY -= 60;
        }
        else{
            moveY += 65;
        }

    if(distanceX < 100 && distanceY < 100){
        rabbit.style.transition = "left 0.15s ease-out, top 0.15s ease-out";
    }

        //calculate new position
        let newX = rabbitX + moveX;
        let newY = rabbitY + moveY;

        const padding = 40; //da ne bi pobegao sa ekrana


        //keep inside the screen
        const maxX = window.innerWidth - rabbit.offsetWidth;
        const maxY = window.innerHeight - rabbit.offsetHeight;

        newX = Math.max(padding, Math.min(newX, maxX - padding));
        newY = Math.max(padding, Math.min(newY, maxY - padding));

        rabbit.style.left = newX + "px";
        rabbit.style.top = newY + "px";

        escapes++;

        if (escapes >= 15){
            rabbit.style.cursor = "pointer";
            rabbit.onclick = startMazeScene;
        }
    }

});


//LABYRINTH SCENE
let isDragging = false;

function startMazeScene() {
    const rabbit = document.getElementById("rabbit");
    rabbit.style.opacity = "0";
    const WhiteRabbit = document.getElementById("followTheWhiteRabbit");
    WhiteRabbit.style.opacity = "0";
    const maze = document.getElementById("maze");
    maze.style.opacity = "1";

    //turning pieces coming in(maybe would be better if they were flying in from outside of the screen?)
    const walls = document.querySelectorAll(".wall");

    walls.forEach((wall) => {
        //
        const randomX = (Math.random() - 0.5) * 1500; //-500 up to 500px
        const randomY = (Math.random() - 0.5) * 1500;
        const randomRotate = (Math.random() - 0.5) * 720;

        wall.style.transform = `translate(${randomX}px, ${randomY}px rotate(${randomRotate}deg) scale(0.3)`;
    });

    setTimeout(() => {
        
        walls.forEach((wall, index) => {
            setTimeout(() => {
                wall.style.transform = "translate(0, 0) rotate(360deg) scale(1)"
                wall.style.opacity = "1";
            }, index * 150); //stager effect
        })
    }, 1000);

    
    document.addEventListener("mouseup", (e) => {
        isDragging = false;
    });

    const player = document.getElementById("player");
    const totalDuration = walls.length * 150;

    // start dragging ONLY when clicking the pill - when I didn't have this, a click would stop the dragging indefinitely
    player.addEventListener("mousedown", () => {
        isDragging = true;
    });

    //pill coming a bit after the flying pcs
    setTimeout(() => {
        player.classList.add("active");
    }, totalDuration + 100);


    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const mazeRect = maze.getBoundingClientRect(); //give me the exact location(position) of the maze on the screen

        //ZBOG OVOG DELA KODA MI JE ALERT POSANDRCAO I STALNO BLINKAO I POJAVLJIVAO SE IZNOVA I IZNOVA
        // if (
        //     e.clientX < mazeRect.left ||
        //     e.clientX > mazeRect.right ||
        //     e.clientY < mazeRect.top ||
        //     e.clientY > mazeRect.bottom
        // ) {
        //     resetPlayer();
        //     return;
        // }


        let x = e.clientX - mazeRect.left;  //e.clientX i e.clientY su pozicije misa
        let y = e.clientY - mazeRect.top; //gde smo unutar maze-a?

        player.style.left = x + "px";
        player.style.top = y + "px";

        function checkFinish() {

            const playerRect = player.getBoundingClientRect();
            const finish = document.getElementById("finish");
            const finishRect = finish.getBoundingClientRect();

            if (
                playerRect.left < finishRect.right &&
                playerRect.right > finishRect.left &&
                playerRect.top < finishRect.bottom &&
                playerRect.bottom > finishRect.top) {
                showLogin();
            }
        }

        checkFinish();
        checkCollision(); // check if the player hit a wall function

        //clientX = “Where is your finger on the screen?”
        //
        // getBoundingClientRect() = “Where is the maze on the screen?”
        //
        // You subtract them to get:
        //
        // “Where is your finger INSIDE the maze?”
    });



    function checkCollision() {
        if (!isDragging || isResetting) return; // ignore if resetting

        const playerRect = player.getBoundingClientRect();
        const walls = document.querySelectorAll(".wall");

        for (let wall of walls) {
            const wallRect = wall.getBoundingClientRect();

            if (
                playerRect.left < wallRect.right &&
                playerRect.right > wallRect.left &&
                playerRect.top < wallRect.bottom &&
                playerRect.bottom > wallRect.top
            ) {
                resetPlayer(); // hit the wall function
                break; //stop checking further walls
            }
        }
    }
}

    function resetPlayer() {

        if (isResetting) return;
        isResetting = true;

        const player = document.getElementById("player");
        const wallSound = new Audio("assets/audio/wallSmash.mp3");

            player.style.left = "10px";
            player.style.top = "10px";

        wallSound.currentTime = 0;
        wallSound.play().catch(() => {});

        setTimeout(() => {
            alert("You hit the wall! Start again or take the blue pill");
            isResetting = false;
        }, 100);

    }

    function showLogin(){
        const maze = document.getElementById("maze");
        maze.style.opacity = "0";

        const loginScene = document.querySelector(".loginScene");
        loginScene.classList.add("active");

        isDragging = false;
    }


    //OVAJ DEO KODA JE DOMACI

    userCheck()

    function userCheck(){

        const loginButton = document.getElementById("loginButton");

        loginButton.addEventListener("click", (e) => {
        let registeredUsers = [
            "admin",
            "administrator",
            "anna",
            "toma",
            "itmentorstva",
            "digitalishous",
            "hakunamatata"
        ]



        let userName = document.getElementById("username").value.trim().toLowerCase();

        let found = false;

        //for of instead of for in because for in would give me an index
        for(let user of registeredUsers) {
            if (userName === user) {
                found = true;
                break;
            }

        }

        
    //ideja je zapravo da se video pojavi kad se ponovo ukuca pravo ime u prompt: kako se ono bese zoves? i klikne ok ili enter
        if (found) {
    const secondCheck = prompt("Welcome! What's your name again?");

    if (secondCheck && secondCheck.trim().toLowerCase() === userName) {
        showFinalVideo();
    } else {
        alert("Nope, that's not it.");
    }

} else {
    alert("Either your typing skills are questionable or you need to register asap!");
}

        })
    } }

    function showFinalVideo(){
        const video = document.getElementById("finalVideo");



        setTimeout(() => {

            video.style.visibility = "visible";

            video.currentTime = 0;
            video.play().catch(() => {
            });
        })
    }






