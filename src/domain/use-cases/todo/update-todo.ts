import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.respository";

export interface UpdateTodoUseCase {

    execute (dto : UpdateTodoDto) : Promise<TodoEntity>;
}


export class UpdateTodo implements  UpdateTodoUseCase{

    constructor(private readonly todoRepository : TodoRepository){}
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.updateDto(dto);
    }
    
    
}