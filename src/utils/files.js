const HEADER = ["employeeId", "projectId", "dateFrom", "dateTo"];

export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const lines = text.split("\n");
      const csvData = lines.map((line) => {
        const data = line.split(",");
        const workObj = {};
        for (let i = 0; i < data.length; i++) {
          workObj[HEADER[i]] = data[i].trim();
        }

        return workObj;
      });

      resolve(csvData);
    };
    reader.onerror = () => {
        reject("Error reading file");
    };
    reader.readAsText(file);
  });
}
