import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { SelectItemInterface } from '../../../interfaces/select-item.interface';
import { ArrowDownIcon } from '../../icons';
import styles from './select.module.scss';

interface ISelectProps {
    placeholder?: string;
    selectedItem?: SelectItemInterface;
    options?: SelectItemInterface[];
    onSelect?: (item: SelectItemInterface) => void;
}

export function Select({ placeholder, selectedItem, options, onSelect = () => { } }: ISelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handelClick = (event: MouseEvent) => {
            if (event.target instanceof Node && ref && !ref.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handelClick);

        return () => {
            document.removeEventListener('click', handelClick);
        }
    }, [ref]);

    const selectClasses = classNames(
        styles.select,
        { [styles.selectActive]: isOpen },
    )

    const iconClasses = classNames(
        styles.icon,
        { [styles.iconActive]: isOpen }
    )

    const onItemClick = (item: SelectItemInterface): void => {
        onSelect(item);
        setIsOpen(false);
    }

    return (
        <div className={selectClasses} ref={ref}>
            <div className={styles.input} onClick={() => setIsOpen(!isOpen)}>
                {!selectedItem && <p className={styles.placeholderText}>{placeholder}</p>}
                {selectedItem && <p className={styles.selectedItemText}>{selectedItem.title}</p>}
                <div className={iconClasses}>
                    <ArrowDownIcon />
                </div>
            </div>
            {options && isOpen && (
                <ul className={styles.dropdown}>
                    {options.filter((item) => item.value !== selectedItem?.value).map((item: SelectItemInterface, index: number) => (
                        <li key={index} className={styles.dropdownItem} onClick={() => onItemClick(item)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}