import { Frame } from "lucide-react";

export default function Error() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex justify-between items-center p-4 bg-card shadow-md">
        <div className="flex items-center space-x-2">
          <Frame className="h-6 w-6" />
          <h1 className="text-xl font-bold">Virtual Contest Maker</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold">500 - Internal Server Error</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Oops! Something went wrong on our end. We're working to fix the
            issue.
          </p>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </main>
    </div>
  );
}
