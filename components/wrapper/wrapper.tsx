import React, {ReactNode} from "react";

import {cn} from "@/lib/utils";

function Wrapper({children, className}: {children: ReactNode; className?: string}) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className={cn("container mx-auto px-4", className)}>{children}</div>
    </div>
  );
}

export default Wrapper;
