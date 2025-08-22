from . import admin

from flask import jsonify

# API Health Check
@admin.route('/health', methods=["GET"])
def health():
    return "OK"

# Visualização dos logs (Login e Logout)
@admin.route("/logs", methods=["GET"])
def get_logs():
    arq = open("./logs.csv", 'r')
    logs = arq.read().splitlines()
    arq.close()
    logs_json = []
    if logs:
        for i in range(1, len(logs)):
            date, status, id = logs[i].split(',')
            logs_json.append({
                "Date": date, 
                "Status": status,
                "ID": id
            })
        return jsonify(logs_json)
    return jsonify({"message": "File of logs not found"}), 404