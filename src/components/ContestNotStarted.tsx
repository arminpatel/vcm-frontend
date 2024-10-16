import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";

type ContestNotStartedProps = {
  contestName: string;
  startTime: string;
};

export default function ContestNotStarted({
  contestName,
  startTime,
}: ContestNotStartedProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => getTimeUntilStart(), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeUntilStart = () => {
    const startTimeInMs = Date.parse(startTime);
    const currentTime = Date.now();
    const timeLeft = startTimeInMs - currentTime;

    if (timeLeft > 0) {
      setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((timeLeft / 1000 / 60) % 60));
      setSeconds(Math.floor((timeLeft / 1000) % 60));
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar />
      <Card className="w-full max-w-md p-6 text-center mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{contestName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            The contest hasn't started yet.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Calendar className="h-6 w-6 text-muted-foreground" />
            <p className="text-lg">
              Starts at: {new Date(startTime).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <Clock className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Time Left</p>
              <p className="text-2xl font-bold">
                {days}d {hours}h {minutes}m {seconds}s
              </p>
            </div>
          </div>

          <Button variant="default" disabled>
            Waiting for contest to start
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
