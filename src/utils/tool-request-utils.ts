import type { ZodSchema } from "zod";
import { fromError } from "zod-validation-error";
import type { RawArgs } from "../types.js";

export const parseToolInput = <T>({
	input,
	schema,
}: {
	input: RawArgs;
	schema: ZodSchema;
}): { success: true; data: T } | { success: false; message: string } => {
	const parsed = schema.safeParse(input);

	if (parsed.success) {
		return { success: true, data: parsed.data as T };
	}

	return { success: false, message: fromError(parsed.error).toString() };
};
