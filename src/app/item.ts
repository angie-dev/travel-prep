export class Item{
    name: string;
    default_action: string;
    current_actions: {name: string, done: boolean}[];
    take: boolean;
    pack: boolean;
    act: boolean;
}