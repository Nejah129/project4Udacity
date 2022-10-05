import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { getAllToDo } from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const isAuth = event.headers.Authorization;
    const arr = isAuth.split(" ");
    const Token = arr[1];

    const todos = await getAllToDo(Token);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: todos,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
