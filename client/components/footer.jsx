import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';


export default class footer extends Component {
  render() {
    return (
      <div>
        <Image className='pointer' src='./client/assets/images/footer.png' style={{marginTop:'3%'}} />
      </div>
    );
  }
}
