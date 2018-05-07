import { Template } from './template';

export var DEFAULT_TEMPLATE: Template = {
    "name": "Default Template",
    "categories": [
        {
            "name": "Magic items",
            "take": false,
            "has_items": false,
            "items_count": 0,
            "items": [
                {"name": 'Wand', "default_action": 'craft',"act": false, "take": false, "pack": false, "done": false},
                {"name": 'Crystal Ball', "default_action": 'craft', "act": false, "take": false, "pack": false, "done": false}
            ]
        },
        {
            "name": "Clothes",
            "take": false,
            "has_items": false,
            "items_count": 0,
            "items": [
                {"name": 'Cloak', "default_action": 'wash',"act": false, "take": false, "pack": false, "done": false},
                {"name": 'Hat', "default_action": 'wash',"act": false, "take": false, "pack": false, "done": false}
            ]
        }
    ],
    custom_actions: [{name:"Go see Dumbledore"}, {name:"Practice lockpicking"}] 
}
