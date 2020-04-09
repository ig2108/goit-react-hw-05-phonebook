import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './ContactsList.module.css';
import ContactItem from '../ContactItem/ContactItem';
import slideTransition from '../../transitions/slideTransition.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
      {contacts.map(contact => (
        <CSSTransition
          key={contact.id}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <li className={styles.contactItem}>
            <ContactItem contact={contact} onDeleteContact={onDeleteContact} />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
