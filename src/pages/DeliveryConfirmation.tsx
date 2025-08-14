import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Package, 
  CheckCircle, 
  MapPin,
  Clock,
  ShieldCheck
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Delivery {
  id: number;
  sequence: number;
  address: string;
  customer: string;
  items: string;
  scheduledTime: string;
  status: "pendente" | "confirmado";
}

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      sequence: 1,
      address: "Rua das Flores, 123 - Centro",
      customer: "Loja ABC Ltda",
      items: "5 caixas - Eletrônicos",
      scheduledTime: "09:00",
      status: "pendente"
    },
    {
      id: 2,
      sequence: 3,
      address: "Rua do Comércio, 789 - Zona Sul", 
      customer: "Supermercado XYZ",
      items: "12 caixas - Alimentícios",
      scheduledTime: "14:00",
      status: "pendente"
    },
    {
      id: 3,
      sequence: 4,
      address: "Est. da Serra, 321 - Zona Oeste",
      customer: "Farmácia Popular",
      items: "3 caixas - Medicamentos",
      scheduledTime: "16:30",
      status: "pendente"
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [storeToken, setStoreToken] = useState("");
  const [confirmationStep, setConfirmationStep] = useState<"select" | "confirm" | "token">("select");

  const handleSelectDelivery = (deliveryId: number) => {
    setSelectedDelivery(deliveryId);
    setConfirmationStep("confirm");
  };

  const handleConfirmDelivery = () => {
    setConfirmationStep("token");
  };

  const handleFinalConfirmation = () => {
    if (!storeToken.trim()) {
      toast({
        title: "Token necessário",
        description: "Informe o token de confirmação da loja",
        variant: "destructive",
      });
      return;
    }

    if (selectedDelivery) {
      setDeliveries(deliveries.map(delivery => 
        delivery.id === selectedDelivery 
          ? { ...delivery, status: "confirmado" }
          : delivery
      ));
      
      toast({
        title: "Entrega confirmada",
        description: "Confirmação registrada com sucesso",
      });

      // Reset state
      setSelectedDelivery(null);
      setStoreToken("");
      setConfirmationStep("select");
    }
  };

  const handleCancel = () => {
    setSelectedDelivery(null);
    setStoreToken("");
    setConfirmationStep("select");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge variant="success">Confirmado</Badge>;
      default:
        return <Badge variant="warning">Pendente</Badge>;
    }
  };

  const pendingDeliveries = deliveries.filter(d => d.status === "pendente");
  const completedDeliveries = deliveries.filter(d => d.status === "confirmado");
  const selectedDeliveryData = deliveries.find(d => d.id === selectedDelivery);

  return (
    <div className="min-h-screen p-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Confirmação de Entregas
          </h1>
          <p className="text-sm text-muted-foreground">
            Confirme entregas manualmente
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-success">
              {completedDeliveries.length}
            </div>
            <div className="text-sm text-muted-foreground">Confirmadas</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-warning">{pendingDeliveries.length}</div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
      </div>

      {/* Step 1: Select Delivery */}
      {confirmationStep === "select" && pendingDeliveries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Selecione a Entrega para Confirmar
          </h2>
          
          <div className="space-y-4">
            {pendingDeliveries.map((delivery) => (
              <Card key={delivery.id} className="cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => handleSelectDelivery(delivery.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{delivery.sequence}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{delivery.customer}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {delivery.address}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        Previsto: {delivery.scheduledTime}
                      </div>
                      <p className="text-sm mt-2">{delivery.items}</p>
                    </div>
                    {getStatusBadge(delivery.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Confirm Delivery */}
      {confirmationStep === "confirm" && selectedDeliveryData && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Confirmar Entrega
          </h2>
          
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{selectedDeliveryData.sequence}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedDeliveryData.customer}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedDeliveryData.address}
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-sm font-medium">Confirma que esta entrega foi realizada?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Após confirmar, será solicitado o token da loja
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleConfirmDelivery}
              className="flex-1"
              variant="default"
            >
              <CheckCircle className="w-4 h-4" />
              Sim, Confirmar Entrega
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Store Token */}
      {confirmationStep === "token" && selectedDeliveryData && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Token de Confirmação da Loja
          </h2>
          
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-success" />
                <div>
                  <h3 className="font-semibold">{selectedDeliveryData.customer}</h3>
                  <p className="text-sm text-muted-foreground">Entrega confirmada</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storeToken">Token da Loja</Label>
                  <Input
                    id="storeToken"
                    type="text"
                    placeholder="Digite o token fornecido pela loja"
                    value={storeToken}
                    onChange={(e) => setStoreToken(e.target.value)}
                    className="text-center text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Solicite o token de confirmação ao responsável da loja
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleFinalConfirmation}
              className="flex-1"
              variant="success"
            >
              <CheckCircle className="w-4 h-4" />
              Finalizar Confirmação
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Entregas Confirmadas</h2>
          
          <div className="space-y-3">
            {completedDeliveries.map((delivery) => (
              <Card key={delivery.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{delivery.sequence}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{delivery.customer}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {delivery.address}
                      </div>
                      <p className="text-sm mt-1">{delivery.items}</p>
                    </div>
                    {getStatusBadge(delivery.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingDeliveries.length === 0 && confirmationStep === "select" && (
        <Card className="text-center p-8">
          <CardContent className="pt-0">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Todas as entregas confirmadas!</h3>
            <p className="text-muted-foreground">
              Não há entregas pendentes para confirmação.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DeliveryConfirmation;