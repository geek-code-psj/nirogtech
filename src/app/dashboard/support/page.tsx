'use client';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { liveChatSupport, type LiveChatSupportInput } from '@/ai/flows/live-chat-support';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A workaround to get to the underlying scrollable div
        const scrollableViewport = scrollAreaRef.current.children[1] as HTMLDivElement;
        if(scrollableViewport) {
            scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const conversationHistory = messages.map(m => ({role: m.role, content: m.content}));

        const chatInput: LiveChatSupportInput = {
            query: input,
            conversationHistory: conversationHistory
        }

        const result = await liveChatSupport(chatInput);
        
        const botMessage: Message = { role: 'bot', content: result.response };
        setMessages((prev) => [...prev, botMessage]);

        if (result.escalateToHuman) {
            const escalationMessage: Message = { role: 'bot', content: "I'm connecting you to a human agent now." };
            setMessages((prev) => [...prev, escalationMessage]);
        }

    } catch (error) {
      console.error('Error with live chat support:', error);
      const errorMessage: Message = { role: 'bot', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Live Chat Support</h1>
        <p className="text-muted-foreground">Get instant help from our AI-powered chatbot.</p>
      </div>
      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle>NirogTech Support</CardTitle>
          <CardDescription>The chat may be monitored for quality assurance.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'bot' && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/support/100/100" />
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-3 max-w-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/support/100/100" />
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                     <div className="rounded-lg p-3 bg-muted">
                        <p className="text-sm">Typing...</p>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
