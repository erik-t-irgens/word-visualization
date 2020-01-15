import React from 'react';
import { Segment, Icon, Button, Form, Transition } from 'semantic-ui-react';

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
            formVisible: false
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

    addNodesToGraph = () => {


        let synonyms = {
            node: {
                id: "synonyms",
                label: "Synonyms",
                size: 20,
                color: "#6699ff",
                type: 'diamond',
            },
            edge: {
                id: "synonyms",
                source: 'main-node',
                target: 'synonyms',
                type: 'dashed',
                color: "#6699ff",
            }
        }

        let antonyms = {
            node: {
                id: "antonyms",
                label: "Antonyms",
                size: 20,
                color: "#ff6666",
                type: 'diamond',
            },
            edge: {
                id: "antonyms",
                source: 'main-node',
                target: 'antonyms',
                type: 'dashed',
                color: "#ff6666",
            }
        }

        let rhymes = {
            node: {
                id: "rhymes",
                label: "Rhymes",
                size: 20,
                color: "#66ffcc",
                type: 'diamond',
            },
            edge: {
                id: "rhymes",
                source: 'main-node',
                target: 'rhymes',
                type: 'dashed',
                color: "#66ffcc",
            }
        }

        let associated = {
            node: {
                id: "associated",
                label: "Associated",
                size: 20,
                color: "#ffcc66",
                type: 'diamond',
            },
            edge: {
                id: "associated",
                source: 'main-node',
                target: 'associated',
                type: 'dashed',
                color: "#ffcc66",
            }
        }


        this.props.addNode(synonyms)
        this.props.addNode(antonyms)
        this.props.addNode(associated)
        this.props.addNode(rhymes)







    }

    handleAddRhymesNodes = () => {
        if (this.state.rhymes && this.state.rhymes.length > 0) {
            this.state.rhymes.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
                    },
                    edge: {
                        id: word.word + 'edge' + 'rhymes',
                        source: 'rhymes',
                        target: word.word
                    }
                });
            })
        }

    }

    handleAddAssociatedNodes = () => {
        if (this.state.associated && this.state.associated.length > 0) {
            this.state.associated.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
                    },
                    edge: {
                        id: word.word + 'edge' + 'associated',
                        source: 'associated',
                        target: word.word
                    }
                });
            })
        }
    }

    handleAddAntonymsNodes = () => {

        if (this.state.antonyms && this.state.antonyms.length > 0) {
            this.state.antonyms.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
                    },
                    edge: {
                        id: word.word + 'edge' + 'antonyms',
                        source: 'antonyms',
                        target: word.word
                    }
                });
            })
        }
    }

    handleAddSynonymsNodes = () => {
        if (this.state.synonyms && this.state.synonyms.length > 0) {
            this.state.synonyms.forEach((word) => {
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: 1,
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

    handleQueryWord = (term) => {

        this.props.addNode({
            node: {
                id: "main-node",
                label: term,
                size: 30,
                color: "#ffffff",
                type: 'star',
            },
            edge: {
                id: "connecting-node",
                source: "customer",
                target: 'main-node',
                type: 'arrow',
                color: '#ffffff'
            }
        })

        this.addNodesToGraph()

        fetch(`https://api.datamuse.com/words?rel_syn=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ synonyms: result.slice(0, 10) })
            )

        fetch(`https://api.datamuse.com/words?rel_ant=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ antonyms: result.slice(0, 10) })


            )

        fetch(`https://api.datamuse.com/words?rel_trg=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ associated: result.slice(0, 10) })


            )
        fetch(`https://api.datamuse.com/words?rel_rhy=` + term)
            .then(res => res.json())
            .then(result =>
                this.setState({ rhymes: result.slice(0, 10) })


            )

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
                        width: '400px',
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

                            <Button onClick={this.handleSubmit} positive content='Search' />
                        </Form>
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