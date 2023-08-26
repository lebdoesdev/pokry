import type { ElementValue } from "$lib/types";
import type { FormField, FormFieldWithState } from "./form-field";

export interface FormSchema {
    fields: FormField[];
}

export interface FormInputSchema extends FormSchema {
    defaultValues: { [key: string]: ElementValue | null };
}

export interface FormState {
    isDirty: boolean;
    dirtyFields: string[];
    touchedFields: string[];
    hasSubmitted: boolean;
    isLoading: boolean;
    isValidating: boolean;
    isValid: boolean;
    errors: { [key: string]: string[] };
}

export interface Form extends FormSchema {
    fields: FormFieldWithState[];
    values: { [key: string]: ElementValue | null };
    defaultValues: { [key: string]: ElementValue | null };
    state: FormState;
}