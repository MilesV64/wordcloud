import React, { useEffect, useRef } from 'react';
import Wordcloud from 'wordcloud';

const WordCloudCanvas = ({
    words, maxSize, className
}: {
    words: [[]], maxSize: number, className: string
}) => {

    const canvas = useRef(null);
    const parent = useRef(null)

    const handleResize = () => {
        canvas.current.width = parent.current.offsetWidth*2;
        canvas.current.height = parent.current.offsetHeight*2;

        canvas.current.style.width = parent.current.offsetWidth + "px";
        canvas.current.style.height = parent.current.offsetHeight + "px";

        Wordcloud(
            canvas.current,
            {
                list: words,
                weightFactor: (size: number) => {
                    return parent.current.offsetWidth/2 * (size/maxSize);
                }
            }
        );
    }

    useEffect(() => {

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    });

    return (
        <div className={className} ref={parent}>
            <canvas style={{'borderRadius':'12px', 'padding': '10px'}} ref={canvas}></canvas>
        </div>
    );
};

export default WordCloudCanvas;