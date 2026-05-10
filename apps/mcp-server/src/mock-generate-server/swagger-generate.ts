/**
 * MCP Server - Mock 数据生成服务器
 *
 * 本服务器基于 Model Context Protocol (MCP) 构建，
 * 提供自动请求 API 并生成 Mock 数据的功能。
 *
 * MCP 协议简介:
 * - MCP 是一种用于 AI 助手与外部工具交互的标准协议
 * - 使用 JSON-RPC 2.0 进行通信
 * - 通过 stdin/stdout 进行输入输出
 * - 支持工具注册、调用、结果返回等功能
 */

// ============================================================
// 1. 导入依赖
// ============================================================

/**
 * @modelcontextprotocol/sdk/server/index.js
 * MCP 官方 SDK 提供的 Server 类
 * 封装了协议处理、请求路由等底层逻辑
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

/**
 * @modelcontextprotocol/sdk/types.js
 * MCP 协议的 TypeScript 类型定义
 * 包括 Tool 类型、请求/响应 Schema 等
 */
import {
  CallToolRequestSchema, // 调用工具的请求 Schema
  ListToolsRequestSchema, // 列出工具的请求 Schema
  Tool, // 工具定义类型
} from '@modelcontextprotocol/sdk/types.js';

/**
 * @modelcontextprotocol/sdk/server/stdio.js
 * StdioServerTransport - 基于标准输入输出的传输层
 * MCP 服务器使用此传输层进行通信
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

/**
 * OpenAI SDK
 * 用于调用 AI 接口生成智能 Mock 数据
 */
import { OpenAI } from 'openai';

// ============================================================
// 2. 环境变量配置
// ============================================================

/**
 * OpenAI API 密钥
 * 支持自定义 API 地址（如代理、自建模型）
 */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

/**
 * 初始化 OpenAI 客户端
 * 仅在配置了 API_KEY 时才创建实例
 * 如果未配置 API_KEY，则使用本地 Mock 数据生成器
 */
const openai = OPENAI_API_KEY
  ? new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: OPENAI_BASE_URL,
    })
  : null;

// ============================================================
// 3. 定义工具列表
// ============================================================

/**
 * MCP 工具定义数组
 *
 * 每个 Tool 包含:
 * - name: 工具唯一标识符
 * - description: 工具描述（AI 会根据此描述决定何时调用）
 * - inputSchema: 工具参数的 JSON Schema 定义
 */
const TOOLS: Tool[] = [
  {
    /**
     * generate_mock - 智能 Mock 数据生成工具
     *
     * 功能: 根据 API URL 自动请求接口，分析响应结构，
     *       利用 AI 生成符合业务语义的 Mock 数据
     *
     * 使用场景:
     * - 开发阶段需要 Mock 数据但后端 API 尚未完成
     * - 需要批量生成测试数据
     * - 接口响应结构调整后快速生成新 Mock 数据
     */
    name: 'generate_mock',
    description:
      '根据 API URL 自动请求接口，分析响应结构，生成符合业务语义的 Mock 数据（JSON 格式）',
    inputSchema: {
      type: 'object',
      properties: {
        apiUrl: {
          type: 'string',
          description: '接口的完整 URL，支持 GET/POST/PUT/DELETE/PATCH 方法',
          example: 'https://uapis.cn/api/v1/misc/weather',
        },
        method: {
          type: 'string',
          description: 'HTTP 请求方法',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          default: 'GET',
        },
        requestBody: {
          type: 'string',
          description: '请求体（JSON 格式字符串，仅用于 POST/PUT/PATCH 请求）',
          example: '{"name": "test", "email": "test@example.com"}',
        },
        mockCount: {
          type: 'number',
          description: '生成 Mock 数据的数量',
          default: 1,
        },
      },
      required: ['apiUrl'], // apiUrl 是必填参数
    },
  },
  {
    /**
     * analyze_api - API 分析工具
     *
     * 功能: 请求指定 API，返回响应结构和示例数据
     *
     * 使用场景:
     * - 快速查看 API 响应格式
     * - 调试接口返回
     * - 了解第三方 API 的数据结构
     */
    name: 'analyze_api',
    description: '分析 API 响应结构，返回字段类型和示例值',
    inputSchema: {
      type: 'object',
      properties: {
        apiUrl: {
          type: 'string',
          description: '接口的完整 URL',
        },
        method: {
          type: 'string',
          description: 'HTTP 请求方法',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          default: 'GET',
        },
        requestBody: {
          type: 'string',
          description: '请求体（JSON 格式字符串）',
        },
      },
      required: ['apiUrl'],
    },
  },
];

