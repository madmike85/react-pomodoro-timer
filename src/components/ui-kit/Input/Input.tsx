import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import styles from './input.module.scss';

interface IInputProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export function Input({ placeholder = '', value = '', onChange }: IInputProps) {
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value])

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.currentTarget.value);
        if (onChange) {
            onChange(event.currentTarget.value);
        }
    }

    return (
        <input
            className={styles.input}
            placeholder={placeholder}
            value={currentValue}
            onChange={onValueChange}
        />
    )
}