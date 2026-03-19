import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { sendStreamRequest } from '@/lib/stream-utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '嗨！我是 UnknownCrystal 的数字分身。你可以问我关于我的兴趣、我正在做的事，或者一些脑洞大开的问题。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "你为什么要做这个网站",
    "你希望你的三十岁是怎样的",
    "你有哪些超能力"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (input.length > 200) {
      alert('最多输入 200 个字符');
      return;
    }

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    let accumulatedContent = '';

    try {
      await sendStreamRequest({
        functionUrl: `${SUPABASE_URL}/functions/v1/chat`,
        requestBody: {
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        },
        supabaseAnonKey: SUPABASE_ANON_KEY,
        onData: (data: string) => {
          console.log('收到原始数据:', data);
          try {
            const parsed = JSON.parse(data);
            console.log('解析后的数据:', parsed);
            const chunk = parsed.choices?.[0]?.delta?.content || '';
            console.log('提取的内容块:', chunk);
            if (chunk) {
              accumulatedContent += chunk;
              setStreamingContent(accumulatedContent);
            }
          } catch (error) {
            console.error('解析流式数据错误:', error, '原始数据:', data);
          }
        },
        onComplete: () => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: accumulatedContent || '数字分身暂时走神了，请稍后再试' 
          }]);
          setStreamingContent('');
          setIsLoading(false);
        },
        onError: (error: Error) => {
          console.error('请求错误:', error);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: '数字分身暂时走神了，请稍后再试' 
          }]);
          setStreamingContent('');
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('发送消息错误:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '数字分身暂时走神了，请稍后再试' 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <section className="p-6 md:p-12 bg-primary border-t-2 border-foreground min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none flex items-center gap-4">
          数字分身 <Sparkles className="w-8 h-8 md:w-16 md:h-16" />
        </h2>
        
        <Card className="rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-background h-[600px] flex flex-col relative overflow-hidden">
          <CardHeader className="border-b-4 border-foreground bg-primary p-4">
            <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight">
              Chat with Digital UnknownCrystal
            </CardTitle>
          </CardHeader>
          
          <CardContent 
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-grid-pattern bg-grid-size" 
            ref={scrollRef}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    msg.role === 'user' ? 'bg-primary text-foreground' : 'bg-secondary text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {streamingContent && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-secondary text-foreground">
                  {streamingContent}
                </div>
              </div>
            )}
            {isLoading && !streamingContent && (
              <div className="flex justify-start">
                <div className="bg-secondary border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-bold">思考中...</span>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t-4 border-foreground bg-background">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full gap-4"
            >
              <Input 
                className="flex-1 rounded-none border-2 border-foreground h-12 text-lg font-bold focus-visible:ring-primary focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                placeholder="向数字分身提问..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                type="submit"
                className="bg-primary hover:bg-accent border-2 border-foreground p-3 transition-colors disabled:opacity-50 h-12 w-12 rounded-none"
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-6 h-6" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="mt-8 flex flex-wrap gap-4">
          {presetQuestions.map((q, i) => (
            <Button 
              key={i}
              variant="outline"
              onClick={() => setInput(q)}
              className="bg-background hover:bg-secondary border-2 border-foreground px-4 py-2 font-black text-sm uppercase transition-colors rounded-none h-auto"
            >
              {q}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chat;
