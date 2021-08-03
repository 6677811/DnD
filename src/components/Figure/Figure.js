import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
  background-color: tomato;
  border: 3px solid #e3553b`;

const Rect = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;
  background-color: #3f7215;
  border: 3px solid #27480d `;

const Figure = (props) => {
    const {isRect} = props;
    return (isRect ? <Rect/> : <Circle/>);
};

export default Figure;
