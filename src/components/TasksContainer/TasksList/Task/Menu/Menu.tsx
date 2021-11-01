import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MenuIcon, MinusRoundIcon, PencilIcon, PlusRoundIcon, TrashcanIcon } from '../../../../icons';
import styles from './menu.module.scss';

type MenuItemType = 'add' | 'subtract' | 'edit' | 'delete';

interface IMenuProps {
    count: number;
    onAdd?: () => void;
    onSubtract?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

interface IMenuItem {
    icon: React.ReactNode;
    title: string;
    type: MenuItemType;
}

const list: IMenuItem[] = [
    {
        icon: <PlusRoundIcon />,
        title: 'Увеличить',
        type: 'add'
    },
    {
        icon: <MinusRoundIcon />,
        title: 'Уменьшить',
        type: 'subtract',
    },
    {
        icon: <PencilIcon />,
        title: 'Редактировать',
        type: 'edit',
    },
    {
        icon: <TrashcanIcon />,
        title: 'Удалить',
        type: 'delete',
    }
]

const NOOP = () => { };

export function Menu({ count, onAdd = NOOP, onSubtract = NOOP, onEdit = NOOP, onDelete = NOOP }: IMenuProps) {
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

    const onItemClick = (type: MenuItemType) => {
        switch (type) {
            case 'add':
                onAdd();
                break;
            case 'subtract':
                if (count > 1) {
                    onSubtract();
                }
                break;
            case 'edit':
                onEdit();
                break;
            case 'delete':
                onDelete();
                break;
            default:
                break;
        }
        setIsOpen(false)
    }

    return (
        <div className={styles.menu} ref={ref}>
            <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </div>
            {isOpen && (
                <div className={styles.contentContainer}>
                    <ul className={styles.content}>
                        {list.map((item: IMenuItem) => {
                            return (
                                <li
                                    key={item.type}
                                    className={`${styles.item} ${count <= 1 && item.type === 'subtract' ? styles.disabled : ''}`}
                                    onClick={() => onItemClick(item.type)}
                                >
                                    <div className={styles.icon}>
                                        {item.icon}
                                    </div>
                                    <span className={styles.title}>
                                        {item.title}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}