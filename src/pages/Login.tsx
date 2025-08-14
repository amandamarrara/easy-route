import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Lock, Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleQRScan = () => {
    // Simular leitura de QR code
    toast({
      title: "QR Code lido",
      description: "Redirecionado para inserir token",
    });
  };

  const handleTokenSubmit = async () => {
    if (!token.trim()) {
      toast({
        title: "Token necessário",
        description: "Por favor, insira seu token pessoal",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular validação
    setTimeout(() => {
      setIsLoading(false);
      if (token === "123456") {
        toast({
          title: "Acesso liberado",
          description: "Bem-vindo à sua rota!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Token inválido",
          description: "Verifique seu token e tente novamente",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Uello Driver</h1>
            <p className="text-muted-foreground">Plataforma Logística</p>
          </div>
        </div>

        {/* QR Code Scanner */}
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              Scanner QR Code da Rota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleQRScan}
              className="w-full"
              size="xl"
              variant="accent"
            >
              <QrCode className="w-5 h-5" />
              Escanear QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Token Input */}
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Token Pessoal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Digite seu token (ex: 123456)"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="text-center text-lg h-12"
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground text-center">
                Token relacionado ao seu CPF
              </p>
            </div>
            
            <Button 
              onClick={handleTokenSubmit}
              disabled={isLoading}
              className="w-full"
              size="xl"
            >
              {isLoading ? "Validando..." : "Acessar Rota"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Para demonstração, use o token: <strong>123456</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;