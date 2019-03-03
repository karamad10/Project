import React, { Component } from 'react';
import services from '../services/GetInfo';
import Report from './Report';

class AddHouse extends Component {
  state = {
    error: null,
    valid: null,
    invalid: null
  };

  onFormSubmit = e => {
    e.preventDefault();
    let newItem = this.dataInput.value;
    services.addItem(newItem).then(response => {
      if (response.error) {
        this.setState({ error: response.error });
      } else {
        this.setState({
          valid: response.validHouses,
          invalid: response.invalidHouses,
          error: null
        });
      }
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <textarea
            defaultValue=""
            className="text_area"
            ref={userInput => {
              this.dataInput = userInput;
            }}
          />
          <br />
          <input type="submit" value="submit" />
          <br />
          {this.state.error && <h4>{`❌ Incorrect format: ${this.state.error}`}</h4>}
          <br />
          <br />
          {this.state.valid ? <Report valid={this.state.valid} invalid={this.state.invalid} /> : ''}
        </form>
      </>
    );
  }
}

export default AddHouse;
