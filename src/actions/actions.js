export const setIsDrag = (isDrag) => {
    return {
        type: 'IS_DRAG',
        payload: isDrag,
    };
};
export const setFigures = (figures) => {
    return {
        type: 'ADD_FIGURE',
        payload: figures,
    };
};
export const setFigureType = (type) => {
    return {
        type: 'SET_TYPE',
        payload: type,
    };
};
export const setMousePosition = (position) => {
    return {
        type: 'SET_MOUSE_POSITION',
        payload: position,
    };
};
