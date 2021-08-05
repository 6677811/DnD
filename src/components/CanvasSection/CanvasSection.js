import React, { useEffect, useState } from 'react';
import './CanvasSection.css';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Storage from '../../storage';
import { useBeforeunload } from 'react-beforeunload';

const CanvasSection = ({isDrag, figures, selectedFigure, setIsDrag, selectFigure, setFigures}) => {
    const [canvasData, setCanvasData] = useState(null);
    useEffect(() => {
        const canvas = document.querySelector('.canvas__workspace');
        setCanvasData(canvas.getBoundingClientRect());
        loadFromDB();
    }, [])
    useBeforeunload(async (event) => {
        saveToStorage();
        event.preventDefault();
    });
    const loadFromDB = () => {
        const req = Storage.openDB();

        req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('figures', 'readwrite');
            const allFigures = transaction.objectStore('figures');

            const request = allFigures.openCursor();

            const data = [];
            request.onsuccess = () => {
                const cursor = request.result;

                if (cursor) {
                    const { value } = cursor;

                    data.push(value);
                    cursor.continue();
                } else {
                    setFigures(data);
                }
                return cursor;
            };
        };

        req.onerror = ({ target }) => {
            console.log(`error opening database ${target.errorCode}`);
        };
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
    };
    const mouseLeaveHandler = (e) => {
        if (isDrag && selectedFigure) {
            if (e.clientX > canvasData.right
                || e.clientX < canvasData.left
                || e.clientY < canvasData.top
                || e.clientY > canvasData.bottom) {
                const {id, className} = selectedFigure;
                updateFigures(id, className, e.clientX, e.clientY, false);
            }
        }
    };
    const removeActivesFigures = () => {
        figures.forEach((figure) => {
            figure.className = figure.className.replace('active-figure', '').trim();
        });
        setFigures(figures);
    }
    const updateFigures = (id, className, left, top, isShow) => {
        removeActivesFigures();
        const updateFigure = {
            id,
            className: className?.includes('active-figure') ? className : className?.concat(' active-figure'),
            left: left - 70 - canvasData.left,
            top: top - 70 - canvasData.top,
            isShow,
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
    const saveToStorage = () => {
        Storage.add(figures);
    }
    const mouseDownFigure = (e) => {
        e.stopPropagation();
        setIsDrag(true);
        const {id, className} = e.target;
        updateFigures(id, className, e.clientX, e.clientY, true);
    }
    const mouseUpFigure = (e) => {
        e.stopPropagation();
        console.log('test');
    }
    const dropHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const data = e.dataTransfer.getData('id');
        if (data === 'circle' || data === 'rect') {
            removeActivesFigures();
            const newFigure = document.querySelector(`#${data}`);
            const id = `added_${figures.length}`;
            const node = {
                id,
                className: newFigure.className.concat(' active-figure'),
                left: e.clientX - 70 - canvasData.left,
                top: e.clientY - 70 - canvasData.top,
                isShow: true
            };

            setFigures([...figures, node]);
            selectFigure(node);
        } else {
            const {id, className} = selectedFigure;
            updateFigures(id, className, e.clientX, e.clientY, true);
        }
    };
    const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('id', e.target.id);
    };
    const dragendHandler = (e) => {
        if (!selectedFigure.isShow) {
            const newFigures = figures
                .filter((figure) => figure.id !== selectedFigure.id)
                .map((figure, idx) => {
                    figure.id = `added_${idx}`;
                    return figure;
                });
            setFigures(newFigures);
        }

        e.dataTransfer.clearData();
        setIsDrag(false);
    };

    return (
        <section className={'canvas'}>
            <header className={'canvas__header'}>Canvas</header>
            <article
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onMouseLeave={mouseLeaveHandler}
                onDragLeave={mouseLeaveHandler}
                className={'canvas__workspace'}>
                {figures.map(({id, className, left, top, isShow}) => {
                    return (
                        <div draggable={true}
                             key={id}
                             id={id}
                             style={{left: left + 'px', top: top + 'px', display: `${isShow ? 'flex' : 'none'}`}}
                             className={className}
                             onDragStart={dragstartHandler}
                             onDragEnd={dragendHandler}
                             onMouseDown={mouseDownFigure}
                             onMouseUp={mouseUpFigure}/>
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
