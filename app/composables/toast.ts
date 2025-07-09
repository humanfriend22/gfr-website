type Toast = {
    message: string;
    purpose: "error" | "info" | "warn";
};

export const toasts = ref<Toast[]>([]);

export function launchToast(toast: Toast) {
    toasts.value.push();
    setTimeout(() => {
        const index = toasts.value.indexOf(toast);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    }, 5000);
}
