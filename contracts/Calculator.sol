//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Calculator {
    uint256 public calculateResult;
    address public user;

    event AddEvent(uint256 a, uint256 b);

    function add(uint256 a, uint256 b) public returns (uint256) {
        calculateResult = a+b;
        assert(calculateResult >= a);

        emit AddEvent(a, b);
        user = msg.sender;
        return calculateResult;
    }

}
