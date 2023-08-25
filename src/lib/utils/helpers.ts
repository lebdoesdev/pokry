import type { FormField, FormSchema } from "$lib/interfaces";

export const findFieldByName = (name: string, schema: FormSchema): FormField => {
    const field = schema.fields.find(f => f.name === name);

    if (! field) {
        throw new Error('Trying to find a field which does not exist in the current form schema.');
    }

    return field;
}