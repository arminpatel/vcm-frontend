import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CheckCircle2, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContestNotStarted from "@/components/ContestNotStarted";
import axios from "axios";

type Problem = {
  id: number;
  name: string;
  is_solved: boolean;
};

const ContestPage = () => {
  const { contestId } = useParams();
  const [activeTab, setActiveTab] = useState<"problems" | "submissions">(
    "problems",
  );
  const [setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [contestEnded, setContestEnded] = useState(false);

  // Fetch contest data
  const { data, status, error } = useQuery({
    queryKey: ["contest", contestId], 
    queryFn: async () => {
      const res = await axios.get(`/api/contests/${contestId}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const getTime = () => {
    if (!data) return;
    const durHours = Number(data.duration.slice(0, 2));
    const durMins = Number(data.duration.slice(3, 5));
    const endtime =
      Date.parse(data.start_date_time) + 3600000 * durHours + 60000 * durMins;
    const time = endtime - Date.now();

    if (time <= 0) {
      setContestEnded(true);
    } else {
      setContestEnded(false);
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  const submitProblem = async (problem_id: number) => {
    try {
      await axios.post("/api/submissions/", { problem_id });
      window.location.reload();
    } catch (err) {
      if (
        err.code === "ERR_BAD_REQUEST" &&
        err.request.response === '["problem is not solved"]'
      ) {
        alert("You have not solved the Problem yet");
      }
    }
  };

  if (status === "pending") return <div>Loading...</div>;
  if (error) return <div>Some error occurred: {error.message}</div>;

  const problemsCount = data?.problems.length || 0;
  const solvedCount =
    data?.problems.filter((p: Problem) => p.is_solved).length || 0;

  if (Date.now() < Date.parse(data.start_date_time)) {
    return (
      <ContestNotStarted
        contestName={data.name}
        startTime={data.start_date_time}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{data.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Left</p>
                  {contestEnded ? (
                    <p className="text-2xl font-bold">Contest has ended</p>
                  ) : (
                    <p className="text-2xl font-bold">
                      {hours}:{minutes}:{seconds}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
                <p className="text-2xl font-bold text-right">
                  {solvedCount} / {problemsCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Contest Problems</CardTitle>
              <div className="space-x-2">
                <Button
                  variant={activeTab === "problems" ? "default" : "outline"}
                  onClick={() => setActiveTab("problems")}
                >
                  Problems
                </Button>
                <Button
                  variant={activeTab === "submissions" ? "default" : "outline"}
                  onClick={() => setActiveTab("submissions")}
                >
                  My Submissions
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "problems" ? (
              <div className="space-y-4">
                {data.problems.map((problem: Problem) => (
                  <div
                    key={problem.id}
                    className="flex items-center justify-between p-4 bg-card rounded-lg shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold">
                        {problem.id}
                      </span>
                      <p className="font-medium">{problem.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {problem.is_solved ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => submitProblem(problem.id)}
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Check
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No submissions yet.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ContestPage;
