export interface User {
   userInfo: {
    _id: string,
     username: string,
    password: string,
    todos: []
}
}

export interface Auth {
    auth: User
}

export interface Task {
    crtNo?: number,
    _id?: string,
    title: string,
    description: string,
    addedBy: string,
    priority: string,
    progress: number,
    status: string,
    timestamp?: Date
}