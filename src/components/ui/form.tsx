import { Slot, type SlotProps } from '@radix-ui/react-slot'
import { useStore } from '@tanstack/react-form'
import type { LucideIcon } from 'lucide-react'
import { type ComponentProps, createContext, useId } from 'react'

import { Input, type InputProps } from '@/components/ui/input'
import { PasswordInput, type PasswordInputProps } from '@/components/ui/password-input'
import { Switch, type SwitchProps } from '@/components/ui/switch'
import { useFieldContext as _useFieldContext } from '@/entries/popup/hooks/use-form'
import { createContextProvider, createUseContext } from '@/utils/contexts'
import { buttonVariants, cn } from '@/utils/tailwind'

import { Label, type LabelProps } from './label'

interface FormItemContextValue {
  id: string
}

const FormItemContext = createContext<FormItemContextValue | null>(null)
const FormItemContextProvider = createContextProvider(FormItemContext)
const useFormItemContext = createUseContext(FormItemContext)

const useFieldContext = <T,>() => {
  const { id } = useFormItemContext()
  const { name, store, ...fieldContext } = _useFieldContext<T>()

  const errors = useStore(store, state => state.meta.errors)
  const value = useStore(store, state => state.value)

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Need to check if fieldContext is nullish
  if (fieldContext == null) {
    throw new Error('useFieldContext should be used within <FormItem>')
  }

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    store,
    value,
    ...fieldContext
  }
}

export const FormItem = ({ className, ...props }: ComponentProps<'div'>) => {
  const id = useId()

  return (
    <FormItemContextProvider id={id}>
      <div
        data-slot='form-item'
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContextProvider>
  )
}

export const FormLabel = ({ className, ...props }: LabelProps) => {
  const { formItemId, errors } = useFieldContext()

  return (
    <Label
      data-slot='form-label'
      data-error={!!errors.length}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

export const FormControl = ({ ...props }: SlotProps) => {
  const { errors, formItemId, formDescriptionId, formMessageId } = useFieldContext()

  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={!errors.length ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!errors.length}
      {...props}
    />
  )
}

export const FormMessage = ({ className, ...props }: ComponentProps<'p'>) => {
  const { errors, formMessageId } = useFieldContext()
  const body = errors.length ? String(errors.at(0)?.message ?? '') : props.children
  if (body == null) return null

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export const FormDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  const { formDescriptionId } = useFieldContext()

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

interface FormFieldWithIconProps extends React.ComponentProps<'div'> {
  Icon: LucideIcon
}

export const FormFieldWithIcon = ({ className, Icon, children, ...props }: FormFieldWithIconProps) => {
  const { errors, id, name } = useFieldContext()

  return (
    <div
      id={`${id}-${name}-field-with-icon`}
      className={cn('relative', className)}
      {...props}
    >
      <div
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'hover:bg-transparent',
          'absolute top-0 left-0 px-3 py-2 h-full inline-flex items-center justify-center',
          !!errors.length && 'text-destructive'
        )}
      >
        <Icon
          size={12}
          className='size-4'
        />
      </div>
      <Slot className={'pl-9'}>{children}</Slot>
    </div>
  )
}

export const FormInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const field = useFieldContext<string>()

  return (
    <Input
      {...props}
      value={field.value}
      onChange={e => {
        field.handleChange(e.target.value)
      }}
    />
  )
}

export const FormPasswordInput = (props: Omit<PasswordInputProps, 'value' | 'onChange'>) => {
  const field = useFieldContext<string>()

  return (
    <PasswordInput
      {...props}
      value={field.value}
      onChange={e => {
        field.handleChange(e.target.value)
      }}
    />
  )
}

export const FormSwitch = ({ onCheckedChange, ...props }: Omit<SwitchProps, 'checked'>) => {
  const field = useFieldContext<boolean>()

  return (
    <Switch
      {...props}
      checked={field.value}
      onCheckedChange={checked => {
        field.handleChange(checked)
        onCheckedChange?.(checked)
      }}
    />
  )
}
