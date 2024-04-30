import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';


export class TodosController {

  //* DI
  constructor(private readonly todoRespository : TodoRepository) {
   }


  public getTodos = async( req: Request, res: Response ) => {
    const todos = await this.todoRespository.findAll();
    return res.json( todos );
  };

  public getTodoById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const todo = this.todoRespository.findById( id );
    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );
  };

  public createTodo = async( req: Request, res: Response ) => {
    
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if ( error ) return res.status(400).json({ error });

    const todo = await this.todoRespository.create( createTodoDto! );

    res.json( todo );

  };

  public updateTodo = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });
    
    const updatedTodo = await this.todoRespository.updateDto(updateTodoDto!);
    res.json( updatedTodo );

  }


  public deleteTodo = async(req:Request, res: Response) => {
    const id = +req.params.id;

   

    const deleted = await this.todoRespository.deleteById(id);

    ( deleted ) 
      ? res.json( deleted )
      : res.status(400).json({ error: `Todo with id ${ id } not found` });
    

  }
  


}