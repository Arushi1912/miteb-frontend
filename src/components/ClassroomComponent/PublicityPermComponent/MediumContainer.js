import React from 'react';
import {connect} from 'react-redux';
import {List,ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
//import { Route , Link } from 'react-router';

class MediumContainer extends React.Component {
	constructor(props){
		super(props);
    this.handleClick.bind(this);
    this.handleToggle.bind(this);
		this.state =  {
      checkboxValue : 0,
      checked: [true, false, false, false],
      clickedValue: 0,
      indexes: [{ '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false }],
      clicked: true,
      object: { 0: 'Banner', 1: 'InfoDesk', 2: 'Digital Board', 3: 'Poster'}

		}
  }
  updateShared(){
    this.props.updateShared(this.state.checked);
  }
  handleClick(location){
    //console.log('i have been clicked',location)
    this.setState({
      clickedValue: location,
      clicked: true
    })
  }
  handleToggle(s,i){
    let indexes = this.state.indexes;
    (indexes[s])[i]=!(indexes[s])[i];
    this.setState({indexes});
    this.props.updateToggle(indexes);
  }
  updateCheck(value){
      var checked_array = this.state.checked;
      checked_array[value] = !checked_array[value];
      this.setState((oldState) => {
        return {
          checked: checked_array
        }
      })
      this.props.updateShared(this.state.checked);
    };
  renderCard() {
    var value = this.state.clickedValue;
    var clicked = value || value === 0? true : false;
    console.log('clicked',clicked);
    var medium = this.state.object[value];
    var steps = ["Academic Blocks", "First Year Hostel Blocks", "Senior Hostel Blocks","Mess"]
    var list_sec = ["NLH,AB1,AB2,AB5,IC","XI,XII,XCI,XVII,XVIII","IX,XIII,XIV","FC,Annapoorna,Apoorva"]
      return (<div style={{minWidth:500}}>
        <Card>
        <CardText expandable={this.state.clickedValue}>
         <List>
         <Subheader> {medium} </Subheader>
                {steps.map((step,index) =>  {
                  var a = "" + value + index;
                  return (<div><ListItem key={a} secondaryText={list_sec[index]}  rightToggle={<Toggle key={a} toggled={(this.state.indexes[value])[index]} onToggle={this.handleToggle.bind(this,value,index)} />}> {step} </ListItem> </div>
                  )
                })}
          </List>
        </CardText>
        </Card>
        </div>);     
  }

   render() {
			return (
    		<div style={{width: '100%',minHeight:400,justifyContent:'space-around',display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row'}}>
          <div style={{minWidth:300}}>
          <Card style={{height:'100%',alignSelf:'left'}}>
    			  <List>
              <Subheader> Media </Subheader>
               <div style={{display:'flex', flexDirection: 'row'}}>
                 <Checkbox value={0} checked={this.state.checked[0]} onCheck={this.updateCheck.bind(this,0)}/>
                 <ListItem
                    onClick={this.handleClick.bind(this,0)}
                    primaryText="Banner"
                    secondaryText=""
                  />
               </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={1} checked={this.state.checked[1]} onCheck={this.updateCheck.bind(this,1)} />
                  <ListItem
                    onClick={this.handleClick.bind(this,1)}
                    primaryText="InfoDesk"
                    secondaryText=""
                  />
                </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={2} checked={this.state.checked[2]} onCheck={this.updateCheck.bind(this,2)} />
                  <ListItem
                    onClick={this.handleClick.bind(this,2)}
                    primaryText="Digital Board"
                    secondaryText=""
                  />
                </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={3} checked={this.state.checked[3]} onCheck={this.updateCheck.bind(this,3)} />
                   <ListItem
                    onClick={this.handleClick.bind(this,3)}
                    primaryText="Poster"
                    secondaryText=""
                  />
                </div>
            </List>  
            </Card> 		
          </div>
          <div style={{marginLeft:10}}>
        {this.state.clicked && this.renderCard()}
        </div>
      </div> 
			);
		}
  }
	function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(MediumContainer);