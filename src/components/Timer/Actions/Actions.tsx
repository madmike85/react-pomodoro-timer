import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ActionsEnum } from '../../../enums/actions.enum';
import { setActonName } from '../../../helpers/common-helpers';
import { TaskInterface } from '../../../interfaces/task.interface';
import { RootState } from '../../../store/store';
import { Button } from '../../ui-kit/Button';
import styles from './actions.module.scss';

interface IActionsProps {
    isBreak: boolean;
    setDefault?: boolean;
    onStart?: () => void;
    onStop?: () => void;
    onPause?: () => void;
    onContinue?: () => void;
    onSkip?: () => void;
    onComplete?: () => void;
}

const NOOP = () => { };

export function Actions({
    isBreak,
    setDefault = false,
    onStart = NOOP,
    onStop = NOOP,
    onPause = NOOP,
    onContinue = NOOP,
    onSkip = NOOP,
    onComplete = NOOP,
}: IActionsProps) {

    const tasks = useSelector<RootState, TaskInterface[]>(state => state.tasks);
    const [rightButtonAction, setRightButtonAction] = useState(isBreak ? ActionsEnum.skip : ActionsEnum.stop);
    const [leftButtonAction, setLeftButtonAction] = useState(ActionsEnum.start);

    useEffect(() => {
        setRightButtonAction(isBreak ? ActionsEnum.skip : ActionsEnum.stop);
        setLeftButtonAction(ActionsEnum.start)
    }, [isBreak]);

    useEffect(() => {
        if (setDefault) {
            setRightButtonAction(ActionsEnum.stop);
            setLeftButtonAction(ActionsEnum.start)
        }
    }, [setDefault])

    const onLeftButtonClick = () => {
        if (tasks.length === 0) {
            return;
        }

        switch (leftButtonAction) {
            case ActionsEnum.start:
                onStart();
                setLeftButtonAction(ActionsEnum.pause);
                break;
            case ActionsEnum.pause:
                onPause();
                setLeftButtonAction(ActionsEnum.continue);
                if (!isBreak) {
                    setRightButtonAction(ActionsEnum.complete);
                }
                break;
            case ActionsEnum.continue:
                onContinue();
                setLeftButtonAction(ActionsEnum.pause);
                setRightButtonAction(isBreak ? ActionsEnum.skip : ActionsEnum.stop);
                break;
            default:
                break;

        }
    }

    const onRightButtonClick = () => {
        if (tasks.length === 0) {
            return;
        }

        switch (rightButtonAction) {
            case ActionsEnum.stop:
                onStop();
                setLeftButtonAction(ActionsEnum.start);
                break;
            case ActionsEnum.complete:
                onComplete();
                setLeftButtonAction(ActionsEnum.start);
                setRightButtonAction(ActionsEnum.stop);
                break;
            case ActionsEnum.skip:
                onSkip();
                setLeftButtonAction(ActionsEnum.start);
                setRightButtonAction(ActionsEnum.stop);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Button onClick={() => onLeftButtonClick()}>
                    {setActonName(leftButtonAction)}
                </Button>
            </div>
            <div className={styles.right}>
                <Button theme='red' onClick={() => onRightButtonClick()}>
                    {setActonName(rightButtonAction)}
                </Button>
            </div>
        </div>
    )
}