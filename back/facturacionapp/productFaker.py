from faker import Faker
import random
import json

fake = Faker()

productList = ['Ventilador', 'Tarjeta Grafica', 'Mouse', 'Monitor', 'Case', 'Pasta Termica', 'Laptop', 'Procesador', 'Audifonos', 'Power Bank']
categories = ['Computo', 'Gaming', 'Estudio', 'Electronicos']

def generate_fake_product(used_products):
    while True:
        product = {
            'producto': fake.random_element(productList),
            'category': random.choice(categories),
            'descripcion': fake.sentence(),
            'quantity': random.randint(1, 40),
            'price': round(random.uniform(10.0, 1000.0), 2),
        }
        if product['producto'] not in used_products:
            used_products.add(product['producto'])
            return product

def save_products_to_file(products, output_file='products.json'):
    with open(output_file, 'w') as json_file:
        json.dump(products, json_file, indent=2)

# Ejemplo de uso
if __name__ == "__main__":
    num_products = 10
    used_products = set()

    generated_products = [generate_fake_product(used_products) for _ in range(num_products)]

    for i, fake_product in enumerate(generated_products, start=1):
        print(f"Producto {i}: {fake_product}")

    save_products_to_file(generated_products)
    print(f"Productos guardados")
