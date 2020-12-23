let text = "MUSIC IS CALLING. WILL YOU PICK UP?";
let canvas = document.querySelector("#topMarquess");
let ctx = canvas.getContext("2d");
let textSize = ctx.measureText(text).width;
let padding = 10;
let yOffset = ctx.canvas.height/2 + 4.5;
let x = 0;
let xInterval = 1;

let items = [];

let initItems = () => {
    let colorCounter = 0;
    for(let i = 0; i< Math.ceil(window.innerWidth/(textSize+padding)); i++) {
        if(items.length == 0)
            items.push({x: 0-(textSize + padding), color: colorCounter});
        else
            items.push({x: items[i-1].x + textSize + padding, color: colorCounter});
        colorCounter++;

        if(colorCounter == 3)
            colorCounter = 0;
    }
}

let drawItems = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

    for(let i = 0; i<items.length; i++){
        let selectedColor;
        switch(items[i].color) {
            case 0:
                selectedColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--rm-main-yellow");
                break;
            case 1:
                selectedColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--rm-main-green");
                break;
            case 2:
                selectedColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--rm-main-blue");
                break;
            default:
                selectedColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--rm-main-yellow");
        }
        ctx.fillStyle = selectedColor;
        ctx.fillText(text, items[i].x, yOffset);
    }
}

let updateItems = () => {
    for (let i = 0; i< items.length; i++){
        items[i].x += xInterval;
        if(items[i].x >= window.innerWidth){
            console.log("outside!");
            items[i].x = 0-(textSize + padding);
        }
    }
    // adjustSize();
    drawItems();
    window.requestAnimationFrame(updateItems);
}

let init = () => {
    adjustSize();
    ctx.font = "18px SpaceGrotesk";
    textSize = ctx.measureText(text).width;
    console.log("text size: " + textSize);
    console.log(Math.ceil(window.innerWidth/(textSize+padding)));
    initItems();
    window.requestAnimationFrame(updateItems);
}

let adjustSize = () => {
    // ctx.canvas.width = window.innerWidth;
    canvas.width = window.innerWidth;
    // canvas.width = canvas.getBoundingClientRect().width;
    // ctx.canvas.style.height = "32px";
}
init();
