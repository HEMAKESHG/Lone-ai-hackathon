import ContractChatbot from '@/components/ContractChatbot';

const AIChat = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-legal-text">AI Assistant</h1>
        <p className="text-legal-text-muted">Get instant answers about your contracts and legal documents</p>
      </div>
      
      <ContractChatbot />
    </div>
  );
};

export default AIChat;