// ============================================================
// 4. 类型定义
// ============================================================

/**
 * API 响应封装接口
 *
 * 统一处理成功和失败两种情况，
 * 避免抛出异常导致 MCP 通信中断
 */
interface ApiResponse {
  /** HTTP 状态码，如 200, 404, 500 */
  status: number;
  /** 状态文本，如 "OK", "Not Found" */
  statusText: string;
  /** 响应头信息 */
  headers: Record<string, string>;
  /** 响应体（已解析的 JSON 或文本）*/
  body: unknown;
  /** 错误信息（如果请求失败）*/
  error?: string;
}

// ============================================================
// 5. 核心函数实现
// ============================================================

/**
 * 发送 HTTP 请求
 *
 * @param url - 请求 URL
 * @param method - HTTP 方法（GET/POST/PUT/DELETE/PATCH）
 * @param body - 请求体（用于 POST/PUT/PATCH）
 * @returns Promise<ApiResponse> - 封装的响应结果
 *
 * 设计说明:
 * - 使用原生 fetch API，无需引入额外依赖
 * - 30秒超时机制，避免请求卡死
 * - 自动解析 JSON 或返回文本
 * - 统一错误处理，返回 error 字段而非抛出异常
 */
async function fetchApi(url: string, method: string = 'GET', body?: string): Promise<ApiResponse> {
  try {
    // AbortController 用于实现请求超时
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json', // 发送 JSON
        Accept: 'application/json', // 期望接收 JSON
      },
      signal: controller.signal, // 关联超时控制器
    };

    // POST/PUT/PATCH 请求需要添加请求体
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = body;
    }

    // 清除超时计时器
    clearTimeout(timeout);

    // 发送请求
    const response = await fetch(url, options);

    // 提取响应头
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // 根据 Content-Type 解析响应体
    let responseBody: unknown;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    // 返回成功响应
    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
    };
  } catch (error) {
    // 捕获所有异常（网络错误、超时等）
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 0,
      statusText: 'Error',
      headers: {},
      body: null,
      error: errorMessage,
    };
  }
}

/**
 * 根据字段名和值类型推断 Mock 数据
 *
 * @param value - 原始值（可能是 null 或 undefined）
 * @param fieldName - 字段名称（用于语义推断）
 * @returns 推断后的 Mock 值
 *
 * 设计说明:
 * - 当原始值为 null/undefined 时，根据字段名生成合理的默认值
 * - 字段名包含特定关键词时，生成对应类型的值
 * - 例如：name → "mock_string"，email → "user@example.com"
 */
function inferMockValue(value: unknown, fieldName: string): unknown {
  // 当值为空时，基于字段名推断
  if (value === null || value === undefined) {
    const name = fieldName.toLowerCase();

    // ID 字段
    if (name.includes('id')) return 1;

    // 名称/标题/用户名
    if (name.includes('name') || name.includes('title') || name.includes('username'))
      return 'mock_string';

    // 邮箱
    if (name.includes('email')) return 'user@example.com';

    // 电话/手机
    if (name.includes('phone') || name.includes('mobile')) return '13800138000';

    // 图片/头像
    if (name.includes('avatar') || name.includes('image') || name.includes('photo'))
      return 'https://example.com/image.jpg';

    // URL/链接
    if (name.includes('url') || name.includes('link')) return 'https://example.com';

    // 价格/金额
    if (name.includes('price') || name.includes('amount') || name.includes('money')) return 99.99;

    // 数量
    if (name.includes('count') || name.includes('num')) return 0;

    // 布尔值
    if (
      name.includes('bool') ||
      name.includes('is') ||
      name.includes('has') ||
      name.includes('enable')
    )
      return true;

    // 日期/时间
    if (
      name.includes('date') ||
      name.includes('time') ||
      name.includes('created') ||
      name.includes('updated')
    )
      return new Date().toISOString();

    // 描述/内容
    if (name.includes('desc') || name.includes('content') || name.includes('detail'))
      return '这是一段描述文本';

    // 默认返回 null
    return null;
  }

  // 非空值直接返回
  return value;
}

