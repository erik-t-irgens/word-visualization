import React, { Component, Fragment } from 'react';
import { Image, Menu, Icon, Dropdown, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class Header extends Component {

    render() {
        return (
            <Menu inverted style={{ borderRadius: 0, backgroundColor: '#272d2d' }} icon='labeled'>
                <Menu.Item header>
                    <Image
                        // src={mozaicLogo}
                        style={{ marginTop: '5px', height: '35px' }} />
                </Menu.Item>
                <Menu.Menu position='right'>

                    <Fragment>
                        <Menu.Item
                            name='Data Graoh'
                            active={this.props.location.pathname.includes('/datagraph')}
                            link
                            onClick={() => this.props.history.push('/datagraph/')}
                        >
                            <Icon name='dot circle' />
                            Data Graph
                            </Menu.Item>
                        <Menu.Item
                            name='Dashboard'
                            active={this.props && this.props.location.pathname.includes('/dashboard')}
                            link
                            onClick={() => this.props.history.push('/dashboard/')}
                        >
                            <Icon name='area graph' />
                            Dashboard
                            </Menu.Item>

                    </Fragment>

                </Menu.Menu>
            </Menu>
        )
    }
}



export default withRouter(Header)