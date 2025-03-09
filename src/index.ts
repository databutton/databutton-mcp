#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListToolsRequestSchema,
	ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ABOUT_DATABUTTON } from "./docs/about-databutton.js";
import { PromptName, ResourceName } from "./enums.js";
import {
	submitAppRequirementsDef,
	submitAppRequirementsImpl,
} from "./tools/submit-app-requirements.js";

/**
 * Create an MCP server
 */
const server = new Server(
	{
		name: "Databutton MCP Server",
		version: "0.1.0",
	},
	{
		capabilities: {
			resources: {},
			tools: {},
			prompts: {},
		},
	},
);

server.setRequestHandler(ListResourcesRequestSchema, async () => {
	return {
		resources: [
			{
				uri: `doc://${ResourceName.ABOUT_DATABUTTON}`,
				name: "About Databutton",
				description: "Learn more about Databutton",
				mimeType: "text/markdown",
			},
		],
	};
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
	console.error(`Reading task ${request.params.uri}`);

	const id = request.params.uri.replace(/^doc:\/\//, "");

	if (id === ResourceName.ABOUT_DATABUTTON) {
		return {
			contents: [
				{
					uri: request.params.uri,
					mimeType: "text/markdown",
					text: ABOUT_DATABUTTON,
				},
			],
		};
	}

	throw new Error("Resource not found");
});

/**
 * Handler that lists available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [submitAppRequirementsDef],
	};
});

/**
 * Handler for tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
	switch (request.params.name) {
		case submitAppRequirementsDef.name: {
			return await submitAppRequirementsImpl(request.params.arguments);
		}

		default:
			throw new Error("Unknown tool");
	}
});

/**
 * Handler that lists available prompts.
 * Exposes a single "summarize_notes" prompt that summarizes all notes.
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
	return {
		prompts: [
			{
				name: PromptName.DISCUSS_APP_IDEA,
				description: "Discuss an app idea",
			},
		],
	};
});

/**
 * Handler for the summarize_notes prompt.
 * Returns a prompt that requests summarization of all notes, with the notes' contents embedded as resources.
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
	if (request.params.name === PromptName.DISCUSS_APP_IDEA) {
		return {
			messages: [
				{
					role: "user",
					content: {
						type: "text",
						text: "I have an app idea I want to discuss. Let's talk about it in the context of Databutton. To learn more read the Databutton resources. When we agree on a simply MVP scope we should submit the app requirements.",
					},
				},
			],
		};
	}

	throw new Error("Unknown prompt");
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((error) => {
	console.error("Server error:", error);
	process.exit(1);
});
