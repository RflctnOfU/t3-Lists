/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "item name must be at least 3 characters long.",
    })
    .max(20),
});

export function ItemForm(props: { refetchItems: () => void }) {
  const router = useRouter();
  const addItem = api.item.createItem.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addItem.mutate({ id: router.query.id as string, name: values.name });
    void props.refetchItems();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl className="">
                <Input
                  className="mr-2 pr-2"
                  placeholder="item name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your new item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-2" type="submit">
          Add Item
        </Button>
      </form>
    </Form>
  );
}
