import React from 'react';
import { Segment, Icon, Button, Form, Transition, Radio, Grid } from 'semantic-ui-react';
import { Slider } from "react-semantic-ui-range";
import { addNode, removeNode } from "../../../actions/index";
import { connect } from "react-redux";


class FindWordData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            isLoading: true,
            data: [],
            searchQuery: '',
            formVisible: false,
            sliderValue: 5,
            maxResult: 5,
            settings: {
                start: 20,
                min: 1,
                max: 100,
                step: 1,

            },

        }
    }

    // // This function also deletes child nodes and edges (tree shake orphans).
    // handleDeleteNode = (incomingNode) => {
    //     const edgesToRemove = this.props.dashboardGraph.graphToDisplay.edges.filter(edge => edge.source === incomingNode.id)
    //     let nodesToRemove = []
    //     edgesToRemove.forEach(edge => nodesToRemove = [...nodesToRemove, ...this.props.dashboardGraph.graphToDisplay.nodes.filter(node => node.id === edge.target)])
    //     this.props.removeNode(incomingNode)
    //     if (nodesToRemove.length > 0) {
    //         nodesToRemove.forEach(node => this.handleDeleteNode(node))
    //     }
    //     this.props.closeModal()
    // }

    // componentDidMount = () => {

    //     this.setState(
    //         {
    //             visible: this.props.visible,
    //             data: this.props.data,
    //             editMode: this.props.editMode
    //         }
    //     )
    // }
    delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

    handleShowOptionsForm = () => {
        this.setState({ formVisible: !this.state.formVisible })
    }

    // Create a unique ID, used for nodeId and edgeTarget (the same item)
    handleUniqueIdentifier = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }



    handleAddRhymesNodes = () => {
        let rhymes = {
            node: {
                id: "rhymes",
                label: "Rhymes",
                size: 20,
                color: "#66ffcc",
                type: 'diamond',
                x: 0,
                y: 0
            },
            edge: {
                id: "rhymes",
                source: 'main-node',
                target: 'rhymes',
                type: 'dashed',
                color: "#66ffcc",
            }
        }
        this.props.addNode(rhymes)

        if (this.state.rhymes && this.state.rhymes.length > 0) {
            this.state.rhymes.forEach((word) => {
                this.delay(100)
                console.log(word)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000,
                        color: "#66ffcc",
                        x: 0,
                        y: 0,
                        score: word.score,
                        syllables: word.numSylables
                    },
                    edge: {
                        id: word.word + 'edge' + 'rhymes',
                        source: 'rhymes',
                        color: "#66ffcc",
                        target: word.word
                    }
                });
            })
        }

    }

    handleAddAssociatedNodes = () => {

        let associated = {
            node: {
                id: "associated",
                label: "Associated",
                size: 20,
                color: "#ffcc66",
                type: 'diamond',
                x: 0,
                y: 0
            },
            edge: {
                id: "associated",
                source: 'main-node',
                target: 'associated',
                type: 'dashed',
                color: "#ffcc66",
            }
        }

        this.props.addNode(associated)

        if (this.state.associated && this.state.associated.length > 0) {
            this.state.associated.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000,
                        color: "#ffcc66",
                        x: 0,
                        y: 0,
                        score: word.score,
                        syllables: word.numSylables
                    },
                    edge: {
                        id: word.word + 'edge' + 'associated',
                        source: 'associated',
                        target: word.word,
                        color: "#ffcc66",
                    }
                });
            })
        }
    }

    handleAddAntonymsNodes = () => {

        let antonyms = {
            node: {
                id: "antonyms",
                label: "Antonyms",
                size: 20,
                color: "#ff6666",
                type: 'diamond',
                x: 0,
                y: 0
            },
            edge: {
                id: "antonyms",
                source: 'main-node',
                target: 'antonyms',
                type: 'dashed',
                color: "#ff6666",
            }
        }

        this.props.addNode(antonyms)

        if (this.state.antonyms && this.state.antonyms.length > 0) {
            this.state.antonyms.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000,
                        color: "#ff6666",
                        x: 0,
                        y: 0,
                        score: word.score,
                        syllables: word.numSylables
                    },
                    edge: {
                        id: word.word + 'edge' + 'antonyms',
                        source: 'antonyms',
                        color: "#ff6666",
                        target: word.word
                    }
                });
            })
        }
    }

    handleAddSynonymsNodes = () => {

        let synonyms = {
            node: {
                id: "synonyms",
                label: "Synonyms",
                size: 20,
                color: "#6699ff",
                type: 'diamond',
                x: 0,
                y: 0
            },
            edge: {
                id: "synonyms",
                source: 'main-node',
                target: 'synonyms',
                type: 'dashed',
                color: "#6699ff",
            }
        }

        this.props.addNode(synonyms)

        if (this.state.synonyms && this.state.synonyms.length > 0) {
            this.state.synonyms.forEach((word) => {

                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000,
                        color: "#6699ff",
                        x: 0,
                        y: 0,
                        score: word.score,
                        syllables: word.numSylables
                    },
                    edge: {
                        id: word.word + 'edge' + 'SYNONYMS',
                        source: 'synonyms',
                        target: word.word
                    }
                });

            })
        }
    }
    handleDeleteNode = (incomingNode) => {
        const edgesToRemove = this.props.dashboardGraph.graphToDisplay.edges.filter(edge => edge.source === incomingNode.id)
        let nodesToRemove = []
        edgesToRemove.forEach(edge => nodesToRemove = [...nodesToRemove, ...this.props.dashboardGraph.graphToDisplay.nodes.filter(node => node.id === edge.target)])
        this.props.removeNode(incomingNode)
        if (nodesToRemove.length > 0) {
            nodesToRemove.forEach(node => this.handleDeleteNode(node))
        }

    }

    handleQueryWord = (term) => {

        if (this.props.dashboardGraph.graphToDisplay.nodes.find(node => node.id === "main-node")) {
            this.handleDeleteNode(this.props.dashboardGraph.graphToDisplay.nodes.find(node => node.id === "main-node"))
        }
        this.delay(200)
        this.props.addNode({
            node: {
                id: "main-node",
                label: term,
                size: 30,
                color: "#ffffff",
                type: 'star',
                x: 0,
                y: 0
            },
            edge: {
                id: "connecting-node",
                source: "customer",
                target: 'main-node',
                type: 'arrow',
                color: '#ffffff'
            }
        })



        fetch(`https://api.datamuse.com/words?rel_syn=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ synonyms: result.slice(0, this.state.sliderValue) })
            )

        fetch(`https://api.datamuse.com/words?rel_ant=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ antonyms: result.slice(0, this.state.sliderValue) })


            )

        fetch(`https://api.datamuse.com/words?rel_trg=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ associated: result.slice(0, this.state.sliderValue) })


            )
        fetch(`https://api.datamuse.com/words?rel_rhy=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ rhymes: result.slice(0, this.state.sliderValue) })

            )
        this.setState({ done: true })
    }

    // This sets, in state, a name: value, which is generated by all input field types.
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        this.handleQueryWord(this.state.queryString)

    }


    render() {

        const { formVisible, done, rhymes, associated, antonyms, synonyms, settings, sliderValue } = this.state;
        return (


            <div style={{
                position: 'absolute',
                // left: "80px",
                // top: '100px',
                opacity: .8,
                textAlign: 'center',
                left: '10%',
                translate: "transform (-50%, -50%)",
                textAlign: 'center',
                // maxHeight: '500px',
                width: '80vw',
                // overflow: 'auto'
            }}>
                <Segment inverted >



                    <Form style={{ textAlign: 'center' }} >
                        <Grid columns={2} >
                            <Grid.Row>




                                <Grid.Column width={8} style={{ width: "40%" }}>
                                    <h3 style={{ left: '50%', translate: "transform (-50%, -50%)" }}>Search Term</h3>
                                    <Form.Group widths="equal" >

                                        <Form.Input
                                            fluid
                                            name="queryString"
                                            value={this.state.queryString}
                                            onChange={this.handleChange}
                                            placeholder='Search Term...'
                                        />
                                    </Form.Group>
                                </Grid.Column>



                                <Grid.Column width={8} style={{ width: "40%" }}>
                                    <h3 style={{ left: '50%', translate: "transform (-50%, -50%)" }}>Result Limit</h3>

                                    <h3 style={{ color: "white" }}>{sliderValue}</h3>
                                    <Slider discrete color="red" settings={settings} name="sliderValue" value={sliderValue} onChange={this.handleChange} />

                                </Grid.Column>


                            </Grid.Row>
                        </Grid>
                    </Form>

                    {done ?
                        <Segment style={{ width: "50px" }}>
                            <h5>Add Nodes</h5>
                            {synonyms && synonyms.length > 0 ?

                                <div>
                                    <p>Synonyms: {synonyms.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddSynonymsNodes} name="plus"></Icon> </p>
                                </div> : <></>}
                            {antonyms && antonyms.length > 0 ?
                                <div>

                                    <p>Antonyms: {antonyms.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddAntonymsNodes} name="plus"></Icon></p>
                                </div> : <></>}
                            {associated && associated.length > 0 ?
                                <div>

                                    <p>Associated: {associated.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddAssociatedNodes} name="plus"></Icon></p>
                                </div> : <></>}
                            {rhymes && rhymes.length > 0 ?
                                <div>

                                    <p>Rhymes: {rhymes.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddRhymesNodes} name="plus"></Icon></p>
                                </div> : <></>}
                        </Segment>
                        : <></>}


                </Segment >


                <Button onClick={this.handleSubmit} positive content='Search' style={{ position: "absolute", left: "px", top: '130px', translate: "transform (-50%, -50%)", }} />
            </div>

        )
    }
}

function mapStateToProps({ dashboardGraph }) {
    return { dashboardGraph };
}

const mapDispatchToProps = {
    addNode, removeNode
}

export default connect(mapStateToProps, mapDispatchToProps)(FindWordData);