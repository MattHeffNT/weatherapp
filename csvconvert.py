import csv
import json


def csv_to_json(csv_file, json_file):
    data = {"conditions": []}
    with open(csv_file, "r") as file:
        csv_reader = csv.reader(file)
        # Skip the header row if present (uncomment the next line if needed)
        # next(csv_reader)
        for row in csv_reader:
            condition = row[0]
            translation = row[1]
            data["conditions"].append(
                {"condition": condition, "translation": translation}
            )

    with open(json_file, "w") as file:
        json.dump(data, file, indent=4)


# Example usage:
csv_file = "./src/assets/conditions.csv"
json_file = "output.json"
csv_to_json(csv_file, json_file)
