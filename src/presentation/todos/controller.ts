import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';


export class TodosController {

  //* DI
  constructor(private readonly todoRespository : TodoRepository) {
   }


  public getTodos = async( req: Request, res: Response ) => {
    new GetTodos(this.todoRespository).execute()
    .then( todos => res.json( todos ) )
    .catch( error => res.status( 500 ).json( { error } ) );
  };

  public getTodoById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    new GetTodo(this.todoRespository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => res.status( 500 ).json( { error } ) );
  };

  public createTodo = async( req: Request, res: Response ) => {
    
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if ( error ) return res.status(400).json({ error });

    new CreateTodo(this.todoRespository).execute(createTodoDto!)
    .then( todo => res.json( todo ) )
    .catch( error => res.status( 500 ).json( { error } ) );
  };

  public updateTodo = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });
    
    new UpdateTodo(this.todoRespository).execute(updateTodoDto!)
    .then( todo => res.json( todo ) )
    .catch( error => res.status( 500 ).json( { error } ) );
  }


  public deleteTodo = async(req:Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRespository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => res.status( 500 ).json( { error } ) );
  }
  


}