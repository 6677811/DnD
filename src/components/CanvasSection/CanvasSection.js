import React from 'react';
import './CanvasSection.css';

const CanvasSection = () => {
    return (
        <section className={'canvas'}>
            <header className={'canvas__header'}>Canvas</header>
            <article className={'canvas__workspace'}></article>
        </section>);
};

export default CanvasSection;