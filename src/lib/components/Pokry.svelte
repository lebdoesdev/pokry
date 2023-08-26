<script lang="ts">
	import type { Form, FormField, FormSchema } from "$lib/interfaces";
	import type { ElementValue } from "$lib/types";
	import InputElement from "./elements/InputElement.svelte";
    import { pokryForms } from "$lib/utils";
	import { onDestroy, onMount } from "svelte";
	import { VALIDATOR_MAP, formatValidationMessage, parseValidationString } from "$lib/validators";
	import { findFieldByName } from "$lib/utils/helpers";
	import { DEFAULT_FORM } from "$lib/consts/default-form";

    export let realTimeValidation = true;
    export let schema: FormSchema = {
        fields: []
    };

    let internalForm: Form = DEFAULT_FORM;

    const unsubscribe = pokryForms.subscribe(value => {
        internalForm = value;
    })

    onMount(() => {
        pokryForms.initiate(schema);
    })

    const fieldComponentMap = [
        {
            type: ['input', 'email'],
            component: InputElement
        }
    ]

    const findComponentByType = (type: string) => {
        return fieldComponentMap.find(fieldComponent => fieldComponent.type.includes(type))?.component;
    }

    const onElementChange = async ({ detail }: CustomEvent<{ name: string, value: ElementValue }>) => {
        const field = schema.fields.find(f => f.name === detail.name);

        if (! field) {
            return;
        }

        pokryForms.updateField(detail.name, detail.value);

        if (realTimeValidation) {
            const validationResult = await Promise.all(
                internalForm.fields
                    .filter(schemaField => schemaField.state.dirty)
                    .map(schemaField => validateField(schemaField))
            );

            const validationMessages: { [key: string]: string[] } = {};

            validationResult.flat().forEach(validation => {
                if (! validation) {
                    return;
                }

                if (validationMessages[validation.field]) {
                    return validationMessages[validation.field].push(validation.message);
                }

                validationMessages[validation.field] = [validation.message];
            });

            pokryForms.updateValidationMessages(validationMessages);
        }
    }

    const validateField = async (field: FormField, withValue?: ElementValue) => {
        if (! schema.validators) {
            return;
        }

        const fieldValidation = schema.validators[field.name];

        if (! fieldValidation) {
            return;            
        }

        const value = withValue || field.value;

        const result = await Promise.all(
            fieldValidation.map(async validator => {
                const parsed = parseValidationString(validator, internalForm);
                const validationResult = await VALIDATOR_MAP[parsed.validator](value, ...parsed.args);

                if (! validationResult) {
                    return {
                        field: field.name,
                        message: formatValidationMessage(parsed.validator, field, ...parsed.args)
                    }
                }
            })
        );

        return result.filter(r => r !== undefined);
    }

    onDestroy(unsubscribe);
</script>

{#each Object.entries(internalForm.state.errors) as [fieldName, errorMessages]} 
    {#each errorMessages as errorMessage}
        <p>{ errorMessage }</p>
    {/each}
{/each}

<form>
    {#each schema.fields as field }
        <svelte:component this={findComponentByType(field.type)} {field} on:change={onElementChange} />
    {/each}

    <button type="submit">Submit Form</button>
</form>

<style>
    form {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 20px;
        width: 50%;
    }
</style>