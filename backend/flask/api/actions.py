from flask import jsonify, request
from db.connect import connect
import pymysql

def get_categories():
    conn = None
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM kategorie")
            results = cursor.fetchall()
            return jsonify(results), 200
    except Exception as e:
        print(f"błąd przy pobieraniu kategorii: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if conn: conn.close()

def get_users():
    conn = None
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM uzytkownik")
            results = cursor.fetchall()
            return jsonify(results), 200
    except Exception as e:
        print(f"błąd przy pobieraniu użytkownikow: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if conn: conn.close()

def get_ads():
    conn = None
    try:
        conn = connect()
        
        sql = """
            SELECT ogloszenie.id, ogloszenie.tytul, ogloszenie.tresc, 
                   uzytkownik.telefon, ogloszenie.kategoria
            FROM ogloszenie 
            JOIN uzytkownik ON ogloszenie.uzytkownik_id = uzytkownik.id
        """
        with conn.cursor() as cursor:
            cursor.execute(sql)
            results = cursor.fetchall()
            return jsonify(results), 200

    except Exception as e:
        print(f"błąd przy pobieraniu ogloszen: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if conn: conn.close()

def add_ad():
    conn = None
    try:
        data = request.json
        
        conn = get_connection()
        sql = """
            INSERT INTO ogloszenie (uzytkownik_id, kategoria, tytul, tresc) 
            VALUES (%s, %s, %s, %s)
        """
        values = (data['uzytkownik_id'], data['kategoria'], data['tytul'], data.get('tresc', ''))
        
        with conn.cursor() as cursor:
            cursor.execute(sql, values)
            conn.commit()
            new_id = cursor.lastrowid
            
        return jsonify({'message': 'Ad added', 'id': new_id}), 201

    except Exception as e:
        print(f"błąd przy dodwaniu ogloszenia: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if conn: conn.close()