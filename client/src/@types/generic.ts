import { SetStateAction, Dispatch } from 'react';

export type ComponentHandler<T> = Dispatch<SetStateAction<T>>;
export type Color = 'success' | 'info' | 'warning' | 'error';
