import { ArrayPath, Path, UseFieldArrayReturn, UseFormRegister, UseFormWatch } from "react-hook-form";
import { InputWithLabel, Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from "..";
import { Button } from "..";

interface DynamicSelectProps<F extends object, T extends ArrayPath<F>> {
    label: string;
    htmlFor: string;
    fields: UseFieldArrayReturn<F, T, "id">;
    onAppend: VoidFunction;
    onRemove: (index: number) => void;
    register: UseFormRegister<F>;
    options: SelectOption[];
    onUpdate: (index: number, value: string) => void;
    value: (index: number) => Path<F>;
    watch: UseFormWatch<F>;
    errorMessage?: string;
}

export function DynamicSelect<F extends object, T extends ArrayPath<F>>(props: DynamicSelectProps<F, T>): JSX.Element {
    const { label, htmlFor, fields, onAppend, onRemove, register, options, onUpdate, value, watch, errorMessage } = props;

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl">
                <span className={label === "RED" ? "text-red-600 font-bold" : "text-blue-600 font-bold"}>{label}</span> Team
            </h2>
            <div className="w-full flex flex-col lg:h-full lg:max-h-[27vh] xl:max-h-[52vh] 2xl:max-h-[53vh] lg:overflow-auto">
                <div className="flex-[0_0_45px] max-lg:w-[99%] w-11/12 self-center ">
                    <button className="mt-1 text-center w-full border-2 border-slate-700 rounded-md shadow-3xl hover:bg-slate-700 hover:text-white duration-300 ease-in-out" type="button" onClick={onAppend}>
                        Add team member
                    </button>
                </div>
                <InputWithLabel label={""} htmlFor={htmlFor}>
                    <ul className="flex flex-col-reverse gap-2 lg:w-full">
                        {errorMessage && <span className="text-red-500 block text-center">{errorMessage ?? ""}</span>}
                        {fields.fields.map((field, index) => {
                            return (
                                <li key={field.id} className="flex gap-2">
                                    <Select key={field.id} onValueChange={(e) => onUpdate(index, e)} value={watch(value(index))}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select a player" />
                                        </SelectTrigger>
                                        <SelectContent options={options} {...register(value(index))} />
                                    </Select>
                                    <button type="button" onClick={() => onRemove(index)}>
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </InputWithLabel>
            </div>
        </div>
    );
}
