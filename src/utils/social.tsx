import * as SI from "simple-icons";
import { Globe } from "lucide-react";

export const SimpleIcon = ({ icon, className }: { icon: SI.SimpleIcon; className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
    <title>{icon.title}</title>
    <path d={icon.path} />
  </svg>
);

export const getPlatformIcon = (url: string) => {
  if (!url) return <Globe className="size-4 text-muted-foreground" />;
  const lower = url.toLowerCase();
  if (lower.includes("github.com")) return <SimpleIcon icon={SI.siGithub} className="size-4" />;
  if (lower.includes("twitter.com") || lower.includes("x.com")) return <SimpleIcon icon={SI.siX} className="size-4" />;
  if (lower.includes("linkedin.com")) return <SimpleIcon icon={SI.siLinkerd} className="size-4" />;
  if (lower.includes("facebook.com")) return <SimpleIcon icon={SI.siFacebook} className="size-4" />;
  if (lower.includes("instagram.com")) return <SimpleIcon icon={SI.siInstagram} className="size-4" />;
  return <Globe className="size-4" />;
};
