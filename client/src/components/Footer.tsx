import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-4 py-6 text-sm text-muted-foreground shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p>
          Copyright © 2026 <span className="text-foreground">Flux</span> AI
          Website Builder - <span className="text-foreground">Daksh Yadav</span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/0dux"
            target="_blank"
            aria-label="GitHub"
            className="border border-border bg-background p-2 text-foreground shadow-sm active:shadow-none transition-colors duration-200 hover:bg-muted"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/dakshyadav0"
            target="_blank"
            aria-label="LinkedIn"
            className="border border-border bg-background p-2 text-foreground shadow-sm active:shadow-none transition-colors duration-200 hover:bg-muted"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
