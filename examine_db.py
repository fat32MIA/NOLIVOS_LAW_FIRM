import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('data/enhanced_dataset.db')
cursor = conn.cursor()

# Obtener la lista de tablas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tablas en la base de datos:")
for table in tables:
    table_name = table[0]
    print(f"\nTabla: {table_name}")
    
    # Obtener la estructura de la tabla
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    
    print("Columnas:")
    for column in columns:
        print(f"  {column[1]} ({column[2]})")
    
    # Obtener una muestra de datos
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1;")
    sample = cursor.fetchone()
    
    if sample:
        print("\nMuestra de datos:")
        for i, col in enumerate(columns):
            if i < len(sample):  # Asegurarse de que no excedamos el índice
                print(f"  {col[1]}: {sample[i]}")

conn.close()
