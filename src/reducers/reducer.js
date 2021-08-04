const initialState = {
    isDrag: false,
    selectedFigure: null,
    figures: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_DRAG':
            return {
                ...state,
                isDrag: action.payload,
            };
        case 'SELECTED_FIGURE':
            return {
                ...state,
                selectedFigure: action.payload,
            };
        case 'ADD_FIGURE':
            return {
                ...state,
                figures: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;