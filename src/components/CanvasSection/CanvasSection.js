import React, { useEffect, useState } from 'react';
import './CanvasSection.css';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const CanvasSection = ({isDrag, figures, selectedFigure, setIsDrag, selectFigure, setFigures}) => {
    const [canvasData, setCanvasData] = useState(null);
    useEffect(() => {
        const canvas = document.querySelector('.canvas__workspace');
        const {left, top} = canvas?.getBoundingClientRect();
        setCanvasData({left, top})
    }, [])
    const dragOverHandler = (e) => {
        e.preventDefault();
    };
    const removeActivesFigures = () => {
        figures.forEach((figure) => {
            figure.className = figure.className.replace('active-figure', '').trim();
        });
        setFigures(figures);
    }
    const updateFigures = (id, className, left, top) => {
        removeActivesFigures();
        const updateFigure = {
            id,
            className: className.includes('active-figure') ? className : className.concat(' active-figure'),
            left: left - 70 - canvasData.left,
            top: top - 70 - canvasData.top,
        };
        const index = figures.findIndex((figure) => figure.id === id);
        const newFigures = [
            ...figures.slice(0, index),
            updateFigure,
            ...figures.slice(index + 1)
        ];
        setFigures(newFigures);
        selectFigure(updateFigure);
    };
    const setActiveFigure = (e) => {
        e.stopPropagation();
        const {id, className} = e.target;
        updateFigures(id, className, e.clientX, e.clientY);
    }
    const dropHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDrag(true);
        const data = e.dataTransfer.getData('id');
        if (data === 'circle' || data === 'rect') {
            removeActivesFigures();
            const newFigure = document.querySelector(`#${data}`);
            const id = `added_${figures.length}`;
            const node = Object.defineProperties(Object.create(null), {
                'id': {
                    value: id,
                    writable: true
                },
                'className': {
                    value: newFigure.className.concat(' active-figure'),
                    writable: true
                },
                'left': {
                    value: e.clientX - 70 - canvasData.left,
                    writable: true
                },
                'top': {
                    value: e.clientY - 70 - canvasData.top,
                    writable: true
                },
            });
            setFigures([...figures, node]);
            selectFigure(node);
        } else {
            const {id, className} = selectedFigure;
            updateFigures(id, className, e.clientX, e.clientY);
        }
        setIsDrag(false);
    };
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('id', e.target.id);
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
                className={'canvas__workspace'}>
                {figures.map(({id, className, left, top}) => {
                    return (
                        <div draggable={true}
                             key={id}
                             id={id}
                             style={{left: left + 'px', top: top + 'px'}}
                             className={className}
                             onDragStart={dragstartHandler}
                             onDragEnd={dragendHandler}
                             onMouseDown={setActiveFigure}/>
                    );
                })}
            </article>
        </section>);
};

const mapStateToProps = ({figures, selectedFigure, isDrag}) => ({figures, selectedFigure, isDrag});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasSection);