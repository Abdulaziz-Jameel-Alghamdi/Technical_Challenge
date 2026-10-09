// this file is only for my reference there is no action in this file

export const apiRefrense = {
  baseUrl: 'https://api.trello.com/1/',
  authQueryOnEveryCall: ['key', 'token'],
  endpoints: [
    {
      step: 'create a board',
      method: 'post',
      path: 'boards',
      query: ['name', 'defaultLists'],
    },
    {
      step: 'read the board',
      method: 'get',
      path: 'boards/{boardId}',
      query: [],
    },
    {
      step: 'create a list',
      method: 'post',
      path: 'lists',
      query: ['name', 'idBoard'],
    },
    {
      step: 'read the list',
      method: 'get',
      path: 'lists/{listId}',
      query: [],
    },
    {
      step: 'create a task',
      method: 'post',
      path: 'cards',
      query: ['idList', 'name'],
    },
    {
      step: 'read the task',
      method: 'get',
      path: 'cards/{cardId}',
      query: [],
    },
    {
      step: 'update the task',
      method: 'put',
      path: 'cards/{cardId}',
      query: ['name', 'desc'],
    },
    {
      step: 'delete the board',
      method: 'delete',
      path: 'boards/{boardId}',
      query: [],
    },
  ],
};
