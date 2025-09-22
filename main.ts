//////////////////////
//##################//
//##              ##//
//##  general.ts  ##//
//##              ##//
//##################//
//////////////////////

type handler = () => void                   // plain handler
type prmhandler = (value: number) => void   // hander accepting a number parameter
type rethandler = () => number              // handler returning a number

let stopHandler: handler
let resetHandler: handler

///////////////////
//               //
// PLAYER MODULE //
//               //
///////////////////

// the xxxPlayerHandlers and isPlaying routines support match.ts
let getPlayerHandler: rethandler    // match.ts receives the player auto selected via the extension
let setPlayerHandler: prmhandler    // match.ts lets the extension know the user selected player
let showPlayerHandler: handler      // the extension shows additional player info *)
let initPlayerHandler: handler      // **)
let isPlaying: rethandler           // match.ts lets the extension know if playing is active
// *) e.g. this can be showing the color via a led
// **) match.ts defines initPlayerHandler to call getPlayerHandler
//     the extension defines getPlayerHandler to read the player and return it to match.ts
//     on start, the extension calls initPlayerHandler and in return gives the player
//       as the extensions for example has read it from a color sensor


////////////////////////
//                    //
// RADIO GROUP MODULE //
//                    //
////////////////////////

let displayHandler: handler
let messageHandler: prmhandler

let GROUP = 1

function displayGroup() {
    basic.showNumber(GROUP)
    basic.pause(500)
    if (displayHandler) displayHandler()
    else basic.showIcon(IconNames.Yes)
}

displayGroup()

const EVENTID = 200 + Math.randomRange(0, 100); // semi-unique
let EVENTCNT = 0

function setNextGroup() {
    control.inBackground(() => {
        EVENTCNT++
        basic.showNumber(GROUP)
        let tm = control.millis() + 1000
        while (tm > control.millis()) basic.pause(1)
        EVENTCNT--
        if (!EVENTCNT) displayGroup()
    })
}

control.onEvent(EVENTID, 0, setNextGroup)

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    GROUP++
    if (GROUP > 9) GROUP = 1
    radio.setGroup(GROUP)
    control.raiseEvent(EVENTID, 0)
})

/////////////////
//             //
// WAVE MODULE //
//             //
/////////////////

let WAVE = false
let WAVEWAIT = 1000

radio.onReceivedNumber(function (value: number) {
    if (WAVE) basic.pause(WAVEWAIT)
    if (messageHandler) messageHandler(value)
})

//////////////////
//              //
// COLOR MODULE //
//              //
//////////////////

enum Color {
    //% block="off"
    //% block.loc.nl="uit"
    None,
    //% block="red"
    //% block.loc.nl="rood"
    Red,
    //% block="green"
    //% block.loc.nl="groen"
    Green,
    //% block="blue"
    //% block.loc.nl="blauw"
    Blue,
    //% block="yellow"
    //% block.loc.nl="geel"
    Yellow,
    //% block="cyan"
    //% block.loc.nl="cyaan"
    Cyan,
    //% block="magenta"
    //% block.loc.nl="magenta"
    Magenta,
    //% block="black"
    //% block.loc.nl="zwart"
    Black,
    //% block="dark grey"
    //% block.loc.nl="donkergrijs"
    DarkGrey,
    //% block="grey"
    //% block.loc.nl="grijs"
    Grey,
    //% block="light grey"
    //% block.loc.nl="lichtgrijs"
    LightGrey,
    //% block="white"
    //% block.loc.nl="wit"
    White,
    //% block="orange"
    //% block.loc.nl="oranje"
    Orange,
    //% block="brown"
    //% block.loc.nl="bruin"
    Brown,
    //% block="pink"
    //% block.loc.nl="roze"
    Pink,
    //% block="indigo"
    //% block.loc.nl="indigo"
    Indigo,
    //% block="violet"
    //% block.loc.nl="violet"
    Violet,
    //% block="purple"
    //% block.loc.nl="paars"
    Purple
}

