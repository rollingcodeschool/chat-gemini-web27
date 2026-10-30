import ReactMarkdown from "react-markdown";

const FormChatApp = ({
  chatBot,
  inputText,
  loading,
  responseText,
  setInputText,
}) => {
  return (
    <form onSubmit={chatBot}>
      <input
        type="text"
        className="form-control input"
        placeholder="Escribe tu consulta..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={loading}
        onFocus={() => setInputText("")}
      />

      <div
        className="form-control markdown-output mt-3"
        role="region"
        aria-label="Respuesta del asistente"
        aria-live="polite"
      >
        {loading ? (
          <p className="mb-0">Pensando...</p>
        ) : responseText ? (
          <ReactMarkdown>{responseText}</ReactMarkdown>
        ) : (
          <p className="mb-0 text-muted">La respuesta aparecerá acá.</p>
        )}
      </div>
    </form>
  );
};

export default FormChatApp;
