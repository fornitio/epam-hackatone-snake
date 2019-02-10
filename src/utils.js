/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2019 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
import {
  ELEMENT
} from './constants';

import { config } from './config';

// Here is utils that might help for bot development
export function getBoardAsString(board) {
    const size = getBoardSize(board);

    return getBoardAsArray(board).join("\n");
}

export function getBoardAsArray(board) {
  const size = getBoardSize(board);
  var result = [];
  for (var i = 0; i < size; i++) {
        const y = i;
        const row = board.substring(i * size, (i + 1) * size);
      result.push(row);
  }
  
  return result;
}

export function getBoardSize(board) {
    return Math.sqrt(board.length);
}

export function isGameOver(board) {
    return board.indexOf(ELEMENT.HEAD_DEAD) !== -1;
}

export function isAt(board, x, y, element) {
    if (isOutOf(board, x, y)) {
        return false;
    }
    return getAt(board, x, y) === element;
}

export function getAt(board, x, y) {
    if (isOutOf(board, x, y)) {
        return ELEMENT.WALL;
    }
    return getElementByXY(board, { x, y });
}

export function isNear(board, x, y, element) {
    if (isOutOf(board, x, y)) {
        return ELEMENT.WALL;
    }

    return isAt(board, x + 1, y, element) ||
			  isAt(board, x - 1, y, element) ||
			  isAt(board, x, y + 1, element) ||
			  isAt(board, x, y - 1, element);
}

export function isOutOf(board, x, y) {
    const boardSize = getBoardSize(board);
    return x >= boardSize || y >= boardSize || x < 0 || y < 0;
}

export function getHeadPosition(board) {
    return getFirstPositionOf(board, [
        ELEMENT.HEAD_DOWN,
        ELEMENT.HEAD_LEFT,
        ELEMENT.HEAD_RIGHT,
        ELEMENT.HEAD_UP,
        ELEMENT.HEAD_DEAD,
        ELEMENT.HEAD_EVIL,
        ELEMENT.HEAD_FLY,
        ELEMENT.HEAD_SLEEP,
    ]);
}

export function getFirstPositionOf(board, elements) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var position = board.indexOf(element);
        if (position !== -1) {
            return getXYByPosition(board, position);
        }
    }
    return null;
}

export function getXYByPosition(board, position) {
    if (position === -1) {
        return null;
    }

    const size = getBoardSize(board);
    return {
        x:  position % size,
        y: (position - (position % size)) / size
    };
}

export function getElementByXY(board, position) {
    const size = getBoardSize(board);
    return board[size * position.y + position.x];
}

let activeState = {
    lut: [],
    myBody: [],
    myHead: ELEMENT.HEAD_UP,
    stepCounter: 10,
}


const checkLut = (lut, board) => {
    const findTrap = item => {
        const p = item;
        const topToken = board[p.y - 1][p.x];
        const rightToken = board[p.y][p.x + 1];
        const bottomToken = board[p.y + 1][p.x];
        const leftToken = board[p.y][p.x - 1];
        const closedVertical = !~config.transparentItems().findIndex(x => x ==topToken) && !~config.transparentItems().findIndex(x => x ==bottomToken);
        const closedHorizontal = !~config.transparentItems().findIndex(x => x ==leftToken) && !~config.transparentItems().findIndex(x => x ==rightToken);
        // closedVertical || console.log({ topToken, bottomToken, closedVertical });
        // closedHorizontal || console.log({ leftToken, rightToken, closedHorizontal });
        return !(closedHorizontal || closedVertical);
    }
    const result = lut.filter(findTrap);



    return result;
}

export const getLut = (lut) => {
    const compareDistances = (a, b) => {
        if (a.d < b.d) {
        return -1;
        }
        if (a.d > b.d) {
        return 1;
        }
        return 0;
    }
    return lut.sort(compareDistances
        

        );
} 

export const setSmell = (num) => {
    if (num < 0 || num > config.smell.length) { return; };
    const smell = config.smell[num];
    return smell;
}
export const findSmellIndex = (token) => {
    return config.smell.findIndex(el => el === token);
}

const setCenterPlace = (board, p, weightCoeff) => board[p.y][p.x] = weightCoeff;
const setTopPlace = (board, p, weightCoeff) => board[p.y - 1][p.x] = weightCoeff;
const setRightPlace = (board, p, weightCoeff) => board[p.y][p.x + 1] = weightCoeff;
const setBottomPlace = (board, p, weightCoeff) => board[p.y + 1][p.x] = weightCoeff;
const setLeftPlace = (board, p, weightCoeff) => board[p.y][p.x - 1] = weightCoeff;

