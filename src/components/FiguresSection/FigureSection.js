import React from 'react';
import Figure from '../Figure';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setIsDrag } from '../../actions';
import './FiguresSection.css';

const FigureSection = ({setIsDrag}) => {
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.dropEffect = 'copy';
        e.dataTransfer.setData('id', e.target.id);
        setIsDrag(true);
    };
    const dragendHandler = (e) => {
        e.dataTransfer.clearData();
        setIsDrag(false);
    };

    return (
        <section className={'figures'}>
            <header className={'figures__header'}>Figures</header>
            <article
                className={'figures__workspace'}>
                <Figure isRect={false} dragstart={dragstartHandler} dragend={dragendHandler} />
                <Figure isRect={true} dragstart={dragstartHandler} dragend={dragendHandler} />
            </article>
        </section>);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setIsDrag}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FigureSection);
