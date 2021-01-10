'use strict';

let imgsArr = [];
let imgsName = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
let imgsDiv = document.getElementById('cards-div');
let totalShown = 0;

let img = function (name){
    this.name = name.split('.')[0];
    this.url = `img/${name}`;
    this.countShown = 0;
    this.countClicked = 0;
    this.index = imgsArr.length;
    imgsArr.push(this);
}

let init = function(){
    for(let i = 0; i < imgsName.length; i++){
        new img(imgsName[i]);
    };
    renderRandomImg();
    imgsDiv.addEventListener('click', afterClickImg);
};

let renderRandomImg = function () {
    if (totalShown < 25){
        var firstImgIndex = Math.floor(Math.random() * imgsArr.length);
        do{
            var secondImgIndex = Math.floor(Math.random() * imgsArr.length);;
            var thirdImgIndex = Math.floor(Math.random() * imgsArr.length);;
        }
        while(secondImgIndex == firstImgIndex || secondImgIndex == thirdImgIndex || thirdImgIndex == firstImgIndex);
        appendImgs([imgsArr[firstImgIndex],imgsArr[secondImgIndex],imgsArr[thirdImgIndex]]);
        totalShown ++;
    }else{
        imgsDiv.removeEventListener('click', afterClickImg);
        renderResult();
    }
};

let appendImgs = function (imgsArray, isRes) {
    for (let i = 0; i < imgsArray.length; i++) {
        imgsArray[i].countShown ++;
        let row = document.createElement('div'); 
        row.setAttribute('class', 'row');
        row.setAttribute('id',`row-${imgsArray[i].index}`);
        let column = document.createElement('div');
        column.setAttribute('class','column');
        column.setAttribute('id',`column-${imgsArray[i].index}`);
        let card = document.createElement('div');
        card.setAttribute('class','card');
        card.setAttribute('id', `card-${imgsArray[i].index}`);
        let img = document.createElement('img');
        img.setAttribute('src',imgsArray[i].url);
        img.setAttribute('class','card-img');
        img.setAttribute('id', `img-${imgsArray[i].index}`);
        let name = document.createElement('h1');
        name.innerText = imgsArray[i].name;
        name.setAttribute('id', `name-${imgsArray[i].index}`);
        card.appendChild(img);
        card.appendChild(name);
        if (isRes){
            let clickedP = document.createElement('p');
            clickedP.innerText =`Total Clicked: ${imgsArray[i].countClicked}`;
            let shownP = document.createElement('p');
            shownP.innerText =  `Total Shown: ${imgsArray[i].countShown}`;
            let persant = document.createElement('p');
            persant.innerText =  `Percentage of Clicked/Shown: ${(imgsArray[i].countClicked/imgsArray[i].countShown).toFixed(2)}`;
            card.appendChild(clickedP);
            card.appendChild(shownP);
            card.appendChild(persant);
        }
        column.appendChild(card);
        row.appendChild(column);
        imgsDiv.appendChild(row);
    }
}

let afterClickImg = function (event) {
    let index = Number(event.target.id.split('-')[1]);
    document.getElementById(`card-${index}`).style.backgroundColor = '#e0d5d5';
    imgsArr[index].countClicked ++;
    setTimeout(function(){ 
        imgsDiv.innerHTML = '';
        renderRandomImg();
    }, 100);
};

let renderResult = function () {
    appendImgs(imgsArr, true);
};

init();
