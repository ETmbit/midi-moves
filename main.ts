/////////////////////////
//#####################//
//##                 ##//
//##  midi-moves.ts  ##//
//##                 ##//
//#####################//
/////////////////////////

let MEASURE = 0

enum Moves {
    //% block="move 1"
    Move1,
    //% block="move 2"
    Move2,
    //% block="move 3"
    Move3,
    //% block="move 4"
    Move4,
    //% block="move 5"
    Move5,
    //% block="move 6"
    Move6,
    //% block="move 7"
    Move7,
    //% block="move 8"
    Move8,
    //% block="move 9"
    Move9,
    //% block="move 10"
    Move10,
    //% block="move 11"
    Move11,
    //% block="move 12"
    Move12,
    //% block="move 13"
    Move13,
    //% block="move 14"
    Move14,
    //% block="move 15"
    Move15,
    //% block="move 16"
    Move16,
    //% block="move 17"
    Move17,
    //% block="move 18"
    Move18,
    //% block="move 19"
    Move19,
    //% block="move 20"
    Move20,
}

let doMove1: handler
let doMove2: handler
let doMove3: handler
let doMove4: handler
let doMove5: handler
let doMove6: handler
let doMove7: handler
let doMove8: handler
let doMove9: handler
let doMove10: handler
let doMove11: handler
let doMove12: handler
let doMove13: handler
let doMove14: handler
let doMove15: handler
let doMove16: handler
let doMove17: handler
let doMove18: handler
let doMove19: handler
let doMove20: handler

let moves: number[][] = []

messageHandler = (cmd: number) => {
    if (cmd >= 0) return;
    MEASURE = -cmd
    for (let i = 0; i < moves.length; i++) {
        if (moves[i][0] == MEASURE) {
            switch (moves[i][1]) {
                case Moves.Move1: doMove1(); break;
                case Moves.Move2: doMove2(); break;
                case Moves.Move3: doMove3(); break;
                case Moves.Move4: doMove4(); break;
                case Moves.Move5: doMove5(); break;
                case Moves.Move6: doMove6(); break;
                case Moves.Move7: doMove7(); break;
                case Moves.Move8: doMove8(); break;
                case Moves.Move9: doMove9(); break;
                case Moves.Move10: doMove10(); break;
                case Moves.Move11: doMove11(); break;
                case Moves.Move12: doMove12(); break;
                case Moves.Move13: doMove13(); break;
                case Moves.Move14: doMove14(); break;
                case Moves.Move15: doMove15(); break;
                case Moves.Move16: doMove16(); break;
                case Moves.Move17: doMove17(); break;
                case Moves.Move18: doMove18(); break;
                case Moves.Move19: doMove19(); break;
                case Moves.Move20: doMove20(); break;
            }
        }
    }
}

//% color="#47D45A" icon="\uf001"
//% block="Midi"
//% block.loc.nl="Midi"
namespace Midi {

    //% block="measure number"
    //% block.loc.nl="maatnummer"
    export function measure(): number {
        return MEASURE
    }

    //% block="do for %move"
    //% block.loc.nl="doe voor %move"
    export function onMove(move: Moves, code: () => void): void {
        switch (move) {
            case Moves.Move1: doMove1 = code; break;
            case Moves.Move2: doMove2 = code; break;
            case Moves.Move3: doMove3 = code; break;
            case Moves.Move4: doMove4 = code; break;
            case Moves.Move5: doMove5 = code; break;
            case Moves.Move6: doMove6 = code; break;
            case Moves.Move7: doMove7 = code; break;
            case Moves.Move8: doMove8 = code; break;
            case Moves.Move9: doMove9 = code; break;
            case Moves.Move10: doMove10 = code; break;
            case Moves.Move11: doMove11 = code; break;
            case Moves.Move12: doMove12 = code; break;
            case Moves.Move13: doMove13 = code; break;
            case Moves.Move14: doMove14 = code; break;
            case Moves.Move15: doMove15 = code; break;
            case Moves.Move16: doMove16 = code; break;
            case Moves.Move17: doMove17 = code; break;
            case Moves.Move18: doMove18 = code; break;
            case Moves.Move19: doMove19 = code; break;
            case Moves.Move20: doMove20 = code; break;
        }
    }

    //% block="perform at measure %measure %move"
    //% block.loc.nl="voer op maat %measure %move uit"
    export function measureMove(measure: number, move: Moves) {
        moves.push([measure, move])
    }
}
