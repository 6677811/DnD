const initialState = {
    isDrag: false,
    figures: [],
    figureType: null,
    mousePosition: {left: 0, top: 0},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_DRAG':
            return {
                ...state,
                isDrag: action.payload,
            };
        case 'ADD_FIGURE':
            return {
                ...state,
                figures: action.payload,
            };
        case 'SET_TYPE':
            return {
                ...state,
                figureType: action.payload,
            };
        case 'SET_MOUSE_POSITION':
            return {
                ...state,
                mousePosition: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;