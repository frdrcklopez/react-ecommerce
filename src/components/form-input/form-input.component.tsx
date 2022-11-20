import { InputHTMLAttributes, FC } from 'react';
import {
    Group, 
    Input,
    FormInputLabel 
} from './form-input.styles'

type InputOptions = {
    type : string; 
    required : boolean;
    name : string;
    onChange : any;
    value : string;
}

type FormInputProps = {
    label : string;
    inputOptions : InputOptions;
} & InputHTMLAttributes<HTMLInputElement>

const FormInput : FC<FormInputProps> = ({ label, inputOptions }) => {
    const { value } = inputOptions

    return (
        <Group>
            <Input {...inputOptions}/>
            { label  && (
                <FormInputLabel
                    shrink={Boolean(value && 
                        typeof value === 'string' &&
                        value.length
                    )}
                >   
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
}
 
export default FormInput;