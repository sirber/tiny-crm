export function isRegisterEnabled(): boolean {
    return process.env.NEXT_PUBLIC_REGISTER_ENABLED === "true";
}
