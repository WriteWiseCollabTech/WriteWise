// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./_counters.sol";
import "./_pausable.sol";
import "./_ownable.sol";
import "./_event.sol";
import "./_error.sol";

/// @title WriteWise ✍️
/// @author Amir Rahimi
/// @notice WriteWise, amplify the impact of scientific papers and peer-reviewed preprints
/// @dev You will find the deployed contract addresses in the README.md file.
/// @custom:security-contact atenyun@gmail.com
contract WriteWise is Ownable(msg.sender), Pausable {
    using Counters for Counters.Counter;
    Counters.Counter public _contestCounter;
    Counters.Counter public _nominationCounter;
    Counters.Counter public _voteCounter;

    struct contestStruct {
        string metadata;
        uint256 start;
        uint256 end;
        address[] nomination_allowlist;
        address[] vote_allowlist;
        address manager;
        bool pause;
    }

    struct nominationStruct {
        bytes32 contestId;
        string metadata;
        address manager;
    }

    struct voteStruct {
        bytes32 nominationId;
        address sender;
        uint256 dt;
    }

    mapping(bytes32 => contestStruct) public contest;
    mapping(bytes32 => nominationStruct) public nomination;
    voteStruct[] public vote;

    constructor() {}

    /**
     * @dev Throws if called by any account other than the manager.
     */
    modifier onlyContestManager(bytes32 _contestId) {
        require(contest[_contestId].manager == _msgSender(), "The sender is not the manager of the entered contest.");
        _;
    }

    /**
     * @dev Throws if called by any account other than the manager.
     */
    modifier onlyNominationManager(bytes32 _nominationId) {
        require(nomination[_nominationId].manager == _msgSender(), "The sender is not the manager of the entered contest.");
        _;
    }

    /// @notice Create a new contest
    /// @dev
    /// @param metadata The IPFS CID
    /// @return contestId
    function newContest(
        string memory _metadata,
        uint256 _start,
        uint256 _end,
        address _manager,
        address[] memory _nomination_allowlist,
        address[] memory _vote_allowlist
    ) public returns (bytes32 contestId) {
        /// @notice Continue if start time is gretter that current time
        /// @notice Continue if start time is gretter that current time
        require(_start > block.timestamp, "Start time must be greater than current time");

        /// @notice Continue if end time is gretter than start time
        require(_end > _start, "End time must be greater than start time");
        /// @notice Increase counter

        _contestCounter.increment();

        /// @notice Add a new whitelist
        contest[bytes32(_contestCounter.current())] = contestStruct(_metadata, _start, _end, _nomination_allowlist, _vote_allowlist, _manager, false);

        /// @notice Emit new whitelist data
        emit contestCreated(msg.sender, bytes32(_contestCounter.current()), _metadata, _start, _end, _nomination_allowlist, _vote_allowlist, _manager, false);

        return bytes32(_contestCounter.current());
    }

    /// @notice Update contest
    /// onlyManager(_nodehash)
    function updateContest(
        bytes32 _contestId,
        address _manager,
        string memory _metadata
    ) public onlyContestManager(_contestId) {
        // check if the token id of the nodehash is the sender, so users can trade the nfts/ domains
        contest[_contestId].manager = _manager;
        contest[_contestId].metadata = _metadata;
        emit ContestUpdated(_contestId, _metadata, _manager);
    }

    /// @notice Create a new contest
    /// @dev
    /// @param metadata The IPFS CID
    /// @return nominationId
    function newNomination(
        bytes32 _contestId,
        string memory _metadata,
        address _manager
    ) public returns (bytes32 nominationId) {
        if (contest[_contestId].end > block.timestamp) revert TooLate(block.timestamp);
        if (contest[_contestId].start > block.timestamp) revert TooEarly(block.timestamp);

        _nominationCounter.increment();

        /// @notice Add
        nomination[bytes32(_nominationCounter.current())] = nominationStruct(_contestId, _metadata, _manager);

        /// @notice Emit new whitelist data
        emit nominationAdded(_contestId, _metadata, _manager);

        return bytes32(_nominationCounter.current());
    }

    /// @notice Update contest
    /// onlyManager(_nodehash)
    function updateNomination(
        bytes32 _nominationId,
        address _manager,
        string memory _metadata
    ) public onlyNominationManager(_nominationId) {
        // check if the token id of the nodehash is the sender, so users can trade the nfts/ domains
        nomination[_nominationId].manager = _manager;
        nomination[_nominationId].metadata = _metadata;
        emit NominationUpdated(_nominationId, _metadata, _manager);
    }

    /// @notice cast vote
    function castVote(bytes32 _nominationId) public returns (bool) {
        bytes32 _contestId = nomination[_nominationId].contestId;
        if (contest[_contestId].end > block.timestamp) revert TooLate(block.timestamp);
        if (contest[_contestId].start > block.timestamp) revert TooEarly(block.timestamp);

        // Check sender
        for (uint256 i = 0; i < vote.length; i++) if (vote[i].sender == _msgSender()) revert DuplicatedAddress(_nominationId, _msgSender());

        _voteCounter.increment();
        vote.push(voteStruct(_nominationId, _msgSender(), block.timestamp));

        return true;
    }

    function getVoteTotal(bytes32 _nominationId) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < vote.length; i++) if (vote[i].nominationId == _nominationId) count++;
        return count;
    }

    function verifyContestManager(bytes32 _contestId, address _manager) public view returns (bool) {
        return (contest[_contestId].manager == _manager);
    }

    function verifyNominationManager(bytes32 _nominationId, address _manager) public view returns (bool) {
        return (nomination[_nominationId].manager == _manager);
    }

    function getNow() public view returns (uint256) {
        return block.timestamp;
    }

    ///@notice Withdraw the balance from this contract and transfer it to the owner's address
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = owner().call{value: amount}("");
        require(success, "Failed");
    }

    ///@notice Transfer balance from this contract to input address
    function transferBalance(address payable _to, uint256 _amount) public onlyOwner {
        // Note that "to" is declared as payable
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed");
    }

    /// @notice Return the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Pause mint
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause mint
    function unpause() public onlyOwner {
        _unpause();
    }
}
//eof
