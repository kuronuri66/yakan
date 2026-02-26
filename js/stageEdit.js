let editMode = "colliderRects";
const modeChangeButton = {x:200,y:5,w:12,h:12}
MouseBlockRect = {x:0,y:0,w:24,h:24}

addEventListener('keydown' , (e)=>{

    if(e.key == "m"){
        hajimari.stop(3);
        if(mode == "play"){
            mode = "edit"
        } else{
            mode = "play";
        }

    }
});

function StageEdit(){
    MouseBlockRect.x = Math.floor((CanvasMouseX + scrollX) / 24) * 24;
    MouseBlockRect.y = Math.ceil((360 - CanvasMouseY + scrollY) / 24) * 24;
    DrawStrokeRect("blue",MouseBlockRect);
    DrawImageRectAbs(images.colliderRectsButton,modeChangeButton)
}

addEventListener('mousedown',()=>{
    if(RectTouch(modeChangeButton)){
        
    }
})