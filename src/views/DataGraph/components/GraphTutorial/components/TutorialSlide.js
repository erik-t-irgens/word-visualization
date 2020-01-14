import React from 'react';
import { Transition, Segment, Icon, Button } from "semantic-ui-react"


const handleBuildTutorialSlide = (pageNumber) => {
    let styling = { minWidth: '500px', color: 'white', textAlign: 'center' }
    let segmentStyling = { minHeight: '300px', textAlign: 'left', backgroundColor: '#242424', color: 'white' }
    switch (pageNumber) {
        case 0:
            return (
                <div style={styling} >
                    <h3>Overview</h3>

                    <Segment style={segmentStyling}>
                        <p>This graph provies an overview of all the data available to you.</p>
                        <p>There are three main data sources available.</p>
                        <ul>
                            <li>First Party</li>
                            <li>Second Party</li>
                            <li>Third Party</li>
                        </ul>

                        <p>First Party data is data that comes directly from you (such as Salesforce, or Zapier). </p>
                        <p>Second Party data comes from open source locations, such as municipal websites</p>
                        <p>Third Party data is what we provide you from our service.</p>
                    </Segment>
                </div>
            )
            break;
        case 1:
            return (
                <div style={styling} >
                    <h3>Viewing the Graph</h3>
                    <Segment style={segmentStyling}>
                        <p>What you see are nodes (points) connected by edges (lines). Each node represents data, and has metrics associated with them.</p>

                        <p>Zooming in further will allows for you to see the names of each node, as well as view some at-a-glance metrics on the edge connected to said node. </p>

                        <p>The data displayed on the edge is primarily the total size of the data pertaining to that node.</p>
                    </Segment>
                </div>
            )
            break;
        case 2:
            return (
                <div style={styling} >
                    <h3>Adding Nodes</h3>
                    <Segment style={segmentStyling}>
                        <p>Hovering over a node that can receive more nodes will display this symbol:  <Icon
                            inverted
                            color="green"
                            style={{
                                height: '10px',
                                width: '10px',
                                textShadow: "3px 3px 2px black",
                                opacity: 1,
                            }}
                            name='plus circle'>
                        </Icon> </p>

                        <p>Clicking this button will display a new modal, allowing you to choose from available node data sources from a drop down.</p>
                        <p>Clicking <Button size='mini' inverted >Show Advanced Options</Button> will allow you to modify the color and shape of the node, as well as the color and style of the connecting edge.</p>
                        <p>Click <Button size='mini' positive content="Add Node" /> to add the node you've created to the graph. </p>
                    </Segment>
                </div >
            )
            break;
        case 3:
            return (
                <div style={styling} >
                    <h3>Viewing Node Data</h3>
                    <Segment style={segmentStyling}>
                        <p>Clicking on a node will display a summary containing relevant data to said node. Some nodes will contain several metrics, which can be paged through with the corrosponding arrow buttons below.</p>
                        <p>INSERT GIF HERE?</p>
                    </Segment>
                </div>
            )
            break;
        case 4:
            return (
                <div style={styling} >
                    <h3>Removing Nodes</h3>
                    <Segment style={segmentStyling}>
                        <p>While viewing a node's summary, you can see there is a <Button color="red" inverted size='mini'><Icon name='x'></Icon> Delete</Button> at the bottom.</p>

                        <p>Clicking this button will prompt you to confirm the deletion of the currently selected node.</p>

                        <p><b>Deleting a node will also delete any children (nodes that are connected to this node), their children, and so on.<em> Be careful when deleting a node.</em></b></p>
                    </Segment>
                </div>
            )
            break;
        case 5:
            return (
                <div style={styling} >
                    <h3>Further Options</h3>
                    <Segment style={segmentStyling}>
                        <p>On the top left of the graph, there is a <Button
                            color="black"
                            inverted
                            size='mini'
                            animated='vertical'
                            circular
                            style={{
                                opacity: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Button.Content hidden>Options</Button.Content>
                            <Button.Content visible>
                                <Icon
                                    name='cog'>
                                </Icon>
                            </Button.Content>
                        </Button> button. Clicking this button will bring up a modal with more options for displaying the graph.</p>



                        <p> <b>Filters</b> - You can select either First, Second, or Third Party. This will display only those nodes and edges associated with that party. </p>

                        <p> <b>Layout</b>  - You can select from the buttons  <Button.Group style={{ marginTop: '20px' }}>
                            <Button size='mini' inverted icon='arrow down' />
                            <Button size='mini' inverted icon='arrow up' />
                            <Button size='mini' inverted icon='arrow right' />
                            <Button size='mini' inverted icon='arrow left' />
                        </Button.Group>, which will align the graph according to the direction selected. </p>

                        <p><b>Labels</b>  - Toggling the Labels toggle will show/hide the labels that dispaly data on the edges in the graph. </p>


                    </Segment>
                </div>
            )
            break;
        default:
            this.props.clearGraphFilter({
                filter: {
                    party: null,
                    id: null
                }
            })
    }
}

// Converted to functional component without state
const TutorialSlide = (props) => {

    const { centerVisible, animationDirection, currentPage } = props;
    const duration = 200
    return (

        <Transition visible={centerVisible} animation={animationDirection} duration={duration}>
            <Segment basic>
                {handleBuildTutorialSlide(currentPage)}
            </Segment>
        </Transition>
    )
}
export default TutorialSlide;