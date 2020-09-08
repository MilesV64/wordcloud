import React, { useEffect, useRef } from 'react';
import Wordcloud from 'wordcloud';

const WordCloudCanvas = ({
    words, maxSize, className
}: {
    words: [[]], maxSize: number, className: string
}) => {

    const canvas = useRef(null);
    const parent = useRef(null)

    useEffect(() => {

        canvas.current.width = parent.current.offsetWidth*2;
        canvas.current.height = parent.current.offsetHeight*2;

        Wordcloud(
            canvas.current,
            {
                list: words,
                weightFactor: (size) => {
                    return parent.current.offsetHeight * (size/maxSize);
                }
            }
        );
    });

    return (
        <div className={className} ref={parent}>
            <canvas style={{'width':'99%', 'height':'99%', 'borderRadius':'12px'}} ref={canvas}></canvas>
        </div>
    );
};

export default WordCloudCanvas;