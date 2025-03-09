import type { Result } from "@modelcontextprotocol/sdk/types.js";

export const buildSimpleResponse = (text: string): Result => {
	return {
		content: [
			{
				type: "text",
				text,
			},
		],
	};
};
