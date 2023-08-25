import { DEFAULT_FORM } from "$lib/consts/default-form";
import type { Form, FormSchema } from "$lib/interfaces";
import type { ElementValue } from "$lib/types";
import { writable } from "svelte/store";

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

            return form;
        })
    }

    return {
        subscribe,

        /**
         * Initiate a new form with all default values and store a reference to them.
         */
        initiate: (schema: FormSchema) => {
            update(initialForm => ({
                ...initialForm, ...schema 
            }))
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
         * Mark a field as being dirty or touched.
         */
        markFieldAsDirtyOrTouched
    }
}

export const pokryForms = pokryFormActions();