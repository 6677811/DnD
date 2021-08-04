import React from 'react';
import FigureSection from '../FiguresSection';
import CanvasSection from '../CanvasSection';
import Menu from '../Menu';

const App = () => {
    return (
        <React.Fragment>
            <Menu/>
            <FigureSection/>
            <CanvasSection/>
        </React.Fragment>
    );
}

export default App;
