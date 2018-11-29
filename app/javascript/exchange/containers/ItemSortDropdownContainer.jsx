import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortItems, filterItems } from '../actions/itemsActions';

import PropTypes from 'prop-types';



class ItemSortDropdownContainer extends Component {
  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect (e, { value }) {
    let cur_list = this.props.original_list;
    console.log(this.props.original_list);

    if (value == 'Default') {
      this.props.sortItems(cur_list, value);
    }

    else if (value == 'Newest') {
      this.props.sortItems(cur_list, value);
    }

    else if (value == 'Oldest') {
      this.props.sortItems(cur_list, value);
    }

    console.log(this.props.original_list);
    // console.log(this.props.cur_sort);
  } 

  render() {
    let sortOptions = [
      {
        text: 'Default',
        value: 'Default'
      },
      {
        text: 'Newest',
        value: 'Newest'
      },
      {
        text: 'Oldest',
        value: 'Oldest'
      }
      // {
      //   text: 'Average Rating',
      //   value: 'Average Rating'
      // }
    ];
    return (
      <div>
        <p align="right">
          Sort by{'  '}
          <Dropdown inline defaultValue={sortOptions[0].value} direction="left" options={sortOptions} onChange={ this.handleSelect }/>
        </p>
      </div>
    )
  }
}

ItemSortDropdownContainer.propTypes = {
  original_list: PropTypes.array.isRequired,
  cur_sort: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  original_list: state.items.original_list,
  cur_sort: state.items.cur_sort
});

export default connect(mapStateToProps, { sortItems, filterItems })(ItemSortDropdownContainer);
