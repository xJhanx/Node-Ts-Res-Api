import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImplement extends TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return await todos.map(todo => TodoEntity.fromObject(todo));
    }
    async findById(id: number): Promise<TodoEntity> {

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if (!id) throw `id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }
    async updateDto(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });
        return TodoEntity.fromObject(updatedTodo);

    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id)
        const deleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObject(deleted);
    }

}