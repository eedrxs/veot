// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./PollData.sol";
import "./utils/PollUtils.sol";
import "./utils/Counters.sol";

contract Poll is PollData {
    using PollUtils for Category[];
    using PollUtils for Participants;
    using Counters for Counters.Counter;
    Counters.Counter private _voteId;

    mapping(uint256 => address) private _votes;
    mapping(address => uint8) private _voteBalance;
    uint256[][] private _optionsVotes;
    event voteCasted(
        uint256 indexed totalVotes,
        uint256[][] indexed optionsVotes
    );

    uint256 private _pollId;
    address public owner;
    uint256 private _creationTime;
    string[] private _titleDesc;
    uint256[] private _startEnd;
    Category[] private _categories;
    Participants private _participants;

    constructor(
        uint256 pollId_,
        string[] memory titleDesc_, //[title, description]
        uint256[] memory startEnd_, //[startTime, endTime]
        Category_[] memory categories_,
        address[] memory participants_
    ) {
        _titleDesc = titleDesc_;
        _startEnd = startEnd_;
        _participants.list = participants_;
        _participants.include(participants_);
        _categories.buildPollStructure(categories_, _optionsVotes);
        owner = tx.origin;
        _pollId = pollId_;
        _creationTime = block.timestamp;
    }

    modifier isAcceptable() {
        require(isEligible(msg.sender), "You're not eligible for this poll!");
        require(_voteBalance[msg.sender] < 1, "You've voted already!");
        if (_startEnd.length != 0) {
            require(block.timestamp >= _startEnd[0], "Poll has not started");
            require(block.timestamp <= _startEnd[1], "Poll has not ended");
        }
        _;
    }

    function vote(uint8[] calldata _options) external isAcceptable {
        for (uint8 i; i < _options.length; i++) {
            _categories[i].options[_options[i]].votes += 1;
            _optionsVotes[i][_options[i]] += 1;
        }
        _voteId.increment();
        _votes[_voteId.current()] = msg.sender;
        _voteBalance[msg.sender] += 1;
        emit voteCasted(_voteId.current(), _optionsVotes);
    }

    function getVoteCount() external view returns (uint256) {
        return _voteId.current();
    }

    function getPollDetails()
        external
        view
        returns (
            string[] memory,
            uint256[] memory,
            uint256,
            uint256,
            bool,
            uint256
        )
    {
        return (
            _titleDesc,
            _startEnd,
            _creationTime,
            _voteId.current(),
            _participants.list.length == 0,
            _pollId
        );
    }

    function getOptionsAndVotes()
        external
        view
        returns (uint256, Category[] memory)
    {
        return (_voteId.current(), _categories);
    }

    function getCurrentVotes()
        external
        view
        returns (uint256, uint32[][] memory)
    {
        uint32[][] memory categories = new uint32[][](_categories.length);
        for (uint8 i; i < _categories.length; i++) {
            uint32[] memory options = new uint32[](
                _categories[i].options.length
            );
            for (uint32 j; j < _categories[i].options.length; j++) {
                options[j] = _categories[i].options[j].votes;
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
