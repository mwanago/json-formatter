import { ChangeEvent, useState } from 'react';

export function useJsonFormatter() {
  const [error, setError] = useState<null | string>(null);

  const formatTextAsJson = (text: string) => {
    const data = JSON.parse(text);
    return JSON.stringify(data, null, 2);
  };

  const downloadJson = (formattedJson: string, fileName: string) => {
    const anchor = document.createElement('a');
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    anchor.setAttribute('href', url);
    anchor.setAttribute('download', `${fileName}_formatted`);
    anchor.click();
  };

  const handleJsonFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setError(null);

    if (!selectedFile) {
      return;
    }

    try {
      const textFromFile = await selectedFile.text();
      const formattedJson = formatTextAsJson(textFromFile);

      downloadJson(formattedJson, selectedFile.name);
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
