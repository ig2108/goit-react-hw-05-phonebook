import React, { Component } from 'react';
import shortid from 'shortid';
// import SectionTitle from '../SectionTitle/SectionTitle';
import { CSSTransition } from 'react-transition-group';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactsList from '../ContactsList/ContactsList';
import styles from './App.module.css';
import slideTitleTransition from '../../transitions/slideTitle.module.css';
import slideTransition from '../../transitions/slideTransition.module.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    console.log(persistedContacts);
    if (persistedContacts) {
      const contacts = JSON.parse(persistedContacts);
      this.setState({ contacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = contact => {
    const { contacts } = this.state;
    if (
      contacts.find(
        item => item.name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      NotificationManager.error(
        'Please, enter another name',
        `${contact.name} is already in contacts`,
        5000,
      );
    } else {
      this.checkInputValid(contact);
    }
  };

  checkInputValid = contact => {
    const { number, name } = contact;
    const isNumber = Number(number);
    if (isNumber && name !== '') {
      this.addContactToState(contact);
    } else if (!isNumber && name === '') {
      NotificationManager.error(
        'Please, enter name or number',
        `Some registration point are empty`,
        5000,
      );
    } else if (!isNumber) {
      NotificationManager.error(
        'Please, enter a correct number',
        'Number is not valid',
        5000,
      );
    } else if (name === '') {
      NotificationManager.error('Please, enter a name', 'Name is empty', 5000);
    }
  };

  addContactToState = contact => {
    const contactToAdd = {
      ...contact,
      id: shortid.generate(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChangeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <CSSTransition
          in
          timeout={500}
          classNames={slideTitleTransition}
          appear
        >
          <h2 className={styles.sectionTitle}>Phonebook</h2>
        </CSSTransition>
        <ContactForm onAddContact={this.handleAddContact} />
        <NotificationContainer />
        <h2 className={styles.sectionTitle}>Contacts</h2>
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
        </CSSTransition>
        <ContactsList
          onDeleteContact={this.handleDeleteContact}
          contacts={filteredContacts}
        />
      </div>
    );
  }
}
