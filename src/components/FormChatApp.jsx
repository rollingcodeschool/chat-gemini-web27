const FormChatApp = ({ chatBot, inputText, loading, setInputText }) => {
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

      <textarea
        readOnly
        className="form-control input mt-3"
        placeholder={loading ? "Pensando..." : ""}
        name=""
        id=""
        rows={10}
      ></textarea>
    </form>
  );
};

export default FormChatApp;
