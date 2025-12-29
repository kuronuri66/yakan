const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 480, 360);
let canvasRect = canvas.getBoundingClientRect();
ctx.imageSmoothingEnabled = false;

//====================================
//mousePosition
//====================================

let CanvasMouseX;
let CanvasMouseY;
document.addEventListener('mousemove', (e) => {
    canvasRect = canvas.getBoundingClientRect();
    const r = Math.max(canvas.width / canvasRect.width, canvas.height / canvasRect.height);
    CanvasMouseX = Math.floor((e.clientX - (canvasRect.width - canvas.width / r) / 2) * r / 3);
    CanvasMouseY = Math.floor((e.clientY - (canvasRect.height - canvas.height / r) / 2) * r / 3);
});

//====================================
//scroll
//====================================

let scrollX = -230;
let scrollY = -50;

function scroll() {
    scrollX = Math.round(scrollX + (yakanRect.x - 230 - scrollX) / 10);
    scrollY = Math.round(scrollY + (yakanRect.y - 150 - scrollY) / 10);
}

//====================================
//rect
//====================================

//rect{x: ,y: ,width: ,height: }
function CheckRect(r1,r2) {
    return(r1.x < r2.x + r2.w && r2.x < r1.x + r1.w &&
    //r1.y < r2.y + r2.h && r2.y < r1.y + r1.h
    //r1.y > r2.y - r2.h && r2.y > r1.y - r1.h
    r2.y - r2.h < r1.y && r1.y - r1.h < r2.y
    )
}

function RectTouch(Rect) {
    return(
        Rect.x < CanvasMouseX && CanvasMouseX < Rect.x + Rect.w &&
        Rect.y < CanvasMouseY && CanvasMouseY < Rect.y + Rect.h
    )
}

//====================================
//key
//====================================

let KeyFlag

KeyFlag = KeyConf;

let entries = Object.entries(KeyConf);
for (const [key, value] of entries){
    KeyFlag[key] = false;
}

addEventListener('keydown' , ReloadKeyDown)
addEventListener('keyup' , ReloadKeyUp)

function ReloadKeyDown(e) {
    for (const [key, value] of entries){
        if (e.key == value) {
            KeyFlag[key] = true;
        }
    }
}

function ReloadKeyUp(e) {
    for (const [key, value] of entries){
        if (e.key == value) {
            KeyFlag[key] = false;
        }
    }
}

//KeyFlag.[命令]で押しているかどうかとれる

//====================================
//imageLoad
//====================================

let images = {};

let imgLoadCount = 0;

for (const imgPath of imgPaths){
    const img = new Image();
    img.src = "img/"+imgPath+".png";
    
    img.onload = function() {
        imgLoadCount ++

        images[imgPath] = img;
        if (imgLoadCount === imgPaths.length){
            imgLoadFinish()
        }
    }
}

//images.[path]でタグをとれるようになる

//====================================
//canvasDraw
//====================================

//relative
//スクロールする

function DrawImageRect(img,r){
    ctx.drawImage(img, (Math.round(r.x) - scrollX)*3, (360 - Math.round(r.y) + scrollY)*3, r.w * 3, r.h *3)
}

function DrawFillRect(color,r){
    ctx.fillStyle = color;
    ctx.fillRect((r.x - scrollX)*3, (360 - r.y + scrollY)*3, (r.w)*3, (r.h)*3)
}

function DrawStrokeRect(color,r){
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect((Math.round(r.x - scrollX)+0.5)*3, (Math.round(360 - r.y + scrollY) + 0.5)*3, (r.w - 1)*3, (r.h - 1)*3)
}

function DrawText(text,color,r){
    ctx.font = '48px marumonica';
    ctx.fillStyle = color;
    ctx.fillText(text, r.x * 3 , r.y*3);
}

//abusolute
//スクロールしない

function DrawImageRectAbs(img,r){
    ctx.drawImage(img, Math.round(r.x)*3, Math.round(r.y)*3, r.w * 3, r.h *3);
}

function DrawFillRectAbs(color,r){
    ctx.fillStyle = color;
    ctx.fillRect(r.x*3, r.y*3, r.w*3, r.h*3)
}

function DrawStrokeRectAbs(color,r){
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect((Math.round(r.x)+0.5)*3, (Math.round(r.y) + 0.5)*3, (r.w - 1)*3, (r.h - 1)*3)
}

function DrawTextAbs(text,color,r){
    ctx.font = '48px marumonica';
    ctx.fillStyle = color;
    ctx.fillText(text, r.x * 3 , r.y*3);
}

//====================================
//audio
//====================================