let yakanRect = {x:0,y:100,w:21,h:20,vx:0,vy:0}
let yakanAction = "stop";
let yakanActioni = 0;
let yakanimg
let TouchCollider = false;

let colliderRects = [{x:0,y:30,w:480,h:30},{x:501,y:30,w:24,h:24},{x:501,y:100,w:24,h:24}]

function yakan(){

    TouchCollider = false;
    for(let colliderRect of colliderRects){
        if(CheckRect({x:yakanRect.x+5,y:yakanRect.y-12,w:yakanRect.w - 10,h:yakanRect.h-11},colliderRect)){
            TouchCollider = true;
        }
    }
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
        if(TouchCollider){
            yakanRect.vy = 7;
        }
    }

    if (yakanAction=="stop"){
        if(yakanRect.vx < -0.1){
            yakanRect.vx += 0.1
            yakanimg = images.yakan3;
        }else if(yakanRect.vx > 0.1){
            yakanRect.vx -= 0.1
            yakanimg = images.yakan2;
        } else{
            yakanimg = images.yakan1;
            yakanAction = 0;
        }
        yakanRect.x += yakanRect.vx/2;
    }else if(yakanAction=="right"){
        if(0 <= yakanActioni && yakanActioni <= 3){
            yakanRect.x += yakanRect.vx * 0.8;
            yakanimg = images.yakan3;
        }else if(4 <= yakanActioni && yakanActioni <= 6){
            yakanRect.x += yakanRect.vx * 1.0;
            yakanimg = images.yakan1;
        }else if(7 <= yakanActioni && yakanActioni <= 9){
            yakanRect.x += yakanRect.vx * 0.8;
            yakanimg = images.yakan2;
        }else if(yakanActioni == 10){
            yakanAction = "stop";
            yakanActioni = 0
        }
        if(yakanRect.vx<=4){
            yakanRect.vx+=0.4
        }
        yakanActioni++

    }else if(yakanAction =="left") {
        if(0 >= yakanActioni && yakanActioni >= -3){
            yakanRect.x += yakanRect.vx * 0.9;
            yakanimg = images.yakan2;
        }else if(-4 >= yakanActioni && yakanActioni >= -6){
            yakanRect.x += yakanRect.vx * 1.15;
            yakanimg = images.yakan1;
        }else if(-7 >= yakanActioni && yakanActioni >= -9){
            yakanRect.x += yakanRect.vx * 0.9;
            yakanimg = images.yakan3;
        }else if(yakanActioni >= -10){
            yakanAction = "stop";
            yakanActioni = 0;
            yakanimg = images.yakan1;
        }
        if(yakanRect.vx>=-4){
            yakanRect.vx-=0.4;
        }
        
        yakanActioni--
    }

    yakanRect.vy -= 0.25;
    yakanRect.y += yakanRect.vy;

    for(let colliderRect of colliderRects){
        if(CheckRect({x:yakanRect.x+5,y:yakanRect.y,w:yakanRect.w - 5,h:yakanRect.h},colliderRect)){
            if(yakanRect.vy<0 && CheckRect({x:yakanRect.x+5,y:yakanRect.y-12,w:yakanRect.w - 10,h:yakanRect.h-12},colliderRect)){
                yakanRect.y = colliderRect.y + yakanRect.h;
                yakanRect.vy = 0;
            }else if(0<yakanRect.vy && CheckRect({x:yakanRect.x+5,y:yakanRect.y,w:yakanRect.w - 10,h:yakanRect.h-12},colliderRect)){
                yakanRect.y = colliderRect.y - colliderRect.h;
                yakanRect.vy = 0;
            }
        }
        if(CheckRect({x:yakanRect.x,y:yakanRect.y - 5,w:yakanRect.w,h:yakanRect.h - 10},colliderRect)){
            if(yakanRect.vx < 0 && CheckRect({x:yakanRect.x,y:yakanRect.y - 5,w:yakanRect.w - 12,h:yakanRect.h - 10},colliderRect)){
                yakanRect.x = colliderRect.x + colliderRect.w;
                yakanRect.vx = 0;
            }else if(0 < yakanRect.vx && CheckRect({x:yakanRect.x + 12,y:yakanRect.y - 5,w:yakanRect.w - 12,h:yakanRect.h - 10},colliderRect)){
                yakanRect.x = colliderRect.x - yakanRect.w;
                yakanRect.vx = 0;
            }
        }

        DrawFillRect("white",colliderRect)
    }
    DrawImageRect(yakanimg,yakanRect)
}