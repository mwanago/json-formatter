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
      const textFromFile = await chosenFile.text();
      const data = JSON.parse(textFromFile);
      const formattedJson = JSON.stringify(data, null, 2);

      const anchor = document.createElement('a');
      const blob = new Blob([formattedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      anchor.setAttribute('href', url);
      anchor.setAttribute('download', `${chosenFile.name}_formatted`);
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
