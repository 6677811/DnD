import React, { useEffect, useState } from 'react';
import { setFigures, setFigureType, setIsDrag, setMousePosition } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { figureTypes } from '../constants';
import Storage from '../../storage';
import './Canvas.css';

const Canvas = (_, canvasRef) => {
    const {figures, isDrag, figureType} = useSelector(state => state);
    const dispatch = useDispatch();
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const ctx = canvasRef.current?.getContext('2d');
    const BB = canvasRef.current?.getBoundingClientRect();
    const offsetX = BB?.left;
    const offsetY = BB?.top;
    const WIDTH = canvasRef.current?.width;
    const HEIGHT = canvasRef.current?.height;
    useEffect(() => {
        if (ctx) {
            draw();
        }
    }, [figures]);
    const clear = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    const rect = (r) => {
        const {x, y, width, height, border, isShow} = r;
        ctx.beginPath();
        ctx.lineWidth = isShow ? border : 0;
        ctx.globalAlpha = isShow ? 1 : 0;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    const arc = (r) => {
        const {x, y, width, border, isShow} = r;
        ctx.beginPath();
        ctx.lineWidth = isShow ? border : 0;
        ctx.globalAlpha = isShow ? 1 : 0;
        ctx.arc(x, y, width / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    const draw = () => {
        clear();
        ctx.fillStyle = '#fff';
        for (let i = 0; i < figures.length; i++) {
            const r = figures[i];
            if (i === figures.length - 1) {
                r.border = 10;
            } else {
                r.border = 5;
            }
            ctx.fillStyle = r.fill;
            ctx.strokeStyle = r.stroke;
            figures[i].type === figureTypes.SQUARE ? rect(r) : arc(r);
        }
    }
    const checkPosition = (figure, mx, my) => {
        if (figure.type === figureTypes.CIRCLE) {
            mx += 50;
            my += 50;
            return mx > figure.x && mx < figure.x + figure.width && my > figure.y && my < figure.y + figure.height
        }
        return mx > figure.x && mx < figure.x + figure.width && my > figure.y && my < figure.y + figure.height;
    };
    const mouseDownCanvas = (e) => {
        const {left, top} = canvasRef.current.getBoundingClientRect();
        dispatch(setMousePosition({left: e.clientX - left, top: e.clientY - top}));
        e.preventDefault();
        e.stopPropagation();
        const mx = parseInt(e.clientX - offsetX);
        const my = parseInt(e.clientY - offsetY);
        dispatch(setIsDrag(false));

        for (let i = 0; i < figures.length; i++) {
            const r = figures[i];
            if (checkPosition(r, mx, my)) {
                dispatch(setIsDrag(true));
                r.isDragging = true;
                const index = figures.findIndex((figure) => figure.id === r.id);
                const newFigures = [
                    ...figures.slice(0, index),
                    ...figures.slice(index + 1),
                    r,
                ];
                dispatch(setFigures(newFigures));
                dispatch(setFigureType(null));
                break;
            }
        }

        setStartX(mx);
        setStartY(my);
    }
    const mouseUpCanvas = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setIsDrag(false));

        for (let i = 0; i < figures.length; i++) {
            figures[i].isDragging = false;
        }
        Storage.add(figures);
    }
    const mouseShowHideMoveCanvas = (e, isShow) => {
        if (isDrag) {
            e.preventDefault();
            e.stopPropagation();
            if (!figureType) {
                const mx = parseInt(e.clientX - offsetX);
                const my = parseInt(e.clientY - offsetY);
                const dx = mx - startX;
                const dy = my - startY;

                if (!isShow) {
                    const current = figures[figures.length - 1];
                    dispatch(setFigures(figures.slice(0, -1)));
                    Storage.add(figures.slice(0, -1));
                    dispatch(setFigureType(current.type));
                }

                for (let i = 0; i < figures.length; i++) {
                    const r = figures[i];
                    if (r.isDragging) {
                        r.x += dx;
                        r.y += dy;
                        r.isShow = isShow;
                    }
                }

                draw();
                setStartX(mx);
                setStartY(my);
            }
        }
    }

    return (
        <canvas
            onMouseLeave={(e) => mouseShowHideMoveCanvas(e, false)}
            onMouseDown={mouseDownCanvas}
            onMouseUp={mouseUpCanvas}
            onMouseMove={(e) => mouseShowHideMoveCanvas(e, true)}
            onMouseOver={(e) => mouseShowHideMoveCanvas(e, true)}
            className={'canvas__workspace'}
            ref={canvasRef}
            width="1000" height="500">
        </canvas>);
};

export default React.forwardRef(Canvas);
