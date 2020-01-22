import React from 'react';
import { Segment, Icon, Button, Form, Transition, Radio, Grid } from 'semantic-ui-react';
import { Slider } from "react-semantic-ui-range";
import { addNode, initGraph, removeNode, addGraphFilter, clearGraphFilter, changeLayoutDirection, toggleLabelVisibility } from "../../../actions/index";
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
            sliderValue: 15,
            maxResult: 5,
            settings: {
                start: 20,
                min: 1,
                max: 100,
                step: 1,
                onChange: value => {
                    this.setState({ sliderValue: value })
                },
            },

        }
    }



    // Called by above, uses Redux to change current filter
    handleChangeFilter = (filter) => {
        switch (filter) {
            case 1:
                this.props.addGraphFilter({
                    filter: {
                        party: 1,
                        id: 'firstparty'
                    }
                })
                break;
            case 2:
                this.props.addGraphFilter({
                    filter: {
                        party: 2,
                        id: 'secondparty'
                    }
                })
                break;
            case 3:
                this.props.addGraphFilter({
                    filter: {
                        party: 3,
                        id: 'thirdparty'
                    }
                })
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

    // Used when clearing filters
    handleAbstractChangeFilter = (value) => {
        this.setState({ filterValue: 0, currentParty: "No Filter" })
        this.handleChangeFilter(value)
    }

    handleChangeLayoutDirection = (direction) => {
        // From index, sets index's state of direction to be what Dagre wants for layout
        this.props.changeLayoutDirection(direction)
        switch (direction) {
            case 'TB':
                this.setState({
                    currentDirection: 'Top to Bottom'
                })
                break;
            case 'BT':
                this.setState({
                    currentDirection: 'Bottom to Top'
                })
                break;
            case 'LR':
                this.setState({
                    currentDirection: 'Left to Right'
                })
                break;
            default:
                this.setState({
                    currentDirection: 'Right to Left'
                })
        }

        if (this.state.filterValue > 0) {
            this.handleChangeFilter(this.state.filterValue)
        } else {
            this.handleAbstractChangeFilter(0)
        }

    }


    // Enables edit mode here and in index.
    handleEditMode = () => {
        this.props.handleEditMode()
        this.setState((prevState) => ({ editMode: !prevState.editMode }))
    }

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
                y: 0,
                dashboardComponents: [{
                    type: 'bar',
                    name: 'Word Relevance',
                    size: 8,
                    data: [],
                    color1: '#66ffcc',
                    color2: '#18f5ab',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'single-stat',
                    name: 'Word Count',
                    size: 8,
                    data: { value: 0, label: "Word(s)" },
                    color: 'teal',

                },
                {
                    type: 'list',
                    name: 'Word List',
                    size: 8,
                    data: [],
                    color: 'teal',

                },]
            },
            edge: {
                id: "rhymes",
                source: 'main-node',
                target: 'rhymes',
                type: 'parallel',
                color: "#66ffcc",
            }
        }
        this.props.addNode(rhymes)

        if (this.state.rhymes && this.state.rhymes.length > 0) {
            this.state.rhymes.forEach((word) => {
                rhymes.node.dashboardComponents[0].data.push({ x: word.word, y: word.score })
                rhymes.node.dashboardComponents[1].data.value += 1
                rhymes.node.dashboardComponents[2].data.push({ word: word.word, score: word.score, definition: word.defs ? word.defs[0] : "No definition available" })
                this.delay(100)
                console.log(word)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000 < 10 ? word.score / 1000 : 9,
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
                y: 0,
                dashboardComponents: [{
                    type: 'bar',
                    name: 'Word Relevance',
                    size: 8,
                    data: [],
                    color1: '#ffcc66',
                    color2: '#ffbe3b',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                }, {
                    type: 'single-stat',
                    name: 'Word Count',
                    size: 8,
                    data: { value: 0, label: "Word(s)" },
                    color: 'yellow',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'list',
                    name: 'Word List',
                    size: 8,
                    data: [],
                    color: 'yellow',

                },]
            },
            edge: {
                id: "associated",
                source: 'main-node',
                target: 'associated',
                type: 'parallel',
                color: "#ffcc66",
            }
        }

        this.props.addNode(associated)

        if (this.state.associated && this.state.associated.length > 0) {
            this.state.associated.forEach((word) => {
                associated.node.dashboardComponents[0].data.push({ x: word.word, y: word.score })
                associated.node.dashboardComponents[1].data.value += 1
                associated.node.dashboardComponents[2].data.push({ word: word.word, score: word.score, definition: word.defs ? word.defs[0] : "No definition available" })
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000 < 10 ? word.score / 1000 : 9,
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
                y: 0,
                dashboardComponents: [{
                    type: 'bar',
                    name: 'Word Relevance',
                    size: 8,
                    data: [],
                    color1: '#ff6666',
                    color2: '#ff3636',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                }, {
                    type: 'single-stat',
                    name: 'Word Count',
                    size: 8,
                    data: { value: 0, label: "Word(s)" },
                    color: 'red',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'list',
                    name: 'Word List',
                    size: 8,
                    data: [],
                    color: 'red',

                },]
            },
            edge: {
                id: "antonyms",
                source: 'main-node',
                target: 'antonyms',
                type: 'parallel',
                color: "#ff6666",
            }
        }

        this.props.addNode(antonyms)

        if (this.state.antonyms && this.state.antonyms.length > 0) {
            this.state.antonyms.forEach((word) => {
                antonyms.node.dashboardComponents[0].data.push({ x: word.word, y: word.score })
                antonyms.node.dashboardComponents[1].data.value += 1
                antonyms.node.dashboardComponents[2].data.push({ word: word.word, score: word.score, definition: word.defs ? word.defs[0] : "No definition available" })
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000 < 10 ? word.score / 1000 : 9,
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
                y: 0,
                dashboardComponents: [{
                    type: 'area',
                    name: 'Word Relevance',
                    size: 8,
                    data: [],
                    color1: '#6699ff',
                    color2: '#4d88ff',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                }, {
                    type: 'single-stat',
                    name: 'Word Count',
                    size: 8,
                    data: { value: 0, label: "Word(s)" },
                    color: 'blue',
                    yAxis: true,
                    xAxis: true,
                    VGridLine: true,
                    HGridLine: true,
                },
                {
                    type: 'list',
                    name: 'Word List',
                    size: 8,
                    data: [],
                    color: 'blue',

                },]
            },
            edge: {
                id: "synonyms",
                source: 'main-node',
                target: 'synonyms',
                type: 'parallel',
                color: "#6699ff",
            }
        }

        this.props.addNode(synonyms)

        if (this.state.synonyms && this.state.synonyms.length > 0) {
            this.state.synonyms.forEach((word) => {
                synonyms.node.dashboardComponents[0].data.push({ x: word.word, y: word.score })
                synonyms.node.dashboardComponents[1].data.value += 1
                synonyms.node.dashboardComponents[2].data.push({ word: word.word, score: word.score, definition: word.defs ? word.defs[0] : "No definition available" })
                this.delay(100)
                this.props.addNode({
                    node: {
                        id: word.word,
                        label: word.word,
                        type: 'circle',
                        size: word.score / 1000 < 10 ? word.score / 1000 : 9,
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
        this.props.initGraph({
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



        fetch(`https://api.datamuse.com/words?rel_syn=` + term + "&md=dpsrf")
            .then(res => res.json())
            .then(result =>
                this.setState({ synonyms: result.slice(0, this.state.sliderValue) })
            )

        fetch(`https://api.datamuse.com/words?rel_ant=` + term + "&md=dpsrf")
            .then(res => res.json())
            .then(result =>
                this.setState({ antonyms: result.slice(0, this.state.sliderValue) })


            )

        fetch(`https://api.datamuse.com/words?rel_trg=` + term + "&md=dpsrf")
            .then(res => res.json())
            .then(result =>
                this.setState({ associated: result.slice(0, this.state.sliderValue) })


            )
        fetch(`https://api.datamuse.com/words?rel_rhy=` + term + "&md=dpsrf")
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

        if (!this.state.editMode) {
            this.setState({ editMode: true })
            this.props.handleEditMode()
        }


    }


    render() {

        const { editMode, done, rhymes, associated, antonyms, synonyms, settings, sliderValue } = this.state;
        return (

            <div style={{

                opacity: .8,
                textAlign: 'center',
                margin: '0 auto',
                marginTop: '10px',
                width: '80vw',

            }}>
                <Segment inverted >
                    <Form style={{ textAlign: 'center' }} >
                        <Grid columns="equal" divided inverted>
                            <Grid.Row>
                                <Grid.Column >
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
                                    <Button onClick={this.handleSubmit} positive content='Search' />
                                </Grid.Column>

                                <Grid.Column >
                                    <h3 style={{ left: '50%', translate: "transform (-50%, -50%)" }}>Result Limit</h3>
                                    <Slider discrete color="green" settings={settings} name="sliderValue" value={sliderValue} onChange={this.handleChange} />
                                    <h3 style={{ color: "white" }}>{sliderValue}</h3>
                                    <p>Readbility:
                                        {sliderValue < 30 ?
                                            <p style={{ color: 'green' }}> <b>Good</b></p>
                                            :
                                            sliderValue < 50 ?
                                                <p style={{ color: 'yellow' }}> <b>Fair</b></p>
                                                :
                                                <p style={{ color: 'orange' }}> <b>Difficult</b></p>}
                                    </p>
                                </Grid.Column>

                                <Grid.Column >
                                    <h3 style={{ left: '50%', translate: "transform (-50%, -50%)" }}>Layout</h3>
                                    {!editMode ? <Form.Field>Current Layout: <b>Gravitational Graph</b></Form.Field>
                                        : <Form.Field>Current Layout: <b>Tree Graph</b></Form.Field>}
                                    <Grid columns="equal" divided inverted>
                                        <Grid.Row >
                                            <Grid.Column>

                                                <Form.Field>
                                                    <label style={{ color: 'white' }}>Switch Layout</label>
                                                    <Icon size="big" inverted disabled={editMode} name="snowflake outline"></Icon>
                                                    <Radio
                                                        slider
                                                        name='editModeToggle'
                                                        checked={this.state.editMode}
                                                        onChange={this.handleEditMode}
                                                    />
                                                    <Icon size="big" inverted disabled={!editMode} name="tree"></Icon>
                                                </Form.Field>
                                            </Grid.Column>

                                            <Grid.Column>
                                                <Button.Group style={{ marginTop: '20px' }}>
                                                    <Button inverted icon='arrow down'
                                                        onClick={() => this.handleChangeLayoutDirection('TB')} disabled={!editMode} />
                                                    <Button inverted icon='arrow up'
                                                        onClick={() => this.handleChangeLayoutDirection('BT')} disabled={!editMode} />
                                                    <Button inverted icon='arrow right'
                                                        onClick={() => this.handleChangeLayoutDirection('LR')} disabled={!editMode} />
                                                    <Button inverted icon='arrow left'
                                                        onClick={() => this.handleChangeLayoutDirection('RL')} disabled={!editMode} />
                                                </Button.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment >

                {done ?
                    <Segment inverted style={{ margin: "0 auto" }}>
                        <h5>Add Nodes</h5>
                        <Grid columns="equal" divided inverted>
                            <Grid.Row >
                                {synonyms && synonyms.length > 0 ?

                                    <Grid.Column>
                                        <p>Synonyms: {synonyms.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddSynonymsNodes} name="plus"></Icon> </p>
                                    </Grid.Column> : <></>}
                                {antonyms && antonyms.length > 0 ?
                                    <Grid.Column>
                                        <p>Antonyms: {antonyms.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddAntonymsNodes} name="plus"></Icon></p>
                                    </Grid.Column> : <></>}

                                {associated && associated.length > 0 ?
                                    <Grid.Column>

                                        <p>Associated: {associated.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddAssociatedNodes} name="plus"></Icon></p>
                                    </Grid.Column> : <></>}

                                {rhymes && rhymes.length > 0 ?
                                    <Grid.Column>

                                        <p>Rhymes: {rhymes.length} <Icon style={{ cursor: 'pointer', color: 'green' }} onClick={this.handleAddRhymesNodes} name="plus"></Icon></p>
                                    </Grid.Column> : <></>}

                            </Grid.Row>
                        </Grid>
                    </Segment>
                    : <></>}
            </div>

        )
    }
}

function mapStateToProps({ dashboardGraph }) {
    return { dashboardGraph };
}

const mapDispatchToProps = {
    addNode, initGraph, removeNode, addGraphFilter, clearGraphFilter, changeLayoutDirection, toggleLabelVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(FindWordData);