function fromColor(color: Color): number {
    let val = 0
    switch (color) {
        case Color.Red: val = 0xFF0000; break;
        case Color.Green: val = 0x00FF00; break;
        case Color.Blue: val = 0x0000FF; break;
        case Color.Yellow: val = 0xFFFF00; break;
        case Color.Cyan: val = 0x00FFFF; break;
        case Color.Magenta: val = 0xFF00FF; break;
        case Color.Black: val = 0x000000; break;
        case Color.DarkGrey: val = 0xA9A9A9; break;
        case Color.Grey: val = 0x808080; break;
        case Color.LightGrey: val = 0xD3D3D3; break;
        case Color.White: val = 0xFFFFFF; break;
        case Color.Orange: val = 0xFFA500; break;
        case Color.Brown: val = 0xA52A2A; break;
        case Color.Pink: val = 0xFFC0CB; break;
        case Color.Indigo: val = 0x4b0082; break;
        case Color.Violet: val = 0x8a2be2; break;
        case Color.Purple: val = 0x800080; break;
    }
    return val
}

function fromRgb(red: number, green: number, blue: number): number {
    let rgb = ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF)
    return rgb;
}

function redValue(rgb: number): number {
    let r = (rgb >> 16) & 0xFF;
    return r;
}

function greenValue(rgb: number): number {
    let g = (rgb >> 8) & 0xFF;
    return g;
}

function blueValue(rgb: number): number {
    let b = (rgb) & 0xFF;
    return b;
}

enum Digital {
    //% block="low"
    //% block.loc.nl="laag"
    Low,
    //% block="high"
    //% block.loc.nl="hoog"
    High,
}

enum Move {
    //% block="forward"
    //% block.loc.nl="vooruit"
    Forward,
    //% block="backward"
    //% block.loc.nl="achteruit"
    Backward,
}

enum Rotate {
    //% block="clockwise"
    //% block.loc.nl="rechtsom"
    Clockwise,
    //% block="anticlockwise"
    //% block.loc.nl="linksom"
    AntiClockwise,
}

enum Pace {
    //% block="fast"
    //% block.loc.nl="snelle"
    Fast,
    //% block="normal"
    //% block.loc.nl="normale"
    Normal,
    //% block="slow"
    //% block.loc.nl="langzame"
    Slow,
}

enum State {
    //% block="off"
    //% block.loc.nl="uit"
    Off,
    //% block="on"
    //% block.loc.nl="aan"
    On,
}

enum Player {
    //% block="green player"
    //% block.loc.nl="groene speler"
    Green,
    //% block="blue player"
    //% block.loc.nl="blauwe speler"
    Blue,
}

//% color="#61CBF4" icon="\uf075"
//% block="General"
//% block.loc.nl="Algemeen"
namespace General {

    //% color="#008800"
    //% block="comment: %dummy"
    //% block.loc.nl="uitleg: %dummy"
    //% dummy.defl="schrijf hier je uitleg"
    export function comment(dummy: string) {
    }

    //% block="turn %state the wave"
    //% block.loc.nl="zet de wave %state"
    export function waveOn(state: State) {
        WAVE = (state == State.On);
    }

    //% block="wave after %sec seconds"
    //% block.loc.nl="wave na %sec seconden"
    export function setWave(delay: number) {
        WAVEWAIT = delay * 1000
    }

    //% block="a number from %min upto %max"
    //% block.loc.nl="een getal van %min t/m %max"
    //% min.defl=0 max.defl=10
    export function randomInt(min: number, max: number): number {
        let i = 0
        if (min > max) {
            i = min
            min = max
            max = i
        }
        i = max - min + 1
        i = min + Math.floor(Math.random() * i)
        return i
    }

    //% block="color %clr"
    //% block.loc.nl="kleur %clr"
    export function color(clr: Color): Color {
        return clr
    }

    //% block="wait %sec seconds"
    //% block.loc.nl="wacht %sec seconden"
    export function wait(sec: number) {
        basic.pause(sec * 1000)
    }
}


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

radio.onReceivedNumber(function (cmd: number) {
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
})

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
    export function onMove(move: Moves, code: handler): void {
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
