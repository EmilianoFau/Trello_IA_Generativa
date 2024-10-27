from flask import Blueprint, jsonify, request
import uuid

tasks_bp = Blueprint('tasks', __name__)

# Datos de ejemplo (tareas)
tasks = [
    {
        "id": str(uuid.uuid4()),
        "title": "Task 1",
        "description": "Description for Task 1",
        "assignedTo": "Ingacio",
        "startDate": "01/01/2024",
        "endDate": "31/12/2024",
        "status": "To Do",
        "priority": "Low",
        "comments": [],
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Task 2",
        "description": "Description for Task 2",
        "assignedTo": "Ezquizel",
        "startDate": "01/01/2024",
        "endDate": "31/12/2024",
        "status": "In Progress",
        "priority": "Medium",
        "comments": [],
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Task 3",
        "description": "Description for Task 3",
        "assignedTo": "Burno",
        "startDate": "01/01/2024",
        "endDate": "31/12/2024",
        "status": "Done",
        "priority": "High",
        "comments": [],
    },
]

# Obtener todas las tareas
@tasks_bp.route("/", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

# Obtener una tarea específica por ID
@tasks_bp.route("/<task_id>", methods=["GET"])
def get_task(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)
    if task is not None:
        return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

# Agregar una nueva tarea
@tasks_bp.route("/", methods=["POST"])
def add_task():
    task = request.json
    task["id"] = str(uuid.uuid4())
    tasks.append(task)
    return jsonify(task), 201

# Eliminar una tarea por ID
@tasks_bp.route("/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return '', 204

# Actualizar una tarea por ID
@tasks_bp.route("/<task_id>", methods=["PUT"])
def update_task(task_id):
    updated_task = request.json
    for task in tasks:
        if task["id"] == task_id:
            task.update(updated_task)
            task["id"] = task_id  
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404
