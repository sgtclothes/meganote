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
Route.post('/addNote', 'NoteController.add')

Route.post('/register', 'UserController.register').middleware(['guest'])
Route.post('/login', 'UserController.login').middleware(['guest'])

}).prefix('api/v1')