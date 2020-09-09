import React, { useRef, useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

const getStyles = () => {

    return {
        title: {
            fill: "#2d3748",
            fontFamily: "inherit",
            fontSize: "18px",
            fontWeight: "bold"
        },
        bars: { 
            data: { fill: "#6789FA" } 
        },
        axis: {
            axis: { stroke: "#E3ECF4", strokeWidth: 1},
            tickLabels: {
              fill: "#718096",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: "500"
            }
        }
    }

}

const CompletionsChart = ({
    className
}: {
    className: string
}) => {

    const parent = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const styles = getStyles()

    const updateWidth = (ev) => {
        setWidth(parent.current.offsetWidth);
        setHeight(parent.current.offsetHeight);
    }

    const data = [];
    for(let i = 0; i<30; i++) {
        data.push({
            day: i+1, completions: (30 * Math.random())
        })
    }
    
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        updateWidth(null);

        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    })

    return (
        <div className={className} ref={parent}>
            <VictoryChart domainPadding={20} width={width} height={height} >
                <VictoryLabel style={styles.title} x={20} y={26} text="Completions per day" />

                <VictoryAxis 
                    style={styles.axis} 
                    scale="time"
                    tickFormat={(t) => "Day " + t}/>

                <VictoryAxis dependentAxis style={styles.axis} scale="time"/>

                <VictoryBar 
                    style={styles.bars} 
                    data={data} x='day' y='completions' 
                    barRatio={1}
                    cornerRadius={2}/>
            </VictoryChart>
            
        </div>
    )

}
export default CompletionsChart;