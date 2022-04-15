// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PollData {
    struct Option {
        uint8 id;
        string content;
    }

    struct OptionVotes {
        uint8 id;
        uint32 votes;
        string content;
    }

    struct Category {
        uint8 id;
        string content;
        Option[] options;
    }

    struct CategoryVotes {
        uint8 id;
        string content;
        OptionVotes[] optionsVotes;
    }

    struct TitleDesc {
        string title;
        string desc;
        bool hasDesc;
    }

    struct TypeOptions {
        Category[] categories;
        bool isBasic;
    }

    struct Duration {
        uint256 start;
        uint256 end;
        bool isTimed;
    }

    struct Participation {
        address[] participants;
        bool isOpen;
    }

    struct QueryResult {
        string[] titleDesc;
        uint256 creationTime;
        uint256 votes;
        bool isOpen;
        bool isTimed;
        bool isEligible;
    }

    struct Participants {
        mapping(address => bool) eligibility;
        address[] list;
    }
}
