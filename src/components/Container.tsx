import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "container mx-auto p-4",
  {
    variants: {
      flexible: {
        true: 'flex-1 overflow-y-auto overflow-x-hidden'
      }
    },
    defaultVariants: {
      flexible: false
    }
  }
)


export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, flexible, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(containerVariants({ flexible, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

type Container = typeof Container
Container.displayName = 'Container'

export { Container }