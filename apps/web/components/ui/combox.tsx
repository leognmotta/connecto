'use client'

import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPrimitive,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverPrimitive,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ComboboxProps {
  search?: string
  onSearch: (value: string) => void
}

interface ComboboxContext {
  open: boolean
  setOpen: (val: boolean) => void
}

const ComboboxContext = React.createContext<ComboboxProps & ComboboxContext>(
  {} as ComboboxProps & ComboboxContext,
)

export const ComboboxRoot: React.FC<React.PropsWithChildren<ComboboxProps>> = ({
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <ComboboxContext.Provider value={{ ...props, open, setOpen }}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  )
}

export const ComboboxSearchInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ ...props }, ref) => {
  const { search, onSearch } = React.useContext(ComboboxContext)

  return (
    <CommandInput
      {...props}
      ref={ref}
      value={search}
      onValueChange={(search) => onSearch(search)}
    />
  )
})
ComboboxSearchInput.displayName = 'ComboboxSearchInput'

export const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = React.useContext(ComboboxContext)

    return (
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          role="combobox"
          aria-expanded={open}
          className={cn(`justify-between px-0`, className)}
          {...props}
        >
          {children}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
    )
  },
)
ComboboxTrigger.displayName = 'ComboboxTrigger'

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <PopoverContent
    ref={ref}
    align="start"
    className={cn('p-0', className)}
    {...props}
  >
    <Command shouldFilter={false}>{children}</Command>
  </PopoverContent>
))
ComboboxContent.displayName = 'ComboboxContent'

export const ComboboxList: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <CommandList>{children}</CommandList>
}

export const ComboboxGroup: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <CommandGroup>{children}</CommandGroup>
}

export const ComboboxEmpty: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <CommandEmpty>{children}</CommandEmpty>
}

export const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ children, onSelect, ...props }, ref) => {
  const { setOpen } = React.useContext(ComboboxContext)

  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={(value) => {
        setOpen(false)
        onSelect?.(value)
      }}
    >
      {children}
    </CommandItem>
  )
})
ComboboxItem.displayName = 'ComboboxItem'

export const ComboboxSeparator = () => {
  return <CommandSeparator />
}
