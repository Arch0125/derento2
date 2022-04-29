//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        string todo;
        string description;
        bool isReady;
    }

    mapping(address => Todo[]) todos;

    function addTodo(string memory _todo, string memory _description)
        public
        returns (Todo memory)
    {
        Todo memory todo = Todo(_todo, _description, false);
        todos[msg.sender].push(todo);
        return todo;
    }

    function getTodos() public view returns (Todo[] memory) {
        return todos[msg.sender];
    }

    function removeTodo(uint256 _id) public returns (Todo[] memory) {
        todos[msg.sender][_id] = todos[msg.sender][
            todos[msg.sender].length - 1
        ];
        todos[msg.sender].pop();
        return todos[msg.sender];
    }

    function editTodo(
        uint256 _id,
        string memory _todo,
        string memory _description,
        bool isReady
    ) public returns (Todo memory) {
        todos[msg.sender][_id] = Todo(_todo, _description, isReady);
        return todos[msg.sender][_id];
    }

    function markAsReady(uint256 _id) public returns (Todo memory) {
        todos[msg.sender][_id].isReady = true;
        return todos[msg.sender][_id];
    }
}
