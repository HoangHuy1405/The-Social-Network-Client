import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

export default App;
