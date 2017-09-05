import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Menu,
  Icon
} from 'antd';

class LeftDrawer extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.menus = {
      details: {
        title: 'Details',
        link: '/my-details',
        icon: 'user'
      },
      photos: {
        title: 'Photos',
        link: '/photos',
        icon: 'camera-o'
      },
      locations: {
        title: 'Locations',
        link: '/locations',
        icon: 'environment-o'
      }
    };
    this.state = {
      selectedKey: location.pathname
    };
  }

  componentWillReceiveProps(cp, np) {
    if (this.state.selectedKey !== location.pathname) {
      this.setState({
        selectedKey: location.pathname
      })
    }
  }

  redirect = link => {
    const { dispatch } = this.props;
    this.setState({
      selectedKey: link
    }, dispatch(push(link)));
  };

  render() {
    return (
      <Menu onClick={e => this.redirect(e.key)}
            mode="vertical"
            theme="dark"
            selectedKeys={this.state.selectedKey}>
        {Object.keys(this.menus).map(key => (
          <Menu.Item key={this.menus[key].link}>
            <Icon type={this.menus[key].icon}/>
            <span className="menu_item-text">{this.menus[key].title}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

LeftDrawer = connect(state => state)(LeftDrawer);

export default LeftDrawer;
