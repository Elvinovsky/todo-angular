import { ICategory, IPriority, ITask } from '../models';

export class Db {
  static categories: ICategory[] = [
    { id: '1', title: 'Работа' },
    { id: '2', title: 'Семья' },
    { id: '3', title: 'Учеба' },
    { id: '4', title: 'Отдых' },
    { id: '5', title: 'Спорт' },
    { id: '6', title: 'Еда' },
    { id: '7', title: 'Финансы' },
    { id: '8', title: 'Гаджеты' },
    { id: '9', title: 'Здоровье' },
    { id: '10', title: 'Автомобиль' },
    { id: '11', title: 'Ремонт' },
  ];

  static priorities: IPriority[] = [
    { id: '1', title: 'Низкий', color: '#e5e5e5' },
    { id: '2', title: 'Средний', color: '#85D1B2' },
    { id: '3', title: 'Высокий', color: '#F1828D' },
    { id: '4', title: 'Очень срочно!!', color: '#F1128D' },
  ];

  // не забывать - индексация приоритетов и категорий начинается с нуля
  static tasks: ITask[] = [
    {
      id: '1',
      title: 'Залить бензин полный бак',
      priority: Db.priorities[2],
      completed: false,
      category: Db.categories[9],
      deadline: new Date('2019-04-10'),
    },
    {
      id: '2',
      title: 'Передать отчеты начальнику управления',
      priority: Db.priorities[0],
      completed: false,
      category: Db.categories[0],
      deadline: new Date('2019-04-11'),
    },
    {
      id: '3',
      title: 'Залить бензин полный бак',
      priority: Db.priorities[2],
      completed: true,
      category: Db.categories[1],
    },
    {
      id: '4',
      title:
        'Сходить в парк с семьей, пригласить друзей Залить бензин полный бак',
      priority: Db.priorities[1],
      completed: false,
      category: Db.categories[1],
      deadline: new Date('2019-08-17'),
    },
    {
      id: '5',
      title: 'Найти и выучить учебник по квантовой физике',
      completed: false,
      category: Db.categories[2],
    },
    {
      id: '6',
      title: 'Сходить на семинар по программированию',
      priority: Db.priorities[1],
      completed: true,
      category: Db.categories[2],
      deadline: new Date('2019-06-11'),
    },
    {
      id: '7',
      title: 'Найти билеты в Турцию, выбрать отель',
      priority: Db.priorities[2],
      completed: false,
      category: Db.categories[3],
    },
    {
      id: '8',
      title: 'Приготовить ужин для всей семьи (семга с картошкой)',
      completed: false,
      category: Db.categories[5],
    },
    {
      id: '9',
      title: 'Подтянуться 10 раз',
      priority: Db.priorities[2],
      completed: false,
      category: Db.categories[4],
      deadline: new Date('2019-03-12'),
    },
    {
      id: '10',
      title: 'Пробежать 100 м',
      priority: Db.priorities[0],
      completed: true,
      category: Db.categories[4],
    },
    {
      id: '11',
      title: 'Организовать детский праздник ',
      completed: false,
    },
    {
      id: '12',
      title: 'Сходить на лекцию "Как научиться программировать на Java"',
      priority: Db.priorities[1],
      completed: false,
      category: Db.categories[2],
    },
    {
      id: '13',
      title: 'Купить продукты на неделю',
      priority: Db.priorities[2],
      completed: false,
      category: Db.categories[5],
      deadline: new Date('2019-05-11'),
    },
    {
      id: '14',
      title: 'Провести собрание по поводу всех проектов',
      completed: true,
      category: Db.categories[0],
    },
    {
      id: '15',
      title: 'Сдать экзамен по Java',
      priority: Db.priorities[2],
      completed: true,
    },
    {
      id: '16',
      title: 'Положить 100 000 р в банк на депозит',
      priority: Db.priorities[3],
      completed: false,
      category: Db.categories[6],
    },
    {
      id: '17',
      title: 'Попросить аванс на работе',
      priority: Db.priorities[2],
      completed: false,
      category: Db.categories[6],
    },
    {
      id: '18',
      title: 'Сдать анализы, проверить гемоглобин',
      priority: Db.priorities[3],
      completed: false,
      category: Db.categories[8],
      deadline: new Date('2020-12-11'),
    },
    {
      id: '19',
      title: 'Сравнить новый айпад с самсунгом',
      priority: Db.priorities[0],
      completed: false,
      category: Db.categories[7],
      deadline: new Date('2019-10-11'),
    },
    {
      id: '20',
      title: 'Футбол с сотрудниками',
      priority: Db.priorities[0],
      completed: false,
      category: Db.categories[4],
      deadline: new Date('2019-03-17'),
    },
  ];
}
