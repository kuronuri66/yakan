let KeyConf = {jump: " ", left: "a", right: "d",}
let imgPaths = ["yakan1","yakan2","yakan3"]

let yakanRect = {x:0,y:100,w:21,h:20,}
let yakanVX = 0;
let yakanVY = 0;
let yakanAction = "stop";
let yakanActioni = 0;
let yakanimg
let TouchCollider = false;

let colliderRects = [{x:0,y:30,w:480,h:30},{x:501,y:30,w:24,h:24}]

function step() {
    requestAnimationFrame(step);

    scrollX = Math.round(scrollX + (yakanRect.x - 230 - scrollX) / 10);
    scrollY = Math.round(scrollY + (yakanRect.y - 150 - scrollY) / 10);

    ctx.fillStyle = "#000a17";
    ctx.fillRect(0, 0, 480, 360);

    if(KeyFlag.right){
        if(!yakanAction == "right"){
            yakanActioni = 0;
        }

        yakanAction = "right";
    }
    if(KeyFlag.left){
        if(!yakanAction == "left"){
            yakanActioni = 0;
        }

        yakanAction = "left";
    }

    if(KeyFlag.jump){
        for(let colliderRect of colliderRects){
            if(CheckRect({x:yakanRect.x,y:yakanRect.y,w:yakanRect.w,h:yakanRect.h+1},colliderRect)){
                yakanVY =+ 7;
            }
        }
    }

    if (yakanAction=="stop"){
        if(yakanVX < -0.1){
            yakanVX += 0.1
            yakanimg = images.yakan3;
        }else if(yakanVX > 0.1){
            yakanVX -= 0.1
            yakanimg = images.yakan2;
        } else{
            yakanimg = images.yakan1;
            yakanAction = 0;
        }
        yakanRect.x += yakanVX/2;
    }else if(yakanAction=="right"){
        if(0 <= yakanActioni && yakanActioni <= 3){
            yakanRect.x += yakanVX * 0.8;
            yakanimg = images.yakan3;
        }else if(4 <= yakanActioni && yakanActioni <= 6){
            yakanRect.x += yakanVX * 1.0;
            yakanimg = images.yakan1;
        }else if(7 <= yakanActioni && yakanActioni <= 9){
            yakanRect.x += yakanVX * 0.8;
            yakanimg = images.yakan2;
        }else if(yakanActioni == 10){
            yakanAction = "stop";
            yakanActioni = 0
        }
        if(yakanVX<=4){
            yakanVX+=0.4
        }
        yakanActioni++

    }else if(yakanAction =="left") {
        if(0 >= yakanActioni && yakanActioni >= -3){
            yakanRect.x += yakanVX * 0.9;
            yakanimg = images.yakan2;
        }else if(-4 >= yakanActioni && yakanActioni >= -6){
            yakanRect.x += yakanVX * 1.15;
            yakanimg = images.yakan1;
        }else if(-7 >= yakanActioni && yakanActioni >= -9){
            yakanRect.x += yakanVX * 0.9;
            yakanimg = images.yakan3;
        }else if(yakanActioni >= -10){
            yakanAction = "stop";
            yakanActioni = 0;
            yakanimg = images.yakan1;
        }
        if(yakanVX>=-4){
            yakanVX-=0.4;
        }
        
        yakanActioni--
    }

    yakanVY -= 0.25;
    yakanRect.y += yakanVY;

    for(let colliderRect of colliderRects){
        if(CheckRect({x:yakanRect.x+5,y:yakanRect.y,w:yakanRect.w - 5,h:yakanRect.h},colliderRect)){
            if(yakanVY<0 && CheckRect({x:yakanRect.x+5,y:yakanRect.y-12,w:yakanRect.w - 10,h:yakanRect.h-12},colliderRect)){
                yakanRect.y = colliderRect.y + yakanRect.h;
                yakanVY = 0;
            }else if(0<yakanVY && CheckRect({x:yakanRect.x+5,y:yakanRect.y,w:yakanRect.w - 10,h:yakanRect.h-12},colliderRect)){
                yakanRect.y = colliderRect.y - colliderRect.h;
                yakanVY = 0;
            }
        }
        if(CheckRect({x:yakanRect.x,y:yakanRect.y - 5,w:yakanRect.w,h:yakanRect.h - 10},colliderRect)){
            if(yakanVX < 0 && CheckRect({x:yakanRect.x,y:yakanRect.y - 5,w:yakanRect.w - 12,h:yakanRect.h - 10},colliderRect)){
                yakanRect.x = colliderRect.x + colliderRect.w;
                yakanVX = 0;
            }else if(0 < yakanVX && CheckRect({x:yakanRect.x + 12,y:yakanRect.y - 5,w:yakanRect.w - 12,h:yakanRect.h - 10},colliderRect)){
                yakanRect.x = colliderRect.x - yakanRect.w;
                yakanVX = 0;
            }
        }

        DrawRect("white",colliderRect)
    }
    DrawImageRect(yakanimg,yakanRect)
}


function imgLoadFinish(){
    step();
}