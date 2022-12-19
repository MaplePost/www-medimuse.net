import Papa from "papaparse";

// Make PapaParse work in Async
const parseCSV = async (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            download: true,
            delimiter: "\n",
            skipEmptyLines: true,
            complete: (results) => {
                return resolve(results);
            },
            error: (error) => {
                return reject(error);
            },
        });
    });
};

// Run pull
// Hacked map array. TODO: Fix this to a real loader
const getEmpaticaData = async (basePath, data, exampleId = 0) => {
    let path = basePath + data[exampleId].path;
    return await Promise.all(
        data[exampleId].files.map(async (v, i) => {
            let file = path + v;
            let data = await parseCSV(file);
            return {
                name: v,
                csv: data,
            };
        })
    );
};

const DataLoaders = {
    getEmpaticaData: getEmpaticaData
}

export default DataLoaders;
