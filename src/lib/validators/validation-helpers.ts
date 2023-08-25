import type { Form, FormSchema } from "$lib/interfaces";
import type { ValidationTypes } from "$lib/types";
import { findFieldByName } from "$lib/utils/helpers";

export function extractValuesFromValidationString(validationString: string) {
    if (! validationString.includes(':')) {
        return [];
    }

    return validationString.split(':')[1].split(',');
}

export function extractValidatorFromValidationString(validationString: string): ValidationTypes {
    if (! validationString.includes(':')) {
        return validationString as ValidationTypes;
    }

    return validationString.split(':')[0] as ValidationTypes;
}

export function parseValidationString(validationString: string, schema: FormSchema) {
    const validator = extractValidatorFromValidationString(validationString);
    let args = extractValuesFromValidationString(validationString);

    // We need to do some custom validation and parsing based on *some* of the validation methods which we have.

    if (validator === 'same') {
        args = [ findFieldByName(args[0], schema).value as string ];
    }

    if (validator === 'required_if') {
        args = [
            findFieldByName(args[0], schema).value as string,
            args[1]
        ]
    }

    return {
        validator,
        args
    }
}