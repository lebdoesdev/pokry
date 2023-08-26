import type { Form, FormFieldWithState } from "$lib/interfaces";

export const findFieldByName = (name: string, schema: Form): FormFieldWithState => {
    const field = schema.fields.find(f => f.name === name);

    if (! field) {
        throw new Error('Trying to find a field which does not exist in the current form schema.');
    }

    return field;
}

export const findFieldIndexByName = (name: string, schema: Form): number => {
    const fieldIndex = schema.fields.findIndex(f => f.name === name);

    if (fieldIndex === -1) {
        throw new Error('Trying to find a field which does not exist in the current form schema.');
    }

    return fieldIndex;
}