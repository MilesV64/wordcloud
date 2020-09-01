import React, { useEffect, useRef } from 'react';
import Wordcloud from 'wordcloud';

const WordCloudCanvas = ({
    words, maxSize
}: {
    words: [[]], maxSize: number
}) => {

    const canvas = useRef(null);

    console.log(words);

    useEffect(() => {
        Wordcloud(
            canvas.current,
            {
                list: words,
                weightFactor: (size) => {
                    return 300 * (size/maxSize);
                }
            }
        );
    });

    return (
        <canvas style={{width: 500, height: 500}} width="1000" height="1000" ref={canvas}></canvas>
    );
};

export default WordCloudCanvas;