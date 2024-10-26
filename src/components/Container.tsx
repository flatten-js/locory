import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"


export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn("container mx-auto p-4", className)}
        ref={ref}
        {...props}
      />
    )
  }
)

type Container = typeof Container
Container.displayName = 'Container'

export { Container }