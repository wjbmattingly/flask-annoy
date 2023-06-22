# Flask-Annoy: Vector Database for Semantic Search of Holocaust Testimonies

## Introduction
`Flask-Annoy` is a unique vector database that facilitates semantic searches through approximately 1,000 testimonies from the United States Holocaust Memorial Museum. These testimonies have been transformed from their original PDF format using OCR (Optical Character Recognition) provided by Tesseract 5.0, meticulously cleaned, divided into coherent sections of dialogue, and embedded with an all-mini transformer model.

The indexing of the data is powered by Annoy, a highly efficient library from Spotify that allows for similarity search. This data is hosted on a server at the University of Kentucky with Flask, a popular web framework for Python.

The project also includes a simple HTML application that enables users to query the Flask server, thereby unlocking a user-friendly interface to interact with this powerful and important data.

This project is open-source and welcomes contributions.

## [Annoy](https://github.com/spotify/annoy)
Annoy (Approximate Nearest Neighbors Oh Yeah) is a C++ library with Python bindings to search for points in space that are close to a given query point. It also creates large read-only file-based data structures that are mmapped into memory so that many processes may share the same data.

## Getting Started

### Prerequisites

To run this project, you need to have the following installed:

- Python 3.8+
- Flask
- Annoy
- Tesseract 5.0

### Installation

Clone the repo:
```
git clone https://github.com/wjbmattingly/flask-annoy.git
```

Navigate to the project directory:
```
cd flask-annoy
```

Install required packages:
```
pip install -r requirements.txt
```

### Running the Application

To run the Flask application:
```
flask run
```
Then open a web browser and navigate to the localhost address provided (typically http://127.0.0.1:5000/).

To do this, you will need to change index.html to point to localhost. If you do not wish to ddo this step, simply open index.html in a browser.

## Usage

Upon successful deployment of the application, you can input queries into the provided HTML application to semantically search through the testimonies.

## Contributing

Contributions are very welcome. Please review the CONTRIBUTING.md file for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The United States Holocaust Memorial Museum for the testimonies.
- The University of Kentucky for providing the server.
- Spotify for their amazing Annoy library.