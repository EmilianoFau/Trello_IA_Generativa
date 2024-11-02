import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

general_prompt = (
    "Esto es para una aplicación estilo Trello integrada con IA generativa para generar contenido. "
    "Recuerda no usar ningún símbolo a menos que se especifique en la prompt, "
    "excepto los saltos de línea. Los demás símbolos no están permitidos, "
    "a excepción de los que se especifiquen en la prompt."
)


def summarizeContent(text: str):
    summary_prompt = (
        "Resumen solicitado:\n"
        "A continuación, proporciona un resumen breve del siguiente texto para que sea más conciso y directo.\n\n"
    )
    length = "La longitud de la respuesta que me darás debe ser de un máximo de 100 caracteres."
    prompt = f"{general_prompt}\n\n{summary_prompt}\n\n{length}\n\nTexto a resumir \"{text}\"."
    return model.generate_content(prompt).text


def expandContent(text: str):
    expand_prompt = (
        "Ampliación solicitada:\n"
        "Expande el siguiente contenido para que sea más detallado, proporcionando información adicional y ejemplos donde sea posible.\n\n"
    )
    length = "La longitud de la respuesta que me darás debe ser de un máximo de 100 caracteres."
    prompt = f"{general_prompt}\n\n{expand_prompt}\n\n{length}\n\nTexto a ampliar \"{text}\"."
    return model.generate_content(prompt).text


def rewriteAndCorrectContent(text: str):
    rewrite_prompt = (
        "Reescritura y corrección solicitada:\n"
        "Reescribe el siguiente texto para mejorar su claridad, fluidez y corrección gramatical.\n\n"
        f"Texto a reescribir:\n{text}"
    )
    prompt = f"{general_prompt}\n\n{rewrite_prompt}"
    return model.generate_content(prompt).text

def generateVariations(text: str):
    variation_prompt = (
        "Variaciones solicitadas:\n"
        "Genera hasta un máximo de 4 formas diferentes de expresar el siguiente texto manteniendo el mismo significado."
    )
    format_prompt = (
        "Las variaciones deben estar formateadas como una lista separada por guiones, de la siguiente manera:\n"
        "\"Variación 1\" - \"Variación 2\" - \"Variación 3\" - \"Variación 4\""
    )
    prompt = f"{general_prompt}\n\n{variation_prompt}\n\n{format_prompt}\n\nTexto a variar:\n\"{text}\""
    return model.generate_content(prompt).text


def correctContent(text: str):
    correction_prompt = (
        "Corrección solicitada:\n"
        "Corrige cualquier error gramatical, de estilo o de redacción en el siguiente texto."
    )
    prompt = f"{general_prompt}\n\n{correction_prompt}\n\nTexto a corregir:\n\"{text}\""
    return model.generate_content(prompt).text


def generateListsForBoard(text: str):
    lists_generation_prompt = (
        "Estás integrado en una aplicación de gestión de proyectos. Tu tarea es generar títulos y descripciones de listas "
        "basados en el título de un tablero. Crea múltiples pares de título y descripción de listas que se alineen con "
        "el tema del tablero. Ten en cuenta el contexto: si el título sugiere un enfoque de proyecto, considera títulos "
        "típicos como 'Tareas por hacer', 'Tareas en progreso', 'Tareas completadas', y 'Tareas bloqueadas'. Si el título "
        "sugiere otro tipo de contexto, adapta las listas en consecuencia.\n\n"
        "Formato de salida:\n"
        "Cada par de título y descripción debe seguir esta estructura:\n"
        "Título de la lista - Descripción de la lista\n\n"
        "Ejemplo:\n"
        "Animales por estado - Listar los animales nativos de cada estado de Estados Unidos.\n"
        "Especies en peligro de extinción - Listar los animales en peligro de extinción en América del Norte.\n\n"
        f"Título del tablero: \"{text}\"\n"
    )
    prompt = f"{general_prompt}\n\n{lists_generation_prompt}"
    return model.generate_content(prompt).text


def generateCardsForList(text: str):
    cards_generation_prompt = (
        "Estás integrado en una aplicación de gestión de proyectos. Tu tarea es generar títulos y descripciones de tarjetas "
        "basados en el título de una lista. Crea múltiples pares de título y descripción para las tareas que se incluirían "
        "en esta lista. Asegúrate de que las tarjetas sean relevantes para el contexto del título.\n\n"
        "Formato de salida:\n"
        "Cada par de título y descripción debe seguir esta estructura:\n"
        "Título de la tarjeta - Descripción de la tarjeta\n\n"
        "Ejemplo:\n"
        "Investigar sobre mamíferos - Realizar una investigación sobre los mamíferos nativos de América.\n"
        "Preparar presentación - Crear una presentación sobre la fauna americana para el próximo evento.\n\n"
        f"Título de la lista: \"{text}\"\n"
    )
    prompt = f"{general_prompt}\n\n{cards_generation_prompt}"
    return model.generate_content(prompt).text


def generateListDescription(text: str):
    list_description_prompt = (
        "Estás integrado en una aplicación de gestión de proyectos. Tu tarea es generar una descripción clara y útil "
        "para una lista de tareas, basada en su título. La descripción debe resumir el propósito de la lista y "
        "detallar qué tipo de tareas se agrupan en ella. Considera incluir información sobre el objetivo de la lista, "
        "las acciones esperadas y el impacto que estas tareas pueden tener en el proyecto o en el equipo.\n\n"
        f"Título de la lista: \"{text}\"\n"
    )
    prompt = f"{general_prompt}\n\n{list_description_prompt}"
    return model.generate_content(prompt).text


def generateCardDescription(title: str):
    context_prompt = (
        "Tu objetivo es generar descripciones claras y detalladas para las tarjetas de tareas dentro de las listas de Trello, "
        "basándote en el título de cada tarjeta. La descripción debe proporcionar un resumen del trabajo a realizar, "
        "posibles pasos a seguir, y cualquier información adicional que ayude al usuario a entender y completar la tarea. "
    )
    example_prompt = (
        "\n\nEjemplo de entrada:\n"
        "Título de la tarjeta: Planificar la campaña de marketing para redes sociales\n"
        "Ejemplo de salida:\n"
        "Descripción: El objetivo de esta tarea es planificar una campaña de marketing efectiva para redes sociales. "
        "Para empezar, revisa las métricas de campañas anteriores y realiza un análisis de las tendencias actuales en la industria. "
        "Crea un calendario de contenido con fechas clave y asigna responsabilidades a los miembros del equipo. "
        "Recuerda incluir tanto publicaciones orgánicas como anuncios pagados y adaptar el contenido a las plataformas específicas (Instagram, Twitter, Facebook). "
        "Asegúrate de monitorear el rendimiento de la campaña una vez lanzada y estar preparado para realizar ajustes basados en los resultados."
    )
    prompt = f"{context_prompt}\n\n{example_prompt}\n\nEl título para esta prueba es el siguiente: \"{title}\"."
    return model.generate_content(prompt).text
