export const enumFromStringValue = <T>(
    enm: { [s: string]: T },
    value: string,
): T | undefined => {
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? (value as unknown as T)
        : undefined;
};
