const game = {
    height: 200 * .61834,
    width: 300 * .61834,
    matrix: 4,
    firstCard: null,
    failCount: 0,
    WinsCount: 0,
    AllCount: 0,
    BANANAS: 0,
    cards: [],
    head: "Бананы",

    

    getCardById: (cards, cardId) => {
        let card = null;
        cards.map(c => {
            if (c.id === cardId) {
                card = c;
            }
        });
        return card;
    },

    setIsShowTrueCards: (cards, arrayCardId) => {
        cards.map(c => {
            for (let i = 0; i < arrayCardId.length; i++) {
                const cardId = arrayCardId[i];
                if (c.id === cardId) {
                    c.isShow = true;
                }
            }
        });
    },
    
    isFinish: (cards) => {
        let isFinish = true;
        cards.map(c => {
            if (!c.isShow) {
                isFinish = false;
            }
        });
        return isFinish;
    }
}

game.cards = generateCards(game.matrix)


function generateCards(matrix){  

    const bananas = []; 
    const countBananas = (matrix * matrix)/2;
    for (let i =0; i < countBananas; i++){
        const banana = 1
        bananas.push(banana);
    }

    const cards = [];
    for (let i = 0; i< bananas.length; i++) {
        const card ={
            id: i,
            color: 'black',
            isShow: false
        }
        cards.push(card)
    }
    return cards
}
function txt(){
    return "Банан"
}

function getBananasInCards(){
    return Math.floor(Math.random() * 2);
}

$(document).ready(function () {

    $("#root")
    .html("<div class='matrix'></div>");
    $(".matrix")
    .width((game.width + 24) * game.matrix)
    .height((game.height + 24) * game.matrix);

    for (let i = 0; i < game.cards.length; i++) {
        const e = game.cards[i];
        $(".matrix")
        .append("<div id='cube_" + e.id + "'class ='cube'></div>");

        $("#cube_" + e.id).css({
            "width": game.width,
            "height": game.height,
            "background-color": 'Red',
            "cursor": "pointer",
        });
    }

    for (let i = 0; i < game.cards.length; i++) {
        const e = game.cards[i]
        $("#cube_" + e.id).css({
            "background-color": "green",
            "cursor": "pointer",
            "border-radius": "25px",
        });
        $("#cube_" + e.id).click(function(){
            $("#cube_" + e.id).css({
                "background-color": "#ffc800"
            });
            if (getBananasInCards() == 1){
                game.AllCount += 1
                if (game.AllCount == 8){                   
                    $("result").text(
                        game.isFinish(  )

                    )
                }
                game.failCount +=1
                console.log(getBananasInCards())
                $("#cube_" + e.id).css({
                    "background-color": "#3b3a26"
                });
                console.log("Вы ошиблись")
                
            }
            else{
                console.log("Вы нашли коробоку с бананми")
                game.WinsCount += 1
            }
            const card = game.getCardById(
                game.cards  
            );

            if (!game.isShow){
                if (!game.firstCard || (!!game.firstCard && game.firstCard.id !== card.id)){
                    if (!game.firstCard){
                        game.firstCard = card;
                    } else if (!!game.firstCard){
                        if (game.firstCard.banana = card.banana){
                            
                            game.setIsShowTrueCards(
                                game.cards,[
                                    game.firstCard.id,
                                    card.id
                                ]
                            );
                            game.firstCard = null;
                        }
                        else {
                            setTimeout(() =>{
                                hideCard(game.firstCard.id)
                                hideCard(cardId);
                                game.firstCard = null;
                            }, 500);
                            game.failCount +=1;
                            }
                        }
                    }
                }


                showResult();
        });
    }
        
        $("#root").append("<div id='result'></div>");
        showResult();

        function hideCard(cardId) {
            $("#cube_" + cardId).css({
                "background-color": 'black',
                "cursor": 'pointer'
            });
        }
        function showResult() {
            $("#result").css({

            })
            $("#result").text(
                "Вы нашли коробок:"
                + game.WinsCount + '/' + game.WinsCount
                + ',      '
                + 'Неудачных попыток:'
                + game.failCount
                + (game.isFinish(game.cards)
                ? "Игра завершена": "")
            );
        }
    
    });
