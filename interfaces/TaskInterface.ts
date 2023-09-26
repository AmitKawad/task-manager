export interface taskInterface {
    name: string,
    status: StatusEnum,
    owner: string,
    date: string
    priority:number
}
export interface updateTaskInterface {
    name: string,
    status: StatusEnum,
    owner: string,
    date: string
    priority:number
}
enum StatusEnum {
    InProgress = 'inProgress',
    Completed = 'completed',
    OpenTasks = 'open',
  }