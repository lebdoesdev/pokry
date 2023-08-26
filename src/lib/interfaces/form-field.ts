import type { ElementType, ElementValue } from "$lib/types";
import type { FormFieldAttributes } from "./form-field-attributes";
import type { FormFieldState } from "./form-field-state";

export interface FormField {
    type: ElementType;
    name: string;
    value?: ElementValue;
    attributes?: FormFieldAttributes;
}

export interface FormFieldWithState extends FormField {
    state: FormFieldState;
}