import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFigures } from '../../actions';
import './Menu.css';
import Storage from '../../storage';

const Menu = ({figures, setFigures}) => {
    const deleteFigure = () => {
        const newFigures = figures
            .filter((figure) => figure.border !== 10)
            .map((figure) => figure);
        setFigures(newFigures);
        Storage.add(newFigures);
    };
    const importFigures = (e) => {
        const fileReader = new FileReader();

        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (e) => {
            const arrayStrings = Array.from(JSON.parse(e.target.result));

            setFigures(arrayStrings.map((item) => JSON.parse(item)));
        };
    };
    const exportFigures = () => {
        if (figures.length) {
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
        }
    };

    return (<nav className={'menu'}>
        <input className={'import-file'} type={'file'} name={'file'} onChange={importFigures}/>
        <button onClick={exportFigures}>Export</button>
        <button onClick={deleteFigure}>Delete</button>
    </nav>);
};
const mapStateToProps = ({figures}) => ({figures});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setFigures}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
