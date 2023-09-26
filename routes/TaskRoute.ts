import express, { request, response, NextFunction, Router } from 'express';
import { TaskService } from '../services/TaskService';
const router = express.Router();

/**
 * API to add a task into the database
 * @param request 
 * @param response 
 * @param next 
 */
const addTask = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const APIresponse = await taskService.addTask(request, response);
        response.json({
            success: true,
            message: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }


}
/**
 * API to update the task in the database
 * @param request 
 * @param response 
 * @param next 
 */
const updateTask = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const APIresponse = await taskService.updateTask(request, response);
        response.json({
            success: true,
            message: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }
}
/**
 * Function to delete the task in the database
 * @param request 
 * @param response 
 * @param next 
 */
const deleteTask = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const taskName = request.params.name
        const APIresponse = await taskService.deleteTask(taskName);
        response.json({
            success: true,
            message: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }
}
/**
 * API to get the task from the database by providing the task name as path parameter
 * @param request 
 * @param response 
 * @param next 
 */
const getTask = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const taskName = request.params.name
        const APIresponse = await taskService.getTask(taskName);
        response.json({
            success: true,
            data: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }
}
/**
 * API to get the list of tasks in the database. Pagination is implmented here with default as page 1 and 10 records
 * @param request 
 * @param response 
 * @param next 
 */
const getTaskList = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const date: string = request.params.date;
        const page: number = request.query.page || 1;
        const limit: number = request.query.limit || 5;
        const APIresponse = await taskService.getTaskList(date, page, limit);
        response.json({
            success: true,
            data: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }
}
/**
 * API to get the metrics of the tasks based on the dates. Pagination of default page 1 and 10 records is implemented.
 * @param request 
 * @param response 
 * @param next 
 */
const getTaskListMetrics = async function (request: any, response: any, next: any) {
    try {
        const taskService = new TaskService();
        const page: number = request.query.page || 1;
        const limit: number = request.query.limit || 10;
        const APIresponse = await taskService.getTaskListMetrics(page, limit);
        console.log(APIresponse)
        response.json({
            success: true,
            data: APIresponse
        });

    } catch (error: any) {
        response.json({
            success: false,
            error: error.message
        })
    }
}


router.post('', addTask);
router.put('', updateTask);
router.delete('/:name', deleteTask);
router.get('/getTask/:name', getTask);
router.get('/list/:date', getTaskList);
router.get('/list_metrics', getTaskListMetrics);

module.exports = router
