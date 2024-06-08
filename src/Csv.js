export default function SelectCSVForm({ handleAddCards, closeModal }) {
  const parseCsv = (csvData) => {
    /* Parse CSV data and return an array of objects */
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      // If a CSV element has a comma in it, it will be wrapped in quotes. We want to split on the
      //comma, but not include the quotes in the final value.
      const splitOn = lines[i].startsWith('"') ? '",' : ',';
      const currentLine = lines[i].split(splitOn);

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].replace('"', '').trim();
      }

      result.push(obj);
    }

    return result;
  };

  const saveData = (jsonData) => {
    /* Save JSON data to the server */
    for (let i = 0; i < jsonData.length; i++) {
      fetch('http://localhost:3001/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData[i])
      })
    }
    return true;
  }

  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const jsonData = parseCsv(csvData);
      if (saveData(jsonData)) {
        handleAddCards(jsonData);
        closeModal();
      }

    };

    reader.readAsText(file);
    };

  return (
    <div className='form'>
        <form>
            <input type="file" accept=".csv" onChange={ handleCSVInputChange } />
        </form>
    </div>
  );
}

