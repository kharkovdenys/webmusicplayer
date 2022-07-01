import { DurationProps } from "./Duration.props";

const format = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
};

const pad = (string: number): string => {
    return ("0" + string).slice(-2);
};

export const Duration = ({ className, seconds, ...props }: DurationProps): JSX.Element => {
    return <time className={className} {...props} dateTime={`P${Math.round(seconds)}S`} >{format(seconds)}</time>;
};