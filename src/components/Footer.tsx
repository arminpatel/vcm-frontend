import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-6 px-4 flex justify-end items-center space-x-4">
        <p className="text-sm text-muted-foreground">
          MADE WITH <span className="text-red-500">❤️</span> BY
        </p>
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/arminpatel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="text-sm">Armin</span>
          </a>
          <span className="text-muted-foreground">&</span>
          <a
            href="https://github.com/theoden42"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="text-sm">Divyansh</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
