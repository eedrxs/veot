// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/*
* @title PollData
* @author Idris Abdul-Lateef (@eedrxs)
* @dev Contains a series of custom data types used in the "PollFactory" and "Poll" contracts. It is to be inherited.
*/

contract PollData {
    struct Option {
        // Represents each option in a category.
        uint8 id;           // Holds the option's ID in its category
        uint32 votes;       // Holds the number of votes the option gets
        string text;        // Holds the text content
    }

    struct Category {
        // Represents each category in a poll.
        uint8 id;           // Hold's the category's ID
        string text;        // Holds the text content
        Option[] options;   // Holds list of the options for the category
    }

    struct Option_ {
        // Same of the Option struct but without the "votes" variable. It is used to hold
        // the data supplied to the "createPoll" function of the PollFactory contract
        uint8 id;
        string text;
    }

    struct Category_ {
        // Same as the Category struct but modified to hold the Option_ struct instead
        uint8 id;
        string text;
        Option_[] options;
    }

    struct Participants {
        // Represents the eligible participants in a poll
        address[] list;                         // An array of account addresses eligible for the poll.
        mapping (address => bool) eligibility;  // A mapping that shows the eligibility of an address for the poll.
                                                // Each address in "address[] list" is mapped to true                            
    }

    struct QueryResult {
        // Represents the data returned from querying a poll
        string[] titleDesc;     // [Title, Description] of the poll
        uint creationTime;      // Time poll was created
        uint votes;             // Total number of votes at the time of querying
        bool isOpen;            // Bool that shows if poll is an open or closed poll
        bool isTimed;           // Bool that shows if poll is a timed or timeless poll
        bool isEligible;        // Bool that shows if the account querying is eligible to participate
    }
}