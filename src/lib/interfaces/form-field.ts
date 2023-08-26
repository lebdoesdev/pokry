import type { ElementType, ElementValue, ValidationRules } from "$lib/types";
import type { FormFieldAttributes } from "./form-field-attributes";
import type { FormFieldState } from "./form-field-state";

export interface FormField {
    type: ElementType;
    name: string;
    value?: ElementValue;
    attributes?: FormFieldAttributes;
    validators?: ValidationRules[];
}

export interface FormFieldWithState extends FormField {
    state: FormFieldState;
}