//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract RentList {
    struct Rent {
        string name;
        string description;
        string price;
        string duration;
        bool isReady;
    }

    mapping(address => Rent[]) rents;

    function addRent(string memory _name, string memory _description, string memory _price, string memory _duration)
        public
        returns (Rent memory)
    {
        Rent memory name = Rent(_name, _description, _price, _duration, false);
        rents[msg.sender].push(name);
        return name;
    }

    function getRents() public view returns (Rent[] memory) {
        return rents[msg.sender];
    }

    function removeRent(uint256 _id) public returns (Rent[] memory) {
        rents[msg.sender][_id] = rents[msg.sender][
            rents[msg.sender].length - 1
        ];
        rents[msg.sender].pop();
        return rents[msg.sender];
    }

    function editRent(
        uint256 _id,
        string memory _name,
        string memory _description,
        string memory _price,
        string memory _duration,
        bool isReady
    ) public returns (Rent memory) {
        rents[msg.sender][_id] = Rent(_name, _description, _price, _duration, isReady);
        return rents[msg.sender][_id];
    }

    function markAsReady(uint256 _id) public returns (Rent memory) {
        rents[msg.sender][_id].isReady = true;
        return rents[msg.sender][_id];
    }
}
