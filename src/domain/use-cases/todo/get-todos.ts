
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.respository";

export interface GetTodosUseCase {

    execute () : Promise<TodoEntity[]>;
}


export class GetTodos implements  GetTodosUseCase{

    constructor(private readonly todoRepository : TodoRepository){}
    execute(): Promise<TodoEntity[]> {
        return this.todoRepository.findAll();
    }
    
    
}