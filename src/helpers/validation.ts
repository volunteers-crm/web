import { Ref } from 'vue'

export const validator = (form: Ref, callback: CallableFunction) => {
    form.value.validate()
        .then((validator: any) => {
            if (! validator.valid) {
                throw validator.errors
            }

            callback()
        })
        .catch((errors: any) => {
            const id: string = errors[0].id

            document.getElementById(id)?.focus()
        })
}
