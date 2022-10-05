import {TodoItem} from "../models/TodoItem";
import {parseUserId} from "../auth/utils";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import {ToDoAccess} from "./ToDoAccess";
const uuid=require('uuid')
const uuidv4=uuid.v4
const toDoAccess = new ToDoAccess();

export async function getAllToDo(Token: string): Promise<TodoItem[]> {
   try {
    const getUserId = parseUserId(Token);
    return toDoAccess.getAllToDo(getUserId);
   } catch (error) {
    console.log(error)
   }
}

export function createToDo(createTodoRequest: CreateTodoRequest, Token: string): Promise<TodoItem> {
    const userId = parseUserId(Token);
    const todoId =  uuidv4();
    const s3BucketName = process.env.S3_BUCKET_NAME;
    
    return toDoAccess.createToDo({
        userId: userId,
        todoId: todoId,
        attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, Token: string): Promise<TodoUpdate> {
    const userId = parseUserId(Token);
    return toDoAccess.updateToDo(updateTodoRequest, todoId, userId);
}

export function deleteToDo(todoId: string, Token: string): Promise<string> {
    const userId = parseUserId(Token);
    return toDoAccess.deleteToDo(todoId, userId);
}

export function generateUploadUrl(todoId: string): Promise<string> {
    return toDoAccess.generateUploadUrl(todoId);
}