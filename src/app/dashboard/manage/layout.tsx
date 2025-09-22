"use client";

import React, { Suspense } from "react";
import type { ReactNode } from "react";

export default function ManageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-manage-layout">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
