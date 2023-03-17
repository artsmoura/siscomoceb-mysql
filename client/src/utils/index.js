import { useEffect, useState } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export function useOutsideClick(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

export const adjustDate = (d, type) => {
    const date = new Date(d);

    if (type === 'dte_nascimento') {
        return `${date.getFullYear()}-${((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))}-${(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())}`;
    } else {
        return `${date.getFullYear()}-${((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))}-${(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())}T${(date.getHours() < 10 ? '0' : 0) + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
    }

};