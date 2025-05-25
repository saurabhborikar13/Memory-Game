const cardBox = document.querySelectorAll('.card');
const box1Box = document.querySelectorAll('.box1');
const countBox = document.querySelector('.count');
const resetBox = document.querySelector('.Reset');
const forResultBox = document.querySelector('.forResult');
const playAgainBox = document.querySelector('#play-again');
const yourScoreBox = document.querySelector('.winBox .count');
console.dir(yourScoreBox)
const cssbox =`
    animation:increase 1s infinite; 
    @keyframes increase {
    0%,100%{
        transform: rotateX('1deg');
    }
    50%{
        transform: rotateX('-1deg');
    }
}

`
const movesRemainsBox = document.querySelector('.movesBox');


let isSelected = false;
let imgSelected1;
let imgSelected2;

let solutionForgame= {
    1:16,   16:1,
    2:9,    9:2,
    3:10,   10:3,
    4:11,   11:4,
    5:14,   14:5,
    6:12,   12:6,
    7:13,   13:7,
    8:15,   15:8
}

// console.log(Math.floor(Math.random()*16)+1);  //it will generate the val [1,16];
  
// console.log(solutionForgame[10]);

let box1,box2;
let countWin = 0;
const totalMoves = 30;
let curMoves = 0;

//  function playSound(){
//     let audio = document.querySelector('#FlipCardAudio');
//     audio.play();
// }

countBox.innerText = totalMoves-curMoves;
//there is an array of box1

    for(let box of box1Box){
        box.addEventListener('click',(e)=>{
            // e.preventDefault();
            // playSound();
            if(curMoves<totalMoves){
            curMoves++;
            checkMovesLimit(curMoves);
            if(isSelected==false){
                
                box1 = box;
                box.style.transform = 'rotateY(180deg)';
                isSelected = true;
                imgSelected1 = box.children[1].children[0].getAttribute("id");  // why getAttribute() is more preferable than the norma; ___.attributes.src ;
                console.log(imgSelected1);
                // alert(imgSelected1);
            }    
            else{
               
                box2 = box;
                imgSelected2 = box.children[1].children[0].getAttribute("id");
                // console.log(imgSelected2);
                // console.log(imgSelected1);
                box.style.transform = 'rotateY(180deg)';
            //    alert(imgSelected2);
                if(imgSelected2 != solutionForgame[imgSelected1]){
                    if(imgSelected2==imgSelected1){
                        isSelected = false;
                    }
                    // alert("NOtsames")
                    setTimeout(()=>{
                        box.style.transform = 'rotateY(0deg)';
                        
                    },500);
                }
                else{
                    //if they are matched then img1 and the img2 must be displayed as fixed
                    countWin++
                    setTimeout(()=>{
                        // box2.style.backgroundColor = 'white';
                        // box2.style= cssbox;
                        

                    },1000)
                    isSelected = false;
                    // alert(`yesSame :${countWin} `)
                    checkWin(countWin,curMoves);
                    updateScore(countWin);
                    //disable
                    box2.style.pointerEvents = "none";
                    box1.style.pointerEvents = "none";
                }
            }
    
        }
        else{

            console.dir(forResultBox)
            forResultBox.children[0].innerText = "YOU LOSE";
            forResultBox.children[1].attributes[1].value = "images/game-over.png"; 
            // alert("you loose");
            // forResultBox.children. = `<h1>You LOSE </h1>
            
            // <img id = "win-img" src="images\game-over.png" alt="">
            // <button id="play-again">PLAY AGAIN</button>`;
            forResultBox.style.display = 'flex';
        }
        })
    }



    function checkWin(countWin,curMoves){
        
        if(countWin == 8 && curMoves <= totalMoves){
            //yes won the game
            // alert("you won");
            forResultBox.style.display = 'flex'
            for(let box of box1Box ){
                box.style.pointerEvents = "none";
            }
        }

        
    }

    function checkMovesLimit(curMoves,countWin){
        if(curMoves<=totalMoves){
            countBox.innerText = totalMoves-curMoves;
        }
        else if(curMoves === totalMoves && countWin < 8){

        } 

    }

    resetBox.addEventListener('click', ()=>{
        for(let box of box1Box){
            box.style.transform = 'rotateY(0deg)';
        }
        setTimeout(()=>{
            location.reload();
        },500);
        
    })

    playAgainBox.addEventListener('click',()=>{
        location.reload();
    })

    function updateScore(countWin){
        yourScoreBox.innerText= `${countWin}/8`;
    }


