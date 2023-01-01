import Editor from '@monaco-editor/react';
// import delve from 'dlv';
import * as monaco from 'monaco-editor';
// import * as monaco from '@monaco-editor/react';

type Props = {
  initialContent: string;
  templateCode?: string;
  onChange?: (value: string) => void;
  fullHeight?: boolean;
};
function PenEditor({ initialContent, onChange, fullHeight = true }: Props) {
  const MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontFamily:
      'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 14,
    lineHeight: 21,
    // theme: 'tw-light',
    minimap: { enabled: false },

    wordWrap: 'on',
    wordWrapColumn: 40,
    wrappingIndent: 'indent',

    fixedOverflowWidgets: true,
    scrollbar: {
      horizontalScrollbarSize: 21,
    },
    // padding: { top: 49 },

    quickSuggestions: {
      strings: true,
    },
  };

  return (
    <Editor
      theme="vs-dark"
      onChange={
        onChange ? (value) => onChange(value ?? '') : () => console.log('s')
      }
      options={MONACO_OPTIONS}
      //   height={fullHeight ? 'calc(100vh - 60px)' : ''}
      defaultLanguage="html"
      value={initialContent || ''}
      defaultValue={initialContent || ''}
    />
  );
}

export default PenEditor;
