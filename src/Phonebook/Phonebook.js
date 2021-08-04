import { useState, useEffect } from 'react';
import FormAddContacts from '../FormAddContacts/FormAddContacts';
import Contacts from '../Contacts/Contacts';
import { v4 as uuidv4 } from 'uuid';
import Filter from '../Filter/Filter';
import './Phonebook.css';

export default function Phonebook() {
    const [contacts, setContacts] = useState(
        JSON.parse(window.localStorage.getItem('contacts')) ?? [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
                {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
                {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
                {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    );
    const [filter, setFilter] = useState('');

    useEffect (() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const formSubmitHandler = ( name, number ) => {
        const alreadyAddedContact = contacts.find(contact => contact.name === name);
        if (alreadyAddedContact) {
            alert(`${alreadyAddedContact.name} is already in contacts`);
            return;
        }
        setContacts ([...contacts, { id: uuidv4(), name, number }]);
    };

    const handleFilter = value => {
        setFilter(value);
    };

    const deleteContact = (contactId) => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
    };

    const toLowerCase = filter.toLowerCase();
    const showContacts = contacts.filter(contact =>
         contact.name.toLowerCase().includes(toLowerCase)
    );

    return (
        <div className="phonebook">
            <h1>Phonebook</h1>
            <FormAddContacts onSubmit={formSubmitHandler}/>
            <h2>Contacts</h2>
            <Filter change={handleFilter} filter={filter} contacts={contacts}/>
            <Contacts contacts={contacts} showContacts={showContacts} onDeleteContact={deleteContact}/>
        </div>
    );
}