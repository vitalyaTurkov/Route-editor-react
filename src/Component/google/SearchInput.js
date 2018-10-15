import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types'
import './SearchInput.scss'

export default class LocationSearchInput extends React.Component {

    static propTypes = {
        addPoint: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}

            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Новая точка маршрута',
                                className: 'location-search-input',
                            })}
                            ref={this.searchInputMounted}
                            onKeyPress={this.keypress}
                            onBlur={this.onBlur}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.props.addPoint(address);
    };

    searchInputMounted = (input) => {
        this.searchInput = input;
    };

    componentDidUpdate() {
        this.searchInput.value = '';
    }

    keypress = (e) => {
        if(e.key === 'Enter') {
            this.searchInput.value = '';
        }
    };

    onBlur = () => {
        this.searchInput.value = '';
    };

}