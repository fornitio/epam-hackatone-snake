import {
  ELEMENT
} from './constants';
import { getMyBody, getMyHead } from './utils';
export const config = {
  goals: () => {
    // console.log({myBody: getMyBody().length});
    const isAngry = (getMyHead() === ELEMENT.HEAD_EVIL);
    const result = [
      ELEMENT.GOLD,
      ELEMENT.APPLE,
      ELEMENT.FURY_PILL,
      (getMyBody().length > 4 || isAngry) ? ELEMENT.STONE : '', 
      isAngry ? ELEMENT.ENEMY_HEAD_UP : '', 
      isAngry ? ELEMENT.ENEMY_HEAD_RIGHT : '',
      isAngry ? ELEMENT.ENEMY_HEAD_DOWN : '', 
      isAngry ? ELEMENT.ENEMY_HEAD_LEFT : '', 
      isAngry ? ELEMENT.ENEMY_TAIL_END_UP : '', 
      isAngry ? ELEMENT.ENEMY_TAIL_END_RIGHT : '', 
      isAngry ? ELEMENT.ENEMY_TAIL_END_DOWN : '', 
      isAngry ? ELEMENT.ENEMY_TAIL_END_LEFT : '',
      isAngry ? ELEMENT.ENEMY_BODY_HORIZONTAL : '', 
      isAngry ? ELEMENT.ENEMY_BODY_VERTICAL : '', 
      isAngry ? ELEMENT.ENEMY_BODY_LEFT_DOWN : '', 
      isAngry ? ELEMENT.ENEMY_BODY_LEFT_UP : '', 
      isAngry ? ELEMENT.ENEMY_BODY_RIGHT_DOWN : '', 
      isAngry ? ELEMENT.ENEMY_BODY_RIGHT_UP : '',  
    ];
    return result;
  },
  smell: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
          'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O',
          'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z',
          '(', ')', ';', ':', ',', '.', '{', '}', 
  ],
  smellPrices : {
    [ELEMENT.GOLD]: 8,
    [ELEMENT.APPLE]: 12,
    [ELEMENT.STONE]: 4,
    [ELEMENT.FURY_PILL]: 2,
    [ELEMENT.ENEMY_HEAD_UP]: 3,
    [ELEMENT.ENEMY_HEAD_RIGHT]: 3,
    [ELEMENT.ENEMY_HEAD_DOWN]: 3,
    [ELEMENT.ENEMY_HEAD_LEFT]: 3,
    [ELEMENT.ENEMY_TAIL_END_UP]: 3,
    [ELEMENT.ENEMY_TAIL_END_RIGHT]: 3,
    [ELEMENT.ENEMY_TAIL_END_DOWN]: 3,
    [ELEMENT.ENEMY_TAIL_END_LEFT]: 3,
    [ELEMENT.ENEMY_BODY_HORIZONTAL]: 3,
    [ELEMENT.ENEMY_BODY_VERTICAL]: 3,
    [ELEMENT.ENEMY_BODY_LEFT_DOWN]: 3,
    [ELEMENT.ENEMY_BODY_LEFT_UP]: 3,
    [ELEMENT.ENEMY_BODY_RIGHT_DOWN]: 3,
    [ELEMENT.ENEMY_BODY_RIGHT_UP]: 3,

  },
  transparentItems: () => {
    const isAngry = (getMyHead() === ELEMENT.HEAD_EVIL);
    const result = [
    ELEMENT.NONE,
    ELEMENT.FLYING_PILL,
    ELEMENT.ENEMY_TAIL_END_DOWN, 
    ELEMENT.ENEMY_TAIL_END_LEFT, 
    ELEMENT.ENEMY_TAIL_END_UP, 
    ELEMENT.ENEMY_TAIL_END_RIGHT, 

    isAngry ? ELEMENT.ENEMY_BODY_HORIZONTAL : '', 
    isAngry ? ELEMENT.ENEMY_BODY_VERTICAL : '', 
    isAngry ? ELEMENT.ENEMY_BODY_LEFT_DOWN : '', 
    isAngry ? ELEMENT.ENEMY_BODY_LEFT_UP : '', 
    isAngry ? ELEMENT.ENEMY_BODY_RIGHT_DOWN : '', 
    isAngry ? ELEMENT.ENEMY_BODY_RIGHT_UP : '', 
  ];
    return result;
  },

  bodyParts: [
    ELEMENT.HEAD_DOWN,
    ELEMENT.HEAD_LEFT,
    ELEMENT.HEAD_RIGHT,
    ELEMENT.HEAD_UP,
    ELEMENT.HEAD_DEAD,
    ELEMENT.HEAD_EVIL,
    ELEMENT.HEAD_FLY,
    ELEMENT.HEAD_SLEEP,
    
    ELEMENT.TAIL_END_DOWN,
    ELEMENT.TAIL_END_LEFT,
    ELEMENT.TAIL_END_UP,
    ELEMENT.TAIL_END_RIGHT,
    ELEMENT.TAIL_INACTIVE,

    ELEMENT.BODY_HORIZONTAL,
    ELEMENT.BODY_VERTICAL,
    ELEMENT.BODY_LEFT_DOWN,
    ELEMENT.BODY_LEFT_UP,
    ELEMENT.BODY_RIGHT_DOWN,
    ELEMENT.BODY_RIGHT_UP,
  ],
}