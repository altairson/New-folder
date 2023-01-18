$(document).ready(function() {

    let fillBase = (arr) => {
        $('.content').html('');
        for(let i = 1; i <= 64; i++) {
            if(arr.includes(i)) {
                $('.content').append(`<div class="box bomb hidden">${i}</div>`);
            }
            else {
                $('.content').append(`<div class="box green hidden">${i}</div>`);
            }
            
        }
    }

    function newGame() {
        let minesCount = 5;
        let Numbers = [];
        while(minesCount > 0) {
            let randomNumber = Math.floor(Math.random() * 64) + 1;
            if(!Numbers.includes(randomNumber)) {
                Numbers.push(randomNumber);
                minesCount--;
            }
        }
        fillBase(Numbers);
    }

    $("#newGame").click(function() {
        newGame();
    });

    $(".content").on("click", ".bomb", function() {
        $('.hidden').removeClass('hidden');
        alert("BOMB!");
    });

    $(".content").on("click", ".green", function() {
        this.classList.remove('hidden');
    });

})