import React, { useState } from "react";
import getMaxId from "@/utils/getMaxId";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const FormSchema = z.object({
  contestName: z.string().min(1, "Contest name is required"),
  startDateTime: z.string().min(1, "Start time is required"),
  duration: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: "Duration must be greater than 0" }),
  problems: z
    .array(
      z.object({
        name: z.string().min(1, "Problem name is required"),
        link: z.string().url("Problem link must be a valid URL"),
        score: z
          .string()
          .transform((val) => parseInt(val, 10))
          .refine((val) => val > 0 && val <= 10000, {
            message: "Score must be between 1 and 10000",
          }),
      }),
    )
    .min(2, "There must be at least two problems"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const CreateContestForm = () => {
  const [problemCount, setProblemCount] = useState(2);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contestName: "",
      startDateTime: "",
      duration: "0",
      problems: [
        { id: 1, name: "", link: "", score: 0 },
        { id: 2, name: "", link: "", score: 0 },
      ],
    },
  });

  const contestCreationMutation = useMutation({
    mutationFn: (data) => axios.post("/api/contests/", data),
  });

  const addProblem = () => {
    if (problemCount >= 100) {
      alert("Reached maximum problem limit");
      return;
    }

    const currentProblems = form.getValues("problems");
    const maxId = getMaxId(currentProblems);

    const newProblem = { id: maxId + 1, name: "", link: "", score: 0 };

    setProblemCount(problemCount + 1);
    form.setValue("problems", [...currentProblems, newProblem]);
  };

  const removeProblem = (problemId: number) => {
    const currentProblems = form.getValues("problems");
    if (currentProblems.length === 2) return;

    const updatedProblems = currentProblems.filter(
      (problem) => problem.id !== problemId,
    );

    setProblemCount(updatedProblems.length);
    form.setValue("problems", updatedProblems);
  };
  const getOnlineJudgeFromLink = (link) => {
    const url = new URL(link);
    if (url.host.includes("codeforces")) return "codeforces";
    if (url.host.includes("codechef")) return "codechef";
    if (url.host.includes("atcoder")) return "atcoder";
    return "";
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const contestStartDateObject = new Date(data.startDateTime);
    const contestStartDateString = contestStartDateObject.toISOString();

    const nwProblems = data.problems.map((problem) => ({
      ...problem,
      online_judge: getOnlineJudgeFromLink(problem.link),
    }));

    const time_in_minutes = data.duration;
    const time_in_hours = Math.floor(time_in_minutes / 60);
    const remaining_time_in_minutes = time_in_minutes % 60;
    const duration_string = `${time_in_hours}:${remaining_time_in_minutes}:00`;

    const contestDetails = {
      name: data.contestName,
      start_date_time: contestStartDateString,
      duration: duration_string,
      problems: nwProblems,
    };

    contestCreationMutation.mutate(contestDetails);
  };

  if (contestCreationMutation.isSuccess) {
    const contestId = contestCreationMutation.data.data.id;
    return <Navigate to={`/contest/${contestId}`} />;
  }

  if (contestCreationMutation.isError) {
    return <div>Some error occurred</div>;
  }

  return (
    <div className="mx-auto min-w-[50%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle> Contest Details </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="contestName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Contest Name </FormLabel>
                    <FormControl>
                      <Input placeholder="Contest Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Start Time </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Duration (minutes) </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-2xl"> Problems </span>
                <Button onClick={addProblem} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Problem
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.watch("problems").map((problem, index) => (
                  <div key={problem.id} className="flex items-start space-x-2">
                    <FormField
                      control={form.control}
                      name={`problems.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Problem Name" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`problems.${index}.link`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Problem Link" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`problems.${index}.score`}
                      render={({ field }) => (
                        <FormItem className="w-20">
                          <FormControl>
                            <Input
                              placeholder="Score"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProblem(problem.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit"> Create Contest </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateContestForm;
