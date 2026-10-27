import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import FormChatApp from "./FormChatApp";

const ChatApp = () => {
  const [inputText, setInputText] = useState("");
  const [initialMessage, setinitialMessage] = useState(null);
  // const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  const model = "gemini-3.5-flash-lite";

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_GEMINI, //Variable de entorno
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    //función de saludo inicial
    const obtenerSaludoInicial = async () => {
      setLoading(true);
      try {
        const interaction = await ai.interactions.create(
          {
            model,
            input:
              "Saluda al usuario de forma breve y dale la bienvenida a este asistente. Usá un tono argentino y acompaña el mensaje con un emoji.",
          },
          { abortSignal: signal },
        );

        setinitialMessage([
          { sender: "gemini", text: interaction.output_text },
        ]);
      } catch (error) {
        console.error("Error al generar saludo inicial:", error);
      } finally {
        setLoading(false);
      }
    };

    //Ejecutamos la función
    obtenerSaludoInicial();

    return () => {
      controller.abort();
    };
  }, []);

  const chatBot = async (e) => {
    e.preventDefault();
    e.target[1].value = "";
    setLoading(true);
    try {
      const interaction = await ai.interactions.create({
        model,
        input: inputText,
      });
      e.target[1].value = interaction.output_text;
      // setMessages({sender: "gemini", text: interaction.output_text});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="row justtofy-content-center">
        <div className="col text-center">
          <h1>Gemini App</h1>
          {initialMessage ? (
            <p>✨{initialMessage[0].text}</p>
          ) : (
            <p>Iniciando bot...</p>
          )}
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col col-md-6 card p-5">
          <FormChatApp
            chatBot={chatBot}
            inputText={inputText}
            loading={loading}
            setInputText={setInputText}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
