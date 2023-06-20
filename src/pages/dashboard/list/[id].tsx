import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "@/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

function List() {
  const [itemName, setItemName] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  console.log(router.query);
  const addItem = api.item.createItem.useMutation();
  // const item = api.item.getItem.useQuery();
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
      name: itemName,
    },
  });

  const list = api.list.getSingleList.useQuery({
    id: router.query.id as string,
  });

  const { data: items, refetch: refetchItems } = api.item.getItems.useQuery({
    id: router.query.id as string,
  });
  const removeItem = api.item.deleteItem.useMutation({
    onSuccess: void refetchItems(),
  });

  const deleteItem = (e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute("value");
    console.log("deleted");
    removeItem.mutate({ id: value as string });
    toast({
      variant: "destructive",
      description: "Item has been deleted",
    });
  };
  function onSubmit(values: z.infer<typeof itemFormSchema>) {
    // setItemName(values.name);
    addItem.mutate({ id: router.query.id as string, name: values.name });

    // setItemName("");
  }

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
                            // key={itemName}
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
                      className=" flex w-full items-center justify-between space-y-4 rounded border border-secondary text-secondary-foreground shadow-sm shadow-secondary-foreground"
                    >
                      <div className="flex items-center justify-between p-4">
                        <Checkbox className="" />
                        <p className="ml-4">{item.name}</p>
                      </div>
                      <div className="px-4 pb-2">
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
