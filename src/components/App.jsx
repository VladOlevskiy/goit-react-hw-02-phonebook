import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './Box/Box';
import { ContactForm } from './ContactForm/ContactForm ';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import PropTypes from 'prop-types';
import { FcPhoneAndroid } from 'react-icons/fc';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = values => {
    const id = nanoid();
    const newValues = { id: id, ...values };
    this.setState(prevState => {
      return { contacts: [newValues, ...prevState.contacts] };
    });
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  onChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const normalizedFilterSearch = this.state.filter.toLowerCase();
    const FoundedContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterSearch)
    );
    return (
      <>
        <Box paddingBottom="30px" paddingTop="30px">
          <Box
            paddingBottom="30px"
            display="flex"
            flexDirection="column"
            marginLeft="auto"
            marginRight="auto"
            alignItems="center"
            width="500px"
            boxShadow="0px 1px 7px rgb(0 0 0), 0px 1px 8px rgb(0 0 0 / 67%), 0px 2px 3px rgb(0 0 0 / 47%)"
            borderRadius="0px 0px 4px 4px"
            backgroundColor="#cbcbcb"
            marginBottom="80px"
          >
            <h1>
              <FcPhoneAndroid size={25} />
              Phonebook
            </h1>
            <ContactForm
              onSubmit={this.onSubmit}
              contacts={this.state.contacts}
            />
            <h2>Contacts</h2>
            <ContactList
              contact={FoundedContact}
              onDelete={this.deleteContact}
            />
            <Filter value={this.state.filter} onChange={this.onChange} />
          </Box>
        </Box>
      </>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array,
  value: PropTypes.string,
};
