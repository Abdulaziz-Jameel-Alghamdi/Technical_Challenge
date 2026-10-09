import { callTrello } from '../common-functions/trello-client';

// these are the five calls from the task a task in trello is a card  i used ai to help me write this
// the Task is: creating a board, creating a list within that board, creating a task, updating it, and finally cleaning up the entire setup.
// Trello API Challenge  
// Design and implement an automated end-to-end test for a realistic Trello workflow using JS.  
// You are expected to create automated test cases for the following workflow: creating a 
// board, creating a list within that board, creating a task, updating it, and finally cleaning up the 
// entire setup. The implementation should use Playwright with JavaScript. The tests must 
// perform functional testing and performance testing on the endpoints, aiming to cover as 
// much as possible to ensure that each API endpoint works as expected.


export class TrelloApi {
  constructor(request) {
    this.request = request;
  }
  // this creates a board
  createBoard(boardName) {
    return callTrello(this.request, 'post', 'boards', {
      name: boardName,
      defaultLists: 'false',
    });
  }

  // this gets a board by id this for the board that is created
  getBoard(boardId) {
    return callTrello(this.request, 'get', `boards/${boardId}`);
  }

  // this creates a list within that board
  createList(boardId, listName) {
    return callTrello(this.request, 'post', 'lists', {
      name: listName,
      idBoard: boardId,
    });
  }

  // this gets a list by id this 
  getList(listId) {
    return callTrello(this.request, 'get', `lists/${listId}`);
  }

  // this creates a card within that list
  createCard(listId, cardName) {
    return callTrello(this.request, 'post', 'cards', {
      idList: listId,
      name: cardName,
    });
  }

  // this gets a card by id this 
  getCard(cardId) {
    return callTrello(this.request, 'get', `cards/${cardId}`);
  }

  // this updates a card by id 
  updateCard(cardId, cardName, cardDescription) {
    return callTrello(this.request, 'put', `cards/${cardId}`, {
      name: cardName,
      desc: cardDescription,
    });
  }

  // this deletes a board 
  deleteBoard(boardId) {
    return callTrello(this.request, 'delete', `boards/${boardId}`);
  }
}
