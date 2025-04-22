import { useEffect, useRef } from "react";

import type { Result } from "@/types/result";

interface ResultModalProps {
  isOpen: boolean;
  result?: Result;
  handleClose: () => void;
}

export function ResultModal({ isOpen, result, handleClose }: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
      // 1秒待ってからhandleClose呼び出し
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isOpen, handleClose]);

  return (
    <>
      <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">採点結果</h3>
          {result && (
            <p className="mt-4 text-4xl font-bold text-center">
              {result?.correct} / {result?.total} (
              {Math.round((result?.correct / result?.total) * 100)}%)
            </p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error">閉じる</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
