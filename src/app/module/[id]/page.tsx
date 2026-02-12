"use client";

import { useParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { getModule } from "@/content/modules";
import { Clock, Plane, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ModulePage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string);
  const module = getModule(moduleId);
  const [activeSection, setActiveSection] = useState(0);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentSection = module.sections[activeSection];
  const prevModule = moduleId > 1 ? moduleId - 1 : null;
  const nextModule = moduleId < 7 ? moduleId + 1 : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      <main className="md:ml-72">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
                <ChevronLeft size={16} />
                返回课程首页
              </Link>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {module.time}
                </span>
                {module.offline && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Plane size={14} />
                    离线可读
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold">
              模块 {module.id}：{module.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {module.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Section Navigation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-blue-600" />
              <span className="font-medium">章节导航</span>
              <span className="text-sm text-slate-500">
                ({activeSection + 1} / {module.sections.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {module.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm transition-colors",
                    index === activeSection
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                  )}
                >
                  {section.offline && "✈️ "}{section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-10 border border-slate-200 dark:border-slate-700">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatContent(currentSection.content) 
              }}
            />
          </article>

          {/* Section Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                activeSection === 0
                  ? "text-slate-400 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              <ChevronLeft size={18} />
              上一节
            </button>

            <div className="text-sm text-slate-500">
              {activeSection + 1} / {module.sections.length}
            </div>

            <button
              onClick={() => setActiveSection(Math.min(module.sections.length - 1, activeSection + 1))}
              disabled={activeSection === module.sections.length - 1}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                activeSection === module.sections.length - 1
                  ? "text-slate-400 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              下一节
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Module Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            {prevModule ? (
              <Link
                href={`/module/${prevModule}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ChevronLeft size={18} />
                模块 {prevModule}
              </Link>
            ) : (
              <div />
            )}
            
            {nextModule ? (
              <Link
                href={`/module/${nextModule}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                模块 {nextModule}
                <ChevronRight size={18} />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                🎉 完成全部课程
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Enhanced markdown formatting with better table and code block support
function formatContent(content: string): string {
  // First, protect code blocks from other transformations
  const codeBlocks: string[] = [];
  let processed = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const index = codeBlocks.length;
    codeBlocks.push(`<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang || 'text'} text-sm">${escapeHtml(code.trim())}</code></pre>`);
    return `__CODE_BLOCK_${index}__`;
  });

  // Process tables before other transformations
  processed = processed.replace(/(\|.+\|[\r\n]+)+/g, (tableMatch) => {
    const rows = tableMatch.trim().split('\n').filter(row => row.trim());
    if (rows.length < 2) return tableMatch;
    
    let html = '<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse border border-slate-300 dark:border-slate-600">';
    
    rows.forEach((row, rowIndex) => {
      const cells = row.split('|').filter(c => c.trim() !== '');
      
      // Skip separator row (contains only dashes)
      if (cells.every(c => /^[\s-:]+$/.test(c))) {
        return;
      }
      
      const isHeader = rowIndex === 0;
      const cellTag = isHeader ? 'th' : 'td';
      const cellClass = isHeader 
        ? 'bg-slate-100 dark:bg-slate-700 font-semibold px-4 py-2 border border-slate-300 dark:border-slate-600 text-left'
        : 'px-4 py-2 border border-slate-300 dark:border-slate-600';
      
      html += '<tr>';
      cells.forEach(cell => {
        html += `<${cellTag} class="${cellClass}">${cell.trim()}</${cellTag}>`;
      });
      html += '</tr>';
    });
    
    html += '</table></div>';
    return html;
  });

  // Process inline elements
  processed = processed
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code (but not inside code blocks)
    .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 my-4 italic text-slate-600 dark:text-slate-400">$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-blue-600 hover:underline">$1</a>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p class="my-3">')
    // Single newlines in content (not inside pre)
    .replace(/\n/g, '<br/>');

  // Wrap in paragraph
  processed = '<p class="my-3">' + processed + '</p>';
  
  // Clean up
  processed = processed
    .replace(/<p class="my-3">\s*<\/p>/g, '')
    .replace(/<p class="my-3">(<h[1-3])/g, '$1')
    .replace(/(<\/h[1-3]>)<\/p>/g, '$1')
    .replace(/<p class="my-3">(<div)/g, '$1')
    .replace(/(<\/div>)<\/p>/g, '$1')
    .replace(/<p class="my-3">(<blockquote)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p class="my-3">(<li)/g, '<ul class="list-disc my-4">$1')
    .replace(/(<\/li>)<\/p>/g, '$1</ul>')
    .replace(/<\/li><br\/><li/g, '</li><li')
    .replace(/<br\/>(<\/p>)/g, '$1')
    .replace(/(<p class="my-3">)<br\/>/g, '$1');

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    processed = processed.replace(`__CODE_BLOCK_${index}__`, block);
  });
  
  // Clean up any remaining artifacts around code blocks
  processed = processed
    .replace(/<p class="my-3">(__CODE_BLOCK_\d+__)/g, '$1')
    .replace(/(__CODE_BLOCK_\d+__)<\/p>/g, '$1')
    .replace(/<br\/>(<pre)/g, '$1')
    .replace(/(<\/pre>)<br\/>/g, '$1');

  return processed;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
