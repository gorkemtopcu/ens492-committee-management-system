import React from 'react';

const Header = ({ title }) => {
    return (
        <header style={{ paddingBottom: '20px' }}>
            <h1>{title}</h1>
        </header>
    );
};

export default Header;
