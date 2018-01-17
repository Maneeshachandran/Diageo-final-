import React from 'react';
import { Grid, Segment,Header,Checkbox,Table,Form,Radio,Divider} from 'semantic-ui-react';
import request from 'superagent';
import {Bar} from 'react-chartjs-2';
import "../styles/style.css";


export default class CusSegment extends React.Component
{
  constructor()
  {
    super();
    this.state={
      comp:['Amazon','Tesco','Sainsbury'],
      table:[],
      graphData:[],
      data:'',
      net:[],
      net1:[],
      table1:[],
      house:[],
      trip:[],
      unit:[],
      house1:[],
      trip1:[],
      unit1:[],
      value:'All',
      spendingSegments:["Elite -> €50 Avg weekly","primary - > €25 and <= €150 Avg weekly","secondary - > €10 and <= €25 Avg weekly","occasional - > €0 and <= €10 Avg weekly"],
      keyValues:['Netchange','HouseholdChange','Trips','Units'],
      customer:['Quick Fixers','Thirfty Expressers','Active Families','Transitional Families','Traditional Cookers','Empty Nesters','Golden Socials']}
  }
  componentDidMount()
  {
    request.post('/getBehavioural')
       .end((err, res) => {
         if (err || !res.ok) {
               alert('Oh no! error');
             } else {
              this.setState({data:res.body});
              var Netchange=[0,0,0,0,0,0,0],HouseholdChange=[0,0,0,0,0,0,0],Trips=[0,0,0,0,0,0,0],Units=[0,0,0,0,0,0,0],temp=[],net=[],house=[],trip=[],unit=[];
              var Netchange1=[0,0,0,0],HouseholdChange1=[0,0,0,0],Trips1=[0,0,0,0],Units1=[0,0,0,0],temp1=[],net1=[],house1=[],trip1=[],unit1=[];
              Object.values(this.state.data.behavourialsegments).map((item)=>{
                item.map((values)=>{
                  if(values.Name == 'Quick Fixers')
                  {
                    Netchange[0]+=values.Netchange
                    HouseholdChange[0]+=values.HouseholdChange
                    Trips[0]+=values.Trips
                    Units[0]+=values.Units

                  }
                  else
                  if(values.Name == 'Thirfty Expressers') {
                    Netchange[1]+=values.Netchange
                    HouseholdChange[1]+=values.HouseholdChange
                    Trips[1]+=values.Trips
                    Units[1]+=values.Units
                  }
                  else
                  if(values.Name == 'Active Families') {
                    Netchange[2]+=values.Netchange
                    HouseholdChange[2]+=values.HouseholdChange
                    Trips[2]+=values.Trips
                    Units[2]+=values.Units

                  }
                  else
                  if(values.Name == 'Transitional Families') {
                    Netchange[3]+=values.Netchange
                    HouseholdChange[3]+=values.HouseholdChange
                    Trips[3]+=values.Trips
                    Units[3]+=values.Units

                  }
                  else
                  if(values.Name == 'Traditional Cookers') {
                    Netchange[4]+=values.Netchange
                    HouseholdChange[4]+=values.HouseholdChange
                    Trips[4]+=values.Trips
                    Units[4]+=values.Units

                  }
                  else
                  if(values.Name == 'Empty Nesters') {
                    Netchange[5]+=values.Netchange
                    HouseholdChange[5]+=values.HouseholdChange
                    Trips[5]+=values.Trips
                    Units[5]+=values.Units

                  }
                  else
                  if(values.Name == 'Golden Socials') {
                    Netchange[6]+=values.Netchange
                    HouseholdChange[6]+=values.HouseholdChange
                    Trips[6]+=values.Trips
                    Units[6]+=values.Units
                  }
                })
              });

              temp.push(this.state.customer.map((item,key)=>{
                return(<Table.Row key={key}>
                  <Table.Cell className="customer" textAlign='left'>{item}</Table.Cell>
                  <Table.Cell textAlign='center'>{Netchange[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{HouseholdChange[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{Trips[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{Units[key]}</Table.Cell>
                </Table.Row>)
              }))

              Netchange.map((item,index)=>{
                net.push(item);
                house.push(HouseholdChange[index]);
                trip.push(Trips[index]);
                unit.push(Units[index]);
              });



              Object.values(this.state.data.spendingSegments).map((item)=>{
                item.map((values)=>{
                  if(values.Name == 'Elite -> €50 Avg weekly')
                  {
                    Netchange1[0]+=values.Netchange
                    HouseholdChange1[0]+=values.HouseholdChange
                    Trips1[0]+=values.Trips
                    Units1[0]+=values.Units
                  }
                  else
                  if(values.Name == 'primary - > €25 and <= €150 Avg weekly') {
                    Netchange1[1]+=values.Netchange
                    HouseholdChange1[1]+=values.HouseholdChange
                    Trips1[1]+=values.Trips
                    Units1[1]+=values.Units
                  }
                  else
                  if(values.Name == 'secondary - > €10 and <= €25 Avg weekly') {
                    Netchange1[2]+=values.Netchange
                    HouseholdChange1[2]+=values.HouseholdChange
                    Trips1[2]+=values.Trips
                    Units1[2]+=values.Units
                  }
                  else
                  if(values.Name == 'occasional - > €0 and <= €10 Avg weekly') {
                    Netchange1[3]+=values.Netchange
                    HouseholdChange1[3]+=values.HouseholdChange
                    Trips1[3]+=values.Trips
                    Units1[3]+=values.Units
                  }
                })
              });

              temp1.push(this.state.spendingSegments.map((item,key)=>{
                return(<Table.Row key={key}>
                  <Table.Cell className="customer" textAlign='left'>{item}</Table.Cell>
                  <Table.Cell textAlign='center'>{Netchange[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{HouseholdChange[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{Trips[key]}</Table.Cell>
                  <Table.Cell textAlign='center'>{Units[key]}</Table.Cell>
                </Table.Row>)
              }))

              Netchange1.map((item,index)=>{
                net1.push(item);
                house1.push(HouseholdChange[index]);
                trip1.push(Trips[index]);
                unit1.push(Units[index]);
              });

              this.setState({table:temp,net:net,house:house,trip:trip,unit:unit,table1:temp1,net1:net1,house1:house1,trip1:trip1,unit1:unit1})


             }
            });
  }

  handleChange(e,{value})
  {
    if(value == 'Amazon')
    {
      this.setState({value:value});
      var temp =[],net=[],house=[],trip=[],unit=[],temp1 =[],net1=[],house1=[],trip1=[],unit1=[];
      temp.push(this.state.data.behavourialsegments.Amazon.map((item,key)=>{
        if(item.Name == 'Quick Fixers')
        {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)
        }
        else
        if(item.Name == 'Thirfty Expressers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Active Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Transitional Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Traditional Cookers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Empty Nesters') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Golden Socials') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      temp1.push(this.state.data.spendingSegments.Amazon.map((item,key)=>{
        if(item.Name == 'Elite -> €50 Avg weekly')
        {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        else
        if(item.Name == 'primary - > €25 and <= €150 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'secondary - > €10 and <= €25 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'occasional - > €0 and <= €10 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      this.setState({table:temp,net:net,house:house,trip:trip,unit:unit,table1:temp1,net1:net1,house1:house1,trip1:trip1,unit1:unit1})
    }
    else
    if(value == 'All')
    {
      this.setState({value:value});
      var Netchange=[0,0,0,0,0,0,0],HouseholdChange=[0,0,0,0,0,0,0],Trips=[0,0,0,0,0,0,0],Units=[0,0,0,0,0,0,0],temp=[],net=[],house=[],trip=[],unit=[];
      var Netchange1=[0,0,0,0],HouseholdChange1=[0,0,0,0],Trips1=[0,0,0,0],Units1=[0,0,0,0],temp1=[],net1=[],house1=[],trip1=[],unit1=[];
      Object.values(this.state.data.behavourialsegments).map((item)=>{
        item.map((values)=>{
          if(values.Name == 'Quick Fixers')
          {
            Netchange[0]+=values.Netchange
            HouseholdChange[0]+=values.HouseholdChange
            Trips[0]+=values.Trips
            Units[0]+=values.Units

          }
          else
          if(values.Name == 'Thirfty Expressers') {
            Netchange[1]+=values.Netchange
            HouseholdChange[1]+=values.HouseholdChange
            Trips[1]+=values.Trips
            Units[1]+=values.Units
          }
          else
          if(values.Name == 'Active Families') {
            Netchange[2]+=values.Netchange
            HouseholdChange[2]+=values.HouseholdChange
            Trips[2]+=values.Trips
            Units[2]+=values.Units

          }
          else
          if(values.Name == 'Transitional Families') {
            Netchange[3]+=values.Netchange
            HouseholdChange[3]+=values.HouseholdChange
            Trips[3]+=values.Trips
            Units[3]+=values.Units

          }
          else
          if(values.Name == 'Traditional Cookers') {
            Netchange[4]+=values.Netchange
            HouseholdChange[4]+=values.HouseholdChange
            Trips[4]+=values.Trips
            Units[4]+=values.Units

          }
          else
          if(values.Name == 'Empty Nesters') {
            Netchange[5]+=values.Netchange
            HouseholdChange[5]+=values.HouseholdChange
            Trips[5]+=values.Trips
            Units[5]+=values.Units

          }
          else
          if(values.Name == 'Golden Socials') {
            Netchange[6]+=values.Netchange
            HouseholdChange[6]+=values.HouseholdChange
            Trips[6]+=values.Trips
            Units[6]+=values.Units
          }
        })
      });

      temp.push(this.state.customer.map((item,key)=>{
        return(<Table.Row key={key}>
          <Table.Cell className="customer" textAlign='left'>{item}</Table.Cell>
          <Table.Cell textAlign='center'>{Netchange[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{HouseholdChange[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{Trips[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{Units[key]}</Table.Cell>
        </Table.Row>)
      }))

      Netchange.map((item,index)=>{
        net.push(item);
        house.push(HouseholdChange[index]);
        trip.push(Trips[index]);
        unit.push(Units[index]);
      });



      Object.values(this.state.data.spendingSegments).map((item)=>{
        item.map((values)=>{
          if(values.Name == 'Elite -> €50 Avg weekly')
          {
            Netchange1[0]+=values.Netchange
            HouseholdChange1[0]+=values.HouseholdChange
            Trips1[0]+=values.Trips
            Units1[0]+=values.Units
          }
          else
          if(values.Name == 'primary - > €25 and <= €150 Avg weekly') {
            Netchange1[1]+=values.Netchange
            HouseholdChange1[1]+=values.HouseholdChange
            Trips1[1]+=values.Trips
            Units1[1]+=values.Units
          }
          else
          if(values.Name == 'secondary - > €10 and <= €25 Avg weekly') {
            Netchange1[2]+=values.Netchange
            HouseholdChange1[2]+=values.HouseholdChange
            Trips1[2]+=values.Trips
            Units1[2]+=values.Units
          }
          else
          if(values.Name == 'occasional - > €0 and <= €10 Avg weekly') {
            Netchange1[3]+=values.Netchange
            HouseholdChange1[3]+=values.HouseholdChange
            Trips1[3]+=values.Trips
            Units1[3]+=values.Units
          }
        })
      });

      temp1.push(this.state.spendingSegments.map((item,key)=>{
        return(<Table.Row key={key}>
          <Table.Cell className="customer" textAlign='left'>{item}</Table.Cell>
          <Table.Cell textAlign='center'>{Netchange[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{HouseholdChange[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{Trips[key]}</Table.Cell>
          <Table.Cell textAlign='center'>{Units[key]}</Table.Cell>
        </Table.Row>)
      }))

      Netchange1.map((item,index)=>{
        net1.push(item);
        house1.push(HouseholdChange[index]);
        trip1.push(Trips[index]);
        unit1.push(Units[index]);
      });

      this.setState({table:temp,net:net,house:house,trip:trip,unit:unit,table1:temp1,net1:net1,house1:house1,trip1:trip1,unit1:unit1})

    }
    else
    if(value == 'Tesco')
    {
      this.setState({value:value});
      var temp =[],net=[],house=[],trip=[],unit=[],temp1 =[],net1=[],house1=[],trip1=[],unit1=[];
      temp.push(this.state.data.behavourialsegments.Tesco.map((item,key)=>{
        if(item.Name == 'Quick Fixers')
        {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)
        }
        else
        if(item.Name == 'Thirfty Expressers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Active Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Transitional Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Traditional Cookers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Empty Nesters') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Golden Socials') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      temp1.push(this.state.data.spendingSegments.Tesco.map((item,key)=>{
        if(item.Name == 'Elite -> €50 Avg weekly')
        {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        else
        if(item.Name == 'primary - > €25 and <= €150 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'secondary - > €10 and <= €25 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'occasional - > €0 and <= €10 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      this.setState({table:temp,net:net,house:house,trip:trip,unit:unit,table1:temp1,net1:net1,house1:house1,trip1:trip1,unit1:unit1})
    }
    else
    if(value == 'Sainsbury')
    {
      this.setState({value:value});
      var temp =[],net=[],house=[],trip=[],unit=[],temp1 =[],net1=[],house1=[],trip1=[],unit1=[];
      temp.push(this.state.data.behavourialsegments.Sainsbury.map((item,key)=>{
        if(item.Name == 'Quick Fixers')
        {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)
        }
        else
        if(item.Name == 'Thirfty Expressers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)

        }
        else
        if(item.Name == 'Active Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Transitional Families') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Traditional Cookers') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Empty Nesters') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        else
        if(item.Name == 'Golden Socials') {
          net.push(item.Netchange)
          house.push(item.HouseholdChange)
          trip.push(item.Trips)
          unit.push(item.Units)



        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      temp1.push(this.state.data.spendingSegments.Sainsbury.map((item,key)=>{
        if(item.Name == 'Elite -> €50 Avg weekly')
        {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        else
        if(item.Name == 'primary - > €25 and <= €150 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'secondary - > €10 and <= €25 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)

        }
        else
        if(item.Name == 'occasional - > €0 and <= €10 Avg weekly') {
          net1.push(item.Netchange)
          house1.push(item.HouseholdChange)
          trip1.push(item.Trips)
          unit1.push(item.Units)
        }
        return(
          <Table.Row key={key}>
            <Table.Cell className="customer" textAlign='left'>{item.Name}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Netchange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.HouseholdChange}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Trips}</Table.Cell>
            <Table.Cell textAlign='center'>{item.Units}</Table.Cell>
          </Table.Row>
        )
      }))

      this.setState({table:temp,net:net,house:house,trip:trip,unit:unit,table1:temp1,net1:net1,house1:house1,trip1:trip1,unit1:unit1})

    }
  }

  render()
  {

      const data = {
    labels: this.state.customer,
    datasets: [
      {
        label: 'Net % change',
        backgroundColor: 'rgba(6,115,204,1)',
        borderColor: 'rgba(6,115,204,1)',
        borderWidth: 1,
        data:this.state.net
      },
      {
        label: '% HH change',
        backgroundColor: 'rgba(228,80,80,1)',
        borderColor: 'rgba(228,80,80,1)',
        borderWidth: 1,
        data:this.state.house
      },
      {
        label: 'Trips % change',
        backgroundColor: 'rgba(122,150,55,1)',
        borderColor: 'rgba(122,150,55,1)',
        borderWidth: 1,
        data:this.state.trip
      },{
        label: 'Units % change',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1,
        data:this.state.unit
      }

    ]
  };

  const data1 = {
labels: this.state.spendingSegments,
datasets: [
  {
    label: 'Net % change',
    backgroundColor: 'rgba(6,115,204,1)',
    borderColor: 'rgba(6,115,204,1)',
    borderWidth: 1,
    data:this.state.net1
  },
  {
    label: '% HH change',
    backgroundColor: 'rgba(228,80,80,1)',
    borderColor: 'rgba(228,80,80,1)',
    borderWidth: 1,
    data:this.state.house1
  },
  {
    label: 'Trips % change',
    backgroundColor: 'rgba(122,150,55,1)',
    borderColor: 'rgba(122,150,55,1)',
    borderWidth: 1,
    data:this.state.trip1
  },{
    label: 'Units % change',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    data:this.state.unit1
  }

]
};
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <h1>Segmentation Performance </h1>
            </Grid.Column>
          </Grid.Row>
          <Divider className="divider"/>
          <Grid.Row >
            <Grid.Column width={16}>
              <h2 className="title1" style={{marginTop:'-1%',color:'white',  fontStretch: 'condensed',textAlign:'center'}}>Behavioural Segmentation  </h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} style={{marginLeft:'5px'}}>
              <Segment >
                  <center><Header as='h4' ><span className="checkboxHeaderFont">CHANNEL PARTNERS</span></Header></center>
                    <h5  style={{marginTop:'1%'}}>Please select one</h5>
                  <Form style={{marginLeft:'25px',marginTop:'10px'}}>
                      <Form.Field>
                        <Checkbox radio
                          label='All'
                          name='radioGroup'
                          value='All'
                          checked={this.state.value === 'All'}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox radio
                          label='Amazon'
                          name='radioGroup'
                          value='Amazon'
                          checked={this.state.value === 'Amazon'}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox radio
                          label='Tesco'
                          name='radioGroup'
                          value='Tesco'
                          checked={this.state.value === 'Tesco'}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox radio
                          label='Sainsbury'
                          name='radioGroup'
                          value='Sainsbury'
                          checked={this.state.value === 'Sainsbury'}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Form.Field>
                  </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
            <Table celled >
                <Table.Header className="tablehead" style={{color:'white'}}>
                  <Table.Row >
                    <Table.HeaderCell textAlign='center'>CUSTOMER VS YEAR AGO</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>NET $ CHANGE</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>% OF HHs CHANGE </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>TRIPS % CHANGE</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>UNITS % CHANGE</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body  style={{color:'black'}}>
                  {this.state.table}
                </Table.Body>

          </Table>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} style={{marginLeft:'10px'}}>
                  <Bar
              data={data}
              width={100}
              height={350}
              options={{
                maintainAspectRatio: false
              }}
            />
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row>
            <Grid.Column width={16}>
              <h2 className="title">Spending Segmentation  </h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} style={{marginLeft:'10px'}}>
            <Segment >
              <center><Header as='h4' ><span className="checkboxHeaderFont">CHANNEL PARTNERS</span></Header></center>
              <h5 style={{marginTop:'1%'}}>Please select one</h5>
              <Form style={{marginLeft:'25px',marginTop:'10px'}}>
                  <Form.Field>
                    <Checkbox radio
                      label='All'
                      name='radioGroup'
                      value='All'
                      checked={this.state.value === 'All'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox radio
                      label='Amazon'
                      name='radioGroup'
                      value='Amazon'
                      checked={this.state.value === 'Amazon'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox radio
                      label='Tesco'
                      name='radioGroup'
                      value='Tesco'
                      checked={this.state.value === 'Tesco'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox radio
                      label='Sainsbury'
                      name='radioGroup'
                      value='Sainsbury'
                      checked={this.state.value === 'Sainsbury'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Field>
              </Form>
            </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
            <Table celled >
                <Table.Header className="tablehead" style={{color:'white'}}>
                  <Table.Row>
                    <Table.HeaderCell>CUSTOMER VS YEAR AGO</Table.HeaderCell>
                    <Table.HeaderCell>NET $ CHANGE</Table.HeaderCell>
                    <Table.HeaderCell>% OF HHs CHANGE </Table.HeaderCell>
                    <Table.HeaderCell>TRIPS % CHANGE</Table.HeaderCell>
                    <Table.HeaderCell>UNITS % CHANGE</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body style={{color:'black'}}>
                  {this.state.table1}
                </Table.Body>

          </Table>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} style={{marginLeft:'10px'}}>
                  <Bar
              data={data1}
              width={100}
              height={350}
              options={{
                maintainAspectRatio: false
              }}
            />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}
