
import { GoogleGenAI } from "@google/genai";

const ChatApp = () => {

  const model = "gemini-3.5-flash-lite";
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAIopD3zEYGeU0UotBMRLHQMIgGEo1ujFQ",
  });

  useEffect(() => {
   
   
  }, []);

 
  
  const chatBot = async (e) => {
    e.preventDefault();
    
  };
  return (
    <div>
      <div className="row justtofy-content-center">
        <div className="col text-center">
          <h1>Gemini App</h1>
        {/* mensaje de saludo del bot  */}
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col col-md-6 card p-5">
          <form >
            <input
              type="text"
              className="form-control input"
              placeholder="Escribe tu consulta..."
              
            />

            <textarea
              readOnly
              className="form-control input mt-3"
            
              rows={10}
            ></textarea>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
