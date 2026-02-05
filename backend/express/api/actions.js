import db from '../db/connect.js'

export const getCategories = async (req, res) => {
    try {
        const [result] = await db.promise().query('select * from kategorie');
        res.status(200).json(result);
    } catch (err) {
        console.error("błąd przy pobieraniu kategorii", err);
        res.status(500).json({error: "bład bazy przy pobieraniu kategorii"});
    }
}

export const getUsers = async (req, res) => {
    try {
        const [result] = await db.promise().query('select * from uzytkownik');
        res.status(200).json(result);
    } catch (err) {
        console.error("błąd przy pobieraniu użytkownikow", err);
        res.status(500).json({error: "bład bazy przy pobieraniu uzytkownikow"});
    }
}

export const getAds = async (req, res) => {
    try {
        const [result] = await db.promise().query(`
            select ogloszenie.id, ogloszenie.tytul, ogloszenie.tresc, uzytkownik.telefon, ogloszenie.kategoria
            from ogloszenie
            join uzytkownik on ogloszenie.uzytkownik_id = uzytkownik.id
            `);
        res.status(200).json(result);
    } catch (err){
        console.error("błąd przy pobieraniu ogloszen", err);
        res.status(500).json({error: "bład bazy przy pobieraniu ogloszen"});
    }
}

export const addAd = async (req, res) => {
    try {

    } catch (err) {
        console.error("błąd przy dodwaniu ogloszenia", err);
        res.status(500).json({error: "bład bazy przy dodwaniu ogloszenia"});
    }
}