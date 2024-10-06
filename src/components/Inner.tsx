import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const innerVariants = cva(
  "",
  {
    variants: {
      center: {
        true: 'flex flex-col items-center justify-center h-full'
      }
    },
    defaultVariants: {
      center: false
    }
  }
)

export interface InnerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof innerVariants> {
  asChild?: boolean
}

const Inner = React.forwardRef<HTMLDivElement, InnerProps>(
  ({ className, center, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
      className={cn(innerVariants({ center, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

type Inner = typeof Inner
Inner.displayName = 'Inner'

export { Inner }