/**
 * 根据数据结构递归生成 Mock 数据
 *
 * @param data - 原始数据结构（对象或数组）
 * @param count - 生成数量（用于数组）
 * @returns 生成的 Mock 数据
 *
 * 设计说明:
 * - 递归遍历对象的所有属性
 * - 对数组生成多个 Mock 实例
 * - 调用 inferMockValue 生成符合语义的字段值
 */
function generateMockFromStructure(data: unknown, count: number = 1): unknown {
  // 处理数组：生成多个 Mock 实例
  if (Array.isArray(data) && data.length > 0) {
    const mockArray: unknown[] = [];
    for (let i = 0; i < Math.min(count, 10); i++) {
      mockArray.push(generateMockFromStructure(data[0])); // 基于数组第一个元素生成
    }
    return mockArray;
  }

  // 处理对象：递归处理每个字段
  if (typeof data === 'object' && data !== null) {
    const mockObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      mockObj[key] = inferMockValue(value, key);
    }
    return mockObj;
  }

  // 基本类型直接返回
  return data;
}

/**
 * 使用 AI 生成智能 Mock 数据
 *
 * @param apiResponse - API 响应结果
 * @param mockCount - 需要生成的 Mock 数量
 * @returns Promise<string> - JSON 格式的 Mock 数据字符串
 *
 * 设计说明:
 * - 如果未配置 OpenAI API Key，使用本地生成器
 * - 构建 Prompt 发送给 AI，说明生成要求
 * - 解析 AI 返回，提取 JSON 内容
 * - 如果 AI 返回格式错误，回退到本地生成器
 */
