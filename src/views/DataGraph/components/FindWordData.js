import React from 'react';
import { Segment, Icon, Button, Form, Transition, Radio } from 'semantic-ui-react';

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
            maxResult: 5,
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
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
                        color: "#66ffcc",
                        x: 0,
                        y: 0
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
                        size: 1,
                        color: "#ffcc66",
                        x: 0,
                        y: 0
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
                        size: 1,
                        color: "#ff6666",
                        x: 0,
                        y: 0
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
                let i = 0
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
                        color: "#6699ff",
                        x: i,
                        y: i
                    },
                    edge: {
                        id: word.word + 'edge' + 'SYNONYMS',
                        source: 'synonyms',
                        target: word.word
                    }
                });
                i = i + 1
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
                this.setState({ synonyms: result.slice(0, this.state.maxResult) })
            )

        fetch(`https://api.datamuse.com/words?rel_ant=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ antonyms: result.slice(0, this.state.maxResult) })


            )

        fetch(`https://api.datamuse.com/words?rel_trg=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ associated: result.slice(0, this.state.maxResult) })


            )
        fetch(`https://api.datamuse.com/words?rel_rhy=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ rhymes: result.slice(0, this.state.maxResult) })

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

        const { formVisible, done, rhymes, associated, antonyms, synonyms } = this.state;
        return (

            <div
                style={{
                    position: 'absolute',
                    left: "80px",
                    top: '100px',
                    opacity: 1,
                    textAlign: 'center'
                }}
            >
                <Button
                    color="black"
                    inverted
                    size='mini'
                    animated='vertical'
                    circular
                    style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        opacity: 1,
                        textAlign: 'center'
                    }}
                    onClick={this.handleShowOptionsForm}>
                    <Button.Content hidden>Search</Button.Content>
                    <Button.Content visible>
                        <Icon name='search' />
                    </Button.Content>
                </Button>
                <Transition visible={formVisible} animation="fade right" duration="300">
                    <Segment inverted style={{
                        position: 'absolute',
                        left: '0',
                        top: '30px',
                        textAlign: 'center',
                        maxHeight: '70vh',
                        width: '250px',
                        overflow: 'auto'
                    }}>
                        <Form style={{ textAlign: 'center' }} >
                            <h2>Search for Trends!</h2>
                            <h3 style={{ left: '50%', translate: "transform (-50%, -50%)" }}>Search Term</h3>

                            <Form.Group widths="equal">
                                <label style={{ color: 'white' }}>Data Source</label>
                                <Form.Input
                                    fluid
                                    name="queryString"
                                    value={this.state.queryString}
                                    onChange={this.handleChange}
                                    placeholder='Search Term...'
                                />

                            </Form.Group>
                            <Segment inverted>

                                <h4>Result Amount Total</h4>
                                <label style={{ color: 'white' }}>5</label>
                                <Form.Field>

                                    <Radio
                                        toggle
                                        name='maxResult'
                                        value={5}
                                        checked={this.state.maxResult === 5}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <label style={{ color: 'white' }}>10</label>
                                <Form.Field>
                                    <Radio
                                        toggle
                                        name='maxResult'
                                        value={10}
                                        checked={this.state.maxResult === 10}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>

                                <label style={{ color: 'white' }}>20</label>
                                <Form.Field>
                                    <Radio
                                        toggle

                                        name='maxResult'
                                        value={20}
                                        checked={this.state.maxResult === 20}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>

                                <label style={{ color: 'white' }}>50</label>
                                <Form.Field>
                                    <Radio
                                        toggle

                                        name='maxResult'
                                        value={50}
                                        checked={this.state.maxResult === 50}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>




                            </Segment>
                            <Button onClick={this.handleSubmit} positive content='Search' />
                        </Form>
                        {done ?
                            <Segment>
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
                    </Segment>
                </Transition>
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