import { deleteDocument } from "@/lib/actions";
import { Button } from "@/primitives/Button";
import { Dialog } from "@/primitives/Dialog";
import { ComponentProps } from "react";
import styles from "./DocumentDeleteDialog.module.css";

interface Props
  extends Omit<ComponentProps<typeof Dialog>, "content" | "title"> {
  documentId: string;
  onDeleteDocument: () => void;
}

export function DocumentDeleteDialog({
  documentId,
  onOpenChange = () => {},
  onDeleteDocument = () => {},
  children,
  ...props
}: Props) {
  async function handleDeleteDocument() {
    if (!documentId) {
      return;
    }

    const { error } = await deleteDocument({
      documentId,
    });

    onOpenChange(false);
    onDeleteDocument();

    if (error) {
      return;
    }
  }

  return (
    <Dialog
      content={
        <div className={styles.dialog}>
          <p className={styles.description}>
            データを完全に削除します。この操作は取り消せません。
          </p>
          <div className={styles.buttons}>
            <Button onClick={() => onOpenChange(false)} variant="secondary">
              キャンセル
            </Button>
            <Button onClick={handleDeleteDocument} variant="destructive">
              削除
            </Button>
          </div>
        </div>
      }
      onOpenChange={onOpenChange}
      title="コード削除"
      {...props}
    >
      {children}
    </Dialog>
  );
}
