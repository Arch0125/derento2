const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let todoList;

  beforeEach(async () => {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    await todoList.deployed();
  })

  it("should be empty", async function () {
    expect(await todoList.getTodos()).to.deep.equal([]);
  });

  it("should add todo in list", async function () {
    await todoList.addTodo("simple todo", "1");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "1", false]]);
  });

  it("should add todos in list", async function () {
    await todoList.addTodo("simple todo", "2");
    await todoList.addTodo("my new todo", "3");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2", false], ["my new todo", "3", false]]);
  });

  it("should delete todos from list", async function () {
    await todoList.addTodo("simple todo", "2");
    await todoList.addTodo("my new todo", "3");
    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2", false], ["my new todo", "3", false]]);

    await todoList.removeTodo(1);
    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2", false]]);

    await todoList.removeTodo(0);
    expect(await todoList.getTodos()).to.deep.equal([]);
  });

  it("should edit todo", async function () {
    await todoList.addTodo("simple todo", "1");
    await todoList.addTodo("tickets", "to buy");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "1", false], ["tickets", "to buy", false]]);

    await todoList.editTodo(0, "1", "2", false);
    await todoList.editTodo(1, "ticket", "to buy", true);

    expect(await todoList.getTodos()).to.deep.equal([["1", "2", false], ["ticket", "to buy", true]]);
  });

  it("should mark as ready", async function () {
    await todoList.addTodo("simple todo", "2");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2", false]]);

    await todoList.markAsReady(0);

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2", true]]);
  });
});
