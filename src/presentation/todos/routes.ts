import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImplement } from '../../infraestructure/datasource/todo.datasource.impl';
import { TodoRepositoryImplement } from '../../infraestructure/repository/todo.repository.impl';


export class TodoRoutes {


  static get routes(): Router {

    const router = Router();

    const todoDatasource = new TodoDataSourceImplement();
    const todoRespository = new TodoRepositoryImplement(todoDatasource);
    const todoController = new TodosController(todoRespository);

    router.get('/', todoController.getTodos );
    router.get('/:id', todoController.getTodoById );
    
    router.post('/', todoController.createTodo );
    router.put('/:id', todoController.updateTodo );
    router.delete('/:id', todoController.deleteTodo );


    return router;
  }


}

