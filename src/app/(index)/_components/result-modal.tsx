import { useEffect } from "react";

import type { Result } from "@/types/result";

interface ResultModalProps {
  isOpen: boolean;
  result?: Result;
  handleClose: () => void;
}

export function ResultModal({ isOpen, result, handleClose }: ResultModalProps) {
  useEffect(() => {
    const dialog = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog id="my_modal_1" className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">採点結果</h3>
          <p className="mt-4 text-4xl font-bold text-center">
            {result?.correct} / {result?.total}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-secondary" onClick={handleClose}>
                閉じる
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
