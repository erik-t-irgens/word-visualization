import React from 'react';
import { Segment, Icon, Button, Form, Transition, Radio, Divider } from 'semantic-ui-react';
import { addGraphFilter, clearGraphFilter, changeLayoutDirection, toggleLabelVisibility } from "../../../actions/index";
import { connect } from "react-redux";
// Converted to a functional component without state.

class GraphOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            formVisible: false,
            currentParty: "No Filter",
            currentDirection: "Top to Bottom",
            editMode: false,
        }
    }

    // Shows the options form itself
    handleShowOptionsForm = () => {
        this.setState({ formVisible: !this.state.formVisible })
    }

    // When there is a change in the toggle
    handleFilterChange = (e, { value }) => {
        this.setState({ value: value })
        if (value === 1) {
            this.setState({ currentParty: "First Party" })
        } else if (value === 2) {
            this.setState({ currentParty: "Second Party" })
        } else if (value === 3) {
            this.setState({ currentParty: "Third Party" })
        } else {
            this.setState({ currentParty: "No Filter" })
        }
        this.handleChangeFilter(value)
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
        this.setState({ value: 0, currentParty: "No Filter" })
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

        if (this.state.value > 0) {
            this.handleChangeFilter(this.state.value)
        } else {
            this.handleAbstractChangeFilter(0)
        }

    }

    // Enables edit mode here and in index.
    handleEditMode = () => {
        this.props.handleEditMode()
        this.setState((prevState) => ({ editMode: !prevState.editMode }))
    }

    render() {
        const { formVisible, editMode } = this.state
        return (
            <div
                style={{
                    position: 'absolute',
                    left: "70px",
                    top: '90px',
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
                    <Button.Content hidden>Options</Button.Content>
                    <Button.Content visible>
                        <Icon name='cog' />
                    </Button.Content>
                </Button>
                <Transition visible={formVisible} animation="fade right" duration="300">
                    <Segment style={{
                        position: 'absolute',
                        left: '0',
                        top: '30px',
                        textAlign: 'center',
                        maxHeight: '70vh',
                        overflow: 'auto'
                    }} inverted>
                        <Form>
                            <h3>Filters</h3>
                            <Form.Field style={{ width: '200px' }}>
                                Current Filter: <b>{this.state.currentParty}</b>
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: 'white' }}>First Party</label>
                                <Radio
                                    toggle
                                    name='radioGroup'
                                    value={1}
                                    checked={this.state.value === 1}
                                    onChange={this.handleFilterChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: 'white' }}>Second Party</label>
                                <Radio
                                    toggle
                                    name='radioGroup'
                                    value={2}
                                    checked={this.state.value === 2}
                                    onChange={this.handleFilterChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: 'white' }}>Third Party</label>
                                <Radio
                                    toggle
                                    name='radioGroup'
                                    value={3}
                                    checked={this.state.value === 3}
                                    onChange={this.handleFilterChange}
                                />
                            </Form.Field>

                            <Button
                                color="grey" inverted onClick={() => this.handleAbstractChangeFilter(0)}
                                circular
                                size='tiny'
                            >
                                Clear Filters
                            </Button>

                            <Divider />
                            <h3>Edit Mode</h3>
                            <Form.Field>
                                <label style={{ color: 'white' }}>Toggle Edit Mode</label>
                                <Radio
                                    toggle
                                    name='editModeToggle'
                                    checked={this.state.editMode}
                                    onChange={this.handleEditMode}
                                />
                            </Form.Field>
                            {editMode ?
                                <>
                                    <Divider />
                                    <h3>Layout</h3>
                                    <Form.Field>Current Layout: <b>{this.state.currentDirection}</b></Form.Field>
                                    <Button.Group style={{ marginTop: '20px' }}>
                                        <Button inverted icon='arrow down'
                                            onClick={() => this.handleChangeLayoutDirection('TB')} />
                                        <Button inverted icon='arrow up'
                                            onClick={() => this.handleChangeLayoutDirection('BT')} />
                                        <Button inverted icon='arrow right'
                                            onClick={() => this.handleChangeLayoutDirection('LR')} />
                                        <Button inverted icon='arrow left'
                                            onClick={() => this.handleChangeLayoutDirection('RL')} />
                                    </Button.Group></> : null}
                        </Form>
                    </Segment>
                </Transition>
            </div >
        )
    }
}
function mapStateToProps({ dashboardGraphFilter }) {
    return { dashboardGraphFilter };
}

const mapDispatchToProps = {
    addGraphFilter, clearGraphFilter, changeLayoutDirection, toggleLabelVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphOptions);