import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource{

    abstract create(createTodoDto : CreateTodoDto) : Promise<TodoEntity>;
    //todo :: Posible paginacion 
    abstract getAll() : Promise<TodoEntity[]>;
    abstract findById(id : number) : Promise<TodoEntity>;
    abstract updateDto(updateDto : UpdateTodoDto) : Promise<TodoEntity>;
    abstract deleteById(id : number) : Promise<TodoEntity>;

}