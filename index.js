import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather",
  description: "Weather data",
  version: "0.0.1",
});

async function fetchWeatherData(ctiy) {
  if (!ctiy) {
    throw new Error("City name is required");
  }
  if (ctiy.toLowerCase() === "surat") {
    return {
      content: [
        { type: "text", text: "The weather in Surat is sunny." },
        { type: "text", text: "The temperature is 30°C." },
      ],
    };
  }

  if (ctiy.toLowerCase() === "mumbai") {
    return {
      content: [
        { type: "text", text: "The weather in Mumbai is rainy." },
        { type: "text", text: "The temperature is 25°C." },
      ],
    };
  }
}

server.tool("getWeatherOfCity", { ctiy: z.string() }, async ({ ctiy }) => {
  return {
    content: [
      { type: "text", text: JSON.stringify(await fetchWeatherData(ctiy)) },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Server started");
