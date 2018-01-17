import React, {Component} from 'react';
import { Grid ,Container,Divider} from 'semantic-ui-react';
import Header from './header.jsx';
import HomePage from './homePage.jsx';


export default class ProductPerformance extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container className='product'>
        	<HomePage />
        </Container>
      </div>
    );
  }
}
