//---------------------------------------------------------------------------
//GAME PARAMETER AND START FUNCTION
//PRECONDITION: 1-folder caaled img"i" with i being the folder value
//              2-borad multiplies to even and folder contains img  
//                count half this value
//              3-All imges are named img1.webp ...img`x*y`.webp
x = 5
y = 6
folder = 1

function startFunction(){
    counter = 0
    str = "<table>";
    for(i = 0; i < x; i++){
        str += `<tr id="tr${i}">`
        for(j = 0; j < y; j++){
            str+=`<td><img class="close" id="${counter}" src="images/cover.jpeg"
                     width="75" height="100" onclick="clicked(${counter}, false)"></td>`
            counter += 1;
        }
        str += `</tr>`
    }
    document.getElementById("game").innerHTML = str + "</table>";
    
}

//---------------------------------------------------------------------------
//GENERATING ALL IMAGES AND SHUUFLING THEM AND INSERTING THEM INTO 2D ARRAY
array = [[]];
listOfImages = [];
listOfImagesShuffled = [];
originalPic = "images/cover.jpeg"


//Each folder is assumed to have 15 pictures
function getAllimages(folder){
    for(i = 1; i <= x*y/2; i++){
    listOfImages.push(`img${folder}/img${i}.webp`);
    listOfImages.push(`img${folder}/img${i}.webp`);
    }
}
getAllimages(folder);
console.log(listOfImages.length)
console.log(listOfImages)
//Generating shuffled list
function shuffleAllImages(){
    usedNum = [];
    while(usedNum.length < (x*y)){
        element = randInt(0,x*y-1)
        while(usedNum.includes(element)){
            element = randInt(1,x*y)
        }
        listOfImagesShuffled.push(listOfImages[element])
        usedNum.push(element)
    }
    // displays images in the correct order revealing their order in the grid
    // for(i = 0; i < listOfImagesShuffled.length; i++){
    //     document.getElementById("console").innerHTML += `<img src="${listOfImagesShuffled[i]}"
    //     width="75" height="100">`
    // }
}
shuffleAllImages();
console.log(listOfImagesShuffled.length)
console.log(listOfImagesShuffled)
//----------------------------------------------------------------
//CORE GAME LOGIC -> WHEN TILES ARE CLICKED AND MATCHED

function openTile(tile, i){
    tile.src = listOfImagesShuffled[i] //reveal image
    tile.classList.remove('close'); //remove close class (animation)
}
function closeTile(tile){
    tile.src = "images/cover.jpeg"
    console.log("the type is 2: " + typeof tile)
    tile.classList.add('close');
}
function doneTile(tile){
    tile.classList.remove('close');
    tile.classList.add('done');
}
lastTileID = -1
lastTile = -1
waiting = false
function clicked(i, bool){
    if(waiting){return;}
    //document.getElementById("console2").innerHTML = i + " " + bool + " " + document.getElementById(i).src;

    tile = document.getElementById(i)
    console.log("the type is: " + typeof tile)
    //if element is already done
    if(tile.classList.contains("done")){return;}

    //Reveal First Tile
    if (tile.src.includes("images/cover.jpeg") && lastTile == -1){
        console.log("reveal first")
        openTile(tile, i);
        lastTile = tile;
        lastTileID = i
    }
    //Close first tile
    else if (i == lastTileID){
        console.log("close first")
        closeTile(tile);
        lastTile = -1
        lastTileID = -1
    }
    //Reveal Second tile and -> either close both OR set both to done
    else if(lastTile != -1 && tile.src.includes("images/cover.jpeg")){
        openTile(tile, i)
        console.log("the type is 2: " + typeof tile)
        waiting = true;
        console.log(waiting)
        
        const results = async () =>{
            await delay(200)
            doneTile(lastTile);
            doneTile(tile);
            console.log("DONE")

            lastTile = -1;
            lastTileID = -1
            waiting = false}

            const closing = async () =>{
                await delay(800)

    
                closeTile(lastTile)
                closeTile(tile)
    
                lastTile = -1;
                lastTileID = -1
                waiting = false}

            if(listOfImagesShuffled[i] == listOfImagesShuffled[lastTileID]){
            results();}
            else{
                closing();
            }
            console.log(waiting)
    }


    
    //document.getElementById("console2").innerHTML += "<br>" + i + " lastTile: " + i
}

window.onload = startFunction;

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

const delay = ms => new Promise(res => setTimeout(res, ms));