import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { getTokenChunk, initGame } from "./actions";
import { usePlayerStore } from "@/store/player-store";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const StartGameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  complexity: z
    .number()
    .min(1)
    .max(10, { message: "Difficulty must be between 1 and 10" }),
});

const StartGameForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [tokenChunk, setTokenChunk] = React.useState<string[]>([]);
  const progressValue = (tokenChunk.length / 4) * 100;

  const setPlayerId = usePlayerStore((state) => state.setPlayerId);
  const setName = usePlayerStore((state) => state.setName);
  const setComplexity = usePlayerStore((state) => state.setComplexity);
  const addChunk = usePlayerStore((state) => state.addChunk);

  const form = useForm<z.infer<typeof StartGameSchema>>({
    resolver: zodResolver(StartGameSchema),
    defaultValues: {
      name: "",
      complexity: 1,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof StartGameSchema>> = async (
    data
  ) => {
    setTokenChunk([]);
    setLoading(true);

    try {
      const res = await initGame(data);

      setName(data.name);
      setComplexity(data.complexity);
      setPlayerId(res.id);

      const chunk1 = await getTokenChunk(res.id, 1);
      setTokenChunk((prev) => [...prev, chunk1.chunk]);

      const chunk2 = await getTokenChunk(res.id, 2);
      setTokenChunk((prev) => [...prev, chunk2.chunk]);

      const chunk3 = await getTokenChunk(res.id, 3);
      setTokenChunk((prev) => [...prev, chunk3.chunk]);

      const chunk4 = await getTokenChunk(res.id, 4);
      setTokenChunk((prev) => [...prev, chunk4.chunk]);

      const fullChunks = [
        chunk1.chunk,
        chunk2.chunk,
        chunk3.chunk,
        chunk4.chunk,
      ].join("");
      addChunk(fullChunks);

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/game");
    } catch (error) {
      console.error(error);
      const isString = typeof error === "string";
      toast({
        title: "Error",
        description: isString ? error : String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 text-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="John"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="complexity">Complexity</FormLabel>
              <FormControl>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  disabled={loading}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-gray-500 mt-2">
                Selected Difficulty: {field.value}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button disabled={loading} type="submit">
            Lets role!
          </Button>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </div>
        {loading && <Progress value={progressValue} />}
      </form>
    </Form>
  );
};

export default StartGameForm;
