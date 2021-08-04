const initialState = {
    isDrag: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_DRAG':
            return {
                ...state,
                isDrag: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;