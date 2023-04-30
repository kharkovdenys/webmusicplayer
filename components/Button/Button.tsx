import clsx from 'clsx';

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

export const Button = ({ className, children, variant, ...props }: ButtonProps): JSX.Element => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    return (
        <button
            className={clsx(className, variant && styles[variant], styles.button)}
            onKeyDown={handleKeyDown} {...props}>
            {children}
        </button>
    );
};
