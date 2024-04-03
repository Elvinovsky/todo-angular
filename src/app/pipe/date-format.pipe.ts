import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value?: string | number | Date | null): string | null {
    if (!value || !this.isValidDate(value)) return null;

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const inputDay = new Date(value).getDate();
    const inputMonth = new Date(value).getMonth();
    const inputYear = new Date(value).getFullYear();

    if (
      inputDay === currentDay &&
      inputMonth === currentMonth &&
      inputYear === currentYear
    ) {
      return 'Сегодня';
    } else if (
      inputDay === currentDay - 1 &&
      inputMonth === currentMonth &&
      inputYear === currentYear
    ) {
      return 'Вчера';
    } else if (
      inputDay === currentDay + 1 &&
      inputMonth === currentMonth &&
      inputYear === currentYear
    ) {
      return 'Завтра';
    }

    return this.formatDate(value);
  }

  private isValidDate(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private formatDate(value: string | number | Date): string {
    if (typeof value === 'string' || typeof value === 'number') {
      value = new Date(value);
    }
    return value.toLocaleDateString('ru-RU', { dateStyle: 'medium' });
  }
}
