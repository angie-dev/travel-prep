import { Injectable} from '@angular/core';
import { Category } from './category';

@Injectable()
export class Template{
    name: string;
    categories: Category[];
    custom_actions: { name: string}[];
}