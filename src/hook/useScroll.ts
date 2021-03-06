import { useState, useEffect } from "react";

export type Scroll = {
    height: number;
    scrollLeft: number;
    scrollTop: number;
    width: number;
};

export default (
    ref: React.MutableRefObject<HTMLDivElement>,
    scrollLeft?: number,
    scrollTop?: number
) => {
    const [value, setValue] = useState<Scroll>({
        height: 0,
        scrollLeft: 0,
        scrollTop: 0,
        width: 0,
    });

    useEffect(() => {
        const scroll = ref.current;
        if (!scroll) {
            return;
        }

        if (scrollTop) {
            scroll.scrollTop = scrollTop;
        }
    }, [ref, scrollTop]);

    useEffect(() => {
        const scroll = ref.current;
        if (!scroll) {
            return;
        }

        if (scrollLeft) {
            scroll.scrollLeft = scrollLeft;
        }
    }, [ref, scrollLeft]);

    useEffect(() => {
        const scroll = ref.current;
        if (!scroll) {
            return;
        }

        setValue({
            height: scroll.offsetHeight,
            scrollLeft: scroll.scrollLeft,
            scrollTop: scroll.scrollTop,
            width: scroll.offsetWidth,
        });

        const onScroll = () => {
            requestAnimationFrame(() => {
                setValue({
                    height: scroll.offsetHeight,
                    scrollLeft: scroll.scrollLeft,
                    scrollTop: scroll.scrollTop,
                    width: scroll.offsetWidth,
                });
            });
        };

        scroll.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);

        return () => {
            scroll.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [ref]);

    return value;
};
