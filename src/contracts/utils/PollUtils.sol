// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./PollData.sol";

library PollUtils {
    function assign(
        PollData.CategoryVotes[] storage categories,
        PollData.Category[] memory _categories
    ) internal {
        for (uint8 i; i < _categories.length; i++) {
            categories.push();
            categories[i].id = i;
            categories[i].content = _categories[i].content;
            for (uint8 j; j < _categories[i].options.length; j++) {
                categories[i].optionsVotes.push();
                categories[i].optionsVotes[j].id = j;
                categories[i].optionsVotes[j].content = _categories[i]
                    .options[j]
                    .content;
            }
        }
    }

    function include(
        PollData.Participants storage participants,
        address[] memory accounts
    ) internal {
        for (uint8 i; i < accounts.length; i++) {
            participants.eligibility[accounts[i]] = true;
        }
    }
}
