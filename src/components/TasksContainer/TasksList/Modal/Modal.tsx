import { CloseIcon } from '../../../icons';
import { Button } from '../../../ui-kit/Button';
import styles from './modal.module.scss';

interface IModalProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
}

export function Modal({ onConfirm, onCancel, onClose }: IModalProps) {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <p className={styles.title}>Удалить задачу?</p>
                <div className={styles.confirm}>
                    <Button theme="red" onClick={onConfirm}>
                        Удалить
                    </Button>
                </div>
                <div className={styles.cancel} onClick={onCancel}>
                    Отмена
                </div>
                <div className={styles.close} onClick={onClose}>
                    <CloseIcon />
                </div>
            </div>
        </div>
    )
}