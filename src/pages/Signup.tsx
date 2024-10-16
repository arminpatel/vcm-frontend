import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import config from "@/utils/envConfig";
import { Navbar } from "../components/Navbar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  cf_handle: z.string().optional(),
  cc_handle: z.string().optional(),
  ac_handle: z.string().optional(),
});

export const Signup = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cf_handle: "",
      cc_handle: "",
      ac_handle: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data) => {
      const profile = {
        cf_handle: data.cf_handle,
        cc_handle: data.cc_handle,
        ac_handle: data.ac_handle,
      };

      for (const key in profile) {
        if (!profile[key]) delete profile[key];
        delete data[key];
      }

      console.log(data, { ...data, profile });

      return fetch(`${config.apiUrl}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, profile }),
      }).then(async (res) => {
        if (res.ok) return res.json();
        throw new Error(JSON.stringify(await res.json()));
      });
    },
    onSuccess: () => {
      toast({
        title: "Sign Up Successful",
        description: "Your account has been created.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Sign Up Failed",
        description:
          error.response?.data?.detail || "An error occurred during sign up.",
        variant: "destructive",
      });
    },
    });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-4 relative">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cf_handle"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Codeforces Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Codeforces username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cc_handle"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Codechef Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Codechef username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ac_handle"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Atcoder Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Atcoder username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {signupMutation.isLoading ? "Signing you up..." : "Sign Up"}
                  {signupMutation.isSuccess && <Navigate to="/login" />}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};
