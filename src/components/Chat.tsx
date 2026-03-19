import React, { useState, useRef, useEffect } from 'react';
import { sendStreamRequest } from '@/lib/stream-utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'HELLO. I AM THE DIGITAL TWIN OF UNKNOWNCRYSTAL. ASK ME ABOUT MY INTERESTS, MY PROJECTS, OR ANY WILD IDEAS.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "WHY DID YOU BUILD THIS SITE?",
    "WHAT ARE YOUR GOALS FOR AGE 30?",
    "WHAT ARE YOUR SUPERPOWERS?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (input.length > 200) {
      alert('MAXIMUM 200 CHARACTERS ALLOWED');
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
          try {
            const parsed = JSON.parse(data);
            const chunk = parsed.choices?.[0]?.delta?.content || '';
            if (chunk) {
              accumulatedContent += chunk;
              setStreamingContent(accumulatedContent);
            }
          } catch (error) {
            console.error('Parse error:', error);
          }
        },
        onComplete: () => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: accumulatedContent || 'THE DIGITAL TWIN IS CURRENTLY DAYDREAMING. PLEASE TRY AGAIN LATER.' 
          }]);
          setStreamingContent('');
          setIsLoading(false);
        },
        onError: (error: Error) => {
          console.error('Request error:', error);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'THE DIGITAL TWIN IS CURRENTLY DAYDREAMING. PLEASE TRY AGAIN LATER.' 
          }]);
          setStreamingContent('');
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('Send error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'THE DIGITAL TWIN IS CURRENTLY DAYDREAMING. PLEASE TRY AGAIN LATER.' 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-[80vh] flex flex-col font-sans border-b-4 border-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        
        {/* Sidebar for Title and Presets */}
        <div className="col-span-12 lg:col-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-foreground bg-primary text-primary-foreground p-8 md:p-14 lg:p-20 flex flex-col justify-between">
          <div>
            <h2 className="text-[15vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
              DIGITAL<br/>TWIN
            </h2>
          </div>
          <div className="space-y-4">
            <p className="font-black uppercase tracking-widest border-b-4 border-foreground pb-4 mb-8">FREQUENTLY ASKED:</p>
            {presetQuestions.map((q, i) => (
              <button 
                key={i} 
                onClick={() => setInput(q)} 
                className="block w-full text-left font-black text-3xl lg:text-4xl uppercase tracking-tighter leading-[1.0] hover:bg-foreground hover:text-background p-4 border-4 border-transparent hover:border-foreground transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col bg-background relative overflow-hidden h-[80vh] lg:h-auto">
          <div className="flex-1 overflow-y-auto p-8 md:p-14 lg:p-20 flex flex-col space-y-16" ref={scrollRef}>
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 <span className={`text-sm md:text-base font-black uppercase tracking-widest mb-3 px-3 py-1 border-4 ${msg.role === 'user' ? 'bg-primary border-primary text-primary-foreground' : 'bg-foreground border-foreground text-background'}`}>
                   {msg.role}
                 </span>
                 <p className={`text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide leading-relaxed max-w-[90%] whitespace-pre-wrap ${msg.role === 'user' ? 'text-primary text-right' : 'text-foreground'}`}>
                   {msg.content}
                 </p>
               </div>
             ))}
             {streamingContent && (
               <div className="flex flex-col items-start bg-background">
                 <span className="text-sm md:text-base font-black uppercase tracking-widest mb-3 px-3 py-1 bg-foreground text-background border-4 border-foreground">
                   ASSISTANT
                 </span>
                 <p className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide leading-relaxed max-w-[90%] whitespace-pre-wrap text-foreground">
                   {streamingContent}
                 </p>
               </div>
             )}
             {isLoading && !streamingContent && (
               <div className="flex flex-col items-start mt-8">
                 <span className="text-sm md:text-lg font-black uppercase tracking-widest mb-4 px-3 py-1 bg-foreground text-background border-4 border-foreground">
                   SYSTEM
                 </span>
                 <div className="w-16 h-16 bg-primary animate-ping" />
               </div>
             )}
          </div>
          
          {/* Input row */}
          <div className="border-t-4 border-foreground z-10">
             <form className="flex h-24 md:h-32 focus-within:ring-4 ring-primary" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
               <input 
                 className="flex-1 bg-background text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter p-6 md:p-8 placeholder:text-muted-foreground outline-none w-full"
                 placeholder="ASK THE DIGITAL TWIN..."
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 disabled={isLoading}
               />
               <button 
                 type="submit" 
                 disabled={isLoading || !input.trim()}
                 className="bg-primary text-primary-foreground text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter px-8 md:px-16 hover:bg-foreground hover:text-background transition-colors border-l-4 border-foreground disabled:opacity-50 cursor-pointer"
               >
                 SEND
               </button>
             </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Chat;
