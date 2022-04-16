// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./utils/Counters.sol";
import "./PollData.sol";
import "./Poll.sol";

contract PollFactory is PollData {
    using Counters for Counters.Counter;
    Counters.Counter private _pollId;

    mapping (uint => Poll) private _polls;

    
    function createPoll(
        string[] memory titleDesc_,
        uint[] memory startEnd_,
        Category_[] memory categories_,
        address[] memory participation_
    ) external {
        _pollId.increment();
        _polls[_pollId.current()] = new Poll(_pollId.current(), titleDesc_, startEnd_, categories_, participation_);
    }

    function queryPoll(uint pollId) public view returns(QueryResult memory) {
        require(pollId <= _pollId.current(), "Poll doesn't exist!");
        (string[] memory titleDesc, uint creationTime, uint votes, bool isOpen, bool isTimed) = _polls[pollId].getPollDetails();
        bool accountIsEligible = _polls[pollId].isEligible(msg.sender);
        return QueryResult(titleDesc, creationTime, votes, isOpen, isTimed, accountIsEligible);
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
}