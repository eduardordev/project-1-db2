# project-1-db2
Proyecto 1 DB2 - Frontend &amp; Backend

# Proyecto Ejemplo

Este es un proyecto de ejemplo que utiliza un entorno virtual para gestionar las dependencias y un proyecto Django llamado `facturacionapp`.

## Crear y Activar el Entorno Virtual

1. **Crear el entorno virtual:**

    ```bash
    python -m venv ven
    ```

2. **Activar el entorno virtual:**

    - En Windows:

        ```bash
        .\ven\Scripts\activate
        ```

    - En sistemas basados en Unix o MacOS:

        ```bash
        source ven/bin/activate
        ```

## Instalar Dependencias

3. **Instalar dependencias:**

    Después de activar el entorno virtual, puedes instalar las dependencias utilizando el siguiente comando:

    ```bash
    pip install -r dependencies.txt
    ```

    Este comando instalará todas las dependencias listadas en el archivo dependencies.txt.

## Iniciar el Proyecto Django

4. **Iniciar el proyecto Django:**

    ```bash
    django-admin startproject facturacionapp
    ```

5. **Desactivar el entorno virtual:**

    Cuando hayas terminado de trabajar en tu proyecto, puedes desactivar el entorno virtual con el siguiente comando:

    ```bash
    deactivate
    ```

    Esto restaurará tu entorno de Python a su estado original.

---

**Nota:** Asegúrate de tener Python y pip instalados en tu sistema antes de seguir estos pasos.
