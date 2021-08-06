import React from 'react';
import './CanvasSection.css';
import Canvas from '../Canvas/Canvas';

const CanvasSection = (props, ref) => {
    return (
        <section
            className={'canvas'}>
            <header className={'canvas__header'}>Canvas</header>
            <Canvas ref={ref}/>
        </section>);
};

export default React.forwardRef(CanvasSection);
