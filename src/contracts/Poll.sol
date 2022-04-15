// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./utils/Counters.sol";
import "./utils/PollData.sol";
import "./utils/PollUtils.sol";

contract Poll is PollData {
    using PollUtils for CategoryVotes[];
    using PollUtils for Participants;
    using Counters for Counters.Counter;
    Counters.Counter private _voteId;

    mapping(uint256 => address) private _votes;
    mapping(address => uint8) private _voteBalance;

    uint256 private _pollId;
    address public owner;
    uint256 private _creationTime;
    string[] private _titleDesc;
    uint256[] private _startEnd;
    CategoryVotes[] private _categories;
    Participants private _participants;

    constructor(
        uint256 pollId_,
        string[] memory titleDesc_, //[title, description]
        uint256[] memory startEnd_, //[startTime, endTime]
        Category[] memory categories_,
        address[] memory participants_
    ) {
        _titleDesc = titleDesc_;
        _startEnd = startEnd_;
        _participants.list = participants_;
        _participants.include(participants_);
        _categories.assign(categories_);
        owner = tx.origin;
        _pollId = pollId_;
        _creationTime = block.timestamp;
    }

    function vote(uint8[] calldata _options) external {
        require(isEligible(msg.sender), "You're not eligible for this poll!");
        require(_voteBalance[msg.sender] <= 1, "You've voted already!");
        if (_startEnd.length != 0) {
            require(block.timestamp >= _startEnd[0], "Poll has not started");
            require(block.timestamp <= _startEnd[1], "Poll has not ended");
        }

        for (uint8 i; i < _options.length; i++) {
            _categories[i].optionsVotes[_options[i]].votes += 1;
        }
        _voteId.increment();
        _votes[_voteId.current()] = msg.sender;
    }

    function getVoteCount() external view returns (uint256) {
        return _voteId.current();
    }

    function getPollDetails()
        external
        view
        returns (
            string[] memory,
            uint256,
            uint256,
            bool,
            bool
        )
    {
        return (
            _titleDesc,
            _creationTime,
            _voteId.current(),
            _participants.list.length == 0,
            _startEnd.length == 0
        );
    }

    function getTotalAndCategoriesAndVotes()
        external
        view
        returns (uint256, CategoryVotes[] memory)
    {
        return (_voteId.current(), _categories);
    }

    function getTotalAndOptionsVotes()
        external
        view
        returns (uint256, uint32[][] memory)
    {
        uint32[][] memory categories = new uint32[][](_categories.length);
        for (uint8 i; i < _categories.length; i++) {
            uint32[] memory options = new uint32[](
                _categories[i].optionsVotes.length
            );
            for (uint32 j; j < _categories[i].optionsVotes.length; j++) {
                options[j] = _categories[i].optionsVotes[j].votes;
            }
            categories[i] = options;
        }
        return (_voteId.current(), categories);
    }

    function isEligible(address account) public view returns (bool) {
        if (_participants.list.length == 0) return true;
        return _participants.eligibility[account];
    }
}
