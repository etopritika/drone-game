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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  getLastPlayer,
  getTokenChunk,
  initGame,
  savePlayerToLocalStorage,
} from "./actions";
import { usePlayerStore } from "@/store/player-store";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { StartGameSchema } from "./actions/schema";

const StartGameForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const setPlayerId = usePlayerStore((state) => state.setPlayerId);
  const setName = usePlayerStore((state) => state.setName);
  const setComplexity = usePlayerStore((state) => state.setComplexity);
  const addChunk = usePlayerStore((state) => state.addChunk);

  const lastPlayer = getLastPlayer();
  console.log("lastPlayer:", lastPlayer);
  const form = useForm<z.infer<typeof StartGameSchema>>({
    resolver: zodResolver(StartGameSchema),
    defaultValues: {
      name: lastPlayer.name || "",
      complexity: lastPlayer.complexity || 1,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof StartGameSchema>> = async (
    data
  ) => {
    setLoading(true);

    try {
      const res = await initGame(data);

      setName(data.name);
      setComplexity(data.complexity);
      setPlayerId(res.id);

      savePlayerToLocalStorage(data.name);

      const chunkPromises = [
        getTokenChunk(res.id, 1),
        getTokenChunk(res.id, 2),
        getTokenChunk(res.id, 3),
        getTokenChunk(res.id, 4),
      ];

      const chunks = await Promise.all(chunkPromises);

      const chunkValues = chunks.map((chunk) => chunk.chunk);

      const fullChunks = chunkValues.join("");
      addChunk(fullChunks);

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

  const resetPlayer = () => {
    localStorage.removeItem("players");

    form.reset({
      name: "",
      complexity: 1,
    });
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`${
                    field.value && !isFocused ? "bg-gray-200" : "bg-white"
                  }`}
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
            {loading ? <LoaderCircle className="animate-spin" /> : "Lets role!"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={resetPlayer}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StartGameForm;
