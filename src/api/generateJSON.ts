import csv from 'csvtojson';

export const generateJSON = async () => {
  let jsonData: jsonDataObject[] = [];
  const response = await fetch(
    'https://raw.githubusercontent.com/Pectus-Finance/hiring-exercises/master/frontend/expanses.csv',
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.text();
  jsonData = await csv().fromString(data);
  return jsonData;
};
