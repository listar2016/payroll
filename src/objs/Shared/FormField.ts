export default class FormField {
    label: string;
    objName: string;
    propName: string;
    componentName: string;
    moduleName: string;
    

    //For drilling down to lists and objects
    //tier 0 - state[objName]
    //tier 1 - state[objName][propName]
    //tier 2 - state[objName][propName][subPropName]
    //tier 3 - state[objName][propName][index]
    //tier 4 - state[objName][propName][index][subPropName]
    tier: number;
    index: number;
    subIndex: number;
    subPropName: string;
    subSubPropName: string;
    subSubSubPropName: string;


    value: string | boolean | number | Date | any[] | null;

    //Options
    options: any[];
    itemText: string | null;
    itemValue: string | null;

    //Styling
    outlined: boolean;
    public constructor(init?: Partial<FormField>) {
        Object.assign(this, init);
    }
}
