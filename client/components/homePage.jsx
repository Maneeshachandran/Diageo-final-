import React, {Component} from 'react';
import {Checkbox, Grid, Form, Table, Divider, Dropdown ,Segment} from 'semantic-ui-react';
import request from 'superagent';
import {Line ,Bar} from 'react-chartjs-2';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
import "../styles/style.css";
var newArr2 = [];
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      value1: '',
      productvalue:'',
      productvalue1:'',
      promovalue:'',
      promovalue1:'',
      categoryOptions: [],
      productOptions: [],
      promoOptions:[],
      channelPartners:[],
      allSaleData:[],
      partnerall:[],
      totalSales:[],
      months:[],
      wholeGraphData1:[],
      partnerSales:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.productChange = this.productChange.bind(this);
    this.handlePromoChange = this.handlePromoChange.bind(this);
    this.promocodeChange = this.promocodeChange.bind(this);
    this.getCheckBoxStatus = this.getCheckBoxStatus.bind(this);
  }
  handleChange(e, value) {
    this.setState({value: value.value, value1: value.label,productvalue:'',productOptions:[],channelPartners:[],partnerSales:[],totalSales:[],wholeGraphData1:[],partnerall:[],productvalue1:[],promovalue1:[]})
    this.handleCategoryChange(value.label);
  }
  productChange(e,value){
    this.setState({productvalue: value.value, productvalue1: value.label,promovalue:'',channelPartners:[],partnerSales:[],totalSales:[],wholeGraphData1:[],partnerall:[],promoOptions:[],promovalue1:''})
    this.handleProductChange(value.label);
  }
  promocodeChange(e,value){
    var context=this;
      context.setState({promovalue: value.value, promovalue1: value.label,wholeGraphData1:[],totalSales:[],partnerSales:[],partnerall:[]},function(){
        this.handlePromoChange(this.state.promovalue1);
      })

  }

  componentWillMount() {
    var context = this;
    var category = [];
    var categoryNew = [];
    var tempValue = [];

    request.post('/getCategory').end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body.map((item, i) => {
          category.push(item);
        })
        category = category.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        category.map((item, i) => {
          categoryNew.push({key: item, value: item, text: item});
        })
        context.setState({categoryOptions: categoryNew});
      }
    });

    request.post('/getSalesDetails')
      .end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          res.body.map((item) => {
            item.promoCode.map((item1) => {
              tempValue.push({partner: item1.partner, sale: item1.sale});
            })
          })
          context.setState({allSaleData: tempValue});
        }
      });

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
   var promocodes=[];
   var promocodesNew=[];
   context.setState({selectedProduct:result});
   request.post('/getPromocode')
   .query({product:result})
   .end(function(err, res){
     if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           res.body.map((item,i)=>{
             promocodes.push({key:item,value:item,text:item});
           })
           context.setState({promoOptions:promocodes});
         }
        });
 }
 handlePromoChange(result) {
    var context = this;
    var channelName = [];
    var channelValue = [];
    var monthName = [];
    var weekName = [];
    var weekSale = [];
    var newArr3 = [];
    context.setState({selectedPromo: result});

      request.post('/getTotalSales')
      .query({promo2: result})
      .end(function(err, res) {
        var x=[];
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          console.log("getTotalSales");
          var name = [];
          res.body.map((item, i) => {
            monthName.push(Object.keys(item.value));
            name.push({value: Object.values(item.value),Name: item.name});
            x.push({value: Object.values(item.value),Name: item.name});
          })
          context.setState({wholeGraphData1: x},function(){
            console.log(this.state.wholeGraphData1);
          });
           monthName.map((item)=>{
             newArr2 = newArr2.concat(item);
          })
          newArr2 = newArr2.filter( function( item, index, inputArray ) {
             return inputArray.indexOf(item) == index;
           });

          context.setState({months:newArr2});
         context.setState({partnerSales: name});
        }
      })

      request.post('/getPromoSales')
      .query({promoSales: result})
      .end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          var amt = "€" + res.text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          context.setState({totalSales: amt});
        }
      });

      request.post('/getSales')
      .query({check:result})
      .end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          console.log("getSales");
          console.log(res.body);
            context.setState({allSaleData:res.body});
        }
      });

      request.post('/getChannels')
      .query({promo: result})
      .end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          console.log("getChannels");
          context.setState({partnerDetails: res.body});
          res.body.map((item, i) => {
            channelValue = Object.values(item);
            channelName = Object.keys(item);
          })
          context.setState({channelPartners: channelName}, function() {
            var temp1 = [];
            context.state.allSaleData.map((item) => {
              temp1.push({partner: item.partner, sale: item.sale});
            })
            context.setState({partnerall: temp1});
          })
        }
        });
    }

    getCheckBoxStatus(e, data) {
      var temp = this.state.partnerSales;
      var context = this;
      var selectSale = {};
      var array = [];
      var checkArray1 = [];
      var checkArray = this.state.partnerSales;
      if (data.checked == true) {
        var temp1 = this.state.partnerall;
        context.state.allSaleData.map((item5) => {
          if (item5.partner == data.name) {
            temp1.push({partner: data.name, sale: item5.sale})
          }
        })
        context.setState({partnerall: temp1});

        var temp10 = this.state.wholeGraphData1;
        temp10.map((item10)=>{
          if(data.name==item10.Name){
            temp.push({Name:item10.Name,value:item10.value});
          }
        })
        context.setState({partnerSales: temp});


      } else {
        var temp = this.state.partnerSales;

        temp.map((item)=>{
          if(item.Name == data.name){
            temp.splice(temp.indexOf(item),1)
          }
        })
          context.setState({partnerSales:temp});

        var temp4 = context.state.partnerall;
        temp4.map((item) => {
          if (item.partner == data.name) {
            temp4.splice(temp4.indexOf(item), 1)
          }
        })
        this.setState({partnerall: temp4});
      }
    }


  render() {

    var dump=[];
    var value1=[];
    this.state.partnerSales.map((item)=>{
      dump.push(item.value);
    })
    dump.map((item)=>{
      item.map((item1)=>{
        var x=parseFloat(item1.replace(/[^\d\.]/g,''));
        value1.push(x);
      })
    })

    var temparray = [];
    var markers=[];
      if (value1.length > 0) {
        var split = 6;
        for (var i = 0; i < value1.length; i += 6) {
          temparray = value1.slice(i, i + split);
          markers.push(temparray);
        }
      }

        var data = {
        labels: newArr2,
        datasets: []
      };
    markers.map((item,index)=>{
      var temp=[];
      var label = '';
      var color = '';

      var ee=[];
      var temparray5=[];
      this.state.partnerSales.map((item1)=>{

        if(item1.Name == "Tesco" ){

          var ww=[];
          item1.value.map((item20)=>{

              var x=parseFloat(item20.replace(/[^\d\.]/g,''));
              ww.push(x);
          })
          if(item.toString()==ww.toString()){
          temp=item;
          label='Tesco';
          color = 'rgba(75,192,192,1)';
          }
        }
        else if(item1.Name == "Amazon"){
          var ww=[];
          item1.value.map((item20)=>{
              var x=parseFloat(item20.replace(/[^\d\.]/g,''));
              ww.push(x);
          })
          if(item.toString()==ww.toString()){
            temp=item;
            label='Amazon';
            color='#f4a142';
          }

        }
        else if(item1.Name == "Sainsbury" ){
          var ww=[];
          item1.value.map((item20)=>{
              var x=parseFloat(item20.replace(/[^\d\.]/g,''));
              ww.push(x);
          })
          if(item.toString()==ww.toString()){
            temp=item;
            label='Sainsbury';
            color='#498437';
          }
        }
      })
      data.datasets.push({
            label: label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: temp
          })
    })

    var category = (this.state.categoryOptions.map((item) => {
      return (<div>
        <Checkbox radio label={item.key} name='checkboxRadioGroup1' value={item.key} checked={this.state.value == item.key} onChange={this.handleChange}/></div>)
    }))
    var product = (this.state.productOptions.map((item1) => {
      return (<div>
        <Checkbox radio label={item1.key} name='checkboxRadioGroup2' value={item1.key} checked={this.state.productvalue == item1.key} onChange={this.productChange}/></div>)
    }))
    var promocode = (this.state.promoOptions.map((item2) => {
      return (<div>
        <Checkbox radio label={item2.key} name='checkboxRadioGroup3' value={item2.key} checked={this.state.promovalue == item2.key} onChange={this.promocodeChange}/></div>)
    }))
    let inputs = (this.state.channelPartners.map((item, index) => {
      return (<div>
        <Checkbox label={item} name={item} key={index} onChange={this.getCheckBoxStatus} defaultChecked="defaultChecked"/>
      </div>)
    }))

    return (
      <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
        <h1>Promocode Performance </h1>
          </Grid.Column>
      </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} style={{backgroundColor:'white',marginTop:'-1.3%'}} className="formstyle">
            <Form style={{marginTop:'10%',marginBottom:'10%',marginLeft:'10%'}}>
              {/* <Divider hidden/> */}
              <Form.Field>
                <h3 >CATEGORY </h3>
                <h5 className="h5" >Please select one</h5>
                {category}
              </Form.Field>
              {this.state.value1 == 0 ? null : <Form.Field>
                <h3>PRODUCT</h3>
                  <h5 className="h5">Please select one</h5>
                  {product}
              </Form.Field>
            }
              {(this.state.productvalue1 == 0 || this.state.promoOptions == 0 ) ? null : <div><Form.Field>
                <h3>PROMOCODE</h3>
                  <h5 className="h5">Please select one</h5>
                  {promocode}
              </Form.Field>
            </div>
          }
              { this.state.channelPartners.length == 0 ? null : <Form.Field>
                <h3 style={{marginTop:'10%'}}>PARTNERS</h3> {inputs}
              </Form.Field>
              }
            </Form>
          </Grid.Column>
          <Grid.Column width={13} style={{marginTop:'-1.3%'}}>
            <Table celled structured>
              <Table.Header >
                <Table.Row className="tablehead">
                  <Table.HeaderCell rowSpan='2' textAlign='center'>CATEGORY</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>PRODUCT</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>PROMOCODE</Table.HeaderCell>
                  <Table.HeaderCell  rowSpan='2' textAlign='center'>TOTAL SALES</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2' textAlign='center'>PARTNERS</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 1</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 2</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 3</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 4</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 5</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' textAlign='center'>WEEK 6</Table.HeaderCell>
                </Table.Row>
                <Table.Row className="tablehead">
                  <Table.HeaderCell textAlign='center'>CHANNEL</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>AGGREGATE</Table.HeaderCell>
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
                    {this.state.promovalue1}
                  </Table.Cell>
                   <Table.Cell textAlign='center'>
                     {this.state.totalSales}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {this.state.partnerall.map((item)=>{
                      return(<div>{item.partner}</div>)
                    })}
                 </Table.Cell>
                 <Table.Cell textAlign='center'>
                   {this.state.partnerall.map((item)=>{
                     return(<div>{item.sale}<br/></div>)
                   })}
                </Table.Cell>
                 <Table.Cell textAlign='center' >
                   {this.state.partnerSales.map((item)=>{
                     return( <div><span>{item.value[0]}</span></div>)
                   })}
                </Table.Cell>
                <Table.Cell textAlign='center' >
                  {this.state.partnerSales.map((item)=>{
                    return( <div>{item.value[1]}</div>)
                  })}
               </Table.Cell>
               <Table.Cell textAlign='center' >
                 {this.state.partnerSales.map((item)=>{
                   return( <div>{item.value[2]}</div>)
                 })}
              </Table.Cell>
              <Table.Cell textAlign='center' >
                {this.state.partnerSales.map((item)=>{
                  return( <div>{item.value[3]}</div>)
                })}
             </Table.Cell>
             <Table.Cell textAlign='center' >
               {this.state.partnerSales.map((item)=>{
                 return( <div>{item.value[4]}</div>)
               })}
            </Table.Cell>
            <Table.Cell textAlign='center' >
              {this.state.partnerSales.map((item)=>{
                return( <div>{item.value[5]}</div>)
              })}
           </Table.Cell>
              </Table.Row>
              </Table.Body>
            </Table>

            <Zoom>
            <Segment inverted>
                <Line className="graph"
                  data={data}
                   height={110}
                   options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero:true,
                          }
                        }]
                      }
                    }}/>
           </Segment>
           </Zoom>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>)
  }
}
