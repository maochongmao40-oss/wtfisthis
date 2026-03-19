import ky from 'ky';
import { createParser } from 'eventsource-parser';

interface StreamRequestOptions {
  functionUrl: string;
  requestBody: Record<string, unknown>;
  supabaseAnonKey: string;
  onData: (data: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export async function sendStreamRequest({
  functionUrl,
  requestBody,
  supabaseAnonKey,
  onData,
  onComplete,
  onError,
}: StreamRequestOptions) {
  try {
    console.log('发送流式请求:', functionUrl, requestBody);
    
    const response = await ky.post(functionUrl, {
      json: requestBody,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      timeout: false,
    });

    console.log('收到响应:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let isDone = false;

    const parser = createParser({
      onEvent: (event) => {
        console.log('SSE 事件:', event);
        const data = event.data;
        if (data === '[DONE]') {
          console.log('收到结束标记');
          isDone = true;
          return;
        }
        try {
          onData(data);
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      }
    });

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('流式读取完成');
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      console.log('收到数据块:', chunk);
      
      buffer += chunk;
      
      // 按双换行符分割 SSE 消息
      const messages = buffer.split('\n\n');
      buffer = messages.pop() || '';

      for (const message of messages) {
        if (message.trim()) {
          // 添加换行符以符合 SSE 格式
          parser.feed(message + '\n\n');
        }
      }
    }
    
    // 流结束后调用 onComplete
    onComplete();
    
  } catch (error) {
    console.error('流式请求错误:', error);
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}
