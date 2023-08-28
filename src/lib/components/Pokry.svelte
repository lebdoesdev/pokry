<script lang="ts">
	import type { Form, FormField, FormSchema } from "$lib/interfaces";
	import type { ElementValue } from "$lib/types";
	import InputElement from "./elements/InputElement.svelte";
    import { pokryForms } from "$lib/utils";
	import { onDestroy, onMount } from "svelte";
	import { VALIDATOR_MAP, formatValidationMessage, parseValidationString } from "$lib/validators";
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
            type: ['input', 'email', 'password'],
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

                if (Array.isArray(validation)) {
                    // Likely come from child validation, just map it to top level.
                    return validation.map(v => getValidationMessageFromResult(validationMessages, v));
                }

                return getValidationMessageFromResult(validationMessages, validation);
            });

            pokryForms.updateValidationMessages(validationMessages);
        }
    }

    const getValidationMessageFromResult = (validationMessages: any, validation: any) => {
        if (validationMessages[validation.field]) {
            const alreadyReferenced = validationMessages[validation.field].findIndex(v => v === validation.message);

            if (alreadyReferenced === -1) {
                return validationMessages[validation.field].push(validation.message);
            }

            return validationMessages[validation.field];
        }

        validationMessages[validation.field] = [validation.message]
    }

    const validateField = async (field: FormField, withValue?: ElementValue, onlyValidator?: string) => {
        if (! field.validators?.length) {
            return;            
        }

        const value = withValue || field.value;

        const validators = onlyValidator ? field.validators.filter(v => v.includes(onlyValidator)) : field.validators;
        const children = internalForm.fields.filter(x => x.dependsOn?.includes(field.name));

        const result: any = await Promise.all([
            ...children.map(child => validateField(child, undefined, field.name)),
            ...validators.map(async validator => {
                const parsed = parseValidationString(validator, internalForm);
                const validationResult = await VALIDATOR_MAP[parsed.validator](value, ...parsed.args);

                if (! validationResult) {
                    return {
                        field: field.name,
                        message: formatValidationMessage(parsed.validator, field, ...parsed.args)
                    }
                }
            })
        ]);

        return result.filter((r: any) => r !== undefined);
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