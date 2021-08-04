import React from 'react';
import './Menu.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

const Menu = ({selectedFigure, figures, setFigures}) => {
    const deleteFigure = () => {
            const newFigures = figures
                .filter((figure) => figure.id !== selectedFigure.id)
                .map((figure, idx) => {
                    figure.id = `added_${idx}`;
                    return figure;
                });
            setFigures(newFigures);
    };

    return (<nav className={'menu'}>
        <button>Import</button>
        <button>Export</button>
        <button onClick={deleteFigure}>Delete</button>
    </nav>);
};
const mapStateToProps = ({selectedFigure, figures}) => ({selectedFigure, figures});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
