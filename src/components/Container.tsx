import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "container mx-auto",
  {
    variants: {
      full: {
        true: 'h-screen'
      }
    },
    defaultVariants: {
      full: false
    }
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, full, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
      className={cn(containerVariants({ full, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

type Container = typeof Container
Container.displayName = 'Container'

export { Container }