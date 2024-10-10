"use client";

import { DocumentHeader, DocumentHeaderSkeleton } from "@/components/Document";
import { TextEditor } from "@/components/TextEditor";
import { DocumentLayout } from "@/layouts/Document";
import { ErrorLayout } from "@/layouts/Error";
import { InitialDocumentProvider } from "@/lib/hooks";
// eslint-disable-next-line import/order
import { LiveMap } from "@liveblocks/client";
// eslint-disable-next-line import/order
import { useParams } from "next/navigation";
// eslint-disable-next-line import/order
import { useEffect, useState } from "react";
// eslint-disable-next-line import/order
import { Document, ErrorData } from "@/types";
// eslint-disable-next-line import/order
import { RoomProvider } from "@liveblocks/react/suspense";

type Props = {
  initialDocument: Document | null;
  initialError: ErrorData | null;
};

export function TextDocumentView({ initialDocument, initialError }: Props) {
  const { id, error: queryError } = useParams<{ id: string; error: string }>();
  const [error, setError] = useState<ErrorData | null>(initialError);

  // If error object in params, retrieve it
  useEffect(() => {
    if (queryError) {
      setError(JSON.parse(decodeURIComponent(queryError as string)));
    }
  }, [queryError]);

  if (error) {
    return <ErrorLayout error={error} />;
  }

  if (!initialDocument) {
    return <DocumentLayout header={<DocumentHeaderSkeleton />} />;
  }

  return (
    <RoomProvider
      id={id as string}
      initialPresence={{ cursor: null }}
      initialStorage={{ notes: new LiveMap() }}
    >
      <InitialDocumentProvider initialDocument={initialDocument}>
        <DocumentLayout
          header={<DocumentHeader documentId={initialDocument.id} />}
        >
          <TextEditor />
        </DocumentLayout>
      </InitialDocumentProvider>
    </RoomProvider>
  );
}
