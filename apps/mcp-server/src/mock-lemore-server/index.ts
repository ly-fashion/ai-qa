/**
 * mcp server:一个模拟业务接口的返回数据(mock的数据要有业务含义)
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// ==================== Tools 定义 ====================

const TOOLS: Tool[] = [
  {
    name: 'mock_business_data',
    description: '根据业务场景生成有业务含义的模拟数据',
    inputSchema: {
      type: 'object',
      properties: {
        scenario: {
          type: 'string',
          description: '业务场景描述，如"用户列表"、"订单详情"',
        },
        count: {
          type: 'number',
          description: '生成数据条数',
          default: 5,
        },
      },
      required: ['scenario'],
    },
  },
];

// ==================== Server 创建 ====================

export async function createServer() {
  const server = new Server(
    {
      name: 'mock-lemore-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  // 注册工具列表
  server.setRequestHandler(ListToolsRequestSchema, () => {
    console.error('工具列表请求已处理，返回工具列表:', TOOLS);
    return { tools: TOOLS };
  });

  // 注册工具调用
  server.setRequestHandler(CallToolRequestSchema, (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'mock_business_data':
          return handleMockBusinessData(args as { scenario: string; count?: number });
        default:
          return {
            content: [{ type: 'text' as const, text: `未知工具: ${name}` }],
          };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: 'text' as const, text: `工具调用失败: ${message}` }],
      };
    }
  });

  // 连接传输层
  const transport = new StdioServerTransport();
  await server.connect(transport);

  return server;
}

// ==================== 工具处理函数 ====================

function handleMockBusinessData(args: { scenario: string; count?: number }) {
  const { scenario, count = 5 } = args;
  // TODO: 实现业务数据 mock 逻辑
  const mockData = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    scenario,
    createdAt: new Date().toISOString(),
  }));

  return {
    content: [
      {
        type: 'text' as const,
        text: `## Mock 数据 - ${scenario}\n\n\`\`\`json\n${JSON.stringify(mockData, null, 2)}\n\`\`\``,
      },
    ],
  };
}

// ==================== 启动 ====================

async function main() {
  try {
    await createServer();
    console.error('mock-lemore-server 已启动');
  } catch (error) {
    console.error('启动失败:', error);
    process.exit(1);
  }
}

void main();
