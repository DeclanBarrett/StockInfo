import React, { useState } from "react";
import { Button, Input, InputGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import "../css/InputColours.css";

// Displays a search bar with a button
export function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("");

    return (
        <div className="login-form-outer">
            <InputGroup inline="true" className="center-contents-flex">
                <Input
                    className="input"
                    name="search"
                    id="search"
                    type="search"
                    aria-labelledby="search-button"
                    value={innerSearch}
                    placeholder={props.default}
                    onChange={event => { setInnerSearch(event.target.value); }}
                />
                <Button
                    type="button"
                    id="search-button"
                    onClick={event => { props.onSubmit(innerSearch); }}
                > Search </Button>
            </InputGroup>
        </div>
    )
}

// Displays a search bar that automatically returns when changed (DO NOT LINK DIRECTLY WITH API)
export function SearchBarAuto(props) {
    const [innerSearch, setInnerSearch] = useState("");
    return (
        <div id="SearchBarAutoDiv">
            <Input
                color="muted"
                name="search"
                id="search"
                type="text"
                aria-labelledby="search-button"
                value={innerSearch}
                placeholder={props.default}
                onChange={event => {
                    setInnerSearch(event.target.value);
                    props.onSubmit(event.target.value)
                }}
            />
        </div>
    )
}

// Creates an industry drop down menu based off whatever industries are given to it
export function SearchDropDown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [innerSearch, setInnerSearch] = useState("Industry");

    // Used as open/ close for dropdown
    const toggle = () => setDropdownOpen(prevState => !prevState)

    return (
        <div id="SearchDropDownDiv">
            <Dropdown id="Mobility" name="Mobility" isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret>
                    {innerSearch}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        // Creates the list of dynamic selectable items
                        (props.dropOptions === undefined) ?
                            " " : Array.from(props.dropOptions).map(option => (
                                <DropdownItem value={option} onClick={event => {
                                    setInnerSearch(event.target.value);
                                    props.onSubmit(event.target.value)
                                }}>
                                    {option}
                                </DropdownItem>))
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
