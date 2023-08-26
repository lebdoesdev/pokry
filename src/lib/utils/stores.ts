import { DEFAULT_FORM } from "$lib/consts/default-form";
import type { Form, FormSchema } from "$lib/interfaces";
import type { ElementValue } from "$lib/types";
import { writable } from "svelte/store";
import { findFieldIndexByName } from "./helpers";

export const form = writable<Form>(DEFAULT_FORM);

const pokryFormActions = () => {
    const { subscribe, set, update } = writable<Form>(DEFAULT_FORM);

    const markFieldAsDirtyOrTouched = (fieldName: string, type: 'dirty' | 'touched') => {
        update(form => {
            const referenced = form.state[`${type}Fields`].includes(fieldName);

            if (referenced) {
                return form;
            }

            form.state[`${type}Fields`].push(fieldName);
            form.fields[findFieldIndexByName(fieldName, form)].state[type] = true;

            return form;
        })
    }

    return {
        subscribe,

        /**
         * Initiate a new form with all default values and store a reference to them.
         */
        initiate: (schema: FormSchema) => {
            set({
                ...DEFAULT_FORM,
                ...schema,
                fields: schema.fields.map(s => ({
                    ...s,
                    state: {
                        dirty: false,
                        isValid: true,  
                        touched: false
                    }
                }))
            })
        },

        /**
         * Reset a form back to the default value.
         */
        reset: () => set(DEFAULT_FORM),

        /**
         * Update a form field.
         */
        updateField: (fieldName: string, value: ElementValue) => {
            update(form => {
                const fieldIndex = form.fields.findIndex(f => f.name === fieldName);

                if (fieldIndex === -1) {
                    return form;
                }

                form.fields[fieldIndex].value = value;
                form.values[fieldName] = value;

                markFieldAsDirtyOrTouched(fieldName, 'dirty');

                return form;
            })
        },

        /**
         * Update the validation messages for the form.
         */
        updateValidationMessages: (validationMessages: { [key: string]: string[] }) => {
            update(form => {
                form.state.errors = validationMessages;

                form.fields = form.fields.map(field => ({
                    ...field,
                    state: {
                        ...field.state,
                        isValid: ! Object.keys(validationMessages).includes(field.name)
                    }
                }));

                return form;
            })
        },

        /**
         * Mark a field as being dirty or touched.
         */
        markFieldAsDirtyOrTouched
    }
}

export const pokryForms = pokryFormActions();