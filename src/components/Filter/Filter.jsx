import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => (
  <input
    type="text"
    value={value}
    onChange={onChangeFilter}
    className={styles.filterInput}
    placeholder="Type name to filter contacts..."
  ></input>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