async function generateMockWithAI(apiResponse: ApiResponse, mockCount: number): Promise<string> {
  // 无 API Key 时使用本地生成器
  if (!openai) {
    return JSON.stringify(generateMockFromStructure(apiResponse.body, mockCount), null, 2);
  }

  try {
    // 构建 Prompt
    const prompt = `分析以下 API 响应的数据结构，生成符合业务语义的 Mock 数据。

原始 API 响应结构：
${JSON.stringify(apiResponse.body, null, 2)}

请生成 ${mockCount} 条符合这个 API 响应结构的 Mock 数据。要求：
1. 数据要符合字段的业务语义（如 name 字段应该是人名而不是随机字符串）
2. 字段值要真实可信
3. 返回纯 JSON 数组格式

只返回 JSON 数据，不要其他文字。`;

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '你是一个专业的 Mock 数据生成助手，擅长根据 API 响应结构生成真实可信的测试数据。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7, // 适中随机性
      max_tokens: 4096, // 最大令牌数
    });

    // 提取 AI 返回内容
    const mockData = completion.choices[0]?.message?.content || '[]';

    // 清理 Markdown 代码块标记
    const cleanedMockData = mockData
      .replace(/^```json\n?/, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    // 验证返回的是否为有效 JSON
    try {
      JSON.parse(cleanedMockData);
      return cleanedMockData;
    } catch {
      // JSON 格式错误，回退到本地生成器
      return JSON.stringify(generateMockFromStructure(apiResponse.body, mockCount), null, 2);
    }
  } catch (error) {
    // API 调用失败，记录错误并回退
    console.error('OpenAI API error:', error);
    return JSON.stringify(generateMockFromStructure(apiResponse.body, mockCount), null, 2);
  }
}

// ============================================================
// 6. 创建并启动 MCP 服务器
// ============================================================

/**
 * 创建 MCP 服务器实例
 *
 * @returns Promise<Server> - 配置好的 MCP 服务器
 *
 * MCP 服务器工作流程:
 * 1. 创建 Server 实例，定义服务器元信息
 * 2. 注册 ListTools 请求处理器（返回可用工具列表）
 * 3. 注册 CallTool 请求处理器（执行工具调用）
 * 4. 连接传输层，开始处理请求
 */
export const createServer = async () => {
  /**
   * 创建 Server 实例
   *
   * 参数说明:
   * - 第一个对象: 服务器元信息
   *   - name: 服务器名称
   *   - version: 版本号
   * - 第二个对象: 服务器能力配置
   *   - capabilities: 支持的功能（tools 表示支持工具调用）
   */
  const server = new Server(
    {
      name: 'mock-generate-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {}, // 声明支持工具调用能力
      },
    },
  );

  /**
   * 注册 ListTools 请求处理器
   *
   * 当 AI 助手需要查询可用工具时调用
   * 返回服务器提供的所有工具定义
   */
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return { tools: TOOLS };
  });

  /**
   * 注册 CallTool 请求处理器
   *
   * 当 AI 助手需要执行工具时调用
   * 根据请求中的 tool name 分发到对应的处理函数
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      /**
       * generate_mock 工具处理
       */
      if (name === 'generate_mock') {
        // 解析参数
        const {
          apiUrl,
          method = 'GET',
          requestBody,
          mockCount = 1,
        } = args as {
          apiUrl: string;
          method?: string;
          requestBody?: string;
          mockCount?: number;
        };

        // 请求 API
        const apiResponse = await fetchApi(apiUrl, method, requestBody);

        // 处理请求失败
        if (apiResponse.error) {
          return {
            content: [
              {
                type: 'text',
                text: `API 请求失败: ${apiResponse.error}`,
              },
            ],
          };
        }

        // 处理空响应
        if (!apiResponse.body) {
          return {
            content: [
              {
                type: 'text',
                text: `API 返回空响应 (${apiResponse.status} ${apiResponse.statusText})`,
              },
            ],
          };
        }

        // 生成 Mock 数据
        const mockData = await generateMockWithAI(apiResponse, mockCount);

        // 返回结果（Markdown 格式）
        return {
          content: [
            {
              type: 'text',
              text: `## API 请求信息\n- URL: ${apiUrl}\n- Method: ${method}\n- Status: ${apiResponse.status} ${apiResponse.statusText}\n\n## 生成的 Mock 数据\n\`\`\`json\n${mockData}\n\`\`\``,
            },
          ],
        };
      }

      /**
       * analyze_api 工具处理
       */
      if (name === 'analyze_api') {
        const {
          apiUrl,
          method = 'GET',
          requestBody,
        } = args as {
          apiUrl: string;
          method?: string;
          requestBody?: string;
        };

        const apiResponse = await fetchApi(apiUrl, method, requestBody);

        if (apiResponse.error) {
          return {
            content: [
              {
                type: 'text',
                text: `API 请求失败: ${apiResponse.error}`,
              },
            ],
          };
        }

        const structure = JSON.stringify(apiResponse.body, null, 2);

        return {
          content: [
            {
              type: 'text',
              text: `## API 分析结果\n- URL: ${apiUrl}\n- Method: ${method}\n- Status: ${apiResponse.status} ${apiResponse.statusText}\n\n## 响应结构\n\`\`\`json\n${structure}\n\`\`\``,
            },
          ],
        };
      }

      /**
       * 未知工具处理
       */
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
      };
    } catch (error) {
      // 捕获所有异常，返回友好错误信息
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  });

  /**
   * 连接传输层
   *
   * StdioServerTransport 会:
   * - 从 stdin 读取 JSON-RPC 请求
   * - 将响应写入 stdout
   * - 处理协议级别的序列化/反序列化
   */
  const transport = new StdioServerTransport();
  await server.connect(transport);

  return server;
};

// ============================================================
// 7. MCP Server 编写规范指南
// ============================================================

