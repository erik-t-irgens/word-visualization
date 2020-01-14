import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { Statistic, Loader, Dimmer } from 'semantic-ui-react';


class SingleStatistic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false })

    }

    render() {
        const { color } = this.props;
        const { data, isLoading } = this.state;
        return (
            <>
                {!isLoading ?

                    <Statistic inverted size='huge' color={color} style={{ height: '100%', marginTop: '5em' }}>
                        <Statistic.Value>{data.value}</Statistic.Value>
                        <Statistic.Label>{data.label}</Statistic.Label>
                    </Statistic> :
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                }
            </>
        )
    }
}

SingleStatistic.propTypes = {
    type: PropTypes.string,
    apiUrl: PropTypes.string
}

export default SingleStatistic;