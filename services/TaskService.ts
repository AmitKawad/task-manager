import { request } from 'express';
import { taskInterface } from "../interfaces/TaskInterface";
const Task = require('./../models/Task');
export class TaskService {
    /**
     * Function to store the task in the database
     * @param request 
     * @param response 
     * @returns 
     */
    async addTask(request: any, response: any): Promise<string | undefined> {
        try {
            const inputParams: taskInterface = request.body
            const { name, status, owner, priority, date } = inputParams;
            const checkExisting = await this.findTask(name);
            if (checkExisting) {
                throw new Error("Task Already Exists in the database");
            }
            const newTask = new Task({
                name: name,
                owner: owner,
                status: status,
                priority: priority,
                date: date
            })
            const insertResult = await newTask.save();
            if (insertResult) {
                return "Task Saved to the database"
            }

        } catch (error) {
            throw error;
        }
    }
    /**
     * Function to find a task in the database
     * @param name 
     * @returns 
     */
    async findTask(name: string): Promise<any> {
        try {
            return await Task.findOne({
                where: {
                    name: name,
                },
            });
        } catch (error) {
            throw error
        }
    }
    /**
     * Function to update the task in the database
     * @param request 
     * @param response 
     * @returns 
     */
    async updateTask(request: any, response: any): Promise<string | undefined> {
        try {
            const inputParams: taskInterface = request.body
            const { name, status, owner, priority, date } = inputParams;
            const checkExisting = await this.findTask(name);
            if (!checkExisting) {
                throw new Error("Task Does not exist in the database");
            }
            const updatedTask = {
                owner: owner,
                status: status,
                priority: priority,
                date: date
            }
            const updateResult = await Task.update(updatedTask, {
                where: {
                    name: name,
                },
                returning: true, // This option returns the updated row
            });
            if (updateResult) {
                return "Task Updated to the database"
            }

        } catch (error) {
            throw error;
        }
    }
    /**
     * function to delete the task in the database
     * @param taskName 
     * @returns 
     */
    async deleteTask(taskName: string): Promise<string | undefined> {
        try {
            const checkExisting = await this.findTask(taskName);
            if (!checkExisting) {
                throw new Error("Task Does not exist in the database");
            }
            const updateResult = await Task.destroy({
                where: {
                    name: taskName,
                }// This option returns the updated row
            });
            if (updateResult) {
                return "Task Deleted from the database succssfully"
            }

        } catch (error) {
            throw error;
        }
    }
    /**
     * Function to fetch a single task from the database
     * @param taskName 
     * @returns 
     */
    async getTask(taskName: string): Promise<taskInterface | undefined> {
        try {
            const checkExisting = await this.findTask(taskName);
            if (!checkExisting) {
                throw new Error("Task Does not exist in the database");
            } else {
                return checkExisting;
            }
        } catch (error) {
            throw error;
        }
    }
    /**
     * function to fetch a list of tasks based on date from the database. Pagination is implemented with the help of offset and limit
     * @param date 
     * @param pageNumber 
     * @param pageSize 
     * @returns 
     */
    async getTaskList(date: string, pageNumber: number, pageSize: number): Promise<taskInterface[] | undefined> {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const limit = pageSize;
            return await Task.findAll({
                where: {
                    date: date,
                },
                offset: offset,
                limit: limit
            });
        } catch (error) {
            throw error;
        }
    }
    /**
     * Function to fetch the tasks based on the date and calculate meterics based on status. Pagination is implemented with the help of limit and offset
     * @param pageNumber 
     * @param pageSize 
     * @returns 
     */
    async getTaskListMetrics(pageNumber: number, pageSize: number) {
        try {
            let in_progress_tasks: number = 0;
            let completed_tasks: number = 0;
            let open_tasks: number = 0;
            const data = [];
            const offset = (pageNumber - 1) * pageSize;
            const limit = pageSize;
            const taskList: any[] = await Task.findAll({
                offset: offset,
                limit: limit
            });
            if (!taskList) {
                throw new Error("Tasks Dont exist in the database for given date");
            }
            console.log(taskList.length)
            const metricsByDate = taskList.reduce((result, task) => {
                const date = task.date;
                if (!result[date]) {
                    result[date] = {
                        date: date,
                        metrics: {
                            in_progress_tasks: 0,
                            completed_tasks: 0,
                            open_tasks: 0,
                        },
                    };
                }

                switch (task.status) {
                    case 'inProgress':
                        result[date].metrics.in_progress_tasks++;
                        break;
                    case 'completed':
                        result[date].metrics.completed_tasks++;
                        break;
                    case 'open':
                        result[date].metrics.open_tasks++;
                        break;
                    default:
                        break;
                }

                return result;
            }, {});
            const metricsArray = Object.values(metricsByDate);
            return metricsArray;
        } catch (error) {
            throw error;
        }
    }

}