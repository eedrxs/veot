// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/*
* @title PollUtils
* @author Idris Abdul-Lateef (@eedrxs)
* @dev Provides methods that handle the storing of categories and participants data into Poll contract 
*/

import "../PollData.sol";

library PollUtils {
    // @title buildPollStructure
    // @dev Stores categories and their options data into the Poll contract's "_categories" state variable
    // and grows the "_optionsVotes" two-dimensional array to have the same structure
    function buildPollStructure(
        PollData.Category[] storage categories,
        PollData.Category_[] memory _categories,
        uint[][] storage optionsVotes) internal {
        
        for(uint8 i; i < _categories.length; i++) {
            optionsVotes.push();
            categories.push();
            categories[i].id = i;
            categories[i].text = _categories[i].text;
            for(uint8 j; j < _categories[i].options.length; j++) {
                optionsVotes[i].push();
                categories[i].options.push();
                categories[i].options[j].id = j;
                categories[i].options[j].text = _categories[i].options[j].text;
            }
        }
    }

    // @title include
    // @dev Takes array of addresses and marks them as "true" in the _participants.eligibility "address => bool" mapping
    function include(PollData.Participants storage participants, address[] memory accounts) internal {
        for(uint8 i; i < accounts.length; i++) {
            participants.eligibility[accounts[i]] = true;
        }
    }
}