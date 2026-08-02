"use client";

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !quillRef.current) {
      // Create the editor
      quillRef.current = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder: 'يمكنك كتابة تفاصيل الخبر وتنسيقه هنا بحرية...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      // Set initial value
      if (value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      // Listen for text changes
      quillRef.current.on('text-change', () => {
        if (!isUpdatingRef.current) {
          const html = quillRef.current?.root.innerHTML || '';
          // Avoid saving empty paragraphs as content
          if (html === '<p><br></p>') {
            onChange('');
          } else {
            onChange(html);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    if (quillRef.current && value) {
      const currentHtml = quillRef.current.root.innerHTML;
      if (currentHtml !== value) {
        isUpdatingRef.current = true;
        // Save current selection
        const selection = quillRef.current.getSelection();
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
        // Restore selection if there was one
        if (selection) {
          setTimeout(() => quillRef.current?.setSelection(selection), 0);
        }
        isUpdatingRef.current = false;
      }
    } else if (quillRef.current && !value) {
        isUpdatingRef.current = true;
        quillRef.current.setText('');
        isUpdatingRef.current = false;
    }
  }, [value]);

  return (
    <div className="h-[250px] bg-white text-charcoal">
      <div ref={containerRef} />
    </div>
  );
}
