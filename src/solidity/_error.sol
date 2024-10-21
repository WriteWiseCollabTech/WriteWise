// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

error Unauthorized();
error Reverted();
error InsufficientBalance(uint256 price, uint256 amount);
error DuplicatedAddress(bytes32 nominationId, address sender);
error SupplyingLimitExceeded(uint256 totalSupply, uint256 maxSupply);
error TooEarly(uint256 time);
error TooLate(uint256 time);
