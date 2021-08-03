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

    // state = {
    //     contacts: [
    //         {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    //         {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    //         {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    //         {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    //     ],
    //     filter: ''
    // }

    const formSubmitHandler = ({ name, number }) => {
        const alreadyAddedContact = contacts.find(contact => contact.name === name);
        if (alreadyAddedContact) {
            alert(`${alreadyAddedContact.name} is already in contacts`);
            return;
        }
        setContacts (...contacts, { id: uuidv4(), name, number });
    };

    const handleFilter = value => {
        setFilter(value);
    };

    const deleteContact = (contactId) => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
    };

    // useEffect(() => {
    //     if (localStorage.getItem('contacts')?.length > 0) {
    //         setContacts(JSON.parse(localStorage.getItem('contacts')));
    //     }
    // }, []);

    useEffect (() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const toLowerCase = filter.toLowerCase();
    const showContacts = contacts.filter((contact) =>
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

// class Phonebook extends Component {
//     state = {
//         contacts: [
//             {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//             {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//             {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//             {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//         ],
//         filter: ''
//     }

//     formSubmitHandler = ({ name, number }) => {
//         const { contacts } = this.state;
//         const alreadyAddedContact = contacts.find(contact => contact.name === name);
//         if (alreadyAddedContact) {
//             alert(`${alreadyAddedContact.name} is already in contacts`);
//             return
//         }
//         this.setState(({ contacts }) => ({
//             contacts: [...contacts, { id: uuidv4(), name, number }]
//         }))
//     };

//     handleFilter = (value) => {
//         this.setState({ filter: value });
//     };

//     deleteContact = (contactId) => {
//         this.setState(prevState => ({
//             contacts: prevState.contacts.filter(contact => contact.id !== contactId)
//         }))
//     };

//     componentDidMount() {
//         if (localStorage.getItem('contacts')?.length > 0) {
//             this.setState({
//                 contacts: JSON.parse(localStorage.getItem('contacts'))
//             });
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.contacts !== prevState.contacts) {
//             localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//         }
//     }

//     render() {
//         const { contacts, filter } = this.state;
//         const toLowerCase = filter.toLowerCase();
//         const showContacts = contacts.filter(contact =>
//             contact.name.toLowerCase().includes(toLowerCase)
//         );

//         return (
//             <div className="phonebook">
//                 <h1>Phonebook</h1>
//                 <FormAddContacts onSubmit={this.formSubmitHandler}/>
//                 <h2>Contacts</h2>
//                 <Filter change={this.handleFilter} filter={filter} contacts={contacts}/>
//                 <Contacts contacts={contacts} showContacts={showContacts} onDeleteContact={this.deleteContact}/>
//             </div>
//         );
//     }
// }

// export default Phonebook;