"use client";
import { useEffect, useRef } from "react";

import type { Result } from "@/types/result";

import { QrCodeCollapse } from "./qr-code-collapse";

interface ResultModalProps {
  isOpen: boolean;
  result?: Result;
  url: string;
  handleClose: () => void;
}

export function ResultModal({ isOpen, result, url, handleClose }: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isOpen, handleClose]);

  return (
    <>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">採点結果</h3>
          {result && (
            <p className="mt-4 text-4xl font-bold text-center">
              {result?.correct} / {result?.total} (
              {Math.round((result?.correct / result?.total) * 100)}%)
            </p>
          )}

          <QrCodeCollapse url={url} />

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
