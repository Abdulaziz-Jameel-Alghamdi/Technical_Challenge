import { test, expect } from '@playwright/test';
import { TrelloApi } from '../pages/trello.api';
import { checkCall } from '../common-functions/trello-client';
import { trelloTestData } from '../test-data/trello.data';

function logStep(stepNumber, message) {
  console.log(`step ${stepNumber} ${message}`);
}
// Trello API Challenge  
// Design and implement an automated end-to-end test for a realistic Trello workflow using JS.  
// You are expected to create automated test cases for the following workflow: creating a 
// board, creating a list within that board, creating a task, updating it, and finally cleaning up the 
// entire setup. 

// ---- for performance i used the functaion checkCall ------

// if a step fails i still delete the board so its not stay on my account
let boardId = '';

test.afterEach(async ({ request }) => {
  if (!boardId) {
    return;
  }

  const trelloApi = new TrelloApi(request);
  console.log('cleanup a step failed so i am deleting the board');
  await trelloApi.deleteBoard(boardId);
  boardId = '';
});

test('create a board, and list, and task, and update the task, then delete the board', async ({ request }) => {
  const trelloApi = new TrelloApi(request);
  const boardName = `${trelloTestData.boardName} ${Date.now()}`;
  let listId = '';
  let cardId = '';

  await test.step('1. Create a board', async () => {
    logStep(1, `i am creating the board ${boardName}`);
    const created = await trelloApi.createBoard(boardName);
    checkCall(created, 'create board');
    // i am checking if the board is created with the name i gave it in the test data folder
    expect(created.body.name).toBe(boardName);
    boardId = created.body.id;
    logStep(1, `the board is created the id is ${boardId} it took ${created.timeMs} ms`);

    const saved = await trelloApi.getBoard(boardId); // this gets the board by id to check if it is created
    checkCall(saved, 'get board'); // this checks if the board is created
    expect(saved.body.id).toBe(boardId); // this checks if the board id is the same as the one i created
    expect(saved.body.name).toBe(boardName); // this checks if the board name is the same as the one i created
    logStep(1, `i read the board again the name is the same it took ${saved.timeMs} ms`); // this logs the time it took to get the board
  });
//----------------------------------------------------------------------------------------------------------------------
  await test.step('2. Create a list on that board', async () => {
    logStep(2, `i am creating the list ${trelloTestData.listName}`);
    const created = await trelloApi.createList(boardId, trelloTestData.listName); 
    checkCall(created, 'create list');
    expect(created.body.name).toBe(trelloTestData.listName);
    expect(created.body.idBoard).toBe(boardId);
    listId = created.body.id;
    logStep(2, `the list is created the id is ${listId} it took ${created.timeMs} ms`);

    const saved = await trelloApi.getList(listId);
    checkCall(saved, 'get list');
    expect(saved.body.id).toBe(listId);
    expect(saved.body.idBoard).toBe(boardId);
    logStep(2, `i read the list again it is on the board it took ${saved.timeMs} ms`);
  });
//----------------------------------------------------------------------------------------------------------------------
  await test.step('3. Create a task on that list', async () => {
    logStep(3, `i am creating the task ${trelloTestData.cardName}`);
    const created = await trelloApi.createCard(listId, trelloTestData.cardName);
    checkCall(created, 'create card');
    expect(created.body.name).toBe(trelloTestData.cardName);
    expect(created.body.idList).toBe(listId);
    cardId = created.body.id;
    logStep(3, `the task is created the id is ${cardId} it took ${created.timeMs} ms`);

    const saved = await trelloApi.getCard(cardId);
    checkCall(saved, 'get card');
    expect(saved.body.id).toBe(cardId);
    expect(saved.body.name).toBe(trelloTestData.cardName);
    logStep(3, `i read the task again the name is the same it took ${saved.timeMs} ms`);
  });

//----------------------------------------------------------------------------------------------------------------------
  await test.step('4. Update the task', async () => {
    logStep(4, `i am updating the task to ${trelloTestData.updatedCardName}`);
    const updated = await trelloApi.updateCard(
      cardId,
      trelloTestData.updatedCardName,
      trelloTestData.cardDescription,
    );
    checkCall(updated, 'update card');
    expect(updated.body.name).toBe(trelloTestData.updatedCardName);
    expect(updated.body.desc).toBe(trelloTestData.cardDescription);
    logStep(4, `the task is updated it took ${updated.timeMs} ms`);

    const saved = await trelloApi.getCard(cardId);
    checkCall(saved, 'get card after update');
    expect(saved.body.name).toBe(trelloTestData.updatedCardName);
    expect(saved.body.desc).toBe(trelloTestData.cardDescription);
    logStep(4, `i read the task again the new name and description are correct it took ${saved.timeMs} ms`);
  });
      // ----------------------------------------------------------------------------------------------------------------------
  await test.step('5. Delete the board', async () => {
    logStep(5, `i am deleting the board ${boardId}`);
    const deleted = await trelloApi.deleteBoard(boardId);
    checkCall(deleted, 'delete board');
    logStep(5, `the board is deleted it took ${deleted.timeMs} ms`);

    const gone = await trelloApi.getBoard(boardId);
    expect(gone.response.status(), 'get deleted board').toBe(404);
    expect(gone.timeMs, `get deleted board took ${gone.timeMs} ms`).toBeLessThan(trelloTestData.maxResponseTimeMs);
    logStep(5, `the board is gone the status is ${gone.response.status()} it took ${gone.timeMs} ms`);

    boardId = '';
  });
});
