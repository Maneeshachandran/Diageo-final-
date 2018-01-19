import React from 'react';
import {Grid, Image,Header} from 'semantic-ui-react';
import HeaderComponent from './header.jsx';
import Footer from './footer.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.salesPerformance=this.salesPerformance.bind(this);
    this.yoyPerformance=this.yoyPerformance.bind(this);
    this.Scorecard=this.Scorecard.bind(this);
  }


  salesPerformance(){
    hashHistory.push('/productPerformance');
  }

  yoyPerformance(){
    hashHistory.push('/categoryPerformance');
  }

  Scorecard(){
    hashHistory.push('/customerSegmentation');
  }

  render() {
    return (<div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} >
            <HeaderComponent />
          </Grid.Column>
        </Grid.Row>
          <Grid.Row style={{marginLeft:'5%'}} >
            <Grid.Column width={5} >
              <Image className='pointer' src='./client/assets/images/sales.jpg' style={{height:'350px'}} onClick={this.salesPerformance}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Image className='pointer' src='./client/assets/images/compare (5).jpg' style={{height:'350px'}} onClick={this.yoyPerformance}/>
            </Grid.Column>
            <Grid.Column width={5} >
              <Image className='pointer' src='./client/assets/images/customer.jpg' style={{height:'350px'}} onClick={this.Scorecard}/>
            </Grid.Column>
          </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Footer />
        </Grid.Column>
      </Grid.Row>
      </Grid>
      </div>
      );
  }
}
