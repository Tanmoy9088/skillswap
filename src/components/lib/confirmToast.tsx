import { toast } from "sonner";

type ConfirmToastOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void | Promise<void>;
};

export const confirmToast = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  onConfirm,
}: ConfirmToastOptions) => {
  toast.custom(
    (toastId) => (
      <div className="w-90 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        {title && (
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        )}

        <p
          className={
            title
              ? "mt-1 text-sm text-gray-600"
              : "text-sm font-medium text-gray-900"
          }
        >
          {message}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => toast.dismiss(toastId)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={async () => {
              toast.dismiss(toastId);
              await onConfirm();
            }}
            className={
              variant === "danger"
                ? "rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                : "rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
    },
  );
};
