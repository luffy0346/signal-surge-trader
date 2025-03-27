
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button as ShadcnButton } from "@/components/ui/shadcn-button";
import { toast } from "@/components/ui/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planPrice: string;
}

const PaymentModal = ({ isOpen, onClose, planTitle, planPrice }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !name) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Success",
        description: `Your subscription to ${planTitle} has been processed successfully!`,
      });
      onClose();
      // Reset form
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setName('');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    
    return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) => 
      [$1, $2, $3, $4].filter(group => !!group).join(' ')
    );
  };

  const formatExpiryDate = (value: string) => {
    const regex = /^(\d{0,2})(\d{0,2})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    
    return onlyNumbers.replace(regex, (regex, $1, $2) => 
      [$1, $2].filter(group => !!group).join('/')
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-signaledge-card border-signaledge-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Subscribe to {planTitle}</DialogTitle>
          <DialogDescription className="text-signaledge-gray-light">
            Enter your payment details to complete your subscription
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Card className="bg-black/50 border-signaledge-lime/20">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Label htmlFor="name" className="text-white">Cardholder Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/30 border-signaledge-gray-dark text-white"
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="bg-black/30 border-signaledge-gray-dark text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    className="bg-black/30 border-signaledge-gray-dark text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-white">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ''))}
                    className="bg-black/30 border-signaledge-gray-dark text-white"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t border-signaledge-gray-dark pt-4">
              <div>
                <p className="text-white text-sm">Total:</p>
                <p className="text-signaledge-lime font-bold">{planPrice}</p>
              </div>
              <ShadcnButton 
                type="submit" 
                disabled={isProcessing}
                className="bg-signaledge-lime text-black hover:bg-signaledge-lime/80"
              >
                {isProcessing ? 'Processing...' : 'Subscribe Now'}
              </ShadcnButton>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
