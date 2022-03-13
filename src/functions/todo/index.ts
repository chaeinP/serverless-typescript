import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handler.getAllTodos`,
  events: [
    {
      http: {
        method: 'get',
        path: 'todo',
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/handler.createTodo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'todo',
      },
      request: {
        schemas: {
          'application/json': schema,
        },
      },
    },
  ],
};

export const getTodo = {
  handler: `${handlerPath(__dirname)}/handler.getTodo`,
  events: [
    {
      http: {
        method: 'get',
        path: 'todo/{id}',
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/handler.updateTodo`,
  events: [
    {
      http: {
        method: 'put',
        path: 'todo/{id}',
      },
      request: {
        schemas: {
          'application/json': schema,
        },
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handler.deleteTodo`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'todo/{id}',
      },
    },
  ],
};
