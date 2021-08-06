import React, { useEffect, useRef } from 'react';
import FigureSection from '../FiguresSection';
import CanvasSection from '../CanvasSection';
import { bindActionCreators } from 'redux';
import { setFigures, setFigureType, setIsDrag, setMousePosition } from '../../actions';
import { connect } from 'react-redux';
import { figureTypes } from '../constants';
import Storage from '../../storage';
import './Workspace.css';

const Workspace = ({
                       setIsDrag,
                       isDrag,
                       mousePosition,
                       setMousePosition,
                       figures,
                       setFigures,
                       figureType,
                       setFigureType
                   }) => {

    useEffect(() => {
        window.addEventListener('mouseup', mouseUpHandler);

        return () => {
            window.removeEventListener('mouseup', mouseUpHandler);
        };
    });
    useEffect(() => {
        Storage.load(setFigures);
    }, []);
    const canvasRef = useRef(null);
    const mouseUpHandler = (e) => {
        const {left, top, right, bottom} = canvasRef.current.getBoundingClientRect();

        if (isDrag && figureType
            && e.clientX > left
            && e.clientX < right
            && e.clientY > top
            && e.clientY < bottom) {
            const newFigures = [...figures, {
                id: figures.length,
                type: figureType,
                x: e.clientX - left - (figureType === figureTypes.CIRCLE ? 0 : 50),
                y: e.clientY - top - (figureType === figureTypes.CIRCLE ? 0 : 50),
                fill: figureType === figureTypes.CIRCLE ? '#FF6347FF' : '#3f7215',
                stroke: figureType === figureTypes.CIRCLE ? '#d7472d' : '#27480d',
                width: 95,
                border: 5,
                height: 95,
                isDragging: false,
                isShow: true,
            }]
            setFigures(newFigures);
            Storage.add(newFigures);
        }
        setFigureType(null);
        setIsDrag(false);
    };
    const mouseMoveHandler = (e) => {
        if (isDrag) {
            const {left, top} = canvasRef.current?.getBoundingClientRect();
            setMousePosition({
                left: e.clientX - left + 175,
                top: e.clientY - top,
            });
        } else {
            setIsDrag(false);
        }
    };
    const mouseDownHandler = (type) => (e) => {
        if (type) {
            const {left, top} = canvasRef.current?.getBoundingClientRect();
            setMousePosition({
                left: e.clientX - left + 175,
                top: e.clientY - top,
            });
            setFigureType(type);
            setIsDrag(true);
        }
    }

    return (
        <section className={'workspace'}
                 onMouseMove={mouseMoveHandler}
        >
            <FigureSection mouseDown={mouseDownHandler}/>
            <CanvasSection ref={canvasRef}/>
            <div
                className={figureType?.toLowerCase()}
                draggable={false}
                // style={styles}/>
                style={{
                    display: `${figureType ? 'block' : 'none'}`,
                    position: 'absolute',
                    zIndex: 1,
                    left: mousePosition.left,
                    top: mousePosition.top
                }}/>
        </section>
    );
};
const mapStateToProps = ({isDrag, figureType, figures, mousePosition}) => ({
    isDrag,
    figureType,
    figures,
    mousePosition
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setIsDrag, setFigureType, setFigures, setMousePosition}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
