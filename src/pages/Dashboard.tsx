import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Package,
  Truck,
  Settings,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [routeStatus] = useState("ativa");

  const routePoints = [
    { id: 1, type: "entrega", address: "Rua das Flores, 123 - Centro", status: "pendente", time: "09:00" },
    { id: 2, type: "coleta", address: "Av. Principal, 456 - Zona Norte", status: "concluido", time: "10:30" },
    { id: 3, type: "entrega", address: "Rua do Comércio, 789 - Zona Sul", status: "pendente", time: "14:00" },
    { id: 4, type: "entrega", address: "Est. da Serra, 321 - Zona Oeste", status: "pendente", time: "16:30" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "success";
      case "pendente":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="w-4 h-4" />;
      case "pendente":
        return <Clock className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Rota SP-001</h1>
            <div className="flex items-center gap-2">
              <Badge variant={routeStatus === "ativa" ? "default" : "secondary"}>
                {routeStatus === "ativa" ? "Ativa" : "Pausada"}
              </Badge>
              <span className="text-sm text-muted-foreground">João Silva</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Route Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-success">2</div>
            <div className="text-sm text-muted-foreground">Concluídos</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-warning">4</div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
      </div>

      {/* Route Points */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Pontos da Rota</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {routePoints.map((point) => (
            <div key={point.id} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex-shrink-0">
                {getStatusIcon(point.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={point.type === "entrega" ? "default" : "secondary"} className="text-xs">
                    {point.type === "entrega" ? (
                      <>
                        <Package className="w-3 h-3 mr-1" />
                        Entrega
                      </>
                    ) : (
                      <>
                        <Package className="w-3 h-3 mr-1" />
                        Coleta
                      </>
                    )}
                  </Badge>
                  <Badge variant={getStatusColor(point.status)} className="text-xs">
                    {point.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium truncate">{point.address}</p>
                <p className="text-xs text-muted-foreground">Previsto: {point.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          onClick={() => navigate("/delivery-confirmation")}
          className="w-full"
          size="xl"
          variant="secondary"
        >
          <Package className="w-5 h-5" />
          Confirmar Entregas
        </Button>
      </div>

      {/* Fixed Emergency Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button 
          onClick={() => navigate("/occurrence")}
          className="w-full shadow-lg"
          size="xl"
          variant="accent"
        >
          <AlertTriangle className="w-6 h-6" />
          Registrar Ocorrência
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;