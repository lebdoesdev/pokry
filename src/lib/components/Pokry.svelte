<script lang="ts">
	import type { FormField, FormSchema } from "$lib/interfaces";
	import type { ElementValue } from "$lib/types";
	import InputElement from "./elements/InputElement.svelte";
    import { pokryForms } from "$lib/utils";
	import { onMount } from "svelte";
	import { VALIDATOR_MAP, parseValidationString } from "$lib/validators";

    export let realTimeValidation = true;
    export let schema: FormSchema = {
        fields: []
    };

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
            await validateField(field, detail.value);
        }
    }

    const findField = (fieldName: string): FormField => {
        const field = schema.fields.find(f => f.name === fieldName);

        if (! field) {
            throw new Error('Trying to find a field which does not exist in the current form schema.');
        }

        return field;
    }

    const validateField = async (field: FormField, withValue: ElementValue) => {
        if (! schema.validators) {
            return;
        }

        const fieldValidation = schema.validators[field.name];

        if (! fieldValidation) {
            return;            
        }

        const result = await Promise.all(
            fieldValidation.map(validator => {
                const parsed = parseValidationString(validator, schema);

                return VALIDATOR_MAP[parsed.validator](withValue, ...parsed.args);
            })
        );

        const isValid = ! result.includes(false);

        console.log(isValid);
    }
</script>

<form>
    {#each schema.fields as field }
        <svelte:component this={findComponentByType(field.type)} {field} on:change={onElementChange} />
    {/each}

    <button type="submit">Submit Form</button>
</form>