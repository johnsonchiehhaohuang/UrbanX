import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { newItem } from '../actions/itemsActions';
import { connect } from 'react-redux';
import { UploadButton }  from '../components/UploadButton.js'

class ItemEditFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: '',
      quantity: '',
      condition: '',
      value: '',
      user_id: '',
      images: []


    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateItemState = this.updateItemState.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    let item = this.state;
    item.user_id =this.props.currentUserId;
    // this.props.newItem(item);
    
    const formData = new FormData();
    // formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
    formData.append('item[name]', this.state.name);
    formData.append('item[description]', this.state.description);
    formData.append('item[category]', this.state.category);
    formData.append('item[quantity]', this.state.quantity);
    formData.append('item[condition]', this.state.condition);
    formData.append('item[value]', this.state.value);

    for (const image of this.state.images) {
      formData.append('item[images][]', image, image.name);
    }

    // console.log("below is form data")
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    // debugger
    $.ajax({
      url:'/items',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
            'X-CSRFToken': $('meta[name="token"]').attr('content')
        }
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );
  }
  updateItemState(files){
    this.state.images = files
    console.log(this.state.images)
    console.log("this is the new item form images statee ^ ")

  }

  render() {
    const { name, description, category, quantity,condition,value, user_id  } = this.state

    return (
      <div className="new-item-form-container">
        <h1 className="new-item-form-title">Sign Up Form</h1>
        <Form className="new-item-form" onSubmit={ this.handleSubmit }>
          <Form.Field>
            <label>Name</label>
            <Form.Input placeholder='Name' name='name' value={ name } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Form.Input placeholder='Description' name='description' value={ description } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <Form.Input placeholder='Category' name='category' value={ category } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <Form.Input placeholder='Quantity' name='quantity' value={ quantity } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Condition</label>
            <Form.Input placeholder='Condition' name='condition' value={ condition } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Value</label>
            <Form.Input placeholder='Value' name='value' value={ value } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <UploadButton updateItemState={this.updateItemState}/>
          <Form.Button content='Submit' />
        </Form>
        
      </div>
    )
  }
}

export default connect(() => { return {} }, { newItem })(ItemEditFormContainer)