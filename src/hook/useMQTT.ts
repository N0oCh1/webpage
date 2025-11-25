import mqtt from "mqtt";
import { useEffect, useState, useRef } from "react";

const useMQTT = (code: string) => {
  const [nombre, setNombre] = useState<string>("");
  const [estado, setEstado] = useState<string>("0");
  const [watts, setWatts] = useState<string>("0");
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [codigoAcceso, setCodigoAcceso] = useState<string>("");

  const clientRef = useRef<mqtt.MqttClient | null>(null);

  // OPCIONES MQTT
  const options: mqtt.IClientOptions = {
    username: "ControlRemoto",
    password: "ControlRemoto1",
    reconnectPeriod: 1000,
  };
  // Conexión MQTT
  useEffect(() => {
    const client = mqtt.connect("wss://6aa34bd86d6844e8969a9bbed6cc699f.s1.eu.hivemq.cloud:8884/mqtt",options);
    clientRef.current = client;
        setCodigoAcceso(code);

    client.on("connect", () => {
      client.subscribe(`Enchufe/${code}/#`);
      setIsLoading(false);
    });

    client.on("error", (err) => {
      setError(err);
    });

    client.on("message", (topic, message) => {
      const partes = topic.split("/");
      const tipoDato = partes[2];
      const valor = message.toString();

      switch (tipoDato) {
        case "nombre":
          setNombre(valor);
          break;
        case "estado":
          setEstado(valor);
          break;
        case "watts":
          setWatts(valor);
          break;
      }
    });

    return () => {
      client.end();
    };
  }, [code]);

  // --- FUNCIONES PARA PUBLICAR --
  const BotonSwitch = () => {
    if (!clientRef.current) return;

    const nuevoEstado = estado === "1" ? "0" : "1";
    clientRef.current.publish(`Enchufe/${code}/estado`, nuevoEstado);
  };
  const CambiarNombre = (nuevoNombre: string) => {
    if (!clientRef.current) return;

    clientRef.current.publish(`Enchufe/${code}/nombre`, nuevoNombre);
  };
  return {
    nombre,
    estado,
    watts,
    BotonSwitch,
    CambiarNombre,
    error,
    isLoading,
    codigoAcceso,
  };
};

export default useMQTT;