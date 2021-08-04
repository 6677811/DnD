import React from 'react';
import './CanvasSection.css';
import { bindActionCreators } from 'redux';
import { setIsDrag } from '../../actions';
import { connect } from 'react-redux';

const removeActivesFigures = () => {
    document
        .querySelectorAll('.active-figure')
        .forEach((figure) => {
            figure.classList.remove('active-figure');
        });
}

const setActiveFigure = (e) => {
    e.stopPropagation();
    removeActivesFigures();
    e.target.classList.add('active-figure');
}

const CanvasSection = () => {
    const dragOverHandler = (e) => {
        e.preventDefault();
    };
    const dropHandler = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('id');
        const canvas = document.querySelector('.canvas__workspace');
        const {left, top} = canvas.getBoundingClientRect();

        if (data && (data === 'circle' || data === 'rect')) {
            const current = document.querySelector(`#${data}`);
            const nodeCopy = current.cloneNode(true);
            nodeCopy.addEventListener('dragstart', dragstartHandler);
            nodeCopy.addEventListener('dragend', dragendHandler);
            nodeCopy.addEventListener('mousedown', setActiveFigure);
            nodeCopy.id = `added_${canvas.childElementCount}`;
            removeActivesFigures();
            nodeCopy.firstChild.classList.add('active-figure');
            nodeCopy.style.left = e.clientX - left + 'px';
            nodeCopy.style.top = e.clientY - top + 'px';
            canvas.appendChild(nodeCopy);
        } else {
            const id = e.dataTransfer.getData('id');
            const current = document.getElementById(id);
            current.style.left = e.clientX - left + 'px';
            current.style.top = e.clientY - top + 'px';
        }
    };
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('id', e.target.id);
        e.target.classList.add('active-figure');
    };

    const dragendHandler = (e) => {
        e.dataTransfer.clearData();
        setIsDrag(false);
    };

    return (
        <section className={'canvas'}>
            <header className={'canvas__header'}>Canvas</header>
            <article
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                className={'canvas__workspace'}></article>
        </section>);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setIsDrag}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasSection);