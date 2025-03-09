import type { Result } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ToolName } from "../enums.js";
import type { RawArgs } from "../types.js";
import { buildSimpleResponse } from "../utils/response-utils.js";
import { parseToolInput } from "../utils/tool-request-utils.js";

const schema = z.object({
	name: z.string({
		description: "The name of the app",
	}),
	pitch: z.string({
		description: "The pitch for the app",
	}),
	spec: z.object({
		description: z
			.string({
				description: "The app's specifications",
			})
			.max(5_000),
		targetAudience: z.string({
			description: "The app's target audience",
		}),
		design: z.string({
			description: "The app's design",
		}),
		typography: z.string({
			description: "The app's typography",
		}),
	}),
});

type Input = z.infer<typeof schema>;

export const submitAppRequirementsDef = {
	name: ToolName.SUBMIT_APP_REQUIREMENTS,
	description: "Submit app requirements",
	inputSchema: zodToJsonSchema(schema),
};

export const submitAppRequirementsImpl = async (
	args: RawArgs,
): Promise<Result> => {
	const parsed = parseToolInput<Input>({ input: args, schema });

	if (parsed.success) {
		const base64Encoded = btoa(JSON.stringify(parsed.data));
		const urlEncoded = encodeURIComponent(base64Encoded);

		return buildSimpleResponse(
			`App requirements submitted. Click the following link to get started: https://databutton.com/submit?requirements=${urlEncoded}`,
		);
	}

	return buildSimpleResponse(parsed.message);
};
