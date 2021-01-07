import './index.css';

export const Button = ({children, type, className, onClick}) => {
    return (
        <button type={type} className={className} onClick={onClick}>{children}</button>
    );
}

