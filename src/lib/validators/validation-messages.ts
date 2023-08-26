import type { ValidationTypes } from "$lib/types";

export type ValidationMessage = string | { [key: string]: string };

export const VALIDATION_MESSAGES: { [key in ValidationTypes]: ValidationMessage } = {
    required: 'The {0} field is required.',
    between: {
        file: 'The {0} must be between {1} and {2} kilobytes.',
        array: 'The {0} must have between {1} and {2} items.',
        number: 'The {0} must be between {1} and {2}',
        input: 'The {0} must have between {1} and {2} characters.'
    },
    max: {
        file: 'The {0} may not be greater than {1} kilobytes.',
        array: 'The {0} may not have more than {1} items.',
        number: 'The {0} may not be greater than {1}.',
        input: 'The {0} may not have greater than {1} characters.'
    },
    min: {
        file: 'The {0} must be greater than {1} kilobytes.',
        array: 'The {0} must have more than {1} items.',
        number: 'The {0} has to be at least {1}.',
        input: 'The {0} must have at least {1} characters.'
    },
    email: 'The {0} is not a valid email address.',
    lookup: 'The {0} is invalid.',
    mime: 'The {0} must be a file of type {1}',
    mimetype: 'The {0} must be a file of type {1}',
    not: '',
    pattern: 'The {0} is an invalid format.',
    required_if: 'The {0} is required when {1} is {2}',
    same: 'The {0} and {1} must match.',
    url: 'The {0} is not a valid url.'
};