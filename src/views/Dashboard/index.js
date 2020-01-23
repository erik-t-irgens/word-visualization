import React, { Component } from 'react';
import Chart from '../../SharedComponents/Chart';

import {
    Grid, Dimmer, Loader, Segment
} from 'semantic-ui-react';
import { objectData } from './MockData';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';

import handleBuildComponent from "../../utilities/buildDashboardComponents";
import { Helmet } from "react-helmet/es/Helmet";

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            // Loading shows dummy component cards

            isLoading: true,

            // Used to generated an array with correct rows and columns with objects
            componentArray: [],

            // Right now this takes the literal call to MongoDB to retrieve the component objects
            realComponentObjectArray: [],

            // Dummy component objects array with mock data
            componentObjects: [
                {
                    type: 'mark',
                    name: 'Name of the data',
                    size: 8,
                    data: objectData.mockData1,
                    color1: '#8ae330',
                    color2: '#4caa1a',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },

                {
                    type: 'bar',
                    name: 'Name of the data',
                    size: 8,
                    data: objectData.mockData2,
                    color1: '#8ae330',
                    color2: '#4caa1a',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'area',
                    name: 'Name of the data',
                    size: 8,
                    data: objectData.mockData3,
                    color1: '#c10f7c',
                    color2: '#e2107f',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'area',
                    name: 'S3 Bucket Size',
                    size: 8,
                    color1: '#f8b000',
                    color2: '#e87721',
                    apiUrl: 'db/getCWS3BucketSize',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,

                },
                {
                    type: 'line',
                    name: 'S3 Bucket Size',
                    size: 8,
                    color1: '#f8b000',
                    color2: '#e87721',
                    apiUrl: 'db/getCWS3BucketSize',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,

                },
                {
                    type: 'mark',
                    name: 'S3 Bucket Size',
                    size: 8,
                    color1: '#f8b000',
                    color2: '#e87721',
                    apiUrl: 'db/getCWS3BucketSize',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,

                },
                {
                    type: 'bar',
                    name: 'S3 Bucket Size',
                    size: 8,
                    color1: '#f8b000',
                    color2: '#e87721',
                    apiUrl: 'db/getCWS3BucketSize',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,

                },


                // {
                //     type: 'single-stat',
                //     name: 'Pages Scraped',
                //     apiUrl: 'db/getPagesScraped',
                //     size: 8,
                //     color: 'teal',
                //     color1: 'blue',
                //     color2: '',
                // },

                // {
                //     type: 'single-stat',
                //     name: 'Total Pages Scraped',
                //     apiUrl: 'db/getPagesScraped',
                //     size: 8,

                // },





            ]

        };
    }

    handleBuildComponentArray = () => {
        // NOTE: This function needs to take some sort of object that contains information about what kind of components we want displayed. Perhaps an object that contains objects that are described by hand per company. Mock data that is above represents an idea of this.
        const { componentObjects } = this.state;
        const componentCount = componentObjects.length;
        let currentRow = 0;
        let currentRowWidth = 0;
        let componentArray = [[]];
        const newComponentObjects = Array.from(componentObjects);
        // TODO: Add a reducer function instead of the brute force for loop./
        for (let i = 0; i < componentCount; i++) {
            let currentObjectSize = newComponentObjects[i].size;
            if (currentRowWidth + currentObjectSize <= 16) {
                currentRowWidth += currentObjectSize;
                componentArray[currentRow].push(newComponentObjects[i]);
            } else {
                // NOTE: Below adds a row_width object to the current row's array, just in case we add sizes that make rows not always be 16 wide. Then, we can check for that row_width object, and add the difference between 16 and row_width to the previous component's width.
                // componentArray[currentRow].push({ row_width: currentRowWidth });
                componentArray.push([]);
                // Find the previous row's width
                const reducer = (accumulator, currentValue) => accumulator + currentValue.size;
                const prevRowWidth = componentArray[currentRow].reduce(reducer, 0)
                // Fix the rightmost component width to fill the remainder if the total width is less than 16
                if (prevRowWidth < 16) {

                    componentArray[currentRow][componentArray[currentRow].length - 1].size = (16 - prevRowWidth) + componentArray[currentRow][componentArray[currentRow].length - 1].size;
                }
                currentRow++;
                currentRowWidth = 0;
                currentRowWidth += currentObjectSize;
                componentArray[currentRow].push(newComponentObjects[i]);
            }
        }
        // Catches if the last row has a total component width less than 16, and corrects it.
        if (currentRowWidth < 16) {
            componentArray[currentRow][componentArray[currentRow].length - 1].size = (16 - currentRowWidth) + componentArray[currentRow][componentArray[currentRow].length - 1].size;
        }

        this.setState({ componentArray: componentArray });
    }

    handleBuildDashboardComponentLayout = () => {

        if (this.state.componentArray.length <= 1) {
            this.handleBuildComponentArray();
        }
        // In case we need to set state
        const newComponentArray = Array.from(this.state.componentArray);

        // To update the width of the chart component
        return newComponentArray.map((row, i) => (
            <Grid.Row key={i} className={'dashboard'}>
                {row.map((component, index) => (
                    <Grid.Column key={index} width={component.size || null}>
                        <ComponentWrapper type={component.type} title={component.name} card>

                            {handleBuildComponent(component)}

                        </ComponentWrapper>
                    </Grid.Column>
                ))}
            </Grid.Row>
        ))
    }


    handleLoadingSegmentCreation = () => {


        let loadingArray = [];
        for (let i = 0; i < 10; i++) {
            loadingArray.push(i)
        }

        return loadingArray.map((i, j) => (

            <Grid.Row id={i} key={i}>
                <Grid.Column id={j} width={8} >
                    <Segment inverted style={{ backgroundColor: '#242424', textAlign: 'center', height: '380px' }}>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={8} >
                    <Segment inverted style={{ backgroundColor: '#242424', textAlign: 'center', height: '380px' }}>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        ))
    }

    async componentDidMount() {
        document.body.style.backgroundColor = "#1c1c1c";
        this.setState({ isLoading: true })

        console.log('components retrieved in Dashboard: ');
        this.setState({
            isLoading: false,
        });
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "#fff";
    }


    // TODO: Implement "easy sizing buttons" for the individual grids. That way, you can pass a size prop down through the child of the grid and it would be determined by the "importance" of that element. So, if you selected "large" from a dropdown, the column would become width{16} and the child below it would size to the correct width alongside it. 

    render() {
        return (
            <>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <Grid stackable centered>
                    {this.state.isLoading ?
                        this.handleLoadingSegmentCreation()
                        :
                        this.handleBuildDashboardComponentLayout()}

                </Grid>
            </ >
        )
    }
}

export default DashboardComponent;