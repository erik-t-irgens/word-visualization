import React from "react";
import Chart from '../SharedComponents/Chart';
import ErrorBlock from '../SharedComponents/ErrorBlock'
import SingleStatistic from '../SharedComponents/SingleStat';

const handleBuildComponent = (component) => {

    switch (component.type) {
        case 'line':
        case 'mark':
        case 'bar':
        case 'area':
        case 'linemark': {
            return (
                <Chart
                    apiUrl={component.apiUrl}
                    type={component.type}
                    data={component.data}
                    yAxis={component.yAxis || true}
                    xAxis={component.xAxis || true}
                    VGridLine={component.VGridLine || true}
                    HGridLine={component.HGridLine || true}
                    color={component.color}
                    color1={component.color1}
                    color2={component.color2}
                    visible='true' />
            )
        }
        case 'single-stat': {
            return (<SingleStatistic
                apiUrl={component.apiUrl}
                color={component.color}
                data={component.data} />);
        }
        default: {
            let error = `The component type of "${component.type}" is invalid.`
            return (<ErrorBlock inverted error={error} />);
        }
    }

}

export default handleBuildComponent;