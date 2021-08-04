import React from 'react';
import styled from 'styled-components';
import './Figure.css';

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
  background-color: tomato;
  border: 3px solid #d7472d`;
const Rect = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;
  background-color: #3f7215;
  border: 3px solid #27480d `;


const Figure = (props) => {
    const {isRect, dragstart} = props;

    return (
        <div
            onDragStart={dragstart}
            draggable={true}
            id={isRect ? 'rect' : 'circle'}>
            {isRect ? <Rect /> : <Circle />}
        </div>);
};

export default Figure;
