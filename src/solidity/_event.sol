// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


event Log(string func, uint256 gas);

event contestCreated(
        address indexed sender,
        bytes32 indexed id,
        string metadata,
        uint256 start,
        uint256 end,
        address[] nomination_allowlist,
        address[] vote_allowlist,
        address indexed manager,
        bool pause
);
    
event ContestUpdated(bytes32 indexed id, string metadata, address manager); 

event nominationAdded(
        bytes32 indexed contestId,

        string metadata,
                        address indexed manager
    );
    event NominationUpdated(bytes32 indexed id, string metadata, address manager);
//eof
