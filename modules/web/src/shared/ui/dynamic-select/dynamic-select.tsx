import { ArrayPath, Path, UseFieldArrayReturn, UseFormRegister, UseFormWatch } from "react-hook-form";
import { InputWithLabel, Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from "..";

interface DynamicSelectProps<F extends object, T extends ArrayPath<F>> {
  label: string;
  htmlFor: string;
  fields: UseFieldArrayReturn<F, T, "id">
  onAppend: VoidFunction;
  onRemove: (index: number) => void;
  register: UseFormRegister<F>;
  options: SelectOption[];
  onUpdate: (index: number, value: string) => void;
  value: (index: number) => Path<F>;
  watch: UseFormWatch<F>;
  errorMessage?: string
}

export function DynamicSelect<F extends object, T extends ArrayPath<F>>(props: DynamicSelectProps<F, T>): JSX.Element {
    const { label, htmlFor, fields, onAppend, onRemove, register, options, onUpdate, value, watch, errorMessage } = props;

    return (
        <div>
            <InputWithLabel label={label} htmlFor={htmlFor}>
                <ul>
                    {fields.fields.map((field, index) => (
                        <li key={field.id}>
                            <Select key={field.id} onValueChange={(e) => onUpdate(index, e)} value={watch(value(index))}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a pro team" />
                                </SelectTrigger>
                                <SelectContent options={options} {...register(value(index))} />
                            </Select>
                            <button type="button" onClick={() => onRemove(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </InputWithLabel>
            {errorMessage && <span className="text-red-500">{errorMessage}</span>}
            <button
                type="button" onClick={onAppend}
            >
        append
            </button>
        </div>
    );
}
