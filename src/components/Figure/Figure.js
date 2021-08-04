import React from 'react';
import styled from 'styled-components';
import './Figure.css';

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
  background-color: tomato;
  border: 3px solid #d7472d;
  box-sizing: border-box;`;
const Rect = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;
  background-color: #3f7215;
  border: 3px solid #27480d;
  box-sizing: border-box;`;

const Figure = (props) => {
    const {isRect, dragstart, dragend} = props;

    return (isRect
            ? <Rect onDragStart={dragstart}
                    onDragEnd={dragend}
                    draggable={true}
                    id={isRect ? 'rect' : 'circle'}/>
            : <Circle onDragStart={dragstart}
                      onDragEnd={dragend}
                      draggable={true}
                      id={isRect ? 'rect' : 'circle'}/>
    );
};

export default Figure;
