import { Item } from './item';

export class Category{
    name: string;
    take: boolean;
    has_items: boolean;
    items_count: number;
    items: Item[];
}