/**
 * MCP Server - Mock 数据生成服务器入口
 *
 * 本文件是 mock-generate-server 的入口点，
 * 负责启动 MCP 服务器并处理来自 AI 助手的请求
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { createServer } from './swagger-generate.ts';

/**
 * 启动 MCP Mock 服务器
 *
 * 调用流程:
 * 1. 从 swagger-generate.ts 导入 createServer 工厂函数
 * 2. 调用 createServer 创建并配置 MCP 服务器实例
 * 3. 服务器会自动连接 stdio 传输层
 * 4. 开始处理来自 AI 助手的 JSON-RPC 请求
 */
async function main(): Promise<Server | void> {
  try {
    const server: Server | undefined = await (createServer as () => Promise<Server>)();
    if (server) {
      console.error('Mock Generate Server started successfully');
      return server;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to start Mock Generate Server:', error.message);
    } else {
      console.error('Failed to start Mock Generate Server: Unknown error');
    }
    process.exit(1);
  }
}

void main();
