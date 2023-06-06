import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { ItemForm } from "@/components/itemForm";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Icons } from "@/components/icons";

function List() {
  const router = useRouter();
  console.log(router.query);
  const addItem = api.item.createItem.useMutation();
  const itemFormSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: "item name must be at least 3 characters long.",
      })
      .max(20),
  });
  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
    },
  });
  // const [item, setItem] = useState({});
  const list = api.list.getSingleList.useQuery({
    id: router.query.id as string,
  });

  const { data: items, refetch: refetchItems } = api.item.getItems.useQuery({
    id: router.query.id as string,
  });
  const removeItem = api.item.deleteItem.useMutation({
    onSuccess: void refetchItems(),
  });
  // const addItem = api.item.createItem.useMutation({
  //   onSuccess: void refetchItems(),
  // });

  const deleteItem = (e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute("value");
    console.log("deleted");
    removeItem.mutate({ id: value as string });
  };
  function onSubmit(values: z.infer<typeof itemFormSchema>) {
    addItem.mutate({ id: router.query.id as string, name: values.name });
    // void props.refetchItems();
  }
  // const formSchema = z.object({
  //   name: z
  //     .string()
  //     .min(3, {
  //       message: "item name must be at least 3 characters long.",
  //     })
  //     .max(20),
  // });

  // function onSubmit(e: SubmitHandler<{ name: string }>) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //   // const {value} = e.target
  //   addItem.mutate({ name: item as string, id: router.query.id as string });
  //   console.log("");
  // }

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <Card className="shadow-sm shadow-primary">
          <CardHeader className="m-2 flex flex-row items-center justify-between gap-4 rounded-md border shadow-sm shadow-primary">
            <div>
              <Icons.list />
            </div>
            <div>
              <CardTitle>{list.data?.name}</CardTitle>
              <CardDescription>List:</CardDescription>
            </div>
            <div>
              <Form {...form}>
                <form
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
            </div>
          </CardHeader>
          <CardContent className="mx-4 my-2 flex items-center justify-between gap-4 rounded-md border pt-4 shadow-sm shadow-primary">
            <ScrollArea className="h-96 w-full space-y-4 rounded-sm border border-secondary p-4">
              {items?.length ? (
                items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className=" flex w-full items-center justify-between space-y-4 border border-secondary text-secondary-foreground shadow-sm shadow-secondary-foreground"
                    >
                      <div className="flex items-center justify-between">
                        <Checkbox />
                        <p className="ml-4">{item.name}</p>
                      </div>
                      <div>
                        <Button
                          onClick={deleteItem}
                          variant={"destructive"}
                          value={item.id}
                        >
                          Delete Item
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No Items in List</div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default List;
