import React from 'react';
import Figure from '../Figure';
import './FiguresSection.css';

const FigureSection = () => {
    return (
        <section className={'figures'}>
            <header className={'figures__header'}>Figures</header>
            <article className={'figures__workspace'}>
                <Figure isRect={false} />
                <Figure isRect={true} />
            </article>
        </section>);
};

export default FigureSection;
