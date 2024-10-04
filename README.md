# GUI_MineriaDatos

GUI de proposito general para Algoritmos de Mineria de Datos
https://www.notion.so/fd46bdb9aefc46669e0404c9eb5872ce?v=70b569831dea41

## Getting Started

Clonar el repositorio 

```bash
git clone https://github.com/liiz-durang/GUI_MineriaDatos.git
```

## Instalar el Frontend
Esta app usa React.
Para hacer uso de esta se debe levantar un ambiente virtual con las bibliotecas necesarias.

```bash
npm install
```

Iniciar el servidor local 

```bash
npm start
```

Navegar al servidor local 

```bash
http://localhost:3000/
```

## Instalar el Backend

Esta app utiliza FastAPI para crear una REST API.
Para hacer uso de esta se debe levantar un ambiente virtual con las bibliotecas necesarias.

Crear el ambiente virtual

```bash
python3 -m venv venv
```

Activar el ambiente virtual

```bash
source venv/bin/activate
```

O en Windows

```bash
venv\Scripts\activate.bat
```

Instalar las dependencias

```bash
pip install -r requirements.txt
```

## Levantar el Backend

Para levantar el backend se debe ejecutar el siguiente comando

```bash
uvicorn main:app --reload
```

### Acceder a la documentacion de la API

Para acceder a la documentacion de la API se debe acceder a la siguiente URL

```
http://localhost:8000/docs
```
