import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

interface IButtonProps {
    theme?: 'green' | 'red';
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export function Button({ theme = 'green', children, disabled = false, onClick = () => { } }: IButtonProps) {
    const classes = classNames(
        styles.button,
        styles[theme],
        { [styles.disabled]: disabled },
    )

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}