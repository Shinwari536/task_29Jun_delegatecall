const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Delegate & Call Testing Contract", function () {
  it("Should add values using call method.", async function () {  
    const calContract = await ethers.getContractFactory("Calculator");
    [owner, addr1, addr2] = await ethers.getSigners();
    const calculator = await calContract.deploy();
    
    const machineContract = await ethers.getContractFactory("Machine");
    const machine = await machineContract.deploy();

    // console.log(calculator.address);
    await machine.addValuesByCall(calculator.address, 16, 4);
    // const waitDate = await resultVal.wait();
    console.log(await calculator.calculateResult());

    /* Note: Test the following
    * Because context is on “Calculator” not “Machine”, add result should be saved into “Calculator” storage
    * So “Calculator” calculateResult should be 20, and user address should set to "Machine" address.
    * And “Machine” calculateResult should be 0, and user to ZERO address.
    */

    expect(await calculator.calculateResult()).to.equal(20);
    expect(await machine.calculateResult()).to.equal(0);

    expect(await calculator.user()).to.equal(machine.address);

    // Since address(0) is undefined, it will give an error.
    // expect(await machine.user()).to.equal(address(0));
    
  });

  it("Should add values using delegatecall method.", async function () {
    const calContract = await ethers.getContractFactory("Calculator");
    [owner, addr1, addr2] = await ethers.getSigners();
    const calculator = await calContract.deploy();

    

    const machineContract = await ethers.getContractFactory("Machine");
    const machine = await machineContract.deploy();

    await machine.addValuesByDelegateCall(calculator.address, 16, 4);


     /* Note: Test the following
    * Because context is on “Machine” not “Calculator”, add result should be saved into “Machine” storage
    * So “Machine” calculateResult should be 20, and user address should set to "user" address.
    * And “Calculator” calculateResult should be 0, and user to ZERO address.
    */

    expect(await calculator.calculateResult()).to.equal(0);
    expect(await machine.calculateResult()).to.equal(20);

    expect(await machine.user()).to.equal(owner.address);
    // Since address(0) is undefined, it will give an error.
    // expect(await calculator.user()).to.equal(address(0));
    
  });
});
