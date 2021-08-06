import React from 'react';
import Figure from '../Figure';
import { figureTypes } from '../constants';
import './FiguresSection.css';

const FigureSection = ({mouseDown}) => {
    return (
        <section className={'figures'}>
            <header className={'figures__header'}>Figures</header>
            <article
                className={'figures__workspace'}>
                {Object.values(figureTypes)
                    .map((figureType) => {
                        return <Figure key={figureType}
                                       type={figureType}
                                       mouseDown={mouseDown}
                        />
                    })}
            </article>
        </section>);
};

export default FigureSection;
