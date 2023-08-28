import type { Form, FormField, FormSchema } from "$lib/interfaces";
import type { ValidationTypes } from "$lib/types";
import { findFieldByName } from "$lib/utils/helpers";
import { MESSAGE_TYPE_MAP, VALIDATION_MESSAGES } from "./validation-messages";

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

export function parseValidationString(validationString: string, schema: Form) {
    const validator = extractValidatorFromValidationString(validationString);
    let args = extractValuesFromValidationString(validationString);

    // We need to do some custom validation and parsing based on *some* of the validation methods which we have.

    if (validator === 'same') {
        args = [ args[0], findFieldByName(args[0], schema).value as string ];
    }

    if (validator === 'required_if') {
        args = [
            args[0],
            findFieldByName(args[0], schema).value as string,
            args[1]
        ]
    }

    return {
        validator,
        args
    }
}

export function formatValidationMessage(validationType: ValidationTypes, field: FormField, ...args: any) {
    let message = VALIDATION_MESSAGES[validationType];
    args.unshift(field.name);

    if (typeof message === 'object') {
        message = message[MESSAGE_TYPE_MAP[field.type]];
    }

    return message.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}