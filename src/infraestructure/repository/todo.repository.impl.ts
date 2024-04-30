import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImplement implements TodoRepository {

    constructor(private readonly dataSource: TodoDataSource) {
    }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    findAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id);
    }
    updateDto(updateDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.updateDto(updateDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id);
    }

}