export default function SelectCSVForm({ handleAddCards }) {
    const parseCsv = (csvData) => {
        /* Parse CSV data and return an array of objects */
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");
        const result = [];

        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          const currentLine = lines[i].split(",");

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j].trim();
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
          console.log(csvData)
          const jsonData = parseCsv(csvData);
          if (saveData(jsonData)) {
            handleAddCards(jsonData);
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

