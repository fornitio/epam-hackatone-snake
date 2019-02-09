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
import { getNextSnakeMove } from './bot';
import { getBoardAsString, markThePath, getMyHead, getMyBody, } from './utils';
import { ELEMENT, COMMANDS } from './constants';
import WebSocket from 'ws';


var URL = process.env.GAME_URL;
console.log({ URL });
var url = URL.replace("http", "ws").replace("board/player/", "ws?user=").replace("?code=", "&code=");
console.log({ url })
var socket = new WebSocket(url);

socket.on('open', function open() {
    console.log('Open');
});

socket.on('close', function open() {
    console.log('Closed');
});
  
socket.on('message', function (data) {
    var pattern = new RegExp(/^board=(.*)$/);
    var message = data;
    var parameters = message.match(pattern);
    var board = parameters[1];
    var answer = processBoard(markThePath(board));
    console.log({ answer, l: getMyBody().length });
    const shouldAct = (getMyHead() === ELEMENT.HEAD_EVIL) || getMyBody().length > 9;
    if (shouldAct) {
        return socket.send(`${answer}, ${COMMANDS.ACT}`);
    }
    socket.send(answer);
});

function processBoard(board) {
    var programLogs = "";
    function logger(message) {
        programLogs += JSON.stringify(message) + "\n"
    }
    var answer = getNextSnakeMove(board, logger);
    var boardString = getBoardAsString(board);

    var logMessage = boardString + "\n\n";
    if (programLogs) {
        logMessage += "-----------------------------------\n";
        logMessage += programLogs;
    }
    logMessage += "-----------------------------------\n";
    logMessage += "Answer: " + answer + "\n";

    printBoard(boardString);
    return answer;
}

function printBoard(text) {
    console.log(text);
}

