import React from 'react';
import Figure from '../Figure';
import './FiguresSection.css';

const FigureSection = () => {
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.dropEffect = 'copy';
        e.dataTransfer.setData('id', e.target.id);
    };

    return (
        <section className={'figures'}>
            <header className={'figures__header'}>Figures</header>
            <article
                className={'figures__workspace'}>
                <Figure isRect={false} dragstart={dragstartHandler} />
                <Figure isRect={true} dragstart={dragstartHandler} />
            </article>
        </section>);
};

export default FigureSection;
