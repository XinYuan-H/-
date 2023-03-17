/*獲取蛇的容器 DIV*/
const snake = document.getElementById("snake");
//獲取蛇身的部分
const snakes = snake.getElementsByTagName("div"); //獲取snake裡面的所有div
//蛇頭

const food = document.getElementById("food");
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");

let score = 0;
let level = 0;

//食物的座標應該在0-290之間
function changFood(){
    //生成0-29之間的隨機數再乘以10
    const x = Math.floor(Math.random()*30)*10;
    const y = Math.floor(Math.random()*30)*10;
    //設置食物的座標
    food.style.left = x + "px";
    food.style.top = y + "px";
}

changFood();

let dir;
//創建一個變量紀錄案件狀態
let keyActive = true;

/*完成蛇移動 綁定按鍵事件 keydown  keyup*/

//令蛇只能對綁定的按鍵起作用 不會因為按了其他按鍵導致蛇停下
let keyArr = ["ArrowUp","ArrowRight", "ArrowDown","ArrowLeft"];

const reObj = {
    ArrowUp : "ArrowDown",
    ArrowDown : "ArrowUp",
    ArrowRight : "ArrowLeft",
    ArrowLeft : "ArrowRight",
}

//禁止掉頭
//構成要件 1.身體超過兩節
//        2.不能是相反的方向

document.addEventListener("keydown",(event)=>{
    //使用if(event.key === 'ArrowUp')來寫也可以，但switch比較簡單

    if(keyActive && keyArr.includes(event.key)){
        if(snakes.length < 2 || reObj[dir] !== event.key){
            dir = event.key;
            keyActive  = false
        }
    }
})


setTimeout(function move(){

   //獲取蛇頭
   const head = snakes[0];
   //獲取蛇頭的座標
   let x = head.offsetLeft;
   let y = head.offsetTop;
    switch (dir) {
        case "ArrowUp":
            y-=10;
            break;
        case "ArrowRight":
            x+=10;
            break;
        case "ArrowDown":
            y+=10;
            break;
        case "ArrowLeft":
            x-=10;
            break;    
    }
    //檢查蛇是否吃到食物(利用座標做碰撞檢測)
    if(head.offsetTop === food.offsetTop && head.offsetLeft === food.offsetLeft){
        //改變食物位置
        changFood();
        //增加蛇的身體長度
        snake.insertAdjacentHTML("beforeend","<div/>")
        score++
        scoreSpan.textContent = score;

        if(score % 2 == 0 && level < 10){
            level++
            levelSpan.textContent = level + 1 ;
        }
    }
    
    //判斷遊戲是否結束
    // 1. 撞牆  2. 撞自己
    if(x < 0 || x > 290 || y < 0 || y > 290){
        alert("撞牆了")
        return false
    }

    for(let i = 0; i < snakes.length -1 ; i++){
        if(snakes[i].offsetLeft === x && snakes[i].offsetTop === y){
            alert("GAME OVER")
        }
    }
    //獲取蛇的尾巴
    const tail = snakes[snakes.length - 1]
    //移動蛇的位置
    tail.style.left  = x + "px";
    tail.style.top = y + "px";
    //將蛇尾移到蛇頭的位置
    snake.insertAdjacentElement("afterbegin" , tail)
    keyActive = true ;

    setTimeout(move,200 - (level*20))
},300)