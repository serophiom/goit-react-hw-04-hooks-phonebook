import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

const Filter = ({ change, filter, contacts }) => {
    function getFilteredName (event) {
        const { value } = event.currentTarget;
        change(value);
    }

    return contacts.length !== 0 ? (
        <div>
        <label>
            Find contacts by Name<input
            className="filter-input"
            type="text"
            name="filter"
            value={filter}
            onChange={getFilteredName}
        />
        </label>
        
        </div>
        ) : (
        <p>There is no contacts in your Phonebook</p>
    )
};

Filter.propTypes = {
    change: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired
}

export default Filter;