$(document).ready(function() {

    let fillBase = () => {
        $('.content').html('');
        for(let i = 1; i <= 64; i++) {
            $('.content').append(`<div class="box hidden"></div>`);
        }
    }

    var list = [];
    var Numbers = [];
    function newGame() {
        Numbers = [];
        let minesCount = 5;
        while(minesCount > 0) {
            let randomNumber = Math.floor(Math.random() * 64) + 1;
            if(!Numbers.includes(randomNumber)) {
                Numbers.push(randomNumber);
                minesCount--;
            }
        }
        
        for(let i = 0; i < 8; i++) 
        {
            let innerArr = [];
            for(let j = 0; j < 8; j++) 
            {
                innerArr[j] = Numbers.includes(i * 8 + j + 1) ? 1 : 0;
            }
            list[i] = innerArr;
        }
        console.log("bombs: " + Numbers);
        
        console.log("2D array: " + list);
        
        fillBase();
    }

    $("#newGame").click(function() {
        newGame();
    });

    $(".content").on("click", ".bomb", function() {
        $('.hidden').removeClass('hidden');
        alert("BOMB!");
    });

    function revealAll() {
        let boxes = $('.box');
        for (var i = 0; i < Numbers.length; i++) {
            boxes[Numbers[i] - 1].classList.remove('hidden')
            boxes[Numbers[i] - 1].classList.add('bomb')
        }
    }

    $(".content").on("click", ".box", function() {
        let index = $(this).index(); // which box were clicked?
        let x;
        let y;

        // define cordinates of element in array representing clicked box
        if (index.toString().length < 8) {
            x = parseInt(index / 8);
            y = index % 8;
            console.log(index + " - x: " + x + " y: " + y);
        }
        else {
            x = 0;
            y = index % 8;
            console.log(index + " - x: " + x + " y: " + y);
        }

        // if clicked boxs number is 1 in array then it is bomb
        if(list[x][y] == 1) {
            $(this).removeClass('hidden');
            $(this).addClass('bomb');
            alert("BOMB!");
            revealAll();
        }
        else {
            $(this).removeClass('hidden');
        }

        // check if there is any bomb near 
        let n = 0;
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) { 
                if(i >= 0 && i <= 7 && j >= 0 && j <= 7) {
                    if(list[i][j] == 1) {
                        n++;
                    }
                }
                
            }
        }
        $(this).addClass('box-' + n);
        this.innerHTML = n > 0 ? n : "";

        if ($(".hidden").length == 5) {
            alert("you won!");
        }
    });





    $(".content").on("click", ".green", function() {
        this.classList.remove('hidden');
    });

})