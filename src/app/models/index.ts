export interface ICategory {
  id: string;
  title: string;
}

export interface IPriority {
  id: string;
  title: string;
  color: string;
}

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  priority?: IPriority;
  category?: ICategory;
  deadline?: Date;
}
