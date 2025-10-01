'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, MessageSquare, Send, X, ChevronsUpDown } from 'lucide-react';
import { nirogChatbot, type NirogChatbotInput } from '@/ai/flows/nirog-chatbot';
import { AnimatePresence, motion } from 'framer-motion';
import type { UserRole } from '@/lib/types';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';


type Message = {
  role: 'user' | 'bot';
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm Nirog, your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);
  const userRole = userProfile?.role || 'patient';


  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
        const scrollableViewport = scrollAreaRef.current.children[1] as HTMLDivElement;
        if(scrollableViewport) {
            setTimeout(() => {
                scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
            }, 100)
        }
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const conversationHistory = messages.map(m => ({role: m.role, content: m.content}));

        const chatInput: NirogChatbotInput = {
            query: input,
            conversationHistory: conversationHistory,
            userRole: userRole,
        }

        const result = await nirogChatbot(chatInput);
        
        const botMessage: Message = { role: 'bot', content: result.response };
        setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error with chatbot:', error);
      const errorMessage: Message = { role: 'bot', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 lg:right-8 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            <Card className="h-[65vh] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="text-primary size-7" />
                  <CardTitle className="font-headline text-xl">Nirog AI Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="size-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex items-start gap-2.5 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'bot' && (
                           <div className="bg-primary rounded-full p-2">
                             <Bot className="size-5 text-primary-foreground" />
                           </div>
                        )}
                        <div className={`rounded-lg p-3 max-w-xs text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                          <p>{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-2.5">
                            <div className="bg-primary rounded-full p-2">
                                <Bot className="size-5 text-primary-foreground" />
                            </div>
                           <div className="rounded-lg p-3 bg-muted rounded-bl-none">
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
                    placeholder="Ask Nirog..."
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 lg:right-8 z-50 rounded-full h-16 w-16 shadow-lg"
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <ChevronsUpDown className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </>
  );
}
