import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Edit2 } from "lucide-react";
import axios from "axios";

export function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { status, data, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      let res = await axios.get(`api/users/${username}`);
      let dataDetails = res.data;
      let dataContests;
      try {
        let res2 = await axios.get(`api/contests/user/${username}`);
        dataContests = res2.data;
      } catch (err) {
        dataContests = undefined;
      }
      console.log(dataDetails, dataContests);
      return { dataDetails, dataContests };
    }
  });

  if (status === "pending") {
    return (
      <>
        <span>loading</span>
      </>
    );
  }
  if (error) {
    return (
      <>
        <span> Some Error Occured </span>
      </>
    );
  }

  const { dataDetails, dataContests } = data;

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>armin</span>
              <Button variant="outline" size="sm">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Codeforces:</span>
                <span>
                  {dataDetails.profile?.cf_handle ? (
                    <a
                      className="link link"
                      href={`https://codeforces.com/profile/${dataDetails.profile.cf_handle}`}
                    >
                      {dataDetails.profile.cf_handle}
                    </a>
                  ) : (
                    "Unavailable"
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Codechef:</span>
                {dataDetails.profile?.cc_handle ? (
                  <a
                    className="link link"
                    href={`https://codechef.com/users/${dataDetails.profile.cc_handle}`}
                  >
                    {dataDetails.profile.cc_handle}
                  </a>
                ) : (
                  "   --"
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">AtCoder:</span>
                {dataDetails.profile?.ac_handle ? (
                  <a
                    className="link link"
                    href={`https://atcoder.jp/users/${dataDetails.profile.ac_handle}`}
                  >
                    {dataDetails.profile.ac_handle}
                  </a>
                ) : (
                  "--"
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">User Contests</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataContests && dataContests.length > 0
            ? dataContests.map((contest, index) => {
                const dt = new Date(Date.parse(contest.start_date_time));
                return (
                  <Link to={`/contest/${contest.id}`} key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                          {contest.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Start Time: {dt.toLocaleString()}</p>
                        <p>Duration: {contest.duration}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
