import json
from faker import Faker
import random
from datetime import date, timedelta
from bson import json_util

fake = Faker()

# Lista fija de nombres de productos
product_list = ['Laptop', 'Microfono', 'Mouse', 'Monitor', 'Tarjeta Grafica', 'Ventilador']

def generate_dataset_and_save(num_records=50000, output_json='output.json', output_bson='output.bson'):
    dataset = []

    for _ in range(num_records):
        product_name = random.choice(product_list)
        record = {
            'nit': fake.random_int(min=100000000, max=999999999),
            'name': fake.company(),
            'date': fake.date_between(start_date='-30d', end_date='today').isoformat(),
            'detail_name': product_name,
            'quantity': random.randint(1, 10),
            'price': round(random.uniform(10.0, 100.0), 2),
            'total': round(random.uniform(100.0, 10000.0), 2),
        }
        dataset.append(record)

    # Guardar en JSON
    with open(output_json, 'w') as json_file:
        json.dump(dataset, json_file, default=json_util.default, indent=2)

    # Guardar en BSON
    with open(output_bson, 'wb') as bson_file:
        bson_file.write(json_util.dumps(dataset).encode('utf-8'))

    return dataset

# Ejemplo de uso
if __name__ == "__main__":
    num_records = 50000
    generated_data = generate_dataset_and_save(num_records)

    for i, record in enumerate(generated_data, start=1):
        print(f"Registro {i}: {record}")

    print("Datos guardados en output.json y output.bson")
