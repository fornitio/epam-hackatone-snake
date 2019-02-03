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
import { ELEMENT, COMMANDS } from './constants';
import {
  isGameOver, getHeadPosition, getElementByXY,
  findSmellIndex,
  getMyHead,
} from './utils';
import { config } from './config';
const logger = console.log.bind(console);

// Bot Example
let prevMove = null;
let wasAct = false;
export function getNextSnakeMove(board, logger) {
    if (isGameOver(board)) {
        return '';
    }
    const headPosition = getHeadPosition(board);
    if (!headPosition) {
        return '';
    }
    logger('Head:' + JSON.stringify(headPosition));

    const sorround = getSorround(board, headPosition); // (LEFT, UP, RIGHT, DOWN)
    logger('Sorround: ' + JSON.stringify(sorround));

    const raitings = sorround.map(rateElement);
    logger('Raitings:' + JSON.stringify(raitings));

    const command = getCommandByRaitings(raitings);
    // if (prevMove && prevMove === command) {
    //     prevMove = command;
    //     if (getMyHead() === ELEMENT.HEAD_EVIL /* && !wasAct */) {
    //         wasAct = true;
    //         return COMMANDS.ACT;
    //     }
    //     wasAct = false;
    // }
    return command;
}

function getSorround(board, position) {
    const p = position;
    return [
        getElementByXY(board, {x: p.x - 1, y: p.y }), // LEFT
        getElementByXY(board, {x: p.x, y: p.y -1 }), // UP
        getElementByXY(board, {x: p.x + 1, y: p.y}), // RIGHT
        getElementByXY(board, {x: p.x, y: p.y + 1 }) // DOWN
    ];
}

function rateElement(element) {
    if (element === ELEMENT.NONE) {
        return -70;
    }

    if (~findSmellIndex(element)) {
        return -findSmellIndex(element);
    }
    if (config.goals().some(goal => goal === element)) {
        return -1;
    }
    return -1000;
}   

function getCommandByRaitings(raitings) {
    var indexToCommand = ['LEFT', 'UP', 'RIGHT', 'DOWN'];
    const maxVal = Math.max(...raitings);
    var maxIndex = raitings.findIndex(el => (''+el === ''+maxVal)) || 0;
    logger({raitings});

    return indexToCommand[maxIndex];
}
