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

const {
  Header,
  Footer,
  Sider,
  Content
} = Layout;

const HeaderTitle = ({}) => (
  <span style={{ fontSize: 20 }}>{
    location.pathname === '/my-details' ? 'My Details' :
    location.pathname === '/photos' ? 'Add Photos' :
    location.pathname === '/locations' ? 'My Locations' : ''
  }</span>
);

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
    const { children } = this.props;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <span className="logo_letter">Tr</span>
            <span className="logo_name">Treppere</span>
          </div>
          <LeftDrawer />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <HeaderTitle />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            { children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Treppere ©2017 Created by DoIT
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
