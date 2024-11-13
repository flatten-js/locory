'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp"

import { Hero } from "@/components/Hero";
import { Typography } from "@/components/Typography";

import { usePage, State } from "./page.hooks";
import type { States } from "./page.hooks";

export default function LoginPage() {
  const { 
    state, 
    emailForm,
    verifyForm,
    handleEmailSubmit,
    handleVerifySubmit
  } = usePage();

  return (
    <Hero asChild>
      <main>
        <Typography variant="h1" className="mb-8" asChild>
          <h1>Welcome</h1>
        </Typography>

        <div className="w-10/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          {
            ([State.INITIAL, State.EMAIL_PROCESSING] as States[]).includes(state) ? (
              <Form {...emailForm}>
                <form className="w-full space-y-4" onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={state == State.EMAIL_PROCESSING}>Continue</Button>
                </form>
              </Form>
            ) : state >= State.EMAIL_SUCCESS && (
              <Form {...verifyForm}>
                <Typography variant="small" className="mb-4 text-center justify-center" wrap asChild>
                  <p>Enter the 6-digit code <span>sent to your email.</span></p>
                </Typography>
                <form className="w-full space-y-4" onSubmit={verifyForm.handleSubmit(handleVerifySubmit)}>
                  <FormField
                    control={verifyForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem> 
                        <FormControl>
                          <InputOTP 
                            containerClassName="justify-center" 
                            maxLength={6} 
                            {...field}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={state == State.VERIFY_PROCESSING}>Submit</Button>
                  {
                    state == State.VERIFY_ERROR && (
                      <Typography variant="muted" className="text-destructive text-center">
                        We apologize, but there was an issue during the login process. Please try again.
                      </Typography>
                    )
                  }
                </form>
              </Form>
            )
          }
        </div>
      </main>
    </Hero>
  )
}
