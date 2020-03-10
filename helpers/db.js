import * as SQLite from 'expo-sqlite';
//creates db at first launch and holds a refferances to my db
const db = SQLite.openDatabase('inputs.db');

//initialize the db and creating a basic tabel
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        //The executeSql() method has an argument intended to allow variables 
        //to be substituted into statements without risking SQL injection 
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS inputs4 (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, imageURL TEXT NOT NULL,address TEXT NOT NULL, amount INTEGER NOT NULL, description TEXT NOT NULL,lat REAL NOT NULL,lng REAL NOT NULL)',
                [],
                () => {
                    resolve(); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const insertInput = (name, imageURL, address, amount, description,lat,lng) => {
    const promise = new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO inputs4 (name, imageURL,address, amount, description,lat,lng) VALUES (?, ?,?, ?, ?,?,?);`,
                [name, imageURL, address, amount, description,lat,lng],
                (_, result) => {
                    resolve(result); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchInputs = () => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        db.transaction(tx => {
            tx.executeSql(
                //here you can put a where to select exact what you want
                'SELECT * FROM inputs4',
                [],
                (_, result) => {
                    resolve(result); //success case
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deleteInput = (id) => {
    const promise = new Promise((resolve, reject) => {
        //creaeting the tabel if doesn t exist
        db.transaction(tx => {
            tx.executeSql(
                //here you can put a where to select exact what you want
                `DELETE FROM inputs4 where id=?`,
                [id]
                ,
                (_, result) => {
                     resolve(result); //success case
                }
                ,
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};