// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Poll.sol";
import "./PollData.sol";
import "./utils/Counters.sol";

contract PollFactory is PollData {
    using Counters for Counters.Counter;
    Counters.Counter private _pollId;

    mapping (uint => Poll) private _polls;
    event pollCreated(uint indexed pollCount);

    function createPoll(
        string[] memory titleDesc_,
        uint[] memory startEnd_,
        Category_[] memory categories_,
        address[] memory participation_
    ) external {
        _pollId.increment();
        _polls[_pollId.current()] = new Poll(_pollId.current(), titleDesc_, startEnd_, categories_, participation_);
        emit pollCreated(_pollId.current());
    }

    function queryPoll(uint pollId) public view returns(QueryResult memory) {
        require(pollId <= _pollId.current(), "Poll doesn't exist!");
        (string[] memory titleDesc, uint[] memory startEnd, uint creationTime, uint votes, bool isOpen) = _polls[pollId].getPollDetails();
        bool callerIsEligible = _polls[pollId].isEligible(msg.sender);
        PollStatus _pollStatus = pollStatus(startEnd);
        return QueryResult(titleDesc, startEnd, creationTime, _pollStatus, votes, isOpen, callerIsEligible);
    }

    function fetchPolls(uint pollId, uint8 n) external view returns(QueryResult[] memory) {
        QueryResult[] memory queryResults = new QueryResult[](n);
        for(uint i; i < n; i++) {
            queryResults[i] = queryPoll(pollId - i);
        }
        return queryResults;
    }

    function getPollCount() external view returns(uint) {
        return _pollId.current();
    }

    function getPollAddress(uint pollId) external view returns(address) {
        require(_polls[pollId].isEligible(msg.sender) || msg.sender == _polls[pollId].owner(), "You're not eligible for this poll!");
        return address(_polls[pollId]);
    }

    function pollStatus(uint[] memory _startEnd) public view returns(PollStatus) {
        if (_startEnd.length == 0) return PollStatus.Ongoing;
        else if (block.timestamp < _startEnd[0]) return PollStatus.Upcoming;
        else if (block.timestamp > _startEnd[0] && block.timestamp < _startEnd[1]) return PollStatus.Ongoing;
        else return PollStatus.Ended;
    }

    function currentTime() public view returns(uint) {
        return block.timestamp;
    }
}