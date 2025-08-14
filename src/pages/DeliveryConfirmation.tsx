import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Package, 
  CheckCircle, 
  X, 
  MapPin,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Delivery {
  id: number;
  address: string;
  customer: string;
  items: string;
  scheduledTime: string;
  status: "pendente" | "confirmado" | "rejeitado";
}

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      address: "Rua das Flores, 123 - Centro",
      customer: "Loja ABC Ltda",
      items: "5 caixas - Eletrônicos",
      scheduledTime: "09:00",
      status: "pendente"
    },
    {
      id: 2,
      address: "Rua do Comércio, 789 - Zona Sul", 
      customer: "Supermercado XYZ",
      items: "12 caixas - Alimentícios",
      scheduledTime: "14:00",
      status: "pendente"
    },
    {
      id: 3,
      address: "Est. da Serra, 321 - Zona Oeste",
      customer: "Farmácia Popular",
      items: "3 caixas - Medicamentos",
      scheduledTime: "16:30",
      status: "pendente"
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleConfirmDelivery = (deliveryId: number) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: "confirmado" }
        : delivery
    ));
    
    toast({
      title: "Entrega confirmada",
      description: "Status atualizado com sucesso",
    });
  };

  const handleRejectDelivery = (deliveryId: number) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Justificativa necessária",
        description: "Informe o motivo da rejeição",
        variant: "destructive",
      });
      return;
    }

    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: "rejeitado" }
        : delivery
    ));
    
    setSelectedDelivery(null);
    setRejectionReason("");
    
    toast({
      title: "Entrega rejeitada",
      description: "Justificativa registrada",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge variant="success">Confirmado</Badge>;
      case "rejeitado":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="warning">Pendente</Badge>;
    }
  };

  const pendingDeliveries = deliveries.filter(d => d.status === "pendente");
  const completedDeliveries = deliveries.filter(d => d.status !== "pendente");

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
            Confirme ou rejeite entregas manualmente
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-warning">{pendingDeliveries.length}</div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-success">
              {deliveries.filter(d => d.status === "confirmado").length}
            </div>
            <div className="text-sm text-muted-foreground">Confirmados</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-destructive">
              {deliveries.filter(d => d.status === "rejeitado").length}
            </div>
            <div className="text-sm text-muted-foreground">Rejeitados</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Deliveries */}
      {pendingDeliveries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            Entregas Pendentes
          </h2>
          
          <div className="space-y-4">
            {pendingDeliveries.map((delivery) => (
              <Card key={delivery.id} className="card-elevated">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
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

                    {selectedDelivery === delivery.id ? (
                      <div className="space-y-3 pt-3 border-t">
                        <Textarea
                          placeholder="Informe o motivo da rejeição..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleRejectDelivery(delivery.id)}
                            variant="destructive"
                            className="flex-1"
                          >
                            <X className="w-4 h-4" />
                            Confirmar Rejeição
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedDelivery(null);
                              setRejectionReason("");
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          onClick={() => handleConfirmDelivery(delivery.id)}
                          variant="success"
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirmar
                        </Button>
                        <Button
                          onClick={() => setSelectedDelivery(delivery.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <X className="w-4 h-4" />
                          Rejeitar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Entregas Processadas</h2>
          
          <div className="space-y-3">
            {completedDeliveries.map((delivery) => (
              <Card key={delivery.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
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

      {pendingDeliveries.length === 0 && (
        <Card className="text-center p-8">
          <CardContent className="pt-0">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Todas as entregas processadas!</h3>
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