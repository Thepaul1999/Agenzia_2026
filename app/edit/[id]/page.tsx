'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

export default function editPage() {
  const editRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!editRef.current || !projectId) return;

    const edit = grapesjs.init({
      container: editRef.current,
      height: '100vh',
      fromElement: false,
      storageManager: {
        type: 'remote',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
          remote: {
            urlLoad: `/api/projects/${projectId}`,
            urlStore: `/api/projects/${projectId}`,
            fetchOptions: (opts: any) =>
              opts.method === 'POST' ? { method: 'PATCH' } : {},
            onStore: (data: any) => ({ id: projectId, data }),
            onLoad: (result: any) => result.data,
          },
        },
      },
    });

    return () => edit.destroy();
  }, [projectId]);

  return <div ref={editRef} />;
}