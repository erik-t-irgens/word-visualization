import React from 'react'
import {
    FlexibleXYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    YAxis,
    XAxis,
    VerticalBarSeries,
    MarkSeries,
    LineMarkSeries,
    Crosshair,
    AreaSeries,
    GradientDefs
} from 'react-vis'
import PropTypes from 'prop-types';
import { Statistic, Dimmer, Loader, Segment } from 'semantic-ui-react';

import { debounce } from 'lodash';


// NOTE: All data must be accepted as an object type with X and Y definitions for the data.

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            crosshairValues: [],
            yAxis: false,
            xAxis: false,
            VGridLine: false,
            HGridLine: false,
            size: 'scale(1.2)  translate(0px, 20px)',
            visibleSummary: true,
            opacity: .5,
            data: []

        }
    }

    componentDidMount = async () => {
        // Calls the data from provided apiUrl

        this.setState({ data: [{ x: 0, y: 0 }], isLoading: false })

        this.setState({ isLoading: false, gradientId: this.props.type + Math.floor(Math.random() * 1000) })
    }

    // This is inteded to prettify large numbers, especially file sizes numbers. It currently has some implementation, but needs a lot of iteration.


    // Shows in depth graph information
    _onMouseEnter = () => {
        this.setState({
            yAxis: true,
            xAxis: true,
            VGridLine: true,
            HGridLine: true,
            size: 'scale(1) translate(0px, 0px)',
            opacity: 1,
            visibleSummary: false
        })
    }

    // Shows information per column in graph.
    _onNearestX = debounce((value, { index }) => {

        if (this.state.VGridLine) {
            this.setState({ crosshairValues: [{ x: this.state.data[index].x, y: this.state.data[index].y }] })
        }
    }, 1);


    _onMouseLeave = () => {

        this.setState({
            crosshairValues: [],
            yAxis: false,
            xAxis: false,
            VGridLine: false,
            HGridLine: false,
            size: 'scale(1.2)  translate(0px, 20px)',
            opacity: .5,
            visibleSummary: true
        });
    };

    // Parses the information called from AWS metrics.
    handleParseJsonDataXY = (data) => {

        const responseObject = data;
        let dataArray = [];
        if (data.statusCode === 200 && responseObject.MetricDataResults[0].Timestamps.length > 0) {
            for (let i = 0; i < responseObject.MetricDataResults[0].Timestamps.length - 1; i++) {
                dataArray.push({ x: responseObject.MetricDataResults[0].Timestamps[i].substring(5, 10) + ', ' + responseObject.MetricDataResults[0].Timestamps[i].substring(11, 16), y: this.handleBytesToSize(responseObject.MetricDataResults[0].Values[i]) })
            }
        } else {
            dataArray.push({ x: 'No Data Available', y: "N/A" })
        }

        return dataArray;
    }


    render() {

        const { type, height, color1, color2 } = this.props;
        const { yAxis, xAxis, VGridLine, HGridLine, gradientId, size, visibleSummary, opacity, isLoading, data } = this.state;
        const colorProps = {
            color: `url(#${gradientId})`,
        }
        const commonSeriesProps = {
            color: `url(#${gradientId})`,
            onNearestX: this._onNearestX,
            animation: true,
            data: data,
            curve: 'curveMonotoneX'
        }


        return (
            !isLoading ?
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    {visibleSummary && !isLoading ?
                        <Statistic size='small' inverted style={{ zIndex: 1, position: 'absolute', textShadow: '5px 5px 5px #1c1c1c' }}>
                            <Statistic.Value>{typeof data[data.length - 1].y === 'number' ? Math.floor(data[data.length - 1].y) : data[data.length - 1].y}</Statistic.Value>
                            <Statistic.Label>{data[data.length - 1].x}</Statistic.Label>
                        </Statistic>
                        : null}

                    {data[0].x === 'No Data Available' ? <div style={{ height: 250 }}></div> :
                        <FlexibleXYPlot
                            xType="ordinal"
                            category height={height || 300}
                            onMouseLeave={this._onMouseLeave}
                            onMouseEnter={this._onMouseEnter}
                            style={{ transition: 'transform 100ms', transform: size, opacity: opacity }}
                            {...colorProps}
                        >


                            {color1 && color2 ? <GradientDefs>
                                <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
                                    <stop offset="0%" stopColor={color1} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={color2} stopOpacity={0.8} />
                                </linearGradient>
                            </GradientDefs>

                                : null}


                            {VGridLine ?
                                <VerticalGridLines style={{
                                    opacity: '.5',

                                }} />
                                : null
                            }
                            {HGridLine ?
                                <HorizontalGridLines style={{
                                    opacity: '.5',

                                }} />
                                : null
                            }
                            {xAxis ?
                                <XAxis title="Date and Time"
                                    position="middle"
                                    tickLabelAngle={-30}
                                    style={{
                                        line: { stroke: '#303030' },
                                        ticks: { stroke: '#303030' },
                                        text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 },
                                        title: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
                                    }} /> :
                                null}

                            {yAxis ?
                                <YAxis
                                    title="Replace this with something"
                                    tickLabelAngle={-30}
                                    position="middle"
                                    style={{
                                        line: { stroke: '#303030' },
                                        ticks: { stroke: '#303030' },
                                        text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 },
                                        title: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
                                    }} /> :
                                null}
                            {
                                type === 'bar' ?
                                    <VerticalBarSeries
                                        {...commonSeriesProps}
                                    /> :
                                    type === 'mark' ?
                                        <MarkSeries
                                            style={{ mark: { strokeWidth: 2 } }}
                                            {...commonSeriesProps}
                                        /> :
                                        type === 'line'
                                            ? <LineSeries
                                                style={{ strokeWidth: 4 }}

                                                {...colorProps}
                                                {...commonSeriesProps}
                                            /> :
                                            type === 'linemark' ?
                                                <LineMarkSeries
                                                    style={{ mark: { strokeWidth: 2 }, line: { strokeWidth: 8 } }}

                                                    {...colorProps}
                                                    {...commonSeriesProps}
                                                /> :
                                                type === 'area' ?
                                                    <AreaSeries
                                                        {...colorProps}
                                                        {...commonSeriesProps}

                                                        opacity={.8}

                                                    /> :
                                                    null
                            }
                            <Crosshair
                                values={this.state.crosshairValues}
                                className='test'

                            />
                        </FlexibleXYPlot>
                    }
                </div> :
                <div>
                    <Dimmer as={Segment} active={isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </div>
        )
    }
}

Chart.propTypes = {
    type: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    yAxis: PropTypes.bool,
    xAxis: PropTypes.bool,
    VGridLine: PropTypes.bool,
    HGridLine: PropTypes.bool,
    color: PropTypes.string,

}

export default Chart;