import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";


class ReactAutoComplete extends Component {

    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        inputClassName: "",
        inputLable: ""
    };

    static defaultProps = {
        suggestions: [],
        inputClassName: "default-input",
        inputLable: "Enter Value"
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    // Event fired when the input value is changed
    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };


    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };


    render() {

        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            },
            props: {
                inputClassName,
                inputLable
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions autocomplete-content dropdown-content"
                        style={{
                            display: "block",
                            opacity: 1,
                            transform: "scaleX(1) scaleY(1)",
                            width: "544.406px",

                        }}
                    >
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li
                                    className={className}
                                    key={index}
                                    onClick={onClick}
                                >
                                    <span>{suggestion.label}</span>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }
        return (
            <div>
                <Fragment>
                    <div className="row">
                        <div>
                            <div className="row">
                                <div className="input-field col">
                                    <input type="text" id="autocomplete-input"
                                        onChange={onChange}
                                        onKeyDown={onKeyDown}
                                        value={userInput}
                                        className={inputClassName + " autocomplete"}
                                    />
                                    <div className="drop-down-list">
                                        {suggestionsListComponent}
                                    </div>
                                    <label htmlFor="autocomplete-input">{inputLable}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        );
    }
}

export default ReactAutoComplete;