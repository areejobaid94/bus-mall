'use strict';

let imgsArr = [];
let imgsName = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
let imgsDiv = document.getElementById('cards-div');
let totalShown = 0;
let allNames = [];
var numOfImg;
let shownArray = [];
let numOfshownArr = [];
let numOfClickArr = [];
let persArr = [];

let img = function (name) {
    this.name = name.split('.')[0];
    this.url = `img/${name}`;
    this.countShown = 0;
    this.countClicked = 0;
    this.index = imgsArr.length;
    imgsArr.push(this);
    allNames.push(this.name);
}

let scrollWindowEvent = function(){
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
       var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
       console.log(st);
       let a =  document.getElementById('fixedbutton');
        if (st > 1790){
           a.textContent = 'Go To Results ⇧';
           a.href = '#results';
           console.log(a);
       } else {
            a.textContent = 'Go To Charts ⇩';
            a.href = '#result-shown';
       }
    });
}


scrollWindowEvent();

let init = function () {
    do { numOfImg = Number(prompt('How many pictures do you want to display at one time, 3, 4 or 5')) }
    while (isNaN(numOfImg) || numOfImg > 5 || numOfImg < 3);
    deleteLS();
    checkIfImageInLS();
    numOfshownArr = [];
    numOfClickArr = [];
    totalShown = 0;
    imgsDiv.innerHTML = '';
    document.getElementById('fixedbutton').style.display = 'none';
    document.getElementById('button-result').style.display = 'none';
    document.getElementById('vote').innerText = `Vote By Clicking On The Card.`;
    document.getElementById('view-results').style.display = 'none';
    document.getElementById('all-Chart-results').style.display = 'none'
    document.getElementById('hideAndShow-Charts').style.display = 'none';
    localStorage.setItem('allNames',JSON.stringify(allNames))
    renderRandomImg();
    imgsDiv.addEventListener('click', afterClickImg);
};

let renderRandomImg = function () {
    if (totalShown < 25) {
        let imgsToRenderArr = [];
        for (let i = numOfImg; i > 0; i--) {
            do {
                var imgIndex = Math.floor(Math.random() * imgsArr.length);
            }
            while (imgsToRenderArr.includes(imgsArr[imgIndex]) || shownArray.includes(imgsArr[imgIndex]));
            imgsToRenderArr.push(imgsArr[imgIndex])
        }
        shownArray = imgsToRenderArr.slice();
        appendImgs(imgsToRenderArr);
        totalShown++;
        localStorage.setItem('imgsArr',JSON.stringify(imgsArr));
    } else {
        document.getElementById('vote').innerText = 'The Result!';
        document.getElementById('view-results').style.display = 'block';
    }
};

let appendImgs = function (imgsArray, isRes) {
    for (let i = 0; i < imgsArray.length; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.setAttribute('id', `row-${imgsArray[i].index}`);
        let column = document.createElement('div');
        column.setAttribute('class', 'column');
        column.setAttribute('id', `column-${imgsArray[i].index}`);
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', `card-${imgsArray[i].index}`);
        let img = document.createElement('img');
        img.setAttribute('src', imgsArray[i].url);
        img.setAttribute('class', 'card-img');
        img.setAttribute('id', `img-${imgsArray[i].index}`);
        let name = document.createElement('h1');
        name.innerText = imgsArray[i].name;
        name.setAttribute('id', `name-${imgsArray[i].index}`);
        card.appendChild(img);
        card.appendChild(name);
        if (isRes) {
            let clickedP = document.createElement('p');
            clickedP.innerText = `Total Clicked: ${imgsArray[i].countClicked}`;
            let shownP = document.createElement('p');
            shownP.innerText = `Total Shown: ${imgsArray[i].countShown}`;
            let persant = document.createElement('p');
            persant.innerText = `Percentage of C/S: ${(imgsArray[i].countClicked / imgsArray[i].countShown).toFixed(2)}`;
            card.appendChild(clickedP);
            card.appendChild(shownP);
            card.appendChild(persant);
            numOfshownArr.push(imgsArray[i].countShown);
            numOfClickArr.push(imgsArray[i].countClicked);
            persArr.push(Number((imgsArray[i].countClicked / imgsArray[i].countShown).toFixed(2)));
        } else {
            column.style.width = (100 / numOfImg) + '%';
            imgsArray[i].countShown = imgsArray[i].countShown + 1;
            document.getElementById('total-round').innerText = `Total Rounds: ${totalShown + 1}`;
        }

        column.appendChild(card);
        row.appendChild(column);
        imgsDiv.appendChild(row);
    };
}

