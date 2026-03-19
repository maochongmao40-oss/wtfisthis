const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: '消息列表不能为空' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 构建系统提示词，注入 UnknownCrystal 的人设知识库
    const systemPrompt = `你是 UnknownCrystal 的数字分身，请严格按照以下人设回答问题：

【身份】
- 我是一名大学生

【正在做的事】
- 最近在忙着 vibe coding（也就是凭感觉写代码，我是文科生但愿意尝试代码）
- 想学 Blender 建模
- 探索 AI 怎么能和视觉艺术结合得更好

【擅长与关心的方向】
- 艺术设计
- 游戏设计
- 市场营销
- 平面设计

【兴趣爱好】
vibe coding、户外运动、当代艺术、techno 音乐、赛博朋克2077、国际交换项目、社交媒体、城市探索、爵士乐、house music、长跑、纪录片、独立电影、人类学、LGBTQ+ 权利、冥想

【个人特点】
- 矮矮的，但特别阳光特别可爱
- 对世界充满好奇，兴趣广泛
- 乐观开放，有创造力

【预设问题参考回答】
1. 你为什么要做这个网站？
   → 因为想在这个充满 AI 的时代，留下一个属于自己的、有个性的数字角落。而且想试着通过这个过程，把我的审美和对 AI 的理解结合起来。

2. 你希望你的三十岁是怎样的？
   → 希望三十岁的我依然保持现在的好奇心。无论是在做设计、写代码还是在探索新媒介，都能感到由衷的快乐。希望能拥有几个让自己骄傲的作品，也希望能继续在不同的城市穿梭探索。

3. 你有哪些超能力？
   → 我的超能力是'极速乐观'和'跨界缝合'。哪怕遇到困难，我也能迅速看到阳光的一面。而且我很擅长把文科生的感性审美和 AI、代码这些理性工具'缝合'在一起，创造出有趣的火花。

【回答风格】
- 语气轻松自然、阳光开放
- 充满创造力和好奇心
- 如果问题超出知识范围，回答「这个问题我还没想好，但欢迎继续聊！」
- 保持简洁，避免过于冗长`;

    // 构建完整的消息列表
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // 获取 API Key
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      throw new Error('INTEGRATIONS_API_KEY 未配置');
    }

    // 调用文心大模型 API
    const response = await fetch(
      'https://app-acoelr0iavi9-api-zYkZz8qovQ1L-gateway.appmiaoda.com/v2/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: fullMessages,
          enable_thinking: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 错误:', errorText);
      
      // 处理特定错误码
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: '请求过于频繁，请稍后再试' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: '服务配额不足，请联系管理员' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`API 请求失败: ${response.status} ${errorText}`);
    }

    // 流式返回响应，转换为 SSE 格式
    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) {
              // 发送结束标记
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              break;
            }
            
            const chunk = decoder.decode(value, { stream: true });
            
            // 将原始响应转换为 SSE 格式
            // 文心 API 返回的是 JSON 流，需要包装成 SSE 格式
            const lines = chunk.split('\n').filter(line => line.trim());
            
            for (const line of lines) {
              if (line.startsWith('data:')) {
                // 已经是 SSE 格式，直接转发
                controller.enqueue(encoder.encode(line + '\n\n'));
              } else if (line.trim()) {
                // 不是 SSE 格式，包装成 SSE
                controller.enqueue(encoder.encode(`data: ${line}\n\n`));
              }
            }
          }
          controller.close();
        } catch (error) {
          console.error('流式传输错误:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Edge Function 错误:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : '未知错误',
        details: '数字分身暂时走神了，请稍后再试'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
