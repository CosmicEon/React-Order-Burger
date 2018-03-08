import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';

const layout = (props) => {
    return (
        <Auxiliary>
            <div>Toolbar, Sidebar, Backdrop</div>
            <main className="Content">
                {props.children}
            </main>
        </Auxiliary>
    );
}

export default layout;
