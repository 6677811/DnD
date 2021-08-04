import React from 'react';
import './CanvasSection.css';

const setActiveFigure = (e) => {
    e.stopPropagation();
    document
        .querySelectorAll('.active-figure')
        .forEach((figure) => {
            figure.classList.remove('active-figure');
        });
    e.target.classList.add('active-figure');
    console.log('click');
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
            nodeCopy.addEventListener('dragstart', dragstartHandler)
            nodeCopy.addEventListener('mousedown', setActiveFigure)
            nodeCopy.id = `added_${canvas.childElementCount}`;
            nodeCopy.style.left = e.clientX - left - 73 + 'px';
            nodeCopy.style.top = e.clientY - top - 73 + 'px';
            canvas.appendChild(nodeCopy);
        } else {
            const id = e.dataTransfer.getData('id');
            const current = document.getElementById(id);
            current.style.left = e.clientX - left - 73 + 'px';
            current.style.top = e.clientY - top - 73 + 'px';
        }
    };
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('id', e.target.id);
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

export default CanvasSection;