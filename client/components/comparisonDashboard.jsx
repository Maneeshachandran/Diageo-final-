import React, {Component} from 'react';
import {Checkbox, Grid, Form, Table, Divider, Dropdown ,Segment} from 'semantic-ui-react';
import request from 'superagent';
import {Bar} from 'react-chartjs-2';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
import "../styles/style.css";

export default class comparisonDashboard extends Component {
  constructor() {
    super();
    this.state = {
       value: '',
      value1: '',
      productvalue:'',
      productvalue1:'',
      categoryOptions: [],
      productOptions: [],
      channelNameList:[],
      selectedValue:[],
      comparisonData:[],
         };
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.getCheckBox=this.getCheckBox.bind(this);
  }

  componentWillMount(){
    var context = this;
    var category=[];
    var categoryNew=[];

       request.post('/getCategory')
       .end(function(err, res){
         if (err || !res.ok) {
               alert('Oh no! error');
             } else {
              res.body.map((item,i)=>{
                category.push(item);
              })
              category = category.filter( function( item, index, inputArray ) {
                 return inputArray.indexOf(item) == index;
               });
               category.map((item,i)=>{
                 categoryNew.push({key:item,value:item,text:item});
               })
               context.setState({categoryOptions:categoryNew});
             }
            });

            request.post('/comparison')
             .end(function(err, res){
               if (err || !res.ok) {
                     alert('Oh no! error');
                   } else {
                     context.setState({comparisonData:res.body},function(){
                     })
                   }
                  });
  }
  handleChange(e, value) {
    this.setState({value: value.value, value1: value.label,productvalue:'',channelNameList:[],selectedValue:[],productvalue1:[]})
    this.handleCategoryChange(value.label);
  }
productChange(e,value){
  if(value.checked == true){
  this.setState({productvalue:value.value, productvalue1: value.label,channelNameList:[],selectedValue:[]})
  this.handleProductChange(value.label);
}
}
  handleCategoryChange(result) {
    var context = this;
    var products = [];
    var productNew = [];
    context.setState({selectedCategory: result});
    request.post('/getProduct').query({product: result}).end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body[0].map((item) => {
          productNew.push({key: item, value: item, text: item});
        })
        context.setState({productOptions: productNew,promoOptions:[]});
      }
    });
  }

  handleProductChange(result){
    var context=this;
    var channelValue=[];
    var temp = [];
    var channel=[];
    var channelSales=[];
    console.log(result,"result");
    this.state.comparisonData.map((item)=>{
      channel.push(item.channel);
      });
      context.setState({channelNameList:channel});

    this.state.comparisonData.map((item)=>{
      if(item.product == result){
        channelSales.push({partner:item.channel,sales:item.sales,household:item.household});
      }
      });
      context.setState({selectedValue:channelSales});
  }

  getCheckBox(e,data){
    var temp = this.state.selectedValue;
    if(data.checked == true){
      var temp1 = this.state.comparisonData;
       temp1.map((item)=>{
        if(data.name == item.channel){
          temp.push({partner:item.channel,sales:item.sales,household:item.household});
        }
      })
      this.setState({selectedValue:temp});
    }
    else{
      var temp=this.state.selectedValue;
      temp.map((item)=>{
        if(item.partner == data.name){
          temp.splice(temp.indexOf(item),1)
        }
      })
      this.setState({selectedValue:temp});
    }
  }

  render() {
     var category = (this.state.categoryOptions.map((item) => {
      return (<div>
        <Checkbox radio label={item.key} name='checkboxRadioGroup1' value={item.key} checked={this.state.value == item.key} onChange={this.handleChange}/></div>)
    }))
    var product = (this.state.productOptions.map((item1) => {
      return (<div>
        <Checkbox radio label={item1.key} name='checkboxRadioGroup2' value={item1.key} checked={this.state.productvalue == item1.key} onChange={this.productChange.bind(this)}/></div>)
    }))
    var inputs =  (this.state.channelNameList.map((item, index)=> {
        return (
          <div>
                  <Checkbox label={item} name={item}
                    key={index} onChange={this.getCheckBox} defaultChecked/>
          </div>
        )
      })
      )

      var chart1=[];
      var chart2=[];
      var chartpartners1=[];
      var chartpartners2=[];
      var household1=[];
      var household2=[];
      var chartpartnersName=[];

       this.state.selectedValue.map((item)=>{
          var x=parseFloat(item.sales[0].sale16.replace(/[^\d\.]/g,''));
          chartpartners1.push(x);
          var y=parseFloat(item.sales[0].sale17.replace(/[^\d\.]/g,''));
          chartpartners2.push(y);
      })

      this.state.selectedValue.map((item)=>{
        var x=parseFloat(item.household[0].household16.replace(/\,/g,''));
          household1.push(x);
        var y=parseFloat(item.household[0].household17.replace(/\,/g,''));
          household2.push(y);
     })
      this.state.selectedValue.map((item)=>{
          chartpartnersName.push(item.partner);
      })

  chart1={
    labels: chartpartnersName,
    datasets: [
      {
        label: '2016',
        backgroundColor: 'rgba(6,115,204,1)',
        borderColor: 'rgba(6,119,204,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(6,115,204,1)',
        hoverBorderColor: 'rgba(6,119,204,1)',
        data: chartpartners1
      },
      {
        label: '2017',
        backgroundColor: 'rgba(56,150,121,1)',
        borderColor: 'rgba(56,150,121,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(56,150,121,1)',
        hoverBorderColor: 'rgba(56,150,121,1)',
        data: chartpartners2
      }

    ]
  };

  chart2={
    labels: chartpartnersName,
    datasets: [
      {
        label: '2016',
        backgroundColor: 'rgba(6,115,204,1)',
        borderColor: 'rgba(6,119,204,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(6,115,204,1)',
        hoverBorderColor: 'rgba(6,119,204,1)',
        data: household1
      },
      {
        label: '2017',
        backgroundColor: 'rgba(56,150,121,1)',
        borderColor: 'rgba(56,150,121,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(56,150,121,1)',
        hoverBorderColor: 'rgba(56,150,121,1)',
        data: household2
      }

    ]
  };


    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <h1>Year on Year Comparison </h1>
            </Grid.Column>
        </Grid.Row>
          <Grid.Row>
          <Grid.Column width={3} style={{backgroundColor:'white',marginTop:'-1.3%'}} className="formstyle">
            <Form style={{marginTop:'10%',marginBottom:'10%',marginLeft:'10%'}}>
              <Form.Field>
                <h3>CATEGORY</h3>
                  <h5 className="h5" >Please select one</h5>
                  {category}
              </Form.Field>
              {this.state.value1 == 0 ? null : <Form.Field>
                 <h3>PRODUCT</h3>
                   <h5 className="h5" >Please select one</h5>
                 {product}
               </Form.Field> }
              {this.state.productvalue != 'Bell\'s' ? null : <Form.Field>
                <h3>PARTNERS</h3>
                {inputs}
              </Form.Field>
            }
            </Form>
          </Grid.Column>
          <Grid.Column width={13} style={{marginTop:'-1.3%'}}>
            <Grid.Row>
            <Table celled structured>
              <Table.Header >
                <Table.Row className="tablehead" style={{height:'1px'}}>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>CATEGORY</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>PRODUCT</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>CHANNEL</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2' textAlign='center'>SALES</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2' textAlign='center'>NO.OF HOUSEHOLDS</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row className="tablehead">
                    <Table.HeaderCell textAlign='center'>2016</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>2017</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>2016</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>2017</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row className="tablecell">
                  <Table.Cell  textAlign='center'>
                      {this.state.value1}
                  </Table.Cell>
                   <Table.Cell  textAlign='center'>
                    {this.state.productvalue1}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {this.state.selectedValue.map((item)=>{
                      return(<div>{item.partner}</div>)
                    })}
                 </Table.Cell>
                 <Table.Cell textAlign='center'>
                   {this.state.selectedValue.map((item)=>{
                      return(<div>{item.sales[0].sale16}</div>);
                  })}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {this.state.selectedValue.map((item)=>{
                     return(<div>{item.sales[0].sale17}</div>);
                 })}
               </Table.Cell>
               <Table.Cell textAlign='center'>
                 {this.state.selectedValue.map((item)=>{
                    return(<div>{item.household[0].household16}</div>);
                })}
               </Table.Cell>
               <Table.Cell textAlign='center'>
                 {this.state.selectedValue.map((item)=>{
                    return(<div>{item.household[0].household17}</div>);
                })}
              </Table.Cell>
              </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Row>
          <Grid>
          <Grid.Row style={{marginTop:'1.3%'}}>
            <Grid.Column width={8}>
              <h4>Sales</h4>
            <Zoom>
              <Segment inverted>
                <Bar
                  data={chart1}
                  height={220}
                  options={{
                    scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
                  }}
                />
            </Segment>
           </Zoom>
         </Grid.Column>
         <Grid.Column width={8}>
           <h4>Household</h4>
         <Zoom>
           <Segment inverted>
             <Bar
          data={chart2}
          height={220}
          options={{
            scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
          }}
        />
         </Segment>
        </Zoom>
      </Grid.Column>
         </Grid.Row>
         </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
}
