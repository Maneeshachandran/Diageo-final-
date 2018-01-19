import React, {Component} from 'react';
import { Menu, Image ,Label ,Link} from "semantic-ui-react";
import "../styles/style.css";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
export default class Header extends Component {
  constructor() {
    super();
    this.state = { activeItem: "" };
  }
  handleItemClick() {
    hashHistory.push('/');
  }
  render() {
    const { activeItem } = this.state;
    return (
      <Menu className="menu">
        <Menu.Item style={{marginLeft:'7%',marginRight:'3.8%'}}>
          <Image className="pointer" size="small" src='./client/assets/images/diageo_logo.png' title='diageo' alt='Diageo Logo' onClick={this.handleItemClick}/>
        </Menu.Item>
        <Menu.Menu>
        <Menu.Item >
              <a href="https://www.diageo.com/en/our-brands/" target="_blank"><h4>
                <span className="menuItem">OUR BRANDS</span>
              </h4></a>
        </Menu.Item>
        <Menu.Item >
              <h4 className="pointer" onClick={this.handleItemClick}>
                <span className="menuItem">SALES REPORT</span>
              </h4>
        </Menu.Item>
      </Menu.Menu>
      </Menu>
    );
  }
}
