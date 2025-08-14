import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, Smartphone, QrCode } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Uello Driver</h1>
            <p className="text-lg text-muted-foreground">Plataforma Logística</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sistema de gestão para motoristas
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-4">
          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <QrCode className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <h3 className="font-semibold">Acesso Rápido</h3>
                  <p className="text-sm text-muted-foreground">QR Code + Token pessoal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <div className="text-left">
                  <h3 className="font-semibold">Registro de Ocorrências</h3>
                  <p className="text-sm text-muted-foreground">Comunicação direta com a torre</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-success" />
                <div className="text-left">
                  <h3 className="font-semibold">Interface Mobile</h3>
                  <p className="text-sm text-muted-foreground">Otimizada para uso em rota</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/login")}
            className="w-full"
            size="xl"
          >
            Acessar Sistema
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Versão protótipo - Para demonstração
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
