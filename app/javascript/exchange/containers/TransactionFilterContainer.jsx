import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMyTransactions } from '../actions/itemsActions';

import PropTypes from 'prop-types';



class TransactionFilterContainer extends Component {
  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect (e, { value }) {
    // let cur_list = this.props.original_list;
    // console.log(this.props.original_list);
    console.log(this.props.filtered_transactions);

    if (value == 'All') {
      this.props.getMyTransactions(this.props.currentUserId, value);
    }

    else if (value == 'Pending') {
      this.props.getMyTransactions(this.props.currentUserId, 'pending');
    }

    else if (value == 'In progress') {
      this.props.getMyTransactions(this.props.currentUserId, 'lent');
    }

    else if (value == 'Completed') {
      this.props.getMyTransactions(this.props.currentUserId, 'completed');
    }

    console.log(this.props.filtered_transactions);
    // // console.log(this.props.cur_sort);
  } 

  render() {
    let sortOptions = [
      {
        text: 'All',
        value: 'All'
      },
      {
        text: 'Pending',
        value: 'Pending'
      },
      {
        text: 'In progress',
        value: 'In progress'
      },
      {
        text: 'Completed',
        value: 'Completed'
      }
    ];
    return (
      <div>
        <p align="right">
          <Dropdown selection defaultValue={sortOptions[0].value} direction="left" options={sortOptions} onChange={ this.handleSelect }/>
        </p>
      </div>
    )
  }
}

TransactionFilterContainer.propTypes = {
  filtered_transactions: PropTypes.array.isRequired,
  cur_status: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  filtered_transactions: state.items.filtered_transactions,
  cur_status: state.items.cur_status
});

export default connect(mapStateToProps, { getMyTransactions })(TransactionFilterContainer);
