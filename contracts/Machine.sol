//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Calculator.sol";
import "hardhat/console.sol";

contract Machine {
    uint256 public calculateResult;
    address public user;

    event AddedValuesByDelegateCall(uint256 numb1, uint256 numb2, bool success);
    event AddedValuesByCall(uint256 numb1, uint256 numb2, bool success);

    constructor() {
        calculateResult = 0;
    }
/*  Note
    delegatecall is used when we do not know the abi of the target contract.
    the context changes will happen in delegate contract, in our case the Machine contract.
*/
    function addValuesByDelegateCall(address calculator, uint256 numb1, uint256 numb2) external returns(uint256 a){
        (bool success, bytes memory data) = calculator.delegatecall(abi.encodeWithSignature("add(uint256,uint256)", numb1, numb2));
        
        require(success, "Calculation Failled");
        emit AddedValuesByDelegateCall(numb1, numb2, success);
        (a) = abi.decode(data, (uint256));

    }

    function addValuesByCall(address calculator, uint256 numb1, uint256 numb2) external returns(uint256 a){
        (bool success, bytes memory data) = calculator.call(abi.encodeWithSignature("add(uint256,uint256)", numb1, numb2));
        
        require(success, "Calculation Failled");
        emit AddedValuesByDelegateCall(numb1, numb2, success);
        (a) = abi.decode(data, (uint256));
    }
}