export const getMyBody = () => activeState.myBody;
export const getMyHead = () => activeState.myHead;

const increaseSiblings = (board, point, step) => {
    const p = point;
    const size = board[0].length;
    const topToken = board[p.y - 1][p.x];
    const rightToken = board[p.y][p.x + 1];
    const bottomToken = board[p.y + 1][p.x];
    const leftToken = board[p.y][p.x - 1];
    
    const top = p.y > 0 && (~config.transparentItems().findIndex(x => x == topToken)) && setTopPlace(board, p, step + 1);
    const right = p.x < size && (~config.transparentItems().findIndex(x => x == rightToken)) && setRightPlace(board, p, step + 1);
    const bottom = p.y < size && (~config.transparentItems().findIndex(x => x == bottomToken)) && setBottomPlace(board, p, step + 1);
    const left = p.x > 1 && (~config.transparentItems().findIndex(x => x == leftToken)) && setLeftPlace(board, p, step + 1);
}

const makeWave = (board, step)=> {
    board.forEach((row, y)=>{
        row.forEach((el, x)=>{
            if (el == step) {
                increaseSiblings(board, {x, y}, step);
            }
        });
        // console.log(row.map(el => (''+el).slice(-1)).join(''));  
    });
}
const findLutItems = (clearBoard, size, head, goals) => {
    let lut = [];
    for (let i = 0; i < size; i++) {
        const y = i;
        const row = clearBoard.substring(i * size, (i + 1) * size);

        const foundItems = [...row].map((el, x) => {
            if (goals().some(goal => goal === el)) {
                const distance = Math.sqrt((head.x - x)**2 + (head.y - y)**2);
                return { e: el, d: distance, x, y }
            }
        });
        lut = [...lut, ...(foundItems.filter(f=>f != null))];
    }
    return lut;
}

const defineMyBody = (clearBoard, size, myParts, stepCounter, {HEAD_UP, HEAD_EVIL}) => {
    let myBody = [];
    let myHead = HEAD_UP;

    for (var i = 0; i < size; i++) {
        const y = i;
        const row = clearBoard.substring(i * size, (i + 1) * size);
        const foundMyBodyParts = [...row].map((el, x) => {
            if (myParts.some(part => part === el)) {
                if (el === HEAD_EVIL) {
                    stepCounter--;
                    if (stepCounter > 0) {
                        myHead = HEAD_EVIL;
                    }
                }           
                return el;
            }
        });
        myBody = [...myBody, ...(foundMyBodyParts.filter(f=>f != null))];
    }

    if (myHead !== HEAD_EVIL) {
        stepCounter = 10;
    }
    return {stepCounter, myBody, myHead}
}

export const makeBoardToSmell = clearBoard => {
    const size = getBoardSize(clearBoard.slice());
    const head = getHeadPosition(clearBoard) || {};
    const board = getBoardAsArray(clearBoard.slice()).map( el => el.split('') );
    let {stepCounter, myBody, myHead} = defineMyBody(clearBoard, size, config.bodyParts, activeState.stepCounter, ELEMENT);

    activeState = {...activeState, stepCounter, myBody, myHead}

    console.log({ 'stepsLast': activeState.stepCounter});

    activeState.lut = findLutItems(clearBoard, size, head, config.goals);

    const lutChecked = checkLut(getLut(activeState.lut), [...board]);

    const makeNewWavedBoard = (board, lutChecked, {smellPrices, smell, unknownSmell}) => {
        const markLutForWaves = unknownSmell => lutItem => {
            // lutItem: { e: el, d: distance, x, y }
            const startSmell = smellPrices[lutItem.e] || unknownSmell;
            // increaseSiblings(board, lutItem, startSmell);
            setCenterPlace(board, lutItem, startSmell + 1);
            return lutItem.e;
        }
        lutChecked.map(markLutForWaves(unknownSmell));

        for (let step = 1; step < smell.length; step++) {
            makeWave(board, step);
        }
        return board;
    };

    const convertToSmells = (el, x, y, lutChecked, setSmell, {smell}) => {
        let tail = el;
        if (el > 1 && el < smell.length) {
            const originalLut = lutChecked.find(lut => {
                // lutItem: { e: el, d: distance, x, y }
                const setAslut = lut.x === x && lut.y === y;
                return setAslut;
            });
            tail = originalLut ? originalLut.e : setSmell(el);
        }
        return tail;
    }

    const smelledBoard = 
        makeNewWavedBoard([...board], lutChecked, config)
        .map((raw, y)=>raw.map((el, x) => 
                convertToSmells(el, x, y, lutChecked, setSmell, config)
            ).join('')
        ).join('');

    return smelledBoard;
}