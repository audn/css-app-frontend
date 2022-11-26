import Editor from '@monaco-editor/react';
// import delve from 'dlv';
import * as monaco from 'monaco-editor';
// import * as monaco from '@monaco-editor/react';

type Props = {
  initialContent: string;
  onChange: (value: string) => void;
};
function PenEditor({ initialContent, onChange }: Props) {
  const MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontFamily:
      'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 14,
    lineHeight: 21,
    // theme: 'tw-light',
    minimap: { enabled: false },
    fixedOverflowWidgets: true,
    scrollbar: {
      horizontalScrollbarSize: 21,
    },
    quickSuggestions: {
      strings: true,
    },
  };

  return (
    <Editor
      theme="vs-dark"
      onChange={(value) => onChange(value ?? '')}
      options={MONACO_OPTIONS}
      height="90vh"
      defaultLanguage="html"
      defaultValue={initialContent}
    />
  );
}

export default PenEditor;
