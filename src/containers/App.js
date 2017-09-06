import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'toastr/build/toastr.css';
import {
  Layout,
  Icon
} from 'antd';
import {
  LeftDrawer
} from '../components';
import '../assets/styles/index.scss';

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
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Layout.Sider trigger={null}
               collapsible
               collapsed={this.state.collapsed}>
          <div className="logo">
            <span className="logo_letter">Tr</span>
            <span className="logo_name">Treppere</span>
          </div>
          <LeftDrawer />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle} />
          </Layout.Header>

          <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            { this.props.children }
          </Layout.Content>
        </Layout>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <span>Treppere ©2017 Created by DoIT</span>
        </Layout.Footer>
      </Layout>
    );
  }
}
