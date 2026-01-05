import React from 'react';
import CopyButton from './ui/CopyButton';
import { CONTENT } from '../data/content';

const CodeBlock = ({ code, language = 'javascript', title, lang = 'en' }) => {
  const t = CONTENT[lang];
  
  // Simple syntax highlighting using classes (can be enhanced with a library later)
  const getLanguageClass = (lang) => {
    const langMap = {
      javascript: 'js',
      jsx: 'jsx',
      typescript: 'ts',
      dart: 'dart',
      python: 'py',
      bash: 'bash',
      shell: 'bash',
      html: 'html',
      css: 'css',
    };
    return langMap[language.toLowerCase()] || 'text';
  };

  return (
    <div className="my-4 sm:my-6 rounded-lg overflow-hidden border border-white/10 bg-gray-900/60">
      {title && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10">
          <span className="text-sm font-medium text-gray-300">{title}</span>
          <span className="ml-2 text-xs text-gray-500">({language})</span>
        </div>
      )}
      <div className="relative group">
        <pre className="p-4 sm:p-6 overflow-x-auto">
          <code className={`language-${getLanguageClass(language)} text-sm sm:text-base font-mono text-gray-200 leading-relaxed`}>
            {code}
          </code>
        </pre>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton
            text={code}
            successMessage={t.academy.codeCopied}
            className="px-3 py-1.5 text-xs rounded-md"
          >
            <span className="text-xs">{t.academy.copyCode}</span>
          </CopyButton>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

