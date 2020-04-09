import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onAddContact } = this.props;
    onAddContact({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.labelItem} htmlFor={this.nameInputId}>
          <p className={styles.textName}>Name</p>
          <input
            className={styles.inputName}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label className={styles.labelItem} htmlFor={this.numberInputId}>
          <p className={styles.textName}>Number</p>
          <input
            type="phone"
            name="number"
            value={number}
            onChange={this.handleChange}
            id={this.numberInputId}
          />
        </label>
        <button className={styles.submitBtn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
