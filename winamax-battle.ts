/**
 * Problem URL:
 * https://www.codingame.com/ide/puzzle/winamax-battle
 **/

const n: number = parseInt(readline()); // the number of cards for player 1
const deck1: Array<string> = [];
for (let i = 0; i < n; i++) {
    const cardp1: string = readline(); // the n cards of player 1
    deck1.push(cardp1);
}

const m: number = parseInt(readline()); // the number of cards for player 2
const deck2: Array<string> = [];
for (let i = 0; i < m; i++) {
    const cardp2: string = readline(); // the m cards of player 2
    deck2.push(cardp2);
}

const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

console.error(deck1, deck2);

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

interface warResult {
    winner: 0|1|2;
    d1: string[];
    d2: string[];
}

console.log(playGame(deck1, deck2));

function playGame(d1: Array<string>, d2: Array<string>, isWar:boolean = false){
    let playNextRound: Boolean = true;
    let winner = 0;
    let roundNb:number = 0

    while(playNextRound){
        roundNb++;
        
        let c1 = d1.shift();
        let c2 = d2.shift();
        let battleResult = battle(c1, c2);
        if(battleResult ===  0){
            // War
            if(!canPlayWar(d1, d2)){
                playNextRound = false;
                continue;
            }
            let warIssue = playWar(d1, d2, c1, c2);
            d1 = warIssue.d1;
            d2 = warIssue.d2;
            if(warIssue.winner === 0){
                playNextRound = false;
                continue;
            }
        }
        else if(battleResult ===  1){
            d1.push(c1, c2);
        }
        else if (battleResult === 2){
            d2.push(c1, c2);
        }

        if(getWinner(d1,d2) !== false){
            // @ts-expect-error
            winner = getWinner(d1,d2);
            playNextRound = false;
        }
        
    }

    if(winner === 0)
        return 'PAT';
    else
        return winner + ' ' + roundNb;
}

function getWinner(d1: string[], d2: string[]): false|1|2{
    if(d1.length == 0)
        return 2
    if(d2.length == 0)
        return 1;
    return false;
}

function battle(c1: string, c2: string): number {
    return cardCompare(c1, c2);
}

function playWar(d1: string[], d2: string[], c1Played: string, c2Played: string): warResult{
    let result: warResult = {
        winner: 0,
        d1: [],
        d2: []
    }

    let c1WarStack = [c1Played];
    let c2WarStack = [c2Played];

    let continueWar = true;
    while (continueWar) {
        if(!canPlayWar(d1,d2)){
            continueWar = false;
            result.d1 = d1;
            result.d2 = d2;
            break;
        } else {
            c1WarStack.push(d1.shift(), d1.shift(), d1.shift());
            c2WarStack.push(d2.shift(), d2.shift(), d2.shift());
            let c1 = d1.shift();
            let c2 = d2.shift();
            c1WarStack.push(c1);
            c2WarStack.push(c2);
            
            switch(cardCompare(c1, c2)){
                case 0:
                    // Let's go next war
                    break;
                case 1:
                    d1.push(...c1WarStack, ...c2WarStack)
                    result.winner = 1;
                    result.d1 = d1;
                    result.d2 = d2;
                    continueWar = false;
                    break;
                case 2:
                    result.winner = 2;
                    d2.push(...c1WarStack, ...c2WarStack);
                    result.d1 = d1;
                    result.d2 = d2;
                    continueWar = false;
                    break;
            }
        }
    }

    // Handle warstack & decks

    return result;
}

function canPlayWar(d1: string[], d2: string[]): Boolean{
    return d1.length >= 4 && d2.length >= 4;
}

function cardCompare(c1: string, c2: string): 0|1|2{
    const c1Value:string = c1.slice(0, -1);
    const c2Value:string = c2.slice(0, -1);

    if(c1Value === c2Value)
        return 0;
    
    return cardOrder.indexOf(c1Value) < cardOrder.indexOf(c2Value) ? 2 : 1;
}