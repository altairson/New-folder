$(document).ready(function() {

    var list = [];
    var Mines = [];
    var minesCount = 5;
    var dimensions = 8;



    let fillBase = () => {
        dimensions = $("#grid").val();
        $('.content').html('');
        for(let i = 1; i <= dimensions * dimensions; i++) {
            $('.content').append(`<div class="box hidden"></div>`);
        }
    }


    $('#apply').click(() => {
        if($('.content')[0].classList.length > 1) {
            $('.content')[0].classList.remove($('.content')[0].classList[1]);
        }
        $('.content').addClass(`grid-${$('#grid').val()}`);
        $("#newGame").click();
    })

   
    function newGame() {
        Mines = [];
        minesCount = $("#mines").val();
        dimensions = $("#grid").val();

        if(minesCount > ((dimensions * dimensions) / 2)) { 
            alert('too many mines!');
            return;
        }


        while(minesCount > 0) {
            let randomNumber = Math.floor(Math.random() * (dimensions * dimensions)) + 1;
            if(!Mines.includes(randomNumber)) {
                Mines.push(randomNumber);
                minesCount--;
            }
        }
        
        for(let i = 0; i < dimensions; i++) 
        {
            let innerArr = [];
            for(let j = 0; j < dimensions; j++) 
            {
                innerArr[j] = Mines.includes(i * dimensions + j + 1) ? 1 : 0;
            }
            list[i] = innerArr;
        }
        
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
        for (var i = 0; i < Mines.length; i++) {
            boxes[Mines[i] - 1].classList.remove('hidden')
            boxes[Mines[i] - 1].classList.add('bomb')
        }
    }

    $(".content").on("click", ".box", function() {
        let index = $(this).index(); // which box were clicked?
        let x;
        let y;

        // define cordinates of element in array representing clicked box
        if (index.toString().length < dimensions) {
            x = parseInt(index / dimensions);
            y = index % dimensions;
            console.log(index + " - x: " + x + " y: " + y);
        }
        else {
            x = 0;
            y = index % dimensions;
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
        let boxes = $('.box');
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) { 
                if(i >= 0 && i < dimensions && j >= 0 && j < dimensions) {
                    if(list[i][j] == 1) {
                        n++;
                    }
                    // this is where we reveal all surrounding boxes
                    else { 
                        // boxes[i * dimensions + j].classList.remove('hidden');
                    }
                }
            }
        }
        $(this).addClass('box-' + n);
        this.innerHTML = n > 0 ? n : "";

        if ($(".hidden").length == minesCount) {
            alert("you won!");
        }
    });
    newGame();



    function revealSurroundings(box, x, y) {
        let n = 0;
        let boxes = $('.box');

        // 1 sircle
        for(let k = 0; k < dimensions / 2; k++) {

            // 1 row
            for(let i = x - k; i <= x + k; i++) {

                // 1 element
                for(let j = y - k; j <= y + k; j++) { 

                    if(i >= 0 && i < dimensions && j >= 0 && j < dimensions) {
                        if(list[i][j] == 1) {
                            n++;
                        }
                    }
                }

            }
            if(n == 0) {
                box.classList.remove('hidden');
            }
        }

        
        box.addClass('box-' + n);
        box[0].innerHTML = n > 0 ? n : "";
    }
})