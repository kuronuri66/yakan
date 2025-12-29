let mode = "play";

function step() {
    requestAnimationFrame(step);
    scroll();
    ctx.fillStyle = "#000a17";
    ctx.fillRect(0, 0, 1440, 1080);

    if(mode=="edit"){
        DrawText("<えでぃっとも～ど>","#ffffff50",{x:0,y:16})
        StageEdit();
    }
    
    yakan();
}


function imgLoadFinish(){
    step();
}