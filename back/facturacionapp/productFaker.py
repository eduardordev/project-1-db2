from faker import Faker
import random
import json

fake = Faker()

productList = ['Ventilador', 'Tarjeta Grafica', 'Mouse', 'Monitor', 'Case', 'Pasta Termica', 'Laptop', 'Procesador', 'Audifonos', 'Power Bank']
categories = ['Computo', 'Gaming', 'Estudio', 'Electronicos']

def generate_fake_product():
    product = {
        'name': fake.random_element(productList),
        'description': fake.sentence(),
        'price': round(random.uniform(10.0, 1000.0), 2),
        'category': random.choice(categories),
    }
    return product

def save_products_to_file(products, output_file='products.json'):
    with open(output_file, 'w') as json_file:
        json.dump(products, json_file, indent=2)

# Ejemplo de uso
if __name__ == "__main__":
    num_products = 300

    generated_products = [generate_fake_product() for _ in range(num_products)]

    for i, fake_product in enumerate(generated_products, start=1):
        print(f"Producto {i}: {fake_product}")

    save_products_to_file(generated_products)
    print(f"Productos guardados")
