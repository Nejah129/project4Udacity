import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createToDo } from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const isAuth = event.headers.Authorization;
    const arr = isAuth.split(" ");
    const Token = arr[1];

    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const newToDoItem = await createToDo(newTodo, Token);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        item: newToDoItem,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
