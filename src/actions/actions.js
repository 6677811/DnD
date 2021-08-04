export const setIsDrag = (isDrag) => {
    return {
        type: 'IS_DRAG',
        payload: isDrag,
    };
};
export const selectFigure = (figure) => {
    return {
        type: 'SELECTED_FIGURE',
        payload: figure,
    };
};
export const setFigures = (figures) => {
    return {
        type: 'ADD_FIGURE',
        payload: figures,
    };
};

