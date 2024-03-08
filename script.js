let gameSeq = [];
let userSeq = [];
let hscore = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow","green","purple","red"];
let sc = document.querySelector("h3");
let started = false;
let level = 0;

document.addEventListener("keypress",function(){
    if(started==false){
        // console.log("started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}

function levelUp(){
    level++;
    userSeq = [];
    h2.innerText = `Level : ${level}`;
    let ranIdx = Math.floor(Math.random()*4);
    let ranColor = btns[ranIdx];
    let ranButn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    // console.log(gameSeq);
    gameFlash(ranButn);
}

function checkAns(idx){
    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
        // console.log("same value");
    }else{
        h2.innerHTML = `Game Over! <b>Your Score Was-${level}</b> <br>Press any Key to Re-Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },100);
        if (level > hscore) {
            hscore = level;
            sc.textContent = "Highest Score : " + hscore;
        }
        
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    let btncolor = btn.getAttribute("id");
    userSeq.push(btncolor);
    checkAns(userSeq.length-1);
}

let allbutns = document.querySelectorAll(".btn");

for (btn of allbutns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}