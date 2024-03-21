export interface ICategory {
  id: number;
  title: string;
}

export interface IPriority {
  id: number;
  title: string;
  color: string;
}

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  priority?: IPriority;
  category?: ICategory;
  deadline?: Date;
}
