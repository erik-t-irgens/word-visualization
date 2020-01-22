import React from 'react';
import { Helmet } from "react-helmet/es/Helmet";
// Sigma components
import { Sigma, NodeShapes, Filter, RandomizeNodePositions, ForceAtlas2 } from 'react-sigma/lib/';
import Dagre from 'react-sigma/lib/Dagre'
// Custom components
import UpdateNodeProps from "./components/UpdateNodeProps"
import NodeSummary from "./components/NodeSummary";
import NodeCreationForm from "./components/NodeCreationForm";
import AddNode from "./components/AddNode";
import GraphOptions from "./components/GraphOptions";
import GraphTutorial from "./components/GraphTutorial/index";
import FindWordData from "./components/FindWordData"
// Redux
import { addNode, removeNode, updateNode, addGraphFilter, clearGraphFilter } from "../../actions/index";
import { connect } from "react-redux";
import { Search } from 'semantic-ui-react';

class SigmaComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summaryVisible: false,
            nodeData: null,
            filter: this.props.dashboardGraphFilter.filter,
            editMode: false
        }
    }





    // Show AddNode button (green +) for openning new node form.
    handleHoverNode = (e) => {
        // First, nullify these states so they are reset (this is a fix for needing to hover over a node more than once to display the add button)
        this.setState({ hoverX: null, hoverY: null, edgeStatsVisible: false, })
        // Then set them appropriately.
        this.setState({ hoverX: e.data.captor.clientX, hoverY: e.data.captor.clientY + ((3 - e.data.renderer.camera.ratio) * 15), newNodeDataInheritance: e.data, addNodeVisible: true })
        this.setState({ hoveredNodePossibleChildren: e.data.node.possibleChildren })
    }


    // Open new node form (when clicking green +)
    handleClickAddNodeButton = (data) => {
        // Shows form modal.
        this.setState({ formVisible: true, })
        // Hides the button once clicked.
        this.handleHideNodeButton()
    }

    // Hides AddNode button (green +)
    handleHideNodeButton = (e) => {
        this.setState({ hoverX: null, hoverY: null, addNodeVisible: false })
    }

    // Close new node form
    handleCloseNodeForm = () => {
        this.setState({ formVisible: false, nodeData: null })
    }

    // Open gallery/summary
    handleClickNode = (e) => {
        this.setState({
            summaryVisible: true, nodeData: e.data.node,
            dashboardComponents: e.data.node.dashboardComponents
        })
        console.log(e.data.node.dashboardComponents, "HEY LOOKY!")
    }

    // Close summary (gallery)
    handleCloseNodeSummary = () => {
        this.setState({ summaryVisible: false, nodeData: null })
    }


    componentDidMount = () => {
        document.body.style.backgroundColor = "#000";
        // Hides the Add Node button when clicking anywhere else on the canvas.
        document.getElementById("sigma-wrapper").addEventListener("mousedown", (e) => this.handleHideNodeButton(e))
    }

    // Turns on edit mode, allowing for the user to edit the graph (add, remove nodes), which places the graph into a Dagre configuration for ease of use.
    handleEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
    }


    render() {

        const { summaryVisible, newNodeDataInheritance, formVisible, hoverX, hoverY, addNodeVisible, editMode, hoveredNodePossibleChildren } = this.state;
        const { graphToDisplay } = this.props.dashboardGraph;
        const { filter, layout } = this.props.dashboardGraphFilter

        return (
            <div>
                <Helmet>
                    <title>Data Graph</title>
                </Helmet>
                {hoverX && addNodeVisible && editMode && hoveredNodePossibleChildren ?
                    <div style={{
                        position: "absolute",
                        zIndex: 3,
                        top: 0,
                        left: 0
                    }}
                        onClick={() => this.handleClickAddNodeButton(newNodeDataInheritance)}>
                        <AddNode clientX={hoverX} clientY={hoverY} ></AddNode>
                    </div> :
                    <></>
                }


                <div id="sigma-wrapper">
                    {summaryVisible && this.state.nodeData ?
                        <NodeSummary
                            editMode={this.state.editMode}
                            dashboardComponents={this.state.dashboardComponents}
                            closeModal={this.handleCloseNodeSummary}
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            visible='true'
                            data={this.state.nodeData}></NodeSummary>
                        :
                        null
                    }



                    <Sigma
                        renderer="canvas"
                        graph={graphToDisplay}
                        onClickNode={this.handleClickNode}
                        onOverNode={this.handleHoverNode}

                        // A list of other settings can be found here: https://github.com/jacomyal/sigma.js/wiki/Settings
                        settings={{
                            // This setting enables for the ability to hover over edges. 
                            // enableEdgeHovering: true,
                            // defaultEdgeHoverColor: '#ffffff',
                            // Sizes the edge that's hovered over.
                            // edgeHoverSizeRatio: 2,
                            drawEdges: true,
                            edgeColor: "target",
                            // It might be nice to be able to control the visibility of EdgeLabels using some sort of redux setting, but you can't update these settings in real time because sigma.refresh() breaks the component lifecycle
                            drawEdgeLabels: true,
                            // edgeLabelThreshold: 20,
                            defaultEdgeLabelColor: "#d8d8d8",

                            minNodeSize: 5,
                            maxNodeSize: 30,
                            minEdgeSize: 5,
                            maxEdgeSize: 5,

                            clone: false,
                            verbose: false,
                            defaultNodeColor: "#ffffff",
                            borderSize: 2,
                            defaultNodeBorderColor: "#000",

                            defaultLabelColor: "#ffffff",
                            defaultLabelSize: 15,
                            defaultEdgeType: "dashed",
                            // What size (from zoom level 1) of the edge will the label be dispalyed. 28 necessitates a slight zoom in to view.
                            labelThreshold: 5,
                            font: "arial",
                        }}
                        style={{
                            width: "100vw",
                            position: "absolute",
                            // Height of the graph port to accomodate for the header
                            height: "88vh"
                        }}
                    >
                        {formVisible ?
                            <NodeCreationForm data={newNodeDataInheritance} onSubmit={this.handleSubmit} closeModal={this.handleCloseNodeForm}></NodeCreationForm>
                            :
                            <></>
                        }
                        <NodeShapes default="diamond" />

                        {!editMode ?
                            // RandomizeNodepOsitions is necessary for ForceAtlas to function
                            <RandomizeNodePositions>

                                <ForceAtlas2
                                    background
                                    easing="cubicInOut"
                                    iterationsPerRender={1}
                                    scalingRatio={1}
                                    scaleNodes={4}
                                    linLogMode
                                    timeout={1000}
                                    worker
                                    slowDown={1}
                                />
                            </RandomizeNodePositions>
                            :
                            <Dagre
                                //  Other node distributions: https://github.com/dunnock/react-sigma/blob/master/DOCS.md 
                                // Other Dagre documentation can be found here: https://github.com/dunnock/react-sigma/blob/master/src/Dagre.js
                                // Layout documentation: https://github.com/dagrejs/dagre/wiki#configuring-the-layout 
                                directed
                                compound
                                easing=""
                                // TB, BT, LR, or RL T=Top, B=Bottom, L=Left, R=Right, but currently set in REDUX store through the Layout settings in the GraphOptions component
                                rankDir={layout}
                                // Alignment for rank nodes. Can be UL, UR, DL, or DR, where U = up, D = down, L = left, and R = right.
                                // align='DL'

                                // deals with separation of nodes and edges (node is horizontal, rank is vertical)
                                nodesep="50"
                                edgesep="50"
                                ranksep="50"

                            />
                        }



                        <FindWordData handleEditMode={this.handleEditMode} handleChangeFilter={this.handleChangeFilter}></FindWordData>
                        <GraphTutorial />

                        {filter.id ?

                            <Filter
                                nodesBy={(node) => node.party === filter.party || node.id === "customer" || node.id === filter.id}
                            /> :
                            <Filter
                                nodesBy={(node) => node.party > 0 || node.id.length > 0 || node.id}
                            />
                        }

                        <UpdateNodeProps nodes={graphToDisplay.nodes} edges={graphToDisplay.edges} />
                        <NodeShapes default="circle" />
                    </Sigma>
                </div>
            </div >
        )
    }
}

function mapStateToProps({ dashboardGraph, dashboardGraphFilter }) {
    return { dashboardGraph, dashboardGraphFilter };
}

const mapDispatchToProps = {
    addNode, removeNode, addGraphFilter, clearGraphFilter, updateNode
}

export default connect(mapStateToProps, mapDispatchToProps)(SigmaComponent);