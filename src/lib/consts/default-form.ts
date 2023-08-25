import type { Form } from "$lib/interfaces";

export const DEFAULT_FORM: Form = {
    fields: [],
    values: {},
    defaultValues: {},
    state: {
        dirtyFields: [],
        errors: {},
        hasSubmitted: false,
        isDirty: false,
        isLoading: true,
        isValid: true,
        isValidating: false,
        touchedFields: []
    }
}