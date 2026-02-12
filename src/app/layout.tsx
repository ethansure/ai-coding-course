import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Native Coding 高级教程 | Senior Architect 专属",
  description: "面向 Senior Architect 的 AI Native Coding 深度学习教程，涵盖 Claude Code、Codex CLI、Gemini CLI 等工具的高级使用技巧与架构实践",
  keywords: ["AI Coding", "Claude Code", "Codex CLI", "Gemini CLI", "MCP", "Vibe Coding", "Senior Architect"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
