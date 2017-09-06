import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Icon
} from 'antd';
import {
  LeftDrawer
} from '../components';
import '../assets/styles/index.scss';
import config from '../config';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element
  };

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      collapsed: false
    };

    this.contentStyles = {
      margin: '24px 16px',
      padding: 24,
      background: '#fff',
      minHeight: 280
    };
    this.headerStyles = {
      background: '#fff',
      padding: 0
    };
    this.footerStyles = {
      textAlign: 'center'
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout>
        <Layout.Sider trigger={null}
               collapsible
               collapsed={collapsed}>
          <div className="logo">
            <span className="logo_letter">{config.theme.short_name}</span>
            <span className="logo_name">{config.theme.name}</span>
          </div>
          <LeftDrawer />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={ this.headerStyles }>
            <Icon className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle} />
          </Layout.Header>

          <Layout.Content style={ this.contentStyles }>
            { this.props.children }
          </Layout.Content>
        </Layout>
        <Layout.Footer style={ this.footerStyles }>
          <span>{config.theme.name} ©2017 Created by DoIT</span>
        </Layout.Footer>
      </Layout>
    );
  }
}