let afterClickImg = function (event) {
    let index = Number(event.target.id.split('-')[1]);
    document.getElementById(`card-${index}`).style.backgroundColor = '#e0d5d5';
    document.getElementById(`card-${index}`).style.color = 'white';
    imgsArr[index].countClicked++;
    setTimeout(function () {
        imgsDiv.innerHTML = '';
        renderRandomImg();
    }, 100);
};

let viewChart = function (resultArr, typeOfChart, id) {
    var ctx = document.getElementById(id).getContext('2d');
    console.log(resultArr);
    var myChart = new Chart(ctx, {
        type: typeOfChart,
        data: {
            labels: allNames,
            datasets: [{
                label: '# of Votes',
                data: resultArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

let viewResults = function () {
    document.getElementById('button-result').style.display = 'block';
    imgsDiv.removeEventListener('click', afterClickImg);
    document.getElementById('vote').innerText = 'The Result!';
    document.getElementById('total-round').innerText = ``;
    document.getElementById('view-results').style.display = 'none';
    document.getElementById('hideAndShow-Charts').style.display = 'block';
    document.getElementById('all-Chart-results').style.display = 'block';
    document.getElementById('fixedbutton').style.display = 'block';

    appendImgs(imgsArr, true);
    viewChart(numOfshownArr, 'bar', 'result-shown');
    viewChart(numOfClickArr, 'pie', 'result-clicked');
    viewChart(persArr, 'line', 'result-per')
};
let restartVote = function (params) {
    document.getElementById('button-result').style.backgroundColor = '#e0d5d5';
    setTimeout(function () {
        document.getElementById('button-result').style.backgroundColor = 'gray';
        init();
    }, 100);
};

let hideResults = function (divId, buttonId) {
    let div = document.getElementById(divId);
    let button = document.getElementById(buttonId);
    let innertext = buttonId.split("-")[buttonId.split("-").length - 1];
    if (div.style.display === 'none') {
        button.innerText = `Hide ${innertext}`
        div.style.display = 'block';
    } else {
        button.innerText = `Show ${innertext}`;
        div.style.display = 'none';
    };
}

let checkIfImageInLS = function(){
    imgsArr = localStorage.getItem('imgsArr') == null ? createArr() : JSON.parse(localStorage.getItem('imgsArr'));
    allNames =  localStorage.getItem('allNames') == null ? allNames || createNameArr() : JSON.parse(localStorage.getItem('allNames'));
}

let createArr = function(){
    imgsArr = [];
    allNames = [];
    for (let i = 0; i < imgsName.length; i++) {
        new img(imgsName[i]);
    };
    return imgsArr;
}

let createNameArr = function(){
    for (let i = 0; i < imgsArr.length; i++) {
        allNames.push(imgsArr[i].name);
    };
    return allNames;
}

let deleteLS = function(){
    let deleteLocalStorage = prompt('Do you want to delete the localStorage before, yes of no')
    if(deleteLocalStorage.toLocaleLowerCase() == 'yes'){
        localStorage.clear();
        alert('ok!')
    }
    else if(deleteLocalStorage.toLocaleLowerCase() == 'no'){
        alert('ok!')
    }
    else{
        deleteLS();
    }
}

init();


