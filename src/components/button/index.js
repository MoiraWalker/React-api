import React from 'react';
import './index.css';

export const Button = ({children, type, className, onClick, ...rest}) => {
    return (
        <button type={type} className={className} onClick={onClick}>{children}</button>
    );
}

