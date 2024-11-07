'use client'

import { type RouterOutputs } from "@/trpc/react"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { usePage } from "./page.hooks"


type PageClientProps = {
  user: RouterOutputs["user"]["getProfile"]
}

export default function PageClient({ user }: PageClientProps) {
  const { form, handleSubmit, activeTab, handleTabChange } = usePage({ user })

  return (
    <div className="max-w-screen-md">
      <Tabs 
        className="w-full"
        value={ activeTab }
        onValueChange={ handleTabChange }
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
      
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general account settings and preferences.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save changes</Button>
                </CardFooter>
              </form>
            </Form>    
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}