import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { deleteToDo } from "../../helpers/ToDo";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const isAuth = event.headers.Authorization;
    const arr = isAuth.split(" ");
    const Token = arr[1];

    const todoId = event.pathParameters.todoId;

    const deletedOne = await deleteToDo(todoId, Token);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: deletedOne,
    };
  } catch (error) {
    console.log(error);
  }
};
