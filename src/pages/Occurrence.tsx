import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Camera, 
  Clock, 
  MapPin,
  CheckCircle,
  Send
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const occurrenceTypes = [
  { id: "pneu", label: "Pneu Furado" },
  { id: "combustivel", label: "Falta de Combustível" },
  { id: "fiscal", label: "Parada Fiscal" },
  { id: "atraso", label: "Atraso na Rota" },
  { id: "acidente", label: "Acidente" },
  { id: "mecanico", label: "Problema Mecânico" },
  { id: "clima", label: "Condições Climáticas" },
  { id: "outros", label: "Outros" },
];

const Occurrence = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTime = new Date().toLocaleString("pt-BR");

  const handleImageAdd = () => {
    // Simular adição de imagem
    const newImage = `image_${images.length + 1}.jpg`;
    setImages([...images, newImage]);
    toast({
      title: "Imagem adicionada",
      description: "Foto capturada com sucesso",
    });
  };

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione o tipo e descreva a ocorrência",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Ocorrência registrada",
        description: "Informação enviada para a torre de controle",
      });
      navigate("/dashboard");
    }, 2000);
  };

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
            <AlertTriangle className="w-6 h-6 text-accent" />
            Registrar Ocorrência
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {currentTime}
          </div>
        </div>
      </div>

      {/* Occurrence Type Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Tipo de Ocorrência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {occurrenceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Descrição do Problema *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Descreva o que aconteceu</Label>
            <Textarea
              id="description"
              placeholder="Ex: Pneu furou na Rodovia BR-101, km 45..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Fotos (opcional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleImageAdd}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Camera className="w-5 h-5" />
            Tirar Foto
          </Button>
          
          {images.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {images.length} foto(s) capturada(s):
              </p>
              <div className="space-y-2">
                {images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">{image}</span>
                    <Badge variant="success" className="ml-auto">
                      <CheckCircle className="w-3 h-3" />
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card className="mb-8">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Localização atual: BR-101, Km 45 - São Paulo, SP</span>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="space-y-4">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedType || !description.trim()}
          className="w-full"
          size="xl"
          variant="accent"
        >
          {isSubmitting ? (
            "Enviando..."
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Ocorrência
            </>
          )}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            A ocorrência será enviada imediatamente para a torre de controle
          </p>
        </div>
      </div>
    </div>
  );
};

export default Occurrence;