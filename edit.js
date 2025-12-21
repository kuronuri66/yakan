MouseBlockRect = {x:0,y:0,w:24,h:24}

function StageEdit(){
    MouseBlockRect.x = Math.floor((CanvasMouseX + scrollX) / 24) * 24;
    MouseBlockRect.y = Math.ceil((360 - CanvasMouseY + scrollY) / 24) * 24;
    DrawStrokeRect("blue",MouseBlockRect);

    console.log(MouseBlockRect)
}