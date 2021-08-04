import React, {useState} from 'react';
import './Menu.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import styled from 'styled-components';

const Import = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;`;

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
    const importFigures = (e) => {
        console.log(e.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const arrayStrings = Array.from(JSON.parse(e.target.result));
            setFigures(arrayStrings.map((item) => JSON.parse(item)));
        };
    };
    const exportFigures = () => {
        const arrayStrings = figures.map((item) => {
            return JSON.stringify(item);
        });
        const result = [`${JSON.stringify(arrayStrings).replace('}{', '},{')}`];
        const element = document.createElement('a');
        const file = new Blob(result, {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'export.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (<nav className={'menu'}>
        <Import type={'file'} name={'file'} onChange={importFigures}/>
        <button onClick={exportFigures}>Export</button>
        <button onClick={deleteFigure}>Delete</button>
    </nav>);
};
const mapStateToProps = ({selectedFigure, figures}) => ({selectedFigure, figures});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
