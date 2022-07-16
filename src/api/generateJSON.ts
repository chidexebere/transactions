import csv from 'csvtojson';

export const generateJSON = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/Pectus-Finance/hiring-exercises/master/frontend/expanses.csv',
  );

  const data = await response.text();
  csv()
    .fromString(data)
    .then((jsonObj: jsonDataObject[]) => {
      console.log(jsonObj);
    });
};
