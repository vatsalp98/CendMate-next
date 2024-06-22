import { JSX, RefAttributes, forwardRef } from "react";

import { useController, FieldValues, FieldPath } from "react-hook-form";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input, InputProps } from "~/components/ui/input";

interface FormFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: any;
  label: string;
  description?: string;
  renderField?: (field: any) => React.ReactNode;
  error?: string;
}

const CustomFormField = forwardRef<HTMLInputElement, FormFieldProps<any>>(
  ({ name, control, label, description, renderField, error }, ref) => {
    const { field, fieldState } = useController({ name, control });

    const renderInput = (
      fieldProps: JSX.IntrinsicAttributes &
        InputProps &
        RefAttributes<HTMLInputElement>,
    ) => {
      if (renderField) {
        return renderField(fieldProps); // Use custom renderField if provided
      } else {
        return <Input type="text" {...fieldProps} />; // Default Input component
      }
    };

    return (
      <FormItem>
        <div className="space-y-2">
          <div className="space-y-1">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {renderInput({ ...field, ref })}
        </div>
        {fieldState.error && (
          <FormMessage>{fieldState.error.message}</FormMessage>
        )}
      </FormItem>
    );
  },
);

CustomFormField.displayName = "CustomFormField";
export default CustomFormField;
