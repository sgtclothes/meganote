'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
// Route.on('/').render('welcome')
Route.get('/getNotes', 'NoteController.index')
Route.post('/addNote', 'NoteController.add')
Route.get('/show/:id', 'NoteController.show')
Route.get('/delete/:id', 'NoteController.delete')
Route.post('/update/:id', 'NoteController.update')
Route.post('/addReminder', 'NoteController.addReminder')

Route.post('/register', 'UserController.register').middleware(['guest'])
Route.post('/login', 'UserController.login').middleware(['guest'])
Route.get('/user/profile/:id', 'UserController.showProfile').middleware(['auth'])
Route.post('/user/updateProfile/:id', 'UserController.updateProfile').middleware(['auth'])

}).prefix('api/v1')