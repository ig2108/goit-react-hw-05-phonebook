import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';

const ContactItem = ({ contact, onDeleteContact }) => {
  const { name, number } = contact;

  return (
    <>
      <p className={styles.contactInfo}>
        {name} : {number}
      </p>
      <button
        onClick={() => onDeleteContact(contact.id)}
        className={styles.deleteBtn}
        type="button"
      >
        Delete
      </button>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
