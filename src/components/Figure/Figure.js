import React from 'react';
import { figureTypes } from '../constants';
import './Figure.css';

const Figure = ({mouseDown, style = {}, type = figureTypes.CIRCLE}, ref) => {
    return ( <div
                className={type?.toLowerCase()}
                draggable={false}
                onMouseDown={mouseDown(type)}
                style={style}
                ref={ref}
                id={type?.toLowerCase()}/>
            );
};


export default React.forwardRef(Figure);
