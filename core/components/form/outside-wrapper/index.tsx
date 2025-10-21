'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';

type Props = PropsWithChildren<{
    operator: () => void;
}>;

export const OutsideWrapper: React.FC<Props> = ({ children, operator }) => {
    const wrapperRef = useRef<HTMLDivElement | EventTarget | null | any>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                operator && operator();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, operator]);

    return <div ref={wrapperRef}>{children}</div>;
};
