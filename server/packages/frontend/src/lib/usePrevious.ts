import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
    const ref = useRef<T>(undefined);

    useEffect(() => {
        ref.current = state;
    });

    return ref.current;
}