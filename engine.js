const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 480, 360);
let canvasRect = canvas.getBoundingClientRect();
let CanvasMouseX;
let CanvasMouseY;
let scrollX = -230;
let scrollY = -50;

function scroll() {
    scrollX = Math.round(scrollX + (yakanRect.x - 230 - scrollX) / 10);
    scrollY = Math.round(scrollY + (yakanRect.y - 150 - scrollY) / 10);
}

//rect{x: ,y: ,width: ,height: }
function CheckRect(r1,r2) {
    return(r1.x < r2.x + r2.w && r2.x < r1.x + r1.w &&
    //r1.y < r2.y + r2.h && r2.y < r1.y + r1.h
    //r1.y > r2.y - r2.h && r2.y > r1.y - r1.h
    r2.y - r2.h < r1.y && r1.y - r1.h < r2.y
    )
}

document.addEventListener('mousemove', (e) => {
    canvasRect = canvas.getBoundingClientRect();
    const r = Math.max(canvas.width / canvasRect.width, canvas.height / canvasRect.height);
    CanvasMouseX = (e.clientX - (canvasRect.width - canvas.width / r) / 2) * r;
    CanvasMouseY = (e.clientY - (canvasRect.height - canvas.height / r) / 2) * r;
});


function RectTouch(Rect) {
    return(
        Rect.x < CanvasMouseX && CanvasMouseX < Rect.x + Rect.w &&
        Rect.y < CanvasMouseY && CanvasMouseY < Rect.y + Rect.h
    )
}

let KeyFlag

let images = {};

window.onload = (e) => {
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
}

function DrawImageRect(img,r){
    ctx.drawImage(img, Math.round(r.x) - scrollX, 360 - Math.round(r.y) + scrollY, r.w, r.h)
}

function DrawRect(color,r){
    ctx.fillStyle = color;
    ctx.fillRect(r.x - scrollX, 360 - r.y + scrollY, r.w, r.h)
}

function DrawStrokeRect(color,r){
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(r.x - scrollX)+0.5, Math.round(360 - r.y + scrollY) + 0.5, r.w - 1, r.h - 1)
}


