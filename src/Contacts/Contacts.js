import React from 'react';
import './Contacts.css';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, showContacts, onDeleteContact }) => {
    return contacts && (
        <ul>
            {showContacts.map(({ id, name, number }) => (
                <li key={id} className="contacts__item">
                    <p className="contacts__text">{name}: {number}</p>
                    <button onClick={() => onDeleteContact(id)}>delete</button>
                </li>
            ))}
        </ul>
    )
    
};

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    showContacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default Contacts;