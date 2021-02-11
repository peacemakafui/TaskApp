const Task = require('../models/Task');
//logic for displaying tasks on home page
const task_board = (request, response)=>{
    Task.find().sort({createdAt: -1})
      .then((result)=>{
          response.render('taskBoard',{title:'All tasks', tasks:result})
          console.log('got tasks from db successfully')
      })
      .catch(error =>console.log(error));
}

//logic for getting a single task and editing it
const task_edit_get = (request,response)=>{
    const id = request.params.id;
    Task.findById(id)
     .then(result =>{
         response.render('edit',{task:result ,title:'Task Edit'});
         console.log('got task to edit successfuly');
     })
     .catch(error => console.log(error));
}

//logic for sending updated task to server
const task_edit_post = (request, response)=>{
    const task = {}
    task.title = request.body.title
    task.snippet = request.body.snippet
    task.body = request.body.body
    task.startDate = request.body.startDate
    task.dueDate = request.body.dueDate

    const id = {_id:request.params.id}
    Task.updateOne(id,task)
      .then(result =>{
          response.redirect('/taskBoard');
          console.log('updated task succussfully');
      })
      .catch(error => {
          response.status(404).render('404',{title: 'Its not you its us'});
          console.log(error)
        });
}

//logic for getting a single task
const task_details = (request, response)=>{
    const id = request.params.id;
    Task.findById(id)
      .then(result =>{
          response.render('details',{task:result, title:'Task Details'});
          console.log('got a single task successfully');
      })
      .catch(error => console.log(error));
    
}

//renders the task create page
const task_create_get = (request, response) =>{
    response.render('create', {title: 'Create a new Task'});
}

//logic for creating a new task
const task_create_post = (request, response)=>{
    const task = new Task(request.body);

    task.save()
      .then(result =>{
          response.redirect('/taskBoard');
          console.log('created new task succussfully');
      })
      .catch(error => {
          response.status(404).render('404',{title: 'Its not you its us'});
          console.log(error)
        });
}

//delete a single task
const task_delete = (request, response) =>{
    const id = request.params.id;
    Task.findByIdAndDelete(id)
      .then(result =>{
          response.json({redirect: '/taskBoard'})
          console.log('task deleted successfully');
      })
      .catch(error =>console.log(error));
}

module.exports ={
    task_board,
    task_details,
    task_create_get,
    task_create_post,
    task_delete,
    task_edit_get,
    task_edit_post
}