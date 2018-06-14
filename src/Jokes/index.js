import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategories, fetchJoke } from '../store/modules/chuck';
import logo from '../images/logo.png';

class JokesContainer extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    // fetchJoke: PropTypes.func.isRequired,
  };

  state = {
    selectedCategory: 'science',
  };

  componentDidMount = async () => {
    const { fetchCategories: load } = this.props;
    await load();
  };

  render() {
    const { selectedCategory } = this.state;
    return (
      <div className="container">
        <img src={logo} alt="logo" className="image-header" />
        {selectedCategory}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  joke: state.joke,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchJoke: category => dispatch(fetchJoke(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokesContainer);
