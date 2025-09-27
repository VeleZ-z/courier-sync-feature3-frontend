import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff, Package, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    acceptTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    if (hasUpperCase && hasLowerCase && hasNumbers && hasMinLength) {
      setPasswordStrength("strong");
    } else if ((hasUpperCase || hasLowerCase) && hasNumbers && hasMinLength) {
      setPasswordStrength("medium");
    } else if (password.length > 0) {
      setPasswordStrength("weak");
    } else {
      setPasswordStrength(null);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "password") {
      validatePassword(value as string);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Error", 
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Cuenta creada!",
      description: "Tu cuenta de CourierSync ha sido creada exitosamente",
    });
  };

  const benefits = [
    "Gestión segura de tus datos personales",
    "Acceso a todas las funcionalidades", 
    "Soporte técnico personalizado",
    "Actualizaciones automáticas"
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Column - Benefits */}
        <div className="space-y-8">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
              <Package className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">CourierSync</h1>
              <p className="text-muted-foreground">Registro de cuenta</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              ¿Por qué registrarse?
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Form */}
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Crear una cuenta nueva</CardTitle>
            <CardDescription>
              Regístrate en CourierSync para comenzar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="focus:ring-primary"
                  />
                </div>
              </div>

              {/* Password Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crea una contraseña segura"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="pr-10 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números</p>
                      {passwordStrength && (
                        <div className="flex items-center gap-2">
                          <span>Fortaleza:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            passwordStrength === "strong" ? "bg-green-100 text-green-800" :
                            passwordStrength === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {passwordStrength === "strong" ? "Fuerte" :
                             passwordStrength === "medium" ? "Media" : "Débil"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="pr-10 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-destructive">Las contraseñas no coinciden</p>
                  )}
                </div>
              </div>

              {/* Phone and Address Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Incluye ciudad y departamento"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="focus:ring-primary"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="acceptTerms"
                    className="text-sm font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Al registrarte, aceptas nuestros{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Términos y Condiciones
                    </a>{" "}
                    y nuestra{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Política de Privacidad
                    </a>
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="success" 
                size="xl" 
                className="w-full"
                disabled={!formData.acceptTerms}
              >
                Crear cuenta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
