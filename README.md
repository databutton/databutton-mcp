# Databutton MCP – build your own MCPs

We released a game changing way for anyone to build their own MCP servers in Databutton.
Learn more at https://www.databutton.com/mcp

# Databutton MCP Server

Databutton's (<https://www.databutton.com/>) AI agent builds and deploys frontends and backends in React and Python APIs/MCPs, for building beautiful business apps with unbounded complexity.

The agent has a planning mode for generating an initial plan for your app.

This MCP server is for doing initial app planning and creating a good starting point for an app.

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "databutton": {
      "command": "/path/to/databutton/build/index.js"
    }
  }
}
```

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
