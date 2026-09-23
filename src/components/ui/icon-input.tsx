/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Field, FieldLabel, FieldError } from "./field";
import { Input } from "./input";
import { cn } from "cn";

export interface IconInputProps extends React.ComponentProps<typeof Input> {
  /**
   * Instancia de FieldApi provista por TanStack Form (ej. `field` de `<form.Field>`)
   */
  field: any;
  /**
   * El texto del label
   */
  label: string;
  /**
   * Elemento opcional renderizado a la izquierda (ej. ícono)
   */
  leftIcon?: React.ReactNode;
  /**
   * Elemento opcional renderizado a la derecha dentro del contenedor del input (ej. botón de ojito)
   */
  rightElement?: React.ReactNode;
}

export function IconInput({
  field,
  label,
  className,
  leftIcon,
  rightElement,
  ...props
}: IconInputProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="relative mt-2">
      <div className="flex flex-col gap-2 w-full">
        <FieldLabel htmlFor={field.name} className="sr-only">
          {label}
        </FieldLabel>
        <div className="relative w-full">
          <Input
            id={field.name}
            name={field.name}
            placeholder={label}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            aria-invalid={isInvalid}
            className={cn(
              "w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] focus:bg-white/10 focus:border-white/20 text-foreground text-sm font-medium focus:outline-none transition-all placeholder:text-muted-foreground",
              leftIcon ? "pl-11" : "",
              rightElement ? "pr-12" : "",
              className,
            )}
            {...props}
          />
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          {rightElement}
        </div>
        {isInvalid && (
          <FieldError
            errors={field.state.meta.errors.map((err: any) => ({
              message: err as string,
            }))}
          />
        )}
      </div>
    </Field>
  );
}
