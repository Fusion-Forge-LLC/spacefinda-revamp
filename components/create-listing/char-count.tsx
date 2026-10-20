import React from "react";

export default function CharCount({ value, max }: { value: string; max: number }) {
  return (
    <span className="text-xs text-Grey-Pure-White tabular-nums">
      {value.length}/{max}
    </span>
  );
}
