"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Read-only code display with copy-to-clipboard.
 *
 * Highlighting is done with a small tokeniser rather than a syntax library —
 * these are short Arduino sketches, and it keeps the bundle lean.
 */
export function CodeBlock({
  filename,
  code,
}: {
  filename: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-[#04070f]">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2">
        <span className="font-mono text-xs text-faint">{filename}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-hairline px-3.5 font-mono text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
          {copied ? (
            <>
              <Check className="size-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3" /> Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block">
              {highlight(line)}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const KEYWORDS = new Set([
  "const", "int", "void", "float", "bool", "char", "if", "else", "for",
  "while", "return", "true", "false", "HIGH", "LOW", "OUTPUT", "INPUT",
]);

const BUILTINS = new Set([
  "setup", "loop", "pinMode", "digitalWrite", "digitalRead", "analogRead",
  "analogWrite", "delay", "Serial", "begin", "println", "print",
]);

/** Colours comments, strings, numbers, keywords and Arduino built-ins. */
function highlight(line: string) {
  const commentAt = line.indexOf("//");
  if (commentAt === 0) {
    return <span className="text-faint italic">{line}</span>;
  }

  const codePart = commentAt > 0 ? line.slice(0, commentAt) : line;
  const commentPart = commentAt > 0 ? line.slice(commentAt) : "";

  const tokens = codePart.split(/(\b\w+\b|"[^"]*"|\s+)/g).filter(Boolean);

  return (
    <>
      {tokens.map((token, i) => {
        if (KEYWORDS.has(token))
          return (
            <span key={i} className="text-accent">
              {token}
            </span>
          );
        if (BUILTINS.has(token))
          return (
            <span key={i} className="text-secondary">
              {token}
            </span>
          );
        if (/^"/.test(token))
          return (
            <span key={i} className="text-primary">
              {token}
            </span>
          );
        if (/^\d+$/.test(token))
          return (
            <span key={i} className="text-orange-300">
              {token}
            </span>
          );
        return (
          <span key={i} className="text-slate-300">
            {token}
          </span>
        );
      })}
      {commentPart && <span className="text-faint italic">{commentPart}</span>}
    </>
  );
}
