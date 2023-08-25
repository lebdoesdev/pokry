import type { ElementType, ElementValue } from "$lib/types";
import type { FormFieldAttributes } from "./form-field-attributes";
import type { FormFieldMeta } from "./form-field-meta";

export interface FormField {
    type: ElementType;
    name: string;
    value?: ElementValue;
    attributes?: FormFieldAttributes;
}

export interface FormFieldWithMeta extends FormField {
    meta: FormFieldMeta;
}