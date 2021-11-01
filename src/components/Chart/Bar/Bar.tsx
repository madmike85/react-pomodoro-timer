import classNames from 'classnames';
import styles from './bar.module.scss';

interface IBarProps {
    width: number;
    height: number;
    isActive?: boolean;
}

export function Bar({ width, height, isActive = false }: IBarProps) {
    const barStyle = {
        width: `${width}px`,
        height: height > 0 ? `${height}px` : '5px'
    }

    const barClasses = classNames(
        { [styles.bar]: height !== 0 },
        { [styles.empty]: height === 0 },
        { [styles.active]: isActive && height !== 0 }
    )

    return (
        <div className={styles.container}>
            <div className={barClasses} style={barStyle}>
            </div>
        </div>
    )
}