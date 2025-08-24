type Toast = {
    message: string;
    purpose: "error" | "info" | "warn";
};

export const toasts = ref<Toast[]>([]);

export function launchToast(toast: Toast) {
    toasts.value.push(toast);
    setTimeout(() => {
        toasts.value = toasts.value.filter((t) =>
            !(t.message === toast.message && t.purpose === toast.purpose)
        );
    }, 5000);
}
