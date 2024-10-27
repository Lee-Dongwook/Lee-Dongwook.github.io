import {
  SANDBOX_TEMPLATES,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
} from '@codesandbox/sandpack-react';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import tw, { styled } from 'twin.macro';

import { clamp } from '../utils/clamp';

export interface PlaygroundProps {
  theme: 'dark' | 'light';
  code: string;
  template: SandpackPredefinedTemplate;
  autorun: string;
}

export default memo(function Playground(props: PlaygroundProps) {
  const { theme, code, template, autorun } = props;
  const entry = SANDBOX_TEMPLATES[template].main;

  const [horizontalSize, setHorizontalSize] = useState<number>(50);
  const [verticalSize, setVerticalSize] = useState<number>(70);

  const dragHandlerRef = useRef<HTMLDivElement | null>(null);

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    dragHandlerRef.current = e.target as HTMLDivElement;

    const container = dragHandlerRef.current.parentElement;
    container?.querySelectorAll<HTMLDivElement>('.sp-stack').forEach((el) => {
      el.style.pointerEvents = 'none';
    });
  }, []);

  const onDragMove = useCallback((e: MouseEvent) => {
    if (!dragHandlerRef.current?.parentElement) return;

    const container = dragHandlerRef.current.parentElement;
    const { direction } = dragHandlerRef.current.dataset;
    const { width, height, top, left } = container.getBoundingClientRect();

    if (direction === 'horizontal') {
      const size = ((e.clientX - left) / width) * 100;
      setHorizontalSize(clamp(size, 25, 75));
    } else {
      const size = ((e.clientY - top) / height) * 100;
      setVerticalSize(clamp(size, 25, 75));
    }
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragHandlerRef.current?.parentElement) return;

    const container = dragHandlerRef.current.parentElement;
    container?.querySelectorAll<HTMLDivElement>('.sp-stack').forEach((el) => {
      el.style.pointerEvents = 'auto';
    });

    dragHandlerRef.current = null;
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousemove', onDragMove);
    document.body.addEventListener('mouseup', onDragEnd);

    return () => {
      document.body.removeEventListener('mousemove', onDragMove);
      document.body.removeEventListener('mouseup', onDragEnd);
    };
  }, [onDragMove, onDragEnd]);

  return (
    <SandpackProvider
      theme={theme}
      template={template}
      options={{ autorun: autorun !== 'false' }}
      customSetup={{ entry }}
      files={{ [entry]: code }}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          style={{
            height: 500,
            flexGrow: horizontalSize,
            flexShrink: horizontalSize,
            flexBasis: 0,
            overflow: 'hidden',
          }}
        />
        <div
          className="absolute z-1 top-0 bottom-0 w-2 cursor-ew-resize"
          data-direction="horizontal"
          style={{ left: `calc(${horizontalSize}% - 5px)` }}
          onMouseDown={onDragStart}
        />
        <SandpackStack
          style={{
            height: 500,
            flexGrow: 100 - horizontalSize,
            flexShrink: 100 - horizontalSize,
            flexBasis: 0,
            width: `${100 - horizontalSize}%`,
            gap: 1,
          }}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            style={{
              flexGrow: verticalSize,
              flexShrink: verticalSize,
              flexBasis: 0,
              overflow: 'hidden',
            }}
          />
          <div
            className="absolute z-1 left-0 right-0 h-2 cursor-ns-resize"
            data-direction="vertical"
            style={{ top: `calc(${verticalSize}% - 5px)` }}
            onMouseDown={onDragStart}
          />
          <div
            className="w-full overflow-hidden"
            style={{
              flexGrow: 100 - verticalSize,
              flexShrink: 100 - verticalSize,
              flexBasis: 0,
            }}
          >
            <SandpackConsole resetOnPreviewRestart />
          </div>
        </SandpackStack>
      </SandpackLayout>
    </SandpackProvider>
  );
});
