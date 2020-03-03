import React from 'react';
import './App.css';
import Produce from './Produce'
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';

var searchList =  require('./example.json');
console.log(searchList);

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {value:'', searchReturn: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    //console.log("Search text box is being changed");
  }

  //made async so the inputs MUST be lowercase before being set into state
  async handleSubmit(event){
    event.preventDefault();
    //console.log("Form got submitted");
    var caseChange = await this.state.value.toLowerCase(); //set everything to lower case to make search non case specific
    this.setState({value: caseChange});
    //console.log(this.state.value);
    await this.executeSearch();
    //console.log(this.state.searchReturn); 
  }

  //Actual function that searches. Checks obj title, desc, categories, and subcategories
  //Each check makes sure that the property exists for that obj so no err
  async executeSearch(){
    var returnArr = [];
    //console.log(searchList.items.length);
    loop1:
      for(var i = 0; i < searchList.items.length; i++){
        if((searchList.items[i].title)){
          if((searchList.items[i].title.toLowerCase()).includes(this.state.value)){
            returnArr.push(searchList.items[i]);
            continue;
          }
        } 
        
        if((searchList.items[i].description)){
          if((searchList.items[i].description.toLowerCase()).includes(this.state.value)){
            returnArr.push(searchList.items[i]);
            continue;
          }
        } 
          for(var j = 0; j < searchList.items[i].categories.length; j++){
            if((searchList.items[i].categories[j].name.toLowerCase()).includes(this.state.value)){
              returnArr.push(searchList.items[i]);
              continue loop1;
            } else if((searchList.items[i].categories[j].subcategory)){
              if((searchList.items[i].categories[j].subcategory.name.toLowerCase()).includes(this.state.value)){
                returnArr.push(searchList.items[i]);
                continue loop1;
              }
            }
          }
        }
    //console.log(returnArr);
    this.setState({searchReturn: returnArr});
  }

  render(){
    return(
      <Container>
        <div className="titleText">
          <h1>Produce Search</h1>
        </div>
        <Form id="searchForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="searchBar">Please enter criteria to search through our list of produce:</Label>
            <Input type="text" id="searchbar" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="submit" value="Submit"/>
          </FormGroup>
        </Form>

        <h1>Results:</h1>

        {(this.state.searchReturn || []).map((produce, index) => 
          <Produce title={produce.title} img={produce.img} description={produce.description} key={produce.id}/>
        )}
      </Container>
      
    );
  }
}

export default App;