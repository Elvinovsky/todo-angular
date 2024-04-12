import { CommonRepository } from './CommonRepository';
import { IPriority } from '../../../models';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class PriorityRepository extends CommonRepository<IPriority> {}
