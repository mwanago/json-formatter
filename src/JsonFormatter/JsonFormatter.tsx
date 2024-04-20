import useJsonFormatter from './useJsonFormatter';

export const JsonFormatter = () => {
  const { handleJsonFile, error } = useJsonFormatter();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label htmlFor="json-file-input">Choose a valid JSON file</label>
      <input id="json-file-input" type="file" onChange={handleJsonFile} />
      {error && (
        <p data-testid="error-indicator" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
};
