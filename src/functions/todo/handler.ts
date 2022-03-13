import { APIGatewayProxyEvent } from 'aws-lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from '@functions/todo/schema';
import { v4 } from 'uuid';
import todoService from '@functions/service';

export const getAllTodos = middyfy(async () => {
  const todos = await todoService.getAllTodos();
  return formatJSONResponse(200, {
    todos,
  });
});

export const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = middyfy(async (event) => {
  try {
    const id = v4();
    const todo = await todoService.createTodo({
      todosId: id,
      title: event.body.title,
      description: event.body.description,
      createdAt: new Date().toISOString(),
      status: false,
    });
    return formatJSONResponse(201, {
      todo,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
});

export const getTodo = middyfy(async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.getTodo(id);
    return formatJSONResponse(200, {
      todo,
      id,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
});

export const updateTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = middyfy(async (event) => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.updateTodo(id);
    return formatJSONResponse(200, {
      todo,
      id,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
});

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.deleteTodo(id);
    return formatJSONResponse(200, {
      todo,
      id,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
});
