import { ChangeEvent, useState } from 'react';

export function useJsonFormatter() {
  const [error, setError] = useState<null | string>(null);

  const handleJsonFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const chosenFile = event.target.files?.[0];
    setError(null);
    if (!chosenFile) {
      return;
    }
    try {
      const fileText = await chosenFile.text();
      const data = JSON.parse(fileText);
      const prettyJson = JSON.stringify(data, null, 2);

      const anchor = document.createElement('a');
      const blob = new Blob([prettyJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      anchor.setAttribute('href', url);
      anchor.setAttribute('download', chosenFile.name);
      anchor.click();
    } catch {
      setError('The provided file does not contain valid JSON');
    }
    event.target.value = '';
  };

  return {
    handleJsonFile,
    error,
  };
}
