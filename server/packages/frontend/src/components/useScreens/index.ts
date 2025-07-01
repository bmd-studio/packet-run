import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ScreenCallback = (({ increment, decrement, setIndex }: { increment: () => void, decrement: () => void, setIndex: (index: number) => void }) => React.JSX.Element[]);

/**
 * @param screens The screens to navigate through.
 * @returns The current screen number, a function to increment the screen number, and a function to decrement the screen number.
 */
export default function useScreens(props: { 
    screens: React.JSX.Element[] | ScreenCallback,
    isInInputScreen?: boolean | ((index: number) => boolean),
} ) {
    const { screens: baseScreens, isInInputScreen: baseIsInInputScreen } = props;
    const [index, setIndex] = useState(0);
    const screensRef = useRef<React.JSX.Element[]>([]);

    // Determine if the current screen is an input screen
    const isInInputScreen = useMemo(() => {
        return typeof baseIsInInputScreen === 'function'
            ? baseIsInInputScreen(index)
            : baseIsInInputScreen;
    }, [baseIsInInputScreen, index]);

    // Increment the screen number
    const increment = useCallback(() => {
        setIndex((previous) => (
            Math.min(previous + 1, screensRef.current.length - 1)
        ));
    }, []);

    // Decrement the screen number
    const decrement = useCallback(() => {   
        setIndex((previous) => Math.max(previous - 1, 0));
    }, []);

    const screens = useMemo(() => {
        return typeof baseScreens === 'function'
            ? baseScreens({ increment, decrement, setIndex })
            : baseScreens;
    }, [baseScreens, increment, decrement]);

    // Resolve the screens
    useEffect(() => {
        screensRef.current = screens;
    }, [screens, increment, decrement]);
    
    // Handle key up events
    useEffect(() => {
        function handleKeyUp(e: KeyboardEvent) {
            if (!isInInputScreen) {
                switch (e.key) {
                    case 'ArrowRight':
                    case 'd':
                    case 'Enter':
                        increment();
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        decrement();
                        break;
                    case 'Escape':
                        setIndex(0);
                        break;
                }
            } else {
                switch (e.key) {
                    case 'Escape':
                        setIndex(0);
                        break;
                }
            }
        }
        document.addEventListener('keyup', handleKeyUp);

        return () => document.removeEventListener('keyup', handleKeyUp);
    }, [
        isInInputScreen,
        decrement,
        increment,
    ]);

    return { index, increment, decrement, screens, screen: screens[index] };
}