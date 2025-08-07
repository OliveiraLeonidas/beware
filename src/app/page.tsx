import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Auth from "./authentication/page";

export default function Home() {
  return (
    <div>
      <Header />
      <Button>e-com</Button>
    </div>
  );
}
