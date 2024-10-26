import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const heroVariants = cva(
  "relative w-screen h-screen p-4 flex flex-col items-center justify-center",
  {
    variants: {
      background: {
        true: "absolute inset-0 z-[-1]"
      }
    },
    defaultVariants: {
      background: false
    }
  }
)


export interface HeroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {
  asChild?: boolean
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, background, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(heroVariants({ background, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

type Hero = typeof Hero
Hero.displayName = 'Hero'

export { Hero }