/**
 * ## MCP Server 编写规范
 *
 * ### 一、项目结构
 *
 * 一个标准的 MCP Server 项目通常包含:
 * ```
 * mcp-server/
 * ├── src/
 * │   ├── index.ts        # 入口文件
 * │   ├── server.ts      # 服务器主逻辑
 * │   ├── tools/          # 工具实现
 * │   │   ├── tool-a.ts
 * │   │   └── tool-b.ts
 * │   ├── utils/         # 工具函数
 * │   └── types/         # 类型定义
 * ├── package.json
 * └── tsconfig.json
 * ```
 *
 * ### 二、核心组件
 *
 * 1. **Server 实例**
 *    - 名称和版本号
 *    - 声明支持的能力（tools, resources, prompts 等）
 *
 * 2. **Tool 定义**
 *    - name: 唯一标识
 *    - description: 描述（AI 根据此决定调用）
 *    - inputSchema: 参数 JSON Schema
 *
 * 3. **Request Handlers**
 *    - ListToolsHandler: 返回可用工具
 *    - CallToolHandler: 执行工具调用
 *
 * 4. **Transport**
 *    - StdioServerTransport: 标准输入输出（最常用）
 *    - SSETransport: Server-Sent Events
 *
 * ### 三、Tool 定义规范
 *
 * ```typescript
 * {
 *   name: 'tool_name',           // 必须是英文、下划线
 *   description: '工具描述',       // 中文描述，方便 AI 理解
 *   inputSchema: {
 *     type: 'object',
 *     properties: {
 *       param1: {
 *         type: 'string',
 *         description: '参数描述',
 *       },
 *       param2: {
 *         type: 'number',
 *         description: '数值参数',
 *         default: 10,           // 可设置默认值
 *       },
 *     },
 *     required: ['param1'],      // 必填参数
 *   },
 * }
 * ```
 *
 * ### 四、返回格式规范
 *
 * MCP 工具返回必须包含 content 数组:
 *
 * ```typescript
 * return {
 *   content: [
 *     {
 *       type: 'text',             // 目前主要使用 text 类型
 *       text: '返回的文本内容',
 *     },
 *   ],
 * };
 * ```
 *
 * ### 五、错误处理规范
 *
 * 1. **不要抛出异常到外层**
 *    - 在 try-catch 中处理所有异常
 *    - 返回友好的错误信息
 *
 * 2. **区分错误类型**
 *    - 用户输入错误 → 返回提示信息
 *    - 外部 API 错误 → 返回错误详情
 *    - 系统错误 → 记录日志并返回通用错误
 *
 * ### 六、常用依赖
 *
 * ```json
 * {
 *   "@modelcontextprotocol/sdk": "^1.0.0",
 *   "typescript": "^5.0.0",
 *   "tsx": "^4.0.0"
 * }
 * ```
 *
 * ### 七、启动方式
 *
 * package.json 配置:
 * ```json
 * {
 *   "type": "module",
 *   "scripts": {
 *     "dev": "tsx src/index.ts"
 *   }
 * }
 * ```
 *
 * ### 八、MCP 客户端配置示例
 *
 * Trae IDE 配置 (.trae/mcp.json):
 * ```json
 * {
 *   "mcpServers": {
 *     "my-mcp-server": {
 *       "command": "npx",
 *       "args": ["tsx", "src/index.ts"],
 *       "cwd": "/path/to/project"
 *     }
 *   }
 * }
 * ```
 *
 * ### 九、调试技巧
 *
 * 1. **本地测试**
 *    ```bash
 *    npx tsx src/index.ts
 *    ```
 *
 * 2. **手动发送请求**
 *    ```bash
 *    echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx tsx src/index.ts
 *    ```
 *
 * 3. **查看 SDK 日志**
 *    - 在关键步骤添加 console.error 调试
 *    - MCP 协议通信可通过日志追踪
 *
 * ### 十、最佳实践
 *
 * 1. **保持工具职责单一**
 *    - 每个工具只做一件事
 *    - 复杂功能拆分为多个工具
 *
 * 2. **详细的描述信息**
 *    - 工具描述要清晰说明用途
 *    - 参数描述要包含示例
 *
 * 3. **合理的默认值**
 *    - 为可选参数设置合理的默认值
 *    - 减少用户的使用成本
 *
 * 4. **健壮的错误处理**
 *    - 预判各种错误情况
 *    - 返回有意义的错误信息
 *
 * 5. **性能考虑**
 *    - 设置请求超时
 *    - 避免长时间阻塞
 *
 * 6. **安全考虑**
 *    - 不要在日志中输出敏感信息
 *    - 验证用户输入
 */
