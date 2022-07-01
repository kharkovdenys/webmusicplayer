import { DetailedHTMLProps, TimeHTMLAttributes } from 'react';

export interface DurationProps extends DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement> {
    seconds: